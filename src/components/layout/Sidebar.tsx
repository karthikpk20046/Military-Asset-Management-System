import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingCart, Truck, Users, Settings, ChevronDown, ChevronRight, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarLink {
  to: string;
  label: string;
  icon: React.ReactNode;
  allowedRoles: ('admin' | 'baseCommander' | 'logisticsOfficer')[];
  subLinks?: Omit<SidebarLink, 'subLinks'>[];
}

const Sidebar: React.FC = () => {
  const { hasPermission, logout, user } = useAuth();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  
  const links: SidebarLink[] = [
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      allowedRoles: ['admin', 'baseCommander', 'logisticsOfficer']
    },
    {
      to: '/purchases',
      label: 'Purchases',
      icon: <ShoppingCart size={20} />,
      allowedRoles: ['admin', 'baseCommander', 'logisticsOfficer']
    },
    {
      to: '/transfers',
      label: 'Transfers',
      icon: <Truck size={20} />,
      allowedRoles: ['admin', 'baseCommander', 'logisticsOfficer']
    },
    {
      to: '/assignments',
      label: 'Assignments',
      icon: <Users size={20} />,
      allowedRoles: ['admin', 'baseCommander', 'logisticsOfficer'],
      subLinks: [
        {
          to: '/assignments/active',
          label: 'Active Assignments',
          icon: <ChevronRight size={16} />,
          allowedRoles: ['admin', 'baseCommander', 'logisticsOfficer']
        },
        {
          to: '/assignments/history',
          label: 'Assignment History',
          icon: <ChevronRight size={16} />,
          allowedRoles: ['admin', 'baseCommander', 'logisticsOfficer']
        }
      ]
    },
    {
      to: '/expenditures',
      label: 'Expenditures',
      icon: <Shield size={20} />,
      allowedRoles: ['admin', 'baseCommander']
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: <Settings size={20} />,
      allowedRoles: ['admin']
    }
  ];
  
  const toggleSubmenu = (label: string) => {
    if (openSubmenu === label) {
      setOpenSubmenu(null);
    } else {
      setOpenSubmenu(label);
    }
  };
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <div className="bg-[#0F3460] text-white h-screen w-64 flex flex-col">
      <div className="p-4 border-b border-[#0a2444] flex items-center space-x-3">
        <Shield size={24} className="text-white" />
        <h1 className="text-xl font-bold">MilAsset</h1>
      </div>
      
      {user && (
        <div className="p-4 border-b border-[#0a2444]">
          <div className="flex items-center space-x-3">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-10 w-10 rounded-full object-cover" 
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-[#5D8233] flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-gray-300">{user.role}</p>
            </div>
          </div>
        </div>
      )}
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {links.map((link) => {
            // Check if user has permission to see this link
            if (!hasPermission(link.allowedRoles)) {
              return null;
            }
            
            const hasSubLinks = link.subLinks && link.subLinks.length > 0;
            
            return (
              <li key={link.label}>
                {hasSubLinks ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(link.label)}
                      className="w-full flex items-center justify-between px-4 py-2 text-gray-200 hover:bg-[#0a2444] hover:text-white"
                    >
                      <div className="flex items-center space-x-3">
                        {link.icon}
                        <span>{link.label}</span>
                      </div>
                      {openSubmenu === link.label ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    
                    {openSubmenu === link.label && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {link.subLinks?.map((subLink) => (
                          hasPermission(subLink.allowedRoles) && (
                            <li key={subLink.label}>
                              <NavLink
                                to={subLink.to}
                                className={({ isActive }) => `
                                  flex items-center px-4 py-2 text-sm
                                  ${isActive ? 'bg-[#0a2444] text-white' : 'text-gray-300 hover:bg-[#0a2444] hover:text-white'}
                                `}
                              >
                                <div className="flex items-center space-x-3">
                                  {subLink.icon}
                                  <span>{subLink.label}</span>
                                </div>
                              </NavLink>
                            </li>
                          )
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={link.to}
                    className={({ isActive }) => `
                      flex items-center px-4 py-2
                      ${isActive ? 'bg-[#0a2444] text-white' : 'text-gray-300 hover:bg-[#0a2444] hover:text-white'}
                    `}
                  >
                    <div className="flex items-center space-x-3">
                      {link.icon}
                      <span>{link.label}</span>
                    </div>
                  </NavLink>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-[#0a2444]">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 text-gray-300 hover:text-white w-full px-4 py-2 hover:bg-[#0a2444] rounded"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;