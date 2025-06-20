import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { EmailConfirmation } from './pages/EmailConfirmation';
import { Dashboard } from './pages/Dashboard';
import { QRCodes } from './pages/QRCodes';
import { CreateQRCode } from './pages/CreateQRCode';
import { Veepo } from './pages/Veepo';
import { Veepar } from './pages/Veepar';
import { Feedbacks } from './pages/FeedbacksWithSupabase';
import { FixUserID } from './components/FixUserID';
import { useAuthStore } from './store';
import { supabase } from './services/supabase';

// Create a client
const queryClient = new QueryClient();

// Placeholder components for other pages
const Campaigns = () => <div className="p-6"><h1 className="text-2xl font-bold">Campanhas - Em desenvolvimento</h1></div>;
const Billing = () => <div className="p-6"><h1 className="text-2xl font-bold">Faturamento - Em desenvolvimento</h1></div>;
const Settings = () => <div className="p-6"><h1 className="text-2xl font-bold">Configurações - Em desenvolvimento</h1></div>;
const Team = () => <div className="p-6"><h1 className="text-2xl font-bold">Equipe - Em desenvolvimento</h1></div>;
const Help = () => <div className="p-6"><h1 className="text-2xl font-bold">Ajuda - Em desenvolvimento</h1></div>;

function App() {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Verificar sessão atual
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Erro ao verificar sessão:', error);
        }

        if (mounted) {
          if (session?.user) {
            setUser(session.user);
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      } catch (error) {
        console.error('Erro na inicialização da auth:', error);
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
        if (mounted) {
          if (session?.user) {
            setUser(session.user);
          } else {
            setUser(null);
          }
          setLoading(false);
        }
      }
    );

    // Inicializar autenticação
    initializeAuth();

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [setUser, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#161616' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#fff' }}>
            Feedo
          </h1>
          <p style={{ color: '#7A798A' }}>
            Carregando autenticação...
          </p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          {/* Componente para corrigir User ID */}
          <FixUserID />
          
          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="qr-codes" element={<QRCodes />} />
                <Route path="qr-codes/create" element={<CreateQRCode />} />
                <Route path="veepo" element={<Veepo />} />
                <Route path="veepar" element={<Veepar />} />
                <Route path="feedbacks" element={<Feedbacks />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="billing" element={<Billing />} />
                <Route path="settings" element={<Settings />} />
                <Route path="help" element={<Help />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/email-confirmation" element={<EmailConfirmation />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
          
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

