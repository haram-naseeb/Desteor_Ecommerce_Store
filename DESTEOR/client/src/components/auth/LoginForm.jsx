import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import AuthFormHeader from '@/components/auth/AuthFormHeader';
import FormAlert from '@/components/auth/FormAlert';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setFormError('');
    setSuccess('');

    try {
      await login(values);
      setSuccess('Welcome back to DESTEOR.');
      const redirectTo = `${location.state?.from?.pathname || ROUTES.HOME}${
        location.state?.from?.search || ''
      }`;
      navigate(redirectTo, {
        replace: true,
        state: location.state?.pendingCartItem
          ? { pendingCartItem: location.state.pendingCartItem }
          : undefined,
      });
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthFormHeader
        eyebrow="Welcome Back"
        title="Login"
        description="Access your DESTEOR account for future checkout and order experiences."
      />
      <FormAlert>{formError}</FormAlert>
      <FormAlert type="success">{success}</FormAlert>
      <div className="space-y-5">
        <Input
          id="email"
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required.' })}
        />
        <PasswordInput
          id="password"
          label="Password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required.' })}
        />
      </div>
      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-2 text-matte-black/62">
          <input type="checkbox" className="accent-champagne-gold" />
          Remember me
        </label>
        <Link to={ROUTES.FORGOT_PASSWORD} className="text-matte-black hover:text-champagne-gold">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" variant="secondary" className="mt-7 w-full rounded-none" disabled={isSubmitting}>
        {isSubmitting ? <Loader size="sm" label="Logging in" /> : 'Login'}
      </Button>
      <p className="mt-6 text-center text-sm text-matte-black/62">
        New to DESTEOR?{' '}
        <Link to={ROUTES.REGISTER} className="font-semibold text-matte-black hover:text-champagne-gold">
          Create an account
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
