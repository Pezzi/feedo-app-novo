// src/components/layout/Layout.tsx

import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light'

export function Layout() {
  const [theme, setTheme] = useState<Theme>('light')
  const [isSidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) setTheme(savedTheme);
  }, [])
  
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen flex antialiased bg-light dark:bg-gray-dark">
      {/* Usaremos uma Sidebar estática */}
      <Sidebar />
      
      {/* A classe 'overflow-hidden' foi REMOVIDA desta div */}
      <div className="flex-1 flex flex-col">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme}
        />
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}