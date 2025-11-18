import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  BedDouble,
  Users,
  UserCog,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  FileText,
  Image,
  Scale,
  CheckCircle,
  Palette,
  Mail,
  DollarSign,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

const navSections = [
  {
    title: 'Main',
    items: [
      { to: '/admin', icon: LayoutDashboard, label: 'Overview', end: true },
      { to: '/admin/bookings', icon: Calendar, label: 'Bookings' },
      { to: '/admin/rooms', icon: BedDouble, label: 'Rooms' },
      { to: '/admin/guests', icon: Users, label: 'Guests' },
      { to: '/admin/staff', icon: UserCog, label: 'Staff' },
      { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    ],
  },
  {
    title: 'Website Content',
    items: [
      { to: '/admin/amenities', icon: Sparkles, label: 'Amenities' },
      { to: '/admin/content', icon: FileText, label: 'Content' },
      { to: '/admin/media', icon: Image, label: 'Media' },
      { to: '/admin/policies', icon: Scale, label: 'Policies' },
    ],
  },
  {
    title: 'Configuration',
    items: [
      { to: '/admin/pre-checkin', icon: CheckCircle, label: 'Pre Check-In' },
      { to: '/admin/branding', icon: Palette, label: 'Branding' },
      { to: '/admin/email-templates', icon: Mail, label: 'Email Templates' },
      { to: '/admin/pricing-rules', icon: DollarSign, label: 'Pricing Rules' },
      { to: '/admin/settings', icon: Settings, label: 'Settings' },
    ],
  },
];

export function AdminSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-neutral-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-neutral-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Glimmora Admin
        </h1>
        <p className="text-neutral-400 text-sm mt-1">Management Portal</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navSections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="px-6 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-6 py-3 transition-all ${
                      isActive
                        ? 'bg-primary-600 text-white border-r-4 border-primary-400'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="ml-auto w-1.5 h-1.5 bg-white rounded-full"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-neutral-800">
        <motion.button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </aside>
  );
}
