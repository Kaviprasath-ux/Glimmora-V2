import { useAdmin } from '@/contexts/AdminContext';
import { StatsCard } from '@/components/admin/StatsCard';
import { DollarSign, Calendar, TrendingUp, Users } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export function OverviewTab() {
  const { stats, revenueData } = useAdmin();

  return (
    <div className="space-y-10">
      {/* Header with Modern Gradient */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-3xl" />
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-3">
            Dashboard Overview
          </h1>
          <p className="text-slate-600 text-lg">Welcome back! Here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Grid - Floating Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          change={stats.revenueChange}
          icon={DollarSign}
          color="primary"
        />
        <StatsCard
          title="Total Bookings"
          value={stats.totalBookings}
          change={stats.bookingsChange}
          icon={Calendar}
          color="blue"
        />
        <StatsCard
          title="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          change={stats.occupancyChange}
          icon={TrendingUp}
          color="green"
        />
        <StatsCard
          title="Total Guests"
          value={stats.totalGuests}
          change={stats.guestsChange}
          icon={Users}
          color="purple"
        />
      </div>

      {/* Charts - Premium Floating Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trend - Glassmorphism Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
          <div className="relative backdrop-blur-xl bg-white/80 border border-purple-500/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  Revenue Trend
                </h3>
                <p className="text-sm text-slate-500">Monthly performance overview</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-purple-500/20">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    padding: '12px',
                  }}
                  labelStyle={{ color: '#1e293b', fontWeight: 600 }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: '12px',
                    fontWeight: 600,
                    paddingTop: '16px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="url(#revenueGradient)"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', r: 5, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, stroke: '#fff', strokeWidth: 3 }}
                  fill="url(#revenueGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bookings Trend - Glassmorphism Card */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
          <div className="relative backdrop-blur-xl bg-white/80 border border-blue-500/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                  Bookings Trend
                </h3>
                <p className="text-sm text-slate-500">Monthly reservations</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl border border-blue-500/20">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            {/* Chart */}
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={revenueData}>
                <defs>
                  <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={1}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.8}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: '12px', fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    padding: '12px',
                  }}
                  labelStyle={{ color: '#1e293b', fontWeight: 600 }}
                />
                <Legend
                  wrapperStyle={{
                    fontSize: '12px',
                    fontWeight: 600,
                    paddingTop: '16px'
                  }}
                />
                <Bar
                  dataKey="bookings"
                  fill="url(#bookingsGradient)"
                  radius={[12, 12, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
