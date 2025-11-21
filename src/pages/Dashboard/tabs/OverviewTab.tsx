import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  Star,
  Award,
  Sparkles,
  Layers,
  Compass,
  Gift,
  Activity,
} from 'lucide-react';
import { format } from 'date-fns';

const heroStats = [
  {
    label: 'Stay Score',
    value: '96%',
    detail: 'Guest satisfaction in the last 30 days',
    icon: Sparkles,
  },
  {
    label: 'Nights booked',
    value: '3',
    detail: 'Ocean View Suite · Jan 15-18',
    icon: Layers,
  },
  {
    label: 'Loyalty tier',
    value: 'Platinum',
    detail: '3,450 points earned',
    icon: Star,
  },
];

const statCards = [
  {
    label: 'Total Bookings',
    value: '12',
    description: 'Last 30 days',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    label: 'Nights Stayed',
    value: '48',
    description: 'Lifetime',
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    label: 'Loyalty Points',
    value: '2,450',
    description: 'Redeem for experiences',
    icon: Award,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    label: 'Member Since',
    value: '2023',
    description: 'Joined the club',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
];

const experienceHighlights = [
  {
    title: 'Signature breakfast',
    detail: 'Reserving coastal table · 7:30 AM',
    icon: Compass,
  },
  {
    title: 'Daily wellness ritual',
    detail: 'Forest spa infusion · 10:00 AM',
    icon: Gift,
  },
  {
    title: 'Concierge note',
    detail: 'Request for aromatherapy ready',
    icon: Activity,
  },
];

const upcomingBooking = {
  bookingNumber: 'BK-2025-001234',
  roomType: 'Ocean View Suite',
  checkIn: new Date('2025-01-15'),
  checkOut: new Date('2025-01-18'),
  guests: 2,
  nights: 3,
  status: 'confirmed',
};

const recentActivity = [
  { date: new Date('2025-01-10'), action: 'Booking confirmed', details: 'Ocean View Suite · Jan 15-18' },
  { date: new Date('2025-01-05'), action: 'Profile updated', details: 'Updated contact information' },
  { date: new Date('2024-12-20'), action: 'Booking completed', details: 'Deluxe Room · Dec 20-23' },
  { date: new Date('2024-12-15'), action: 'Payment added', details: 'Visa ending in 4242' },
];

export function OverviewTab() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-neutral-200 rounded-xl p-6 bg-white hover:border-neutral-300 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${stat.color}`} strokeWidth={2} />
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-neutral-900 mb-1">{stat.label}</div>
              <div className="text-xs text-neutral-500">{stat.description}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Booking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="border border-neutral-200 rounded-xl p-6 bg-white"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-1">Upcoming Booking</h3>
              <p className="text-sm text-neutral-500">Confirmed</p>
            </div>
            <span className="text-xs font-medium text-neutral-500 uppercase">
              {upcomingBooking.status}
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between py-3 border-b border-neutral-100">
              <span className="text-sm text-neutral-500">Booking Number</span>
              <span className="text-sm font-medium text-neutral-900">{upcomingBooking.bookingNumber}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-100">
              <span className="text-sm text-neutral-500">Room Type</span>
              <span className="text-sm font-medium text-neutral-900">{upcomingBooking.roomType}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-100">
              <span className="text-sm text-neutral-500">Check-in</span>
              <span className="text-sm font-medium text-neutral-900">
                {format(upcomingBooking.checkIn, 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex justify-between py-3 border-b border-neutral-100">
              <span className="text-sm text-neutral-500">Check-out</span>
              <span className="text-sm font-medium text-neutral-900">
                {format(upcomingBooking.checkOut, 'MMM dd, yyyy')}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-sm text-neutral-500">Guests</span>
              <span className="text-sm font-medium text-neutral-900">
                {upcomingBooking.guests} guests · {upcomingBooking.nights} nights
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-primary-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              View Details
            </button>
            <button className="flex-1 border border-neutral-300 text-neutral-900 px-4 py-2.5 rounded-lg text-sm font-medium hover:border-neutral-400 transition-colors">
              Modify Booking
            </button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="border border-neutral-200 rounded-xl p-6 bg-white"
        >
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Recent Activity</h3>

          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-neutral-600" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 mb-1">{activity.action}</p>
                  <p className="text-sm text-neutral-500 mb-1">{activity.details}</p>
                  <p className="text-xs text-neutral-400">
                    {format(activity.date, 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
