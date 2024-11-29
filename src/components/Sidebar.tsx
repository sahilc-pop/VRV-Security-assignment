import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Shield, Key, Layout } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const links = [
    { to: '/', icon: Users, label: 'Users' },
    { to: '/roles', icon: Shield, label: 'Roles' },
    { to: '/permissions', icon: Key, label: 'Permissions' },
  ];

  return (
    <div className="h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <div className="mb-8 flex items-center space-x-2">
        <Layout className="h-8 w-8 text-blue-400" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
          RBAC Admin
        </h1>
      </div>
      <nav className="space-y-2">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                'hover:bg-gray-800/50 hover:scale-105 transform',
                isActive
                  ? 'bg-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/20'
                  : 'text-gray-400'
              )
            }
          >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;