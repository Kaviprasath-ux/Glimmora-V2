import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Search } from 'lucide-react';
import { WebsiteContentProvider } from '@/contexts/WebsiteContentContext';
import { AdvancedSettingsProvider } from '@/contexts/AdvancedSettingsContext';

export function AdminLayout() {
  const { user } = useAuth();

  return (
    <WebsiteContentProvider>
      <AdvancedSettingsProvider>
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
          <AdminSidebar />

          <div className="flex-1 flex flex-col relative overflow-hidden">
            {/* Ambient Background Effect */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />

            {/* Header - Modern Glassmorphism */}
            <header className="relative z-10 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-lg shadow-black/5">
              <div className="px-8 py-5">
                <div className="flex items-center justify-between">
                  {/* Search Bar - Modern Floating Style */}
                  <div className="flex-1 max-w-xl">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors duration-300" />
                        <input
                          type="text"
                          placeholder="Search anything..."
                          className="w-full pl-12 pr-4 py-3.5 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 placeholder:text-slate-400 text-sm font-medium shadow-sm hover:shadow-md"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Side Actions */}
                  <div className="flex items-center gap-3">
                    {/* Notifications - Floating Button */}
                    <button className="relative group p-3 bg-white/80 backdrop-blur-sm hover:bg-white border border-slate-200/50 rounded-2xl transition-all duration-300 hover:shadow-lg hover:scale-105">
                      <Bell className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
                      <span className="absolute top-2 right-2 w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur" />
                    </button>

                    {/* Divider */}
                    <div className="w-px h-8 bg-gradient-to-b from-transparent via-slate-300 to-transparent" />

                    {/* User Profile - Premium Card */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative flex items-center gap-3 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-sm">
                              {user?.fullName?.charAt(0) || 'A'}
                            </span>
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 leading-tight">
                            {user?.fullName || 'Admin'}
                          </p>
                          <p className="text-xs text-slate-500 leading-tight">Administrator</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content - More Spacious */}
            <main className="relative z-10 flex-1 p-8 overflow-auto">
              <Outlet />
            </main>
          </div>
        </div>
      </AdvancedSettingsProvider>
    </WebsiteContentProvider>
  );
}
