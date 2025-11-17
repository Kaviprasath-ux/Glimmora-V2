import { useAdmin } from '@/contexts/AdminContext';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export function AnalyticsTab() {
  const { revenueData, roomTypeData } = useAdmin();

  const performanceData = [
    { metric: 'Bookings', current: 342, previous: 316 },
    { metric: 'Revenue', current: 487250, previous: 432800 },
    { metric: 'Occupancy', current: 87.5, previous: 83.2 },
    { metric: 'Guests', current: 1248, previous: 1086 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Analytics</h1>
        <p className="text-neutral-600">Detailed insights and performance metrics</p>
      </div>

      {/* Revenue Trend - Full Width */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-neutral-900">Revenue & Bookings Trend</h3>
          <p className="text-sm text-neutral-500 mt-1">Monthly performance over the year</p>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{ fill: '#7c3aed', r: 5 }}
              activeDot={{ r: 7 }}
              name="Revenue ($)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="bookings"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 5 }}
              activeDot={{ r: 7 }}
              name="Bookings"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Type Revenue */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-neutral-900">Revenue by Room Type</h3>
            <p className="text-sm text-neutral-500 mt-1">Distribution across room categories</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={roomTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) =>
                  `${entry.type} ${((entry.percent || 0) * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="revenue"
              >
                {roomTypeData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `$${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Comparison */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-neutral-900">Performance Comparison</h3>
            <p className="text-sm text-neutral-500 mt-1">Current vs previous period</p>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="metric" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="previous" fill="#94a3b8" radius={[8, 8, 0, 0]} name="Previous" />
              <Bar dataKey="current" fill="#7c3aed" radius={[8, 8, 0, 0]} name="Current" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Room Type Stats Table */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-neutral-900">Room Type Statistics</h3>
          <p className="text-sm text-neutral-500 mt-1">Detailed breakdown by room category</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Room Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Total Bookings
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Avg Revenue/Booking
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {roomTypeData.map((room, index) => (
                <tr key={room.type} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span className="text-sm font-semibold text-neutral-900">
                        {room.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {room.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-neutral-900">
                    ${room.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    ${(room.revenue / room.count).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
