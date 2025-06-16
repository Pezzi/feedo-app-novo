import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, QrCode, Heart, MessageSquare, Send, DollarSign, Settings, Users, HelpCircle } from 'lucide-react';
import { useAppStore } from '../../store';

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
    { name: 'Equipe', icon: Users, path: '/team' },
    { name: 'Ajuda', icon: HelpCircle, path: '/help' },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out
        w-64 bg-white dark:bg-gray-dark border-r border-gray-light dark:border-lilas-4/30
        flex flex-col`}
    >
      <div className="flex items-center justify-center h-16 border-b border-gray-light dark:border-lilas-4/30">
        <Link to="/dashboard" className="text-2xl font-bold text-gray-dark dark:text-white">Feedo</Link>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors
              ${location.pathname === item.path
                ? 'bg-lemon text-gray-dark' // Corrigido para usar cores personalizadas
                : 'text-gray-medium dark:text-gray-light/80 hover:bg-gray-light/20 dark:hover:bg-gray-dark/50'}
            `}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <nav className="px-4 py-6 space-y-2 border-t border-gray-light dark:border-lilas-4/30">
        {bottomNavItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-colors
              ${location.pathname === item.path
                ? 'bg-lemon text-gray-dark' // Corrigido para usar cores personalizadas
                : 'text-gray-medium dark:text-gray-light/80 hover:bg-gray-light/20 dark:hover:bg-gray-dark/50'}
            `}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};
