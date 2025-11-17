import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Settings, CreditCard, Shield, LayoutDashboard, LogOut } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { OverviewTab } from './tabs/OverviewTab';
import { ProfileTab } from './tabs/ProfileTab';
import { BookingsTab } from './tabs/BookingsTab';
import { PreferencesTab } from './tabs/PreferencesTab';
import { PaymentsTab } from './tabs/PaymentsTab';
import { SecurityTab } from './tabs/SecurityTab';

const tabs = [
  { id: 'overview', name: 'Overview', icon: LayoutDashboard, component: OverviewTab },
  { id: 'profile', name: 'Profile', icon: User, component: ProfileTab },
  { id: 'bookings', name: 'Bookings', icon: Calendar, component: BookingsTab },
  { id: 'preferences', name: 'Preferences', icon: Settings, component: PreferencesTab },
  { id: 'payments', name: 'Payments', icon: CreditCard, component: PaymentsTab },
  { id: 'security', name: 'Security', icon: Shield, component: SecurityTab },
];

export function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Read tab from URL on mount and when searchParams change
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabs.some(tab => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Update URL when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const ActiveTabComponent = tabs.find(tab => tab.id === activeTab)?.component;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Guest Dashboard</h1>
              <p className="text-neutral-600 mt-1">Manage your bookings and preferences</p>
            </div>
            <div className="flex items-center gap-4">
              {/* User Profile */}
              {user && (
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}`}
                    alt={user.fullName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="hidden sm:block">
                    <div className="font-semibold text-neutral-900">{user.fullName}</div>
                    <div className="text-sm text-neutral-600">{user.email}</div>
                  </div>
                </div>
              )}
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {ActiveTabComponent && <ActiveTabComponent />}
        </motion.div>
      </div>
    </div>
  );
}
