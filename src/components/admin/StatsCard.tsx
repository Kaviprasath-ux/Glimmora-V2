import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  color: string;
}

export function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  const isPositive = change >= 0;

  const colorConfig = {
    primary: {
      gradient: 'from-blue-500 via-purple-500 to-pink-500',
      glow: 'shadow-[0_0_40px_rgba(139,92,246,0.15)]',
      iconBg: 'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-600',
      border: 'border-purple-500/20',
    },
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      glow: 'shadow-[0_0_40px_rgba(59,130,246,0.15)]',
      iconBg: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
      iconColor: 'text-blue-600',
      border: 'border-blue-500/20',
    },
    green: {
      gradient: 'from-green-500 to-emerald-500',
      glow: 'shadow-[0_0_40px_rgba(34,197,94,0.15)]',
      iconBg: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
      iconColor: 'text-green-600',
      border: 'border-green-500/20',
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      glow: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]',
      iconBg: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
      iconColor: 'text-purple-600',
      border: 'border-purple-500/20',
    },
  };

  const config = colorConfig[color as keyof typeof colorConfig] || colorConfig.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      {/* Glow Effect on Hover */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${config.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

      {/* Card */}
      <div className={`relative backdrop-blur-xl bg-white/80 border ${config.border} rounded-2xl p-6 shadow-lg ${config.glow} hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
        {/* Ambient Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-3xl -translate-y-16 translate-x-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            {/* Icon with Modern Background */}
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className={`p-4 rounded-2xl ${config.iconBg} backdrop-blur-sm border border-white/50 shadow-lg`}
            >
              <Icon className={`w-6 h-6 ${config.iconColor}`} />
            </motion.div>

            {/* Change Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`px-3 py-1.5 rounded-xl backdrop-blur-sm border text-xs font-bold tracking-wide ${
                isPositive
                  ? 'bg-green-500/10 border-green-500/30 text-green-700'
                  : 'bg-red-500/10 border-red-500/30 text-red-700'
              }`}
            >
              {isPositive ? '↑' : '↓'} {Math.abs(change)}%
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-slate-600 text-sm font-medium mb-2 uppercase tracking-wider">
            {title}
          </h3>

          {/* Value with Gradient */}
          <p className={`text-4xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>
            {value}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
