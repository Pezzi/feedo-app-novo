import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { useAuthStore } from '../store';

// Interfaces
export interface Feedback {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  rating: number;
  comment: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  status: 'pending' | 'responded' | 'archived';
  is_urgent: boolean;
  source: 'qr_code' | 'website' | 'email' | 'manual';
  location?: string;
  category?: string;
  nps_score?: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  tags?: string[];
  responses?: FeedbackResponse[];
}

export interface FeedbackResponse {
  id: string;
  feedback_id: string;
  response_text: string;
  template_used?: string;
  user_id: string;
  created_at: string;
}

export interface FeedbackStats {
  total_feedbacks: number;
  pending_count: number;
  responded_count: number;
  urgent_count: number;
  average_rating: number;
  average_nps: number;
  response_rate: number;
  positive_count: number;
  neutral_count: number;
  negative_count: number;
  last_30_days: number;
  last_7_days: number;
}

export interface ResponseTemplate {
  id: string;
  name: string;
  content: string;
  category: 'positive' | 'neutral' | 'negative' | 'general';
  user_id?: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export interface FeedbackFilters {
  search?: string;
  rating?: number;
  status?: string;
  sentiment?: string;
  period?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

// UUID fixo conforme solicitado
const FIXED_USER_UUID = "2e829032-57eb-408f-963d-7523ce0f386";

// Hook para gerenciar feedbacks
export const useFeedbacks = (filters: FeedbackFilters = {}) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const { user } = useAuthStore();

  const fetchFeedbacks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('feedbacks')
        .select(`
          *,
          feedback_tags(tag),
          feedback_responses(*)
        `, { count: 'exact' })
        .eq('user_id', FIXED_USER_UUID);

      // Aplicar filtros
      if (filters.search) {
        query = query.or(`customer_name.ilike.%${filters.search}%,comment.ilike.%${filters.search}%`);
      }

      if (filters.rating) {
        query = query.eq('rating', filters.rating);
      }

      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters.sentiment && filters.sentiment !== 'all') {
        query = query.eq('sentiment', filters.sentiment);
      }

      if (filters.period && filters.period !== 'all') {
        const now = new Date();
        let startDate = new Date();

        switch (filters.period) {
          case 'today':
            startDate.setHours(0, 0, 0, 0);
            break;
          case 'week':
            startDate.setDate(now.getDate() - 7);
            break;
          case 'month':
            startDate.setMonth(now.getMonth() - 1);
            break;
        }

        query = query.gte('created_at', startDate.toISOString());
      }

      // Ordenação
      switch (filters.sortBy) {
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'oldest':
          query = query.order('created_at', { ascending: true });
          break;
        case 'rating_high':
          query = query.order('rating', { ascending: false });
          break;
        case 'rating_low':
          query = query.order('rating', { ascending: true });
          break;
        case 'urgent':
          query = query.order('is_urgent', { ascending: false }).order('created_at', { ascending: false });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      // Paginação
      const page = filters.page || 1;
      const limit = filters.limit || 20;
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      query = query.range(from, to);

      const { data, error: fetchError, count } = await query;

      if (fetchError) throw fetchError;

      // Processar dados para incluir tags como array
      const processedFeedbacks = data?.map(feedback => ({
        ...feedback,
        tags: feedback.feedback_tags?.map((tag: any) => tag.tag) || [],
        responses: feedback.feedback_responses || []
      })) || [];

      setFeedbacks(processedFeedbacks);
      setTotalCount(count || 0);
    } catch (err) {
      console.error('Erro ao buscar feedbacks:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [user, JSON.stringify(filters)]);

  const refetch = () => {
    fetchFeedbacks();
  };

  return {
    feedbacks,
    loading,
    error,
    totalCount,
    refetch
  };
};

// Hook para estatísticas de feedbacks
export const useFeedbackStats = () => {
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const fetchStats = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('feedbacks')
        .select('*')
        .eq('user_id', FIXED_USER_UUID)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      // Se não há dados, retornar estatísticas zeradas
      if (!data) {
        setStats({
          total_feedbacks: 0,
          pending_count: 0,
          responded_count: 0,
          urgent_count: 0,
          average_rating: 0,
          average_nps: 0,
          response_rate: 0,
          positive_count: 0,
          neutral_count: 0,
          negative_count: 0,
          last_30_days: 0,
          last_7_days: 0
        });
      } else {
        setStats(data);
      }
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user]);

  const refetch = () => {
    fetchStats();
  };

  return {
    stats,
    loading,
    error,
    refetch
  };
};

// Hook para templates de resposta
export const useResponseTemplates = () => {
  const [templates, setTemplates] = useState<ResponseTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('response_templates')
        .select('*')
        .or(`user_id.eq.${FIXED_USER_UUID},is_default.eq.true`)
        .order('is_default', { ascending: false })
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setTemplates(data || []);
    } catch (err) {
      console.error('Erro ao buscar templates:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [user]);

  const refetch = () => {
    fetchTemplates();
  };

  return {
    templates,
    loading,
    error,
    refetch
  };
};

// Hook para operações de feedback
export const useFeedbackOperations = () => {
  const { user } = useAuthStore();

  const createFeedback = async (feedbackData: Omit<Feedback, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'tags' | 'responses'>) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      const { data, error } = await supabase.rpc('insert_feedback_with_tags', {
        p_customer_name: feedbackData.customer_name,
        p_customer_email: feedbackData.customer_email,
        p_customer_phone: feedbackData.customer_phone,
        p_rating: feedbackData.rating,
        p_comment: feedbackData.comment,
        p_source: feedbackData.source,
        p_location: feedbackData.location,
        p_category: feedbackData.category,
        p_nps_score: feedbackData.nps_score,
        p_user_id: FIXED_USER_UUID
      });

      if (error) throw error;

      return data;
    } catch (err) {
      console.error('Erro ao criar feedback:', err);
      throw err;
    }
  };

  const updateFeedback = async (id: string, updates: Partial<Feedback>) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .update(updates)
        .eq('user_id', FIXED_USER_UUID)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (err) {
      console.error('Erro ao atualizar feedback:', err);
      throw err;
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      const { error } = await supabase
        .from('feedbacks')
        .delete()
        .eq('id', id)
        .eq('user_id', FIXED_USER_UUID);

      if (error) throw error;

      return true;
    } catch (err) {
      console.error('Erro ao deletar feedback:', err);
      throw err;
    }
  };

  const respondToFeedback = async (feedbackId: string, responseText: string, templateUsed?: string) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      // Inserir resposta
      const { data: responseData, error: responseError } = await supabase
        .from('feedback_responses')
        .insert({
          feedback_id: feedbackId,
          response_text: responseText,
          template_used: templateUsed,
          user_id: FIXED_USER_UUID
        })
        .select()
        .single();

      if (responseError) throw responseError;

      // Atualizar status do feedback
      const { error: updateError } = await supabase
        .from('feedbacks')
        .update({ 
          status: 'responded',
          updated_at: new Date().toISOString()
        })
        .eq('id', feedbackId)
        .eq('user_id', FIXED_USER_UUID);

      if (updateError) throw updateError;

      return responseData;
    } catch (err) {
      console.error('Erro ao responder feedback:', err);
      throw err;
    }
  };

  const archiveFeedback = async (id: string) => {
    return updateFeedback(id, { status: 'archived' });
  };

  const markAsUrgent = async (id: string, isUrgent: boolean) => {
    return updateFeedback(id, { is_urgent: isUrgent });
  };

  return {
    createFeedback,
    updateFeedback,
    deleteFeedback,
    respondToFeedback,
    archiveFeedback,
    markAsUrgent
  };
};

// Hook para subscription em tempo real
export const useFeedbackSubscription = (onNewFeedback?: (feedback: Feedback) => void) => {
  const { user } = useAuthStore();

  useEffect(() => {
    if (!user || !onNewFeedback) return;

    const subscription = supabase
      .channel('feedbacks_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'feedbacks',
          filter: `user_id=eq.${FIXED_USER_UUID}`
        },
        (payload) => {
          console.log('Novo feedback recebido:', payload.new);
          onNewFeedback(payload.new as Feedback);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, onNewFeedback]);
};

// Hook para exportar dados
export const useExportFeedbacks = () => {
  const { user } = useAuthStore();

  const exportToCSV = async (filters: FeedbackFilters = {}) => {
    if (!user) throw new Error('Usuário não autenticado');

    try {
      let query = supabase
        .from('feedbacks')
        .select(`
          customer_name,
          customer_email,
          customer_phone,
          rating,
          comment,
          sentiment,
          status,
          is_urgent,
          source,
          location,
          category,
          nps_score,
          created_at,
          updated_at,
          feedback_tags(tag)
        `)
        .eq('user_id', FIXED_USER_UUID);

      // Aplicar os mesmos filtros
      if (filters.search) {
        query = query.or(`customer_name.ilike.%${filters.search}%,comment.ilike.%${filters.search}%`);
      }

      if (filters.rating) {
        query = query.eq('rating', filters.rating);
      }

      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters.sentiment && filters.sentiment !== 'all') {
        query = query.eq('sentiment', filters.sentiment);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      // Converter para CSV
      const csvData = data?.map(feedback => ({
        'Nome do Cliente': feedback.customer_name,
        'Email': feedback.customer_email,
        'Telefone': feedback.customer_phone || '',
        'Avaliação': feedback.rating,
        'Comentário': feedback.comment,
        'Sentimento': feedback.sentiment,
        'Status': feedback.status,
        'Urgente': feedback.is_urgent ? 'Sim' : 'Não',
        'Fonte': feedback.source,
        'Localização': feedback.location || '',
        'Categoria': feedback.category || '',
        'NPS': feedback.nps_score || '',
        'Tags': feedback.feedback_tags?.map((tag: any) => tag.tag).join(', ') || '',
        'Data de Criação': new Date(feedback.created_at).toLocaleString('pt-BR'),
        'Última Atualização': new Date(feedback.updated_at).toLocaleString('pt-BR')
      })) || [];

      // Gerar CSV
      const headers = Object.keys(csvData[0] || {});
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => 
          headers.map(header => 
            `"${String(row[header as keyof typeof row]).replace(/"/g, '""')}"`
          ).join(',')
        )
      ].join('\n');

      // Download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `feedbacks_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return true;
    } catch (err) {
      console.error('Erro ao exportar feedbacks:', err);
      throw err;
    }
  };

  return {
    exportToCSV
  };
};