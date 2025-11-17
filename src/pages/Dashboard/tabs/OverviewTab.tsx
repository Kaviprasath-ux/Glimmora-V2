import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, ArrowRight, TrendingUp, Star, Award } from 'lucide-react';
import { format } from 'date-fns';

export function OverviewTab() {
  // Mock data
  const upcomingBooking = {
    bookingNumber: 'BK-2025-001234',
    roomType: 'Ocean View Suite',
    checkIn: new Date('2025-01-15'),
    checkOut: new Date('2025-01-18'),
    guests: 2,
    status: 'confirmed',
  };

  const stats = [
    { label: 'Total Bookings', value: '12', icon: Calendar, color: 'primary' },
    { label: 'Nights Stayed', value: '48', icon: Clock, color: 'green' },
    { label: 'Loyalty Points', value: '2,450', icon: Star, color: 'yellow' },
    { label: 'Member Since', value: '2023', icon: Award, color: 'blue' },
  ];

  const recentActivity = [
    { date: new Date('2025-01-10'), action: 'Booking confirmed', details: 'Ocean View Suite - Jan 15-18' },
    { date: new Date('2025-01-05'), action: 'Profile updated', details: 'Updated contact information' },
    { date: new Date('2024-12-20'), action: 'Booking completed', details: 'Deluxe Room - Dec 20-23' },
    { date: new Date('2024-12-15'), action: 'Payment added', details: 'Added Visa ending in 4242' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-3xl p-8"
      >
        <h2 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h2>
        <p className="text-white/90 text-lg">
          You have 1 upcoming booking. We're excited to host you again!
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            primary: 'bg-primary-100 text-primary-600',
            green: 'bg-green-100 text-green-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            blue: 'bg-blue-100 text-blue-600',
          }[stat.color];

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className={`w-12 h-12 ${colorClasses} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Upcoming Booking */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-neutral-900">Upcoming Booking</h3>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
            Confirmed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="text-sm text-neutral-600 mb-1">Booking Number</div>
            <div className="font-semibold text-neutral-900">{upcomingBooking.bookingNumber}</div>
          </div>
          <div>
            <div className="text-sm text-neutral-600 mb-1">Room Type</div>
            <div className="font-semibold text-neutral-900">{upcomingBooking.roomType}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-xl mb-6">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
            <div>
              <div className="text-sm text-neutral-600">Check-in</div>
              <div className="font-semibold text-neutral-900">
                {format(upcomingBooking.checkIn, 'MMM dd, yyyy')}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
            <div>
              <div className="text-sm text-neutral-600">Check-out</div>
              <div className="font-semibold text-neutral-900">
                {format(upcomingBooking.checkOut, 'MMM dd, yyyy')}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-primary-600 mt-0.5" />
            <div>
              <div className="text-sm text-neutral-600">Guests</div>
              <div className="font-semibold text-neutral-900">{upcomingBooking.guests} Adults</div>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            <MapPin className="w-5 h-5" />
            View Details
          </button>
          <button className="flex-1 py-3 bg-white border-2 border-neutral-300 hover:border-primary-500 text-neutral-900 font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
            Start Pre-Check-In
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          <h3 className="text-2xl font-bold text-neutral-900">Recent Activity</h3>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-4 pb-4 border-b border-neutral-200 last:border-0">
              <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-neutral-900 mb-1">{activity.action}</div>
                <div className="text-sm text-neutral-600 mb-1">{activity.details}</div>
                <div className="text-xs text-neutral-500">
                  {format(activity.date, 'MMM dd, yyyy')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
