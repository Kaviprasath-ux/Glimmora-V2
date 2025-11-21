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
    <div className="max-w-4xl space-y-6">
      {/* Change Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-neutral-200 rounded-xl p-6 bg-white"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Change Password</h3>

        <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Current Password
            </label>
            <input
              {...register('currentPassword')}
              type="password"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
              placeholder="Enter current password"
            />
            {errors.currentPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              New Password
            </label>
            <input
              {...register('newPassword')}
              type="password"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>
            )}
            <p className="mt-1 text-xs text-neutral-500">
              Must be at least 8 characters long
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Confirm New Password
            </label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
              placeholder="Confirm new password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Save className="w-4 h-4" />
              Update Password
            </button>
          </div>
        </form>
      </motion.div>

      {/* Two-Factor Authentication */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-neutral-200 rounded-xl p-6 bg-white"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Two-Factor Authentication</h3>

        <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-lg mb-4">
          <Smartphone className="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-medium text-neutral-900 mb-1 text-sm">Authenticator App</h4>
            <p className="text-xs text-neutral-600 mb-3">
              Add an extra layer of security to your account by enabling two-factor authentication using an authenticator app.
            </p>
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs font-medium rounded">
                Not Enabled
              </span>
              <button
                onClick={handleEnable2FA}
                className="text-xs text-primary-600 hover:text-primary-700 font-medium"
              >
                Enable 2FA →
              </button>
            </div>
          </div>
        </div>

        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900">
            <strong>🔒 Recommended:</strong> Enable 2FA to protect your account from unauthorized access, even if your password is compromised.
          </p>
        </div>
      </motion.div>

      {/* Active Sessions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border border-neutral-200 rounded-xl p-6 bg-white"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Active Sessions</h3>

        <div className="space-y-3">
          {activeSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.25 }}
              className="p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h4 className="font-medium text-neutral-900 text-sm">{session.device}</h4>
                    {session.current && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                        CURRENT
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{session.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        Last active: {session.current ? 'Now' : format(session.lastActive, 'MMM dd, yyyy HH:mm')}
                      </span>
                    </div>
                  </div>
                </div>

                {!session.current && (
                  <button
                    onClick={handleTerminateSession}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 font-medium rounded-lg transition-colors text-xs"
                  >
                    Terminate
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-xs text-yellow-900">
            <strong>⚠️ Notice:</strong> If you see any suspicious activity or unfamiliar devices, terminate the session immediately and change your password.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
