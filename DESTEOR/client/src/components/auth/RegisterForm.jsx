import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import AuthFormHeader from '@/components/auth/AuthFormHeader';
import FormAlert from '@/components/auth/FormAlert';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function RegisterForm() {
  const navigate = useNavigate();
  const { register: registerAccount } = useAuth();
  const [formError, setFormError] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setFormError('');

    try {
      await registerAccount(values);
      navigate(ROUTES.HOME, { replace: true });
    } catch (error) {
      if (error.errors) {
        Object.entries(error.errors).forEach(([field, message]) => {
          setError(field, {
            type: 'server',
            message: Array.isArray(message) ? message.join(' ') : message,
          });
        });
      }
      setFormError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthFormHeader
        eyebrow="Join DESTEOR"
        title="Create Account"
        description="Create your customer account now; checkout access will use it in future sprints."
      />
      <FormAlert>{formError}</FormAlert>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          id="firstName"
          label="First Name"
          error={errors.firstName?.message}
          {...register('firstName', { required: 'First name is required.' })}
        />
        <Input
          id="lastName"
          label="Last Name"
          error={errors.lastName?.message}
          {...register('lastName', { required: 'Last name is required.' })}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          className="sm:col-span-2"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required.' })}
        />
        <PasswordInput
          id="password"
          label="Password"
          className="sm:col-span-2"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required.',
            pattern: {
              value: passwordPattern,
              message:
                'Use 8+ characters with uppercase, lowercase, number, and special character.',
            },
          })}
        />
        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          className="sm:col-span-2"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Confirm password is required.',
            validate: (value) => value === watch('password') || 'Passwords do not match.',
          })}
        />
      </div>
      <Button type="submit" variant="secondary" className="mt-7 w-full rounded-none" disabled={isSubmitting}>
        {isSubmitting ? <Loader size="sm" label="Creating account" /> : 'Create Account'}
      </Button>
      <p className="mt-6 text-center text-sm text-matte-black/62">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-semibold text-matte-black hover:text-champagne-gold">
          Login
        </Link>
      </p>
    </form>
  );
}

export default RegisterForm;
