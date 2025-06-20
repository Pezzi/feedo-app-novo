import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Archive,
  Send,
  Download,
  Plus,
  X,
  ThumbsUp,
  ThumbsDown,
  Meh,
  Calendar,
  User,
  Mail,
  Phone,
  MapPin,
  Tag,
  Eye,
  Reply
} from 'lucide-react';
import { AuthDebug } from '../components/AuthDebug';
import { 
  useFeedbacks, 
  useFeedbackStats, 
  useResponseTemplates,
  useFeedbackOperations,
  useExportFeedbacks,
  type Feedback,
  type FeedbackFilters 
} from '../hooks/useFeedbacks';

export const Feedbacks: React.FC = () => {
  // Estados para filtros
  const [filters, setFilters] = useState<FeedbackFilters>({
    search: '',
    rating: undefined,
    status: 'all',
    sentiment: 'all',
    period: 'all',
    sortBy: 'newest',
    page: 1,
    limit: 20
  });

  // Estados para modais
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Hooks do Supabase
  const { feedbacks, loading, error, totalCount, refetch } = useFeedbacks(filters);
  const { stats, loading: statsLoading } = useFeedbackStats();
  const { templates } = useResponseTemplates();
  const { respondToFeedback, updateFeedback, archiveFeedback } = useFeedbackOperations();
  const { exportToCSV } = useExportFeedbacks();

  // Função para aplicar template
  const applyTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setResponseText(template.content);
      setSelectedTemplate(template.name);
    }
  };

  // Função para responder feedback
  const handleRespond = async () => {
    if (!selectedFeedback || !responseText.trim()) return;

    try {
      await respondToFeedback(selectedFeedback.id, responseText, selectedTemplate);
      setShowResponseModal(false);
      setResponseText('');
      setSelectedTemplate('');
      setSelectedFeedback(null);
      refetch();
    } catch (error) {
      console.error('Erro ao responder feedback:', error);
    }
  };

  // Função para arquivar feedback
  const handleArchive = async (feedbackId: string) => {
    try {
      await archiveFeedback(feedbackId);
      refetch();
    } catch (error) {
      console.error('Erro ao arquivar feedback:', error);
    }
  };

  // Função para exportar dados
  const handleExport = async () => {
    try {
      await exportToCSV(filters);
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
    }
  };

  // Função para obter ícone de sentimento
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <ThumbsUp className="w-4 h-4 text-green-400" />;
      case 'negative':
        return <ThumbsDown className="w-4 h-4 text-red-400" />;
      default:
        return <Meh className="w-4 h-4 text-yellow-400" />;
    }
  };

  // Função para obter cor do sentimento
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'negative':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    }
  };

  // Função para renderizar estrelas
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
        }`}
      />
    ));
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <p className="text-red-400">Erro ao carregar feedbacks: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Sistema de Feedbacks</h1>
          <p className="text-gray-400">Gerencie e responda aos feedbacks dos seus clientes</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium">
            <Plus className="w-4 h-4" />
            Novo Feedback
          </button>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          className="p-6 rounded-lg backdrop-blur-md border hover:scale-105 transition-transform"
          style={{ 
            backgroundColor: 'rgba(26, 26, 26, 0.8)', 
            border: '1px solid rgba(221, 242, 71, 0.2)' 
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total de Feedbacks</p>
              <p className="text-2xl font-bold text-white">
                {statsLoading ? '...' : stats?.total_feedbacks || 0}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">
              +{stats?.last_7_days || 0} esta semana
            </span>
          </div>
        </div>

        <div 
          className="p-6 rounded-lg backdrop-blur-md border hover:scale-105 transition-transform"
          style={{ 
            backgroundColor: 'rgba(26, 26, 26, 0.8)', 
            border: '1px solid rgba(221, 242, 71, 0.2)' 
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pendentes</p>
              <p className="text-2xl font-bold text-white">
                {statsLoading ? '...' : stats?.pending_count || 0}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-400" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-sm">
              {stats?.urgent_count || 0} urgentes
            </span>
          </div>
        </div>

        <div 
          className="p-6 rounded-lg backdrop-blur-md border hover:scale-105 transition-transform"
          style={{ 
            backgroundColor: 'rgba(26, 26, 26, 0.8)', 
            border: '1px solid rgba(221, 242, 71, 0.2)' 
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Taxa de Resposta</p>
              <p className="text-2xl font-bold text-white">
                {statsLoading ? '...' : `${stats?.response_rate || 0}%`}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-sm">
              {stats?.responded_count || 0} respondidos
            </span>
          </div>
        </div>

        <div 
          className="p-6 rounded-lg backdrop-blur-md border hover:scale-105 transition-transform"
          style={{ 
            backgroundColor: 'rgba(26, 26, 26, 0.8)', 
            border: '1px solid rgba(221, 242, 71, 0.2)' 
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avaliação Média</p>
              <p className="text-2xl font-bold text-white">
                {statsLoading ? '...' : (stats?.average_rating || 0).toFixed(1)}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="flex items-center gap-1 mt-2">
            {renderStars(Math.round(stats?.average_rating || 0))}
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div 
        className="p-6 rounded-lg backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
          border: '1px solid rgba(221, 242, 71, 0.2)' 
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Busca */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar por nome ou comentário..."
                value={filters.search || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Filtro por Avaliação */}
          <div>
            <select
              value={filters.rating || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value ? Number(e.target.value) : undefined, page: 1 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
            >
              <option value="">Todas as avaliações</option>
              <option value="5">5 estrelas</option>
              <option value="4">4 estrelas</option>
              <option value="3">3 estrelas</option>
              <option value="2">2 estrelas</option>
              <option value="1">1 estrela</option>
            </select>
          </div>

          {/* Filtro por Status */}
          <div>
            <select
              value={filters.status || 'all'}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
            >
              <option value="all">Todos os status</option>
              <option value="pending">Pendente</option>
              <option value="responded">Respondido</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>

          {/* Filtro por Sentimento */}
          <div>
            <select
              value={filters.sentiment || 'all'}
              onChange={(e) => setFilters(prev => ({ ...prev, sentiment: e.target.value, page: 1 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
            >
              <option value="all">Todos os sentimentos</option>
              <option value="positive">Positivo</option>
              <option value="neutral">Neutro</option>
              <option value="negative">Negativo</option>
            </select>
          </div>

          {/* Ordenação */}
          <div>
            <select
              value={filters.sortBy || 'newest'}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value, page: 1 }))}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
            >
              <option value="newest">Mais recentes</option>
              <option value="oldest">Mais antigos</option>
              <option value="rating_high">Maior avaliação</option>
              <option value="rating_low">Menor avaliação</option>
              <option value="urgent">Urgentes primeiro</option>
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            {loading ? 'Carregando...' : `${totalCount} feedbacks encontrados`}
          </p>
          <button
            onClick={() => setFilters({
              search: '',
              rating: undefined,
              status: 'all',
              sentiment: 'all',
              period: 'all',
              sortBy: 'newest',
              page: 1,
              limit: 20
            })}
            className="text-yellow-400 hover:text-yellow-300 text-sm"
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {/* Lista de Feedbacks */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
            <p className="text-gray-400 mt-2">Carregando feedbacks...</p>
          </div>
        ) : feedbacks.length === 0 ? (
          <div 
            className="p-8 rounded-lg backdrop-blur-md text-center"
            style={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.8)', 
              border: '1px solid rgba(221, 242, 71, 0.2)' 
            }}
          >
            <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">Nenhum feedback encontrado</p>
            <p className="text-gray-500 text-sm mt-1">Ajuste os filtros ou aguarde novos feedbacks</p>
          </div>
        ) : (
          feedbacks.map((feedback) => (
            <div
              key={feedback.id}
              className="p-6 rounded-lg backdrop-blur-md border hover:scale-[1.02] transition-transform cursor-pointer"
              style={{ 
                backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                border: '1px solid rgba(221, 242, 71, 0.2)' 
              }}
              onClick={() => setSelectedFeedback(feedback)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Header do feedback */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-white">{feedback.customer_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(feedback.rating)}
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getSentimentColor(feedback.sentiment)}`}>
                      {getSentimentIcon(feedback.sentiment)}
                      <span className="capitalize">{feedback.sentiment}</span>
                    </div>
                    {feedback.is_urgent && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-xs text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        Urgente
                      </div>
                    )}
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      feedback.status === 'responded' 
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                        : feedback.status === 'archived'
                        ? 'bg-gray-500/10 border border-gray-500/20 text-gray-400'
                        : 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
                    }`}>
                      {feedback.status === 'responded' ? 'Respondido' : 
                       feedback.status === 'archived' ? 'Arquivado' : 'Pendente'}
                    </div>
                  </div>

                  {/* Comentário */}
                  <p className="text-gray-300 mb-3 line-clamp-2">{feedback.comment}</p>

                  {/* Tags */}
                  {feedback.tags && feedback.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {feedback.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="flex items-center gap-1 px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Informações adicionais */}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {feedback.customer_email}
                    </div>
                    {feedback.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {feedback.location}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(feedback.created_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-2 ml-4">
                  {feedback.status === 'pending' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFeedback(feedback);
                        setShowResponseModal(true);
                      }}
                      className="p-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors"
                      title="Responder"
                    >
                      <Reply className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleArchive(feedback.id);
                    }}
                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                    title="Arquivar"
                  >
                    <Archive className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeedback(feedback);
                    }}
                    className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    title="Ver detalhes"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Paginação */}
      {totalCount > (filters.limit || 20) && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, (prev.page || 1) - 1) }))}
            disabled={filters.page === 1}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
          >
            Anterior
          </button>
          <span className="text-gray-400">
            Página {filters.page || 1} de {Math.ceil(totalCount / (filters.limit || 20))}
          </span>
          <button
            onClick={() => setFilters(prev => ({ ...prev, page: (prev.page || 1) + 1 }))}
            disabled={(filters.page || 1) >= Math.ceil(totalCount / (filters.limit || 20))}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors"
          >
            Próxima
          </button>
        </div>
      )}

      {/* Modal de Detalhes */}
      {selectedFeedback && !showResponseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div 
            className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ border: '1px solid rgba(221, 242, 71, 0.2)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Detalhes do Feedback</h3>
              <button
                onClick={() => setSelectedFeedback(null)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Informações do cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Cliente</label>
                  <p className="text-white">{selectedFeedback.customer_name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <p className="text-white">{selectedFeedback.customer_email}</p>
                </div>
                {selectedFeedback.customer_phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Telefone</label>
                    <p className="text-white">{selectedFeedback.customer_phone}</p>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Data</label>
                  <p className="text-white">{new Date(selectedFeedback.created_at).toLocaleString('pt-BR')}</p>
                </div>
              </div>

              {/* Avaliação e sentimento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Avaliação</label>
                  <div className="flex items-center gap-1">
                    {renderStars(selectedFeedback.rating)}
                    <span className="text-white ml-2">{selectedFeedback.rating}/5</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Sentimento</label>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-lg w-fit ${getSentimentColor(selectedFeedback.sentiment)}`}>
                    {getSentimentIcon(selectedFeedback.sentiment)}
                    <span className="capitalize">{selectedFeedback.sentiment}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Status</label>
                  <div className={`px-3 py-1 rounded-lg w-fit ${
                    selectedFeedback.status === 'responded' 
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                      : selectedFeedback.status === 'archived'
                      ? 'bg-gray-500/10 border border-gray-500/20 text-gray-400'
                      : 'bg-orange-500/10 border border-orange-500/20 text-orange-400'
                  }`}>
                    {selectedFeedback.status === 'responded' ? 'Respondido' : 
                     selectedFeedback.status === 'archived' ? 'Arquivado' : 'Pendente'}
                  </div>
                </div>
              </div>

              {/* Comentário */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Comentário</label>
                <div className="bg-gray-800 rounded-lg p-4">
                  <p className="text-white whitespace-pre-wrap">{selectedFeedback.comment}</p>
                </div>
              </div>

              {/* Tags */}
              {selectedFeedback.tags && selectedFeedback.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedFeedback.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Respostas */}
              {selectedFeedback.responses && selectedFeedback.responses.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Histórico de Respostas</label>
                  <div className="space-y-3">
                    {selectedFeedback.responses.map((response) => (
                      <div key={response.id} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-400">
                            {new Date(response.created_at).toLocaleString('pt-BR')}
                          </span>
                          {response.template_used && (
                            <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">
                              Template: {response.template_used}
                            </span>
                          )}
                        </div>
                        <p className="text-white whitespace-pre-wrap">{response.response_text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ações */}
              <div className="flex gap-3 pt-4">
                {selectedFeedback.status === 'pending' && (
                  <button
                    onClick={() => setShowResponseModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors font-medium"
                  >
                    <Reply className="w-4 h-4" />
                    Responder
                  </button>
                )}
                <button
                  onClick={() => handleArchive(selectedFeedback.id)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  <Archive className="w-4 h-4" />
                  Arquivar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Resposta */}
      {showResponseModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div 
            className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            style={{ border: '1px solid rgba(221, 242, 71, 0.2)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Responder Feedback</h3>
              <button
                onClick={() => {
                  setShowResponseModal(false);
                  setResponseText('');
                  setSelectedTemplate('');
                }}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Resumo do feedback */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium text-white">{selectedFeedback.customer_name}</span>
                  <div className="flex items-center gap-1">
                    {renderStars(selectedFeedback.rating)}
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs border ${getSentimentColor(selectedFeedback.sentiment)}`}>
                    {getSentimentIcon(selectedFeedback.sentiment)}
                    <span className="capitalize">{selectedFeedback.sentiment}</span>
                  </div>
                </div>
                <p className="text-gray-300">{selectedFeedback.comment}</p>
              </div>

              {/* Templates */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Templates de Resposta</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template.id)}
                      className="p-3 text-left bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700 hover:border-yellow-400"
                    >
                      <div className="font-medium text-white text-sm">{template.name}</div>
                      <div className="text-gray-400 text-xs mt-1 line-clamp-2">{template.content}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor de resposta */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Sua Resposta</label>
                <textarea
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Digite sua resposta personalizada..."
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-400">
                    {responseText.length} caracteres
                  </span>
                  {selectedTemplate && (
                    <span className="text-xs text-yellow-400">
                      Template aplicado: {selectedTemplate}
                    </span>
                  )}
                </div>
              </div>

              {/* Ações */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleRespond}
                  disabled={!responseText.trim()}
                  className="flex items-center gap-2 px-6 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-600 disabled:text-gray-400 text-black rounded-lg transition-colors font-medium"
                >
                  <Send className="w-4 h-4" />
                  Enviar Resposta
                </button>
                <button
                  onClick={() => {
                    setShowResponseModal(false);
                    setResponseText('');
                    setSelectedTemplate('');
                  }}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Debug de Autenticação */}
      <AuthDebug />
    </div>
  );
};

