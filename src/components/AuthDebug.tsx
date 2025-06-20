import React, { useEffect } from 'react';
import { useAuthStore } from '../store';
import { supabase } from '../services/supabase';

export const AuthDebug: React.FC = () => {
  const { user, setUser, logout } = useAuthStore();

  const forceLogout = async () => {
    console.log('🔄 Forçando logout completo...');
    
    // Limpar localStorage
    localStorage.removeItem('feedo-auth');
    localStorage.clear();
    
    // Logout do Supabase
    await supabase.auth.signOut();
    
    // Limpar store
    setUser(null);
    
    console.log('✅ Logout completo realizado');
    window.location.reload();
  };

  const checkAuth = async () => {
    console.log('🔍 Verificando autenticação...');
    console.log('User no store:', user);
    console.log('User ID:', user?.id);
    console.log('Tipo do ID:', typeof user?.id);
    
    // Verificar sessão do Supabase
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Sessão do Supabase:', session);
    console.log('User do Supabase:', session?.user);
    
    if (session?.user && session.user.id !== user?.id) {
      console.log('🔄 Sincronizando usuário do Supabase...');
      setUser(session.user);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-red-900 text-white rounded-lg max-w-sm">
      <h3 className="font-bold mb-2">🐛 Debug de Autenticação</h3>
      <div className="text-sm space-y-1">
        <p><strong>User ID:</strong> {user?.id || 'null'}</p>
        <p><strong>Email:</strong> {user?.email || 'null'}</p>
        <p><strong>Tipo ID:</strong> {typeof user?.id}</p>
        <p><strong>É UUID válido:</strong> {
          user?.id && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(user.id) 
            ? '✅' : '❌'
        }</p>
      </div>
      <div className="mt-3 space-y-2">
        <button 
          onClick={checkAuth}
          className="w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
        >
          🔍 Verificar Auth
        </button>
        <button 
          onClick={forceLogout}
          className="w-full px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm"
        >
          🔄 Forçar Logout
        </button>
      </div>
    </div>
  );
};
