import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CreditCardIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Topbar from '../components/Topbar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Agents', href: '/agents', icon: ChatBubbleLeftRightIcon },
  { name: 'Prompts', href: '/prompts', icon: DocumentTextIcon },
  { name: 'Billing', href: '/billing', icon: CreditCardIcon },
  { name: 'Metrics', href: '/metrics', icon: ChartBarIcon },
  { name: 'Logs', href: '/logs', icon: ClipboardDocumentListIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // Here you could clear auth state if implemented
    navigate('/auth/signin');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 shadow-lg bg-surface border-theme border-r">
        <div className="flex h-16 items-center justify-center border-b border-theme">
          <h1 className="text-xl font-bold text-primary">Agent Admin</h1>
        </div>
        <nav className="mt-5 px-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive ? 'nav-item active' : 'nav-item'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
          {/* Logout menu item */}
          <button
            onClick={handleLogout}
            className="group flex items-center w-full px-2 py-2 mt-4 text-sm font-medium rounded-md transition-colors nav-item hover:bg-red-50 hover:text-red-700"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-700" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 