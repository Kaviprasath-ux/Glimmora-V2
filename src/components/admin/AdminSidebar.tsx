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
    <aside className="w-72 min-h-screen flex flex-col relative overflow-hidden">
      {/* Gradient Background with Glassmorphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Logo - Premium Style */}
        <div className="p-8 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl opacity-50" />
            <div className="relative">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                Glimmora
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <p className="text-slate-400 text-xs font-medium tracking-widest uppercase">Admin Portal</p>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation - Modern Sections */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {navSections.map((section, sectionIdx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: sectionIdx * 0.1 }}
              className="mb-8"
            >
              <h3 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-slate-500" />
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, itemIdx) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-slate-400 hover:text-white'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {/* Glowing Active Background */}
                        {isActive && (
                          <>
                            <motion.div
                              layoutId="activeBackground"
                              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
                            />
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-20 blur-xl"
                            />
                          </>
                        )}

                        {/* Hover Background */}
                        {!isActive && (
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 rounded-xl transition-all duration-300" />
                        )}

                        {/* Icon with Glow Effect */}
                        <div className="relative z-10">
                          <item.icon className={`w-5 h-5 transition-all duration-300 ${
                            isActive ? 'drop-shadow-[0_0_8px_rgba(139,92,246,0.5)]' : 'group-hover:scale-110'
                          }`} />
                        </div>

                        {/* Label */}
                        <span className="relative z-10 font-medium text-sm tracking-wide">
                          {item.label}
                        </span>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="ml-auto relative z-10 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 shadow-[0_0_12px_rgba(139,92,246,0.8)]"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          ))}
        </nav>

        {/* Logout - Premium Style */}
        <div className="p-4 relative">
          <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <motion.button
            onClick={logout}
            className="relative w-full group mt-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 backdrop-blur-sm border border-white/0 group-hover:border-white/10 rounded-xl transition-all duration-300" />
            <div className="relative flex items-center gap-3 px-4 py-3 text-slate-400 group-hover:text-white transition-colors duration-300">
              <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium text-sm tracking-wide">Logout</span>
            </div>
          </motion.button>
        </div>
      </div>
    </aside>
  );
}
