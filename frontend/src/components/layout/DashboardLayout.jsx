import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const DashboardLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header title={title} />
      <div className="flex">
        <aside className="hidden lg:block fixed left-0 top-14 z-40 w-64 h-[calc(100vh-3.5rem)] border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Sidebar />
        </aside>
        <main className="flex-1 lg:ml-64">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};