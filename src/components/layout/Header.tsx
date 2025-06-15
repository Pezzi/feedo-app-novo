// src/components/layout/Header.tsx

import { Search, Bell, User, Sun, Moon, Menu, Edit, LogOut, ExternalLink } from 'lucide-react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type HeaderProps = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  toggleSidebar?: () => void; // A função de toggle da sidebar é opcional
}

// GARANTA QUE SEJA 'export function', SEM 'default'
export function Header({ theme, toggleTheme, toggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 h-20 bg-light dark:bg-gray-dark border-b border-gray-200 dark:border-lilas-4/30 shrink-0">
      
      <div className="flex items-center gap-4">
        {toggleSidebar && (
          <button onClick={toggleSidebar} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-lilas-1 lg:hidden">
            <Menu className="h-6 w-6 text-gray-dark dark:text-gray-light" />
          </button>
        )}
      </div>

      <div className="flex-1 flex justify-center px-4">
        <div className="w-full max-w-lg flex items-center gap-3 bg-gray-200 dark:bg-lilas-4/30 rounded-lg px-3">
          <Search className="h-5 w-5 text-gray-medium" />
          <input 
            type="text" 
            placeholder="Buscar..."
            className="w-full bg-transparent text-gray-dark dark:text-white placeholder:text-gray-medium py-2 outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2.5 bg-gray-200 dark:bg-lilas-4/30 rounded-lg hover:bg-gray-300 dark:hover:bg-lilas-1 transition-colors"
        >
          {theme === 'light' ? ( <Moon className="h-5 w-5 text-gray-dark" /> ) : ( <Sun className="h-5 w-5 text-lemon" /> )}
        </button>
        <button className="p-2.5 bg-gray-200 dark:bg-lilas-4/30 rounded-lg hover:bg-gray-300 dark:hover:bg-lilas-1 transition-colors">
          <Bell className="h-5 w-5 text-gray-dark dark:text-gray-light" />
        </button>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-2 outline-none">
              <div className="h-10 w-10 rounded-full bg-lilas-1 flex items-center justify-center">
                <User className="h-6 w-6 text-lilas-3" />
              </div>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content /* ...código do dropdown... */ />
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}