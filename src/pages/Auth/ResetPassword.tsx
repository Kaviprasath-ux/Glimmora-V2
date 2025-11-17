import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Input, Card } from '@/components/ui';
import { FormError } from '@/components/forms/FormError';
import { resetPasswordSchema, ResetPasswordFormData } from '@/utils/validation';
import { ROUTES } from '@/config/constants';
import { apiClient } from '@/api/client';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [apiError, setApiError] = useState<string | undefined>(undefined);
  const [resetSuccess, setResetSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setApiError('Invalid or missing reset token');
      return;
    }

    try {
      setApiError(undefined);
      await apiClient.post('/auth/reset-password', {
        token,
        password: data.password,
      });
      setResetSuccess(true);
      toast.success('Password reset successful!');
      setTimeout(() => navigate(ROUTES.LOGIN), 3000);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Failed to reset password. Please try again.';
      setApiError(message);
      toast.error(message);
    }
  };

  if (!token) {
    return (
      <Card padding="lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Invalid Reset Link
          </h1>
          <p className="text-neutral-600 mb-6">
            This password reset link is invalid or has expired.
          </p>
          <Link to={ROUTES.FORGOT_PASSWORD}>
            <Button fullWidth>Request New Reset Link</Button>
          </Link>
        </div>
      </Card>
    );
  }

  if (resetSuccess) {
    return (
      <Card padding="lg">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Password Reset Successfully!
          </h1>
          <p className="text-neutral-600 mb-6">
            Your password has been reset. Redirecting to login...
          </p>
          <Link to={ROUTES.LOGIN}>
            <Button fullWidth>Go to Login</Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Reset Your Password
        </h1>
        <p className="text-neutral-600">
          Enter your new password below
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormError message={apiError} />

        <Input
          label="New Password"
          type="password"
          placeholder="Enter new password"
          leftIcon={<Lock size={18} />}
          error={errors.password?.message}
          helperText="At least 8 characters with uppercase, lowercase, and number"
          {...register('password')}
          fullWidth
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          leftIcon={<Lock size={18} />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
          fullWidth
          required
        />

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Reset Password
        </Button>
      </form>
    </Card>
  );
};
