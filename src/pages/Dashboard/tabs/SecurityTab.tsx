import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Shield, Smartphone, Monitor, MapPin, Clock, Save } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

interface ActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: Date;
  current: boolean;
}

export function SecurityTab() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const activeSessions: ActiveSession[] = [
    {
      id: '1',
      device: 'Chrome on MacBook Pro',
      location: 'Miami, Florida',
      lastActive: new Date(),
      current: true,
    },
    {
      id: '2',
      device: 'Safari on iPhone 14',
      location: 'Miami, Florida',
      lastActive: new Date(Date.now() - 3600000),
      current: false,
    },
    {
      id: '3',
      device: 'Chrome on Windows',
      location: 'New York, NY',
      lastActive: new Date(Date.now() - 86400000 * 2),
      current: false,
    },
  ];

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log('Password change:', data);
    toast.success('Password changed successfully!');
    reset();
  };

  const handleTerminateSession = () => {
    toast.success('Session terminated successfully!');
  };

  const handleEnable2FA = () => {
    toast.success('2FA setup feature coming soon!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Security Settings</h2>
        <p className="text-neutral-600">Manage your account security and active sessions</p>
      </motion.div>

      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold text-neutral-900">Change Password</h3>
        </div>

        <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Current Password *
            </label>
            <input
              {...register('currentPassword')}
              type="password"
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
              placeholder="Enter current password"
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              New Password *
            </label>
            <input
              {...register('newPassword')}
              type="password"
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
            )}
            <p className="mt-1 text-sm text-neutral-600">
              Must be at least 8 characters long
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Confirm New Password *
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition-all"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Update Password
          </button>
        </form>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold text-neutral-900">Two-Factor Authentication</h3>
        </div>

        <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl mb-6">
          <Smartphone className="w-6 h-6 text-neutral-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-neutral-900 mb-2">Authenticator App</h4>
            <p className="text-sm text-neutral-600 mb-4">
              Add an extra layer of security to your account by enabling two-factor authentication using an authenticator app.
            </p>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                Not Enabled
              </span>
              <button
                onClick={handleEnable2FA}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Enable 2FA →
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>🔒 Recommended:</strong> Enable 2FA to protect your account from unauthorized access, even if your password is compromised.
          </p>
        </div>
      </motion.div>

      {/* Active Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Monitor className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold text-neutral-900">Active Sessions</h3>
        </div>

        <div className="space-y-4">
          {activeSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="p-6 border-2 border-neutral-200 rounded-xl hover:border-primary-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-semibold text-neutral-900">{session.device}</h4>
                    {session.current && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        CURRENT
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <MapPin className="w-4 h-4" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        Last active: {session.current ? 'Now' : format(session.lastActive, 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>

                {!session.current && (
                  <button
                    onClick={handleTerminateSession}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 font-semibold rounded-lg transition-all"
                  >
                    Terminate
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-900">
            <strong>⚠️ Notice:</strong> If you see any suspicious activity or unfamiliar devices, terminate the session immediately and change your password.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
