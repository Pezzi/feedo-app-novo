import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, QrCode, Heart, MessageSquare, Send, DollarSign, Settings, TrendingUp, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Painel', icon: BarChart3, path: '/dashboard' },
    { name: 'Meus QR Codes', icon: QrCode, path: '/qr-codes' },
    { name: 'Veepo', icon: Heart, path: '/veepo' },
    { name: 'Feedbacks', icon: MessageSquare, path: '/feedbacks' },
    { name: 'Campanhas', icon: Send, path: '/campaigns' },
    { name: 'Faturamento', icon: DollarSign, path: '/billing' },
  ];

  const bottomNavItems = [
    { name: 'Configurações', icon: Settings, path: '/settings' },
    { name: 'Veepar', icon: TrendingUp, path: '/veepar' },
    { name: 'Ajuda', icon: HelpCircle, path: '/help' },
  ];

  const isActive = (path: string) => {
    if (path === '/qr-codes') {
      return location.pathname === '/qr-codes' || location.pathname.startsWith('/qr-codes/');
    }
    return location.pathname === path;
  };

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const active = isActive(item.path);
    
    return (
      <Link
        to={item.path}
        className="group relative flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200"
        style={{ 
          backgroundColor: active ? 'rgba(221, 242, 71, 0.1)' : 'transparent',
        }}
        onMouseEnter={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = 'rgba(221, 242, 71, 0.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {/* Pílula de destaque */}
        <div 
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-200 ${
            active ? 'opacity-100 scale-100' : 'opacity-0 scale-75 group-hover:opacity-60 group-hover:scale-90'
          }`}
          style={{ backgroundColor: '#DDF247' }}
        />
        
        {/* Ícone */}
        <div 
          className="flex-shrink-0 transition-colors duration-200"
          style={{ 
            color: active ? '#DDF247' : '#8A8AA0'
          }}
        >
          <item.icon className="h-5 w-5" />
        </div>
        
        {/* Texto */}
        <span 
          className="font-medium transition-colors duration-200"
          style={{ 
            color: active ? '#DDF247' : '#8A8AA0'
          }}
        >
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 flex flex-col`}
      style={{ backgroundColor: '#161616', borderRight: '1px solid #2a2a2a' }}
    >
      {/* Logo */}
      <div className="flex items-center justify-center py-6 px-6">
        <Link to="/dashboard" className="flex items-center space-x-4">
          <img 
            src="/logo-feedo.svg" 
            alt="Feedo Logo" 
            className="w-10 h-10"
          />
          <span className="text-2xl font-bold" style={{ color: '#fff' }}>Feedo</span>
        </Link>
      </div>

      {/* Create Button */}
      <div className="mt-2 mb-2" style={{ borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }}>
        <div className="py-6 px-4">
          <Link
            to="/qr-codes/create"
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors shadow-sm"
            style={{ 
              backgroundColor: '#DDF247', 
              color: '#161616'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#c9d63b';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#DDF247';
            }}
          >
            <QrCode className="h-5 w-5" />
            <span>Criar</span>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-1">
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#7A798A' }}>
              Principal
            </h3>
          </div>
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="pt-6 space-y-1">
          <div className="px-3 py-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#7A798A' }}>
              Conta
            </h3>
          </div>
          {bottomNavItems.map((item) => (
            <NavItem key={item.name} item={item} />
          ))}
        </div>
      </nav>
    </aside>
  );
};

