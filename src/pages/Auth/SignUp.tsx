import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button, Input, Card } from '@/components/ui';
import { FormError } from '@/components/forms/FormError';
import { useAuth } from '@/hooks';
import { signupSchema, SignupFormData } from '@/utils/validation';
import { ROUTES } from '@/config/constants';

export const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setApiError(null);
      const { confirmPassword, ...signupData } = data;
      await signup(signupData);
      toast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed. Please try again.';
      setApiError(message);
      toast.error(message);
    }
  };

  return (
    <Card padding="lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 mb-2">
          Create Account
        </h1>
        <p className="text-neutral-600">Sign up to start booking your stay</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormError message={apiError} />

        <Input
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          leftIcon={<User size={18} />}
          error={errors.fullName?.message}
          {...register('fullName')}
          fullWidth
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          leftIcon={<Mail size={18} />}
          error={errors.email?.message}
          {...register('email')}
          fullWidth
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          leftIcon={<Phone size={18} />}
          error={errors.phone?.message}
          helperText="Optional - Include country code"
          {...register('phone')}
          fullWidth
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          leftIcon={<Lock size={18} />}
          error={errors.password?.message}
          helperText="At least 8 characters with uppercase, lowercase, number and special character"
          {...register('password')}
          fullWidth
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          leftIcon={<Lock size={18} />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
          fullWidth
          required
        />

        <div className="text-sm text-neutral-600">
          <label className="flex items-start">
            <input
              type="checkbox"
              required
              className="h-4 w-4 mt-0.5 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
            />
            <span className="ml-2">
              I agree to the{' '}
              <Link
                to="/terms"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Create Account
        </Button>

        <p className="text-center text-sm text-neutral-600">
          Already have an account?{' '}
          <Link
            to={ROUTES.LOGIN}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Card>
  );
};
