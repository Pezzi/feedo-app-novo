import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Layout } from './components/layout/Layout'; // Caminho corrigido
import Login from './pages/Login';
import Register from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { QRCodes } from './pages/QRCodes'; // Importação do novo componente QRCodes
import { useAuthStore } from './store';
import { supabase } from './services/supabase';

// Create a client
const queryClient = new QueryClient();

// Placeholder components for other pages
const Veepo = () => <div className="p-6"><h1 className="text-2xl font-bold">Veepo - Em desenvolvimento</h1></div>;
const Feedbacks = () => <div className="p-6"><h1 className="text-2xl font-bold">Feedbacks - Em desenvolvimento</h1></div>;
const Campaigns = () => <div className="p-6"><h1 className="text-2xl font-bold">Campanhas - Em desenvolvimento</h1></div>;
const Billing = () => <div className="p-6"><h1 className="text-2xl font-bold">Faturamento - Em desenvolvimento</h1></div>;
const Settings = () => <div className="p-6"><h1 className="text-2xl font-bold">Configurações - Em desenvolvimento</h1></div>;
const Team = () => <div className="p-6"><h1 className="text-2xl font-bold">Equipe - Em desenvolvimento</h1></div>;
const Help = () => <div className="p-6"><h1 className="text-2xl font-bold">Ajuda - Em desenvolvimento</h1></div>;

function App() {
  const { user, isAuthenticated, isLoading, setUser, setLoading } = useAuthStore();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Feedo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
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
          {isAuthenticated ? (
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/qr-codes" element={<QRCodes />} />
                <Route path="/veepo" element={<Veepo />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/team" element={<Team />} />
                <Route path="/help" element={<Help />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Layout>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
