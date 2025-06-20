import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store';
import { supabase } from '../services/supabase';

export const FixUserID: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [status, setStatus] = useState('Aguardando...');
  const [attempts, setAttempts] = useState(0);

  const fixUserID = async () => {
    console.log('🔧 Verificando e corrigindo User ID...');
    setStatus('Verificando...');
    
    // Verificar se o user.id é "1" (inválido)
    if (user?.id === "1" || user?.id === 1) {
      console.log('❌ User ID inválido detectado:', user.id);
      setStatus('ID inválido detectado');
      
      try {
        // Tentar múltiplas abordagens para obter o usuário real
        
        // Abordagem 1: getSession
        console.log('🔍 Tentativa 1: getSession...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Erro na getSession:', sessionError);
        } else if (session?.user) {
          console.log('✅ UUID real encontrado via getSession:', session.user.id);
          console.log('📋 Dados completos do usuário:', session.user);
          setUser(session.user);
          setStatus('✅ Corrigido via getSession');
          return;
        }
        
        // Abordagem 2: getUser
        console.log('🔍 Tentativa 2: getUser...');
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error('Erro na getUser:', userError);
        } else if (authUser) {
          console.log('✅ UUID real encontrado via getUser:', authUser.id);
          console.log('📋 Dados completos do usuário:', authUser);
          setUser(authUser);
          setStatus('✅ Corrigido via getUser');
          return;
        }
        
        // Abordagem 3: Listener de auth
        console.log('🔍 Tentativa 3: Auth listener...');
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          console.log('🔔 Auth state change:', event, session?.user?.id);
          if (session?.user && session.user.id !== user?.id) {
            console.log('✅ UUID real encontrado via listener:', session.user.id);
            setUser(session.user);
            setStatus('✅ Corrigido via listener');
            subscription.unsubscribe();
          }
        });
        
        // Limpar listener após 5 segundos
        setTimeout(() => {
          subscription.unsubscribe();
        }, 5000);
        
        setStatus('❌ Nenhuma sessão válida encontrada');
        console.log('❌ Todas as tentativas falharam');
        
      } catch (error) {
        console.error('Erro ao corrigir User ID:', error);
        setStatus('❌ Erro na correção');
      }
      
      setAttempts(prev => prev + 1);
      
    } else if (user?.id) {
      console.log('✅ User ID já é válido:', user.id);
      setStatus('✅ ID válido');
    } else {
      console.log('ℹ️ Nenhum usuário logado');
      setStatus('Aguardando login');
    }
  };

  // Tentar corrigir quando o usuário muda
  useEffect(() => {
    if (user) {
      fixUserID();
    }
  }, [user?.id]);

  // Tentar novamente a cada 3 segundos se o ID ainda for inválido
  useEffect(() => {
    if ((user?.id === "1" || user?.id === 1) && attempts < 5) {
      const timer = setTimeout(() => {
        console.log(`🔄 Tentativa ${attempts + 1} de correção...`);
        fixUserID();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [user?.id, attempts]);

  const manualFix = async () => {
    console.log('🔧 Correção manual iniciada...');
    setAttempts(0);
    await fixUserID();
  };

  return (
    <div className="fixed top-4 left-4 z-50 p-3 bg-blue-900 text-white rounded-lg text-sm max-w-xs">
      <div className="font-bold mb-1">🔧 Fix User ID</div>
      <div>ID: <code className="text-yellow-300">{user?.id || 'null'}</code></div>
      <div>Email: <code className="text-green-300">{user?.email || 'null'}</code></div>
      <div className="mt-1">Status: <span className="text-cyan-300">{status}</span></div>
      <div>Tentativas: {attempts}/5</div>
      
      {(user?.id === "1" || user?.id === 1) && (
        <button 
          onClick={manualFix}
          className="mt-2 px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs w-full"
        >
          🔄 Corrigir Manualmente
        </button>
      )}
    </div>
  );
};

