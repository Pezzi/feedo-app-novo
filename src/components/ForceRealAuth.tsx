import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store';
import { supabase } from '../services/supabase';

export const ForceRealAuth: React.FC = () => {
  const { user, setUser, setLoading } = useAuthStore();
  const [hasChecked, setHasChecked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const isValidUUID = (id: string) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
  };

  const isInvalidUser = (user: any) => {
    if (!user?.id) return false;
    
    // Verificar se é o ID mock "1"
    if (user.id === "1" || user.id === 1) return true;
    
    // Verificar se não é um UUID válido
    if (typeof user.id === 'string' && !isValidUUID(user.id)) return true;
    
    return false;
  };

  const forceCleanAuth = async () => {
    console.log('🧹 Limpeza completa da autenticação...');
    
    // Marcar que já fizemos limpeza para evitar loop
    sessionStorage.setItem('auth_cleaned', 'true');
    
    // 1. Limpar localStorage
    localStorage.removeItem('feedo-auth');
    
    // 2. Logout do Supabase
    await supabase.auth.signOut();
    
    // 3. Limpar store
    setUser(null);
    setLoading(false);
    
    console.log('✅ Limpeza completa realizada');
    
    // 4. Redirecionar para login SEM recarregar
    window.location.href = '/login';
  };

  const checkAndFixAuth = async () => {
    // Evitar verificação múltipla
    if (hasChecked) return;
    
    // Verificar se já fizemos limpeza recentemente
    const authCleaned = sessionStorage.getItem('auth_cleaned');
    if (authCleaned) {
      console.log('🔄 Limpeza já realizada, aguardando login...');
      setHasChecked(true);
      return;
    }

    console.log('🔍 Verificando autenticação...');
    
    // Se não há usuário, não fazer nada
    if (!user) {
      setHasChecked(true);
      return;
    }

    // Verificar se o usuário é inválido
    if (isInvalidUser(user)) {
      console.log('❌ User ID inválido detectado:', user.id);
      setShowModal(true);
      setHasChecked(true);
      return;
    }

    // Verificar sessão do Supabase apenas se o usuário parece válido
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.log('❌ Erro na sessão do Supabase:', error);
        setShowModal(true);
        setHasChecked(true);
        return;
      }

      if (!session?.user) {
        console.log('❌ Nenhuma sessão válida do Supabase');
        setShowModal(true);
        setHasChecked(true);
        return;
      }

      // Se chegou até aqui, verificar se o user do store está sincronizado
      if (user.id !== session.user.id) {
        console.log('🔄 Sincronizando usuário do Supabase...');
        console.log('Usuário do Supabase:', session.user.id);
        setUser(session.user);
        // Limpar flag de limpeza se sincronizou com sucesso
        sessionStorage.removeItem('auth_cleaned');
      } else {
        console.log('✅ Autenticação válida:', user.id);
        // Limpar flag de limpeza se tudo está ok
        sessionStorage.removeItem('auth_cleaned');
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
    }
    
    setHasChecked(true);
  };

  useEffect(() => {
    // Aguardar um pouco antes de verificar para evitar verificações prematuras
    const timer = setTimeout(() => {
      checkAndFixAuth();
    }, 1000);

    return () => clearTimeout(timer);
  }, [user?.id]);

  // Limpar flag quando componente é desmontado
  useEffect(() => {
    return () => {
      // Não limpar aqui para evitar loops
    };
  }, []);

  // Modal de aviso apenas se detectou problema
  if (showModal && isInvalidUser(user)) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-red-900 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-xl font-bold text-white mb-4">⚠️ Autenticação Inválida</h2>
          <p className="text-red-200 mb-4">
            Detectamos dados de autenticação inválidos. É necessário fazer login novamente com sua conta real do Supabase.
          </p>
          <p className="text-red-300 text-sm mb-6">
            User ID atual: <code>{user?.id}</code>
          </p>
          <div className="space-y-3">
            <button
              onClick={forceCleanAuth}
              className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
            >
              🔄 Limpar e Fazer Login Real
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

