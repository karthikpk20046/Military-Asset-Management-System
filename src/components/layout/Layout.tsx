import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../context/AuthContext';

interface LayoutProps {
  title: string;
  subtitle?: string;
  requireAuth?: boolean;
  allowedRoles?: ('admin' | 'baseCommander' | 'logisticsOfficer')[];
}

const Layout: React.FC<LayoutProps> = ({ 
  title, 
  subtitle,
  requireAuth = true,
  allowedRoles = ['admin', 'baseCommander', 'logisticsOfficer']
}) => {
  const { isAuthenticated, hasPermission } = useAuth();
  
  // Check if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has permission to access this page
  if (requireAuth && isAuthenticated && !hasPermission(allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} subtitle={subtitle} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;