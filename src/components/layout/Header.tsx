import React from 'react';
import { Bell, HelpCircle, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { user } = useAuth();
  
  return (
    <header className="bg-white shadow-sm px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#0F3460]">{title}</h1>
          {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-100 px-4 py-2 pr-10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0F3460] focus:border-transparent"
            />
            <Search size={18} className="absolute right-3 top-2.5 text-gray-500" />
          </div>
          
          <button className="relative p-2 text-gray-500 hover:text-[#0F3460] hover:bg-gray-100 rounded-full transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-[#D80032] rounded-full w-2 h-2"></span>
          </button>
          
          <button className="p-2 text-gray-500 hover:text-[#0F3460] hover:bg-gray-100 rounded-full transition-colors">
            <HelpCircle size={20} />
          </button>
          
          {user && (
            <div className="flex items-center space-x-3">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 rounded-full object-cover" 
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-[#5D8233] flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;