import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#161616' }}>
      <Sidebar isSidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="md:ml-64">
        <Header onMenuClick={toggleSidebar} />
        <main className="p-6">
          <div className="p-6 rounded-lg min-h-96" style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
