// src/components/layout/Sidebar.tsx
import {
  BarChart3, QrCode, HeartHandshake, MessageSquareText, Megaphone,
  CreditCard, Settings, Users, LifeBuoy, Plus
} from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'
import feedoLogo from '../../assets/logo.svg'

const navItems = [
  { label: 'Painel', icon: BarChart3, href: '/' },
  { label: 'Meus QR Codes', icon: QrCode, href: '/qr-codes' },
  { label: 'Veepo', icon: HeartHandshake, href: '/veepo' },
  { label: 'Feedbacks', icon: MessageSquareText, href: '/feedbacks' },
  { label: 'Campanhas', icon: Megaphone, href: '/campanhas' },
  { label: 'Faturamento', icon: CreditCard, href: '/faturamento' },
]

const bottomNavItems = [
  { label: 'Configurações', icon: Settings, href: '/configuracoes' },
  { label: 'Equipe', icon: Users, href: '/equipe' },
  { label: 'Ajuda', icon: LifeBuoy, href: '/ajuda' },
]

const baseLinkClasses = "relative group flex items-center rounded-lg font-medium transition-colors duration-200"
const inactiveLinkClasses = "text-gray-light/80 hover:text-lemon"
const activeLinkClasses = "text-lemon"

// Sidebar agora é estática, não precisa mais de props isOpen ou toggleSidebar
export function Sidebar() {
  return (
    <aside className="w-64 flex flex-col bg-gray-dark text-gray-light border-r border-lilas-4/30">
      
      <div className="px-6 h-20 flex items-center border-b border-lilas-4/30 shrink-0">
        <img src={feedoLogo} alt="Feedo Logo" className="h-8 w-auto" />
      </div>

      <div className="border-b border-lilas-4/30 my-1 py-6">
        <div className="px-4 flex justify-center">
            <Link 
              to="/qr-codes/new"
              className="flex items-center justify-center gap-2 bg-lemon text-gray-dark font-bold py-3 px-5 rounded-lg hover:bg-lemon-dark transition-colors"
            >
              <Plus className="h-5 w-5 shrink-0" />
              <span>Criar QR Code</span>
            </Link>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col gap-2 p-3 overflow-y-auto">
        <nav className="flex-1 flex flex-col gap-2">
            {navItems.map((item) => (
                <NavLink
                    key={item.label}
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) => 
                      `${baseLinkClasses} py-3 ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                    }
                >
                    {({ isActive }) => (
                      <>
                        <span 
                          className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-lemon rounded-full transition-opacity ${
                            isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}
                        />
                        <div className="flex items-center gap-3 pl-6">
                          <item.icon className="h-5 w-5 shrink-0" />
                          <span className="text-base font-medium">{item.label}</span>
                        </div>
                      </>
                    )}
                </NavLink>
            ))}
        </nav>

        <div className='mt-auto'>
          <nav className="flex flex-col gap-2 border-t border-lilas-4/30 pt-6 mt-6">
            {bottomNavItems.map((item) => (
                <NavLink
                    key={item.label}
                    to={item.href}
                    className={({ isActive }) => 
                      `${baseLinkClasses} py-2 ${isActive ? activeLinkClasses : inactiveLinkClasses}`
                    }
                >
                  {({ isActive }) => (
                    <>
                      <span 
                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-lemon rounded-full transition-opacity ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                      <div className="flex items-center gap-3 pl-6">
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="text-base font-medium">{item.label}</span>
                      </div>
                    </>
                  )}
                </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}