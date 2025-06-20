import React, { useState } from 'react';
import { Search, Bell, User, Menu, X, LogOut, Settings, Wallet, Sun, Moon } from 'lucide-react';
import { supabase } from '../../services/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogout = async () => {
    try {
      // Fazer logout no Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Erro ao fazer logout:', error);
        return;
      }

      // Limpar estado local
      setUser(null);
      
      // Fechar menu dropdown
      setShowUserMenu(false);
      
      // Redirecionar para login
      navigate('/login');
    } catch (err) {
      console.error('Erro inesperado no logout:', err);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Implementar mudança de tema
    console.log('Toggle theme:', !isDarkMode ? 'dark' : 'light');
  };

  // Componente para itens do dropdown com hover
  const DropdownItem = ({ icon: Icon, children, onClick }: { 
    icon: any; 
    children: React.ReactNode; 
    onClick?: () => void;
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <button 
        className="w-full flex items-center space-x-3 px-4 py-2 transition-colors"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          color: isHovered ? '#DDF247' : '#F2F2F2',
          backgroundColor: 'transparent'
        }}
      >
        <Icon className="h-4 w-4" />
        <span>{children}</span>
      </button>
    );
  };

  return (
    <header className="px-6 py-4" style={{ backgroundColor: 'transparent' }}>
      <div className="flex items-center justify-between">
        {/* Left side - Mobile menu button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#8A8AA0' }}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: '#7A798A' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #2a2a2a',
                color: '#fff'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#DDF247';
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(221, 242, 71, 0.2)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#2a2a2a';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Right side - Theme toggle, Notifications and User menu */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle - sem pílula, apenas realce quando ativo */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-colors"
            style={{ 
              color: isDarkMode ? '#DDF247' : '#8A8AA0',
              backgroundColor: 'transparent'
            }}
            title={isDarkMode ? 'Modo claro' : 'Modo escuro'}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications - sem pílula */}
          <button 
            className="p-2 rounded-lg transition-colors" 
            style={{ color: '#8A8AA0' }}
            title="Notificações"
          >
            <div className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </div>
          </button>

          {/* User Menu - sem pílula */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg transition-colors"
              style={{ color: '#8A8AA0' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DDF247' }}>
                <User className="h-5 w-5" style={{ color: '#161616' }} />
              </div>
              <span className="hidden md:block font-medium" style={{ color: '#fff' }}>johnpezzi@me.com</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#7A798A' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu - Glassmorphism com hover nos itens */}
            {showUserMenu && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-lg shadow-lg z-50 backdrop-blur-md"
                style={{ 
                  backgroundColor: 'rgba(26, 26, 26, 0.8)', 
                  border: '1px solid rgba(221, 242, 71, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="p-4" style={{ borderBottom: '1px solid rgba(42, 42, 42, 0.5)' }}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#DDF247' }}>
                      <User className="h-6 w-6" style={{ color: '#161616' }} />
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: '#fff' }}>johnpezzi@me.com</p>
                      <p className="text-sm" style={{ color: '#7A798A' }}>Usuário Premium</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-2">
                  <DropdownItem icon={User}>
                    My Profile
                  </DropdownItem>
                  
                  <DropdownItem icon={Wallet}>
                    Wallet
                  </DropdownItem>
                  
                  <DropdownItem icon={Settings}>
                    Configurações
                  </DropdownItem>
                  
                  <hr className="my-2" style={{ borderColor: 'rgba(42, 42, 42, 0.5)' }} />
                  
                  <DropdownItem icon={LogOut} onClick={handleLogout}>
                    Log out
                  </DropdownItem>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
