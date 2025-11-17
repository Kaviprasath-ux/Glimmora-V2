import { motion } from 'framer-motion';
import { Download, TrendingUp, DollarSign, Users, Percent } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function AnalyticsTab() {
  // Enhanced mock data
  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000, bookings: 120, avgRate: 375 },
    { month: 'Feb', revenue: 52000, bookings: 145, avgRate: 359 },
    { month: 'Mar', revenue: 48000, bookings: 130, avgRate: 369 },
    { month: 'Apr', revenue: 61000, bookings: 168, avgRate: 363 },
    { month: 'May', revenue: 72000, bookings: 195, avgRate: 369 },
    { month: 'Jun', revenue: 85000, bookings: 220, avgRate: 386 },
  ];

  const occupancyTrend = [
    { month: 'Jan', occupancy: 72 },
    { month: 'Feb', occupancy: 78 },
    { month: 'Mar', occupancy: 75 },
    { month: 'Apr', occupancy: 82 },
    { month: 'May', occupancy: 88 },
    { month: 'Jun', occupancy: 92 },
  ];

  const roomTypeRevenue = [
    { type: 'Standard', value: 25000, percentage: 20, bookings: 85 },
    { type: 'Deluxe', value: 35000, percentage: 28, bookings: 65 },
    { type: 'Ocean View', value: 42000, percentage: 33, bookings: 55 },
    { type: 'Executive', value: 24000, percentage: 19, bookings: 30 },
  ];

  const dailyRevenue = [
    { day: 'Mon', revenue: 3200 },
    { day: 'Tue', revenue: 4100 },
    { day: 'Wed', revenue: 3800 },
    { day: 'Thu', revenue: 5200 },
    { day: 'Fri', revenue: 6100 },
    { day: 'Sat', revenue: 7800 },
    { day: 'Sun', revenue: 7200 },
  ];

  const COLORS = ['#0052CC', '#22C55E', '#EAB308', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Analytics & Reports</h1>
          <p className="text-neutral-600">Performance insights and metrics</p>
        </div>
        <button className="px-6 py-3 border-2 border-neutral-300 hover:border-primary-500 text-neutral-900 font-semibold rounded-xl transition-all flex items-center gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-sm text-neutral-600">Avg Daily Rate</div>
          </div>
          <div className="text-3xl font-bold text-neutral-900">$385</div>
          <div className="text-sm text-green-600 font-medium mt-1">↑ 12% vs last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-sm text-neutral-600">Revenue/Room</div>
          </div>
          <div className="text-3xl font-bold text-neutral-900">$1,260</div>
          <div className="text-sm text-green-600 font-medium mt-1">↑ 8% vs last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-sm text-neutral-600">Total Guests</div>
          </div>
          <div className="text-3xl font-bold text-neutral-900">978</div>
          <div className="text-sm text-green-600 font-medium mt-1">↑ 15% vs last month</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Percent className="w-5 h-5 text-yellow-600" />
            </div>
            <div className="text-sm text-neutral-600">Occupancy Rate</div>
          </div>
          <div className="text-3xl font-bold text-neutral-900">82%</div>
          <div className="text-sm text-green-600 font-medium mt-1">↑ 5% vs last month</div>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0052CC" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0052CC" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#0052CC" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Occupancy Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Occupancy Rate Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="occupancy" stroke="#22C55E" strokeWidth={3} name="Occupancy %" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Weekly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0052CC" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Room Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-bold text-neutral-900 mb-4">Revenue by Room Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roomTypeRevenue}
                dataKey="value"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => `${entry.percent?.toFixed(0)}%`}
              >
                {roomTypeRevenue.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Room Type Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Room Type Performance</h3>
        <div className="space-y-4">
          {roomTypeRevenue.map((room, index) => (
            <div key={room.type}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-neutral-900">{room.type}</span>
                  <span className="text-xs text-neutral-600">{room.bookings} bookings</span>
                </div>
                <span className="text-sm font-bold text-primary-600">${room.value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${room.percentage}%`,
                    backgroundColor: COLORS[index]
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Monthly Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h3 className="text-lg font-bold text-neutral-900 mb-4">Monthly Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#999" />
            <YAxis stroke="#999" />
            <Tooltip />
            <Legend />
            <Bar dataKey="bookings" fill="#22C55E" radius={[8, 8, 0, 0]} name="Bookings" />
            <Bar dataKey="avgRate" fill="#EAB308" radius={[8, 8, 0, 0]} name="Avg Rate ($)" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
