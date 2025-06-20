import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';

interface EmailConfirmationProps {
  email?: string;
  onResendEmail?: () => void;
}

export const EmailConfirmation: React.FC<EmailConfirmationProps> = ({ 
  email = "seu-email@exemplo.com",
  onResendEmail 
}) => {
  const [isResending, setIsResending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    
    // Simular envio de email
    setTimeout(() => {
      setIsResending(false);
      setEmailSent(true);
      if (onResendEmail) {
        onResendEmail();
      }
      
      // Reset do estado após 3 segundos
      setTimeout(() => {
        setEmailSent(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: '#161616' }}
    >
      <div 
        className="w-full max-w-md p-8 rounded-lg backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.8)', 
          border: '1px solid rgba(221, 242, 71, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(221, 242, 71, 0.2)' }}
          >
            <Mail className="h-8 w-8" style={{ color: '#DDF247' }} />
          </div>
          
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#fff' }}>
            Confirme seu email
          </h1>
          
          <p className="text-sm" style={{ color: '#7A798A' }}>
            Enviamos um link de confirmação para
          </p>
          
          <p className="font-medium mt-1" style={{ color: '#DDF247' }}>
            {email}
          </p>
        </div>

        {/* Instructions */}
        <div 
          className="p-4 rounded-lg mb-6"
          style={{ backgroundColor: 'rgba(221, 242, 71, 0.1)', border: '1px solid rgba(221, 242, 71, 0.2)' }}
        >
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#DDF247' }} />
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#fff' }}>
                Próximos passos:
              </p>
              <ul className="text-sm space-y-1" style={{ color: '#F2F2F2' }}>
                <li>1. Verifique sua caixa de entrada</li>
                <li>2. Clique no link de confirmação</li>
                <li>3. Faça login na sua conta</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resend Email */}
        <div className="text-center mb-6">
          <p className="text-sm mb-3" style={{ color: '#7A798A' }}>
            Não recebeu o email?
          </p>
          
          <button
            onClick={handleResendEmail}
            disabled={isResending || emailSent}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: emailSent ? 'rgba(34, 197, 94, 0.2)' : 'rgba(221, 242, 71, 0.1)',
              border: `1px solid ${emailSent ? 'rgba(34, 197, 94, 0.3)' : 'rgba(221, 242, 71, 0.3)'}`,
              color: emailSent ? '#22c55e' : '#DDF247'
            }}
          >
            {isResending ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : emailSent ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Email enviado!</span>
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                <span>Reenviar email</span>
              </>
            )}
          </button>
        </div>

        {/* Help Text */}
        <div 
          className="p-3 rounded-lg mb-6 text-center"
          style={{ backgroundColor: 'rgba(42, 42, 42, 0.3)' }}
        >
          <p className="text-xs" style={{ color: '#7A798A' }}>
            Verifique também sua pasta de spam ou lixo eletrônico.
            O email pode levar alguns minutos para chegar.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            to="/login"
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: '#DDF247', color: '#161616' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c9d63b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#DDF247';
            }}
          >
            <span>Ir para Login</span>
          </Link>
          
          <Link
            to="/register"
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors"
            style={{ 
              backgroundColor: 'transparent', 
              border: '1px solid rgba(221, 242, 71, 0.3)',
              color: '#F2F2F2'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(221, 242, 71, 0.1)';
              e.currentTarget.style.color = '#DDF247';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#F2F2F2';
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Cadastro</span>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs" style={{ color: '#7A798A' }}>
            Problemas com a confirmação?{' '}
            <a 
              href="mailto:suporte@feedo.com.br" 
              className="underline hover:no-underline transition-all"
              style={{ color: '#DDF247' }}
            >
              Entre em contato
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
