import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Input, Card } from '@/components/ui';
import { FormError } from '@/components/forms/FormError';
import { useAuth } from '@/hooks';
import { loginSchema, LoginFormData } from '@/utils/validation';
import { ROUTES } from '@/config/constants';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [apiError, setApiError] = useState<string | undefined>(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setApiError(undefined);
      await login(data);
      toast.success('Login successful!');
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      setApiError(message);
      toast.error(message);
    }
  };

  return (
    <Card padding="lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-neutral-600">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormError message={apiError} />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          leftIcon={<Mail size={18} />}
          error={errors.email?.message}
          {...register('email')}
          fullWidth
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          leftIcon={<Lock size={18} />}
          error={errors.password?.message}
          {...register('password')}
          fullWidth
        />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-neutral-700 cursor-pointer"
            >
              Remember me
            </label>
          </div>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Sign In
        </Button>

        <p className="text-center text-sm text-neutral-600">
          Don't have an account?{' '}
          <Link
            to={ROUTES.SIGNUP}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Card>
  );
};
