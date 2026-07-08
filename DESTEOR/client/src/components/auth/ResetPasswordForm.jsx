import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';

import AuthFormHeader from '@/components/auth/AuthFormHeader';
import FormAlert from '@/components/auth/FormAlert';
import PasswordInput from '@/components/auth/PasswordInput';
import Button from '@/components/ui/Button';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { resetPassword } from '@/services/auth.service';

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setFormError('');
    setSuccess('');

    try {
      const response = await resetPassword(token, values);
      setSuccess(response.message);
      window.setTimeout(() => navigate(ROUTES.LOGIN, { replace: true }), 900);
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthFormHeader
        eyebrow="Secure Reset"
        title="Reset Password"
        description="Choose a new password with the required strength rules."
      />
      <FormAlert>{formError}</FormAlert>
      <FormAlert type="success">{success}</FormAlert>
      <div className="space-y-5">
        <PasswordInput
          id="password"
          label="New Password"
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
          label="Confirm New Password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Confirm password is required.',
            validate: (value) => value === watch('password') || 'Passwords do not match.',
          })}
        />
      </div>
      <Button type="submit" variant="secondary" className="mt-7 w-full rounded-none" disabled={isSubmitting}>
        {isSubmitting ? <Loader size="sm" label="Resetting password" /> : 'Reset Password'}
      </Button>
      <p className="mt-6 text-center text-sm text-matte-black/62">
        <Link to={ROUTES.LOGIN} className="font-semibold text-matte-black hover:text-champagne-gold">
          Back to login
        </Link>
      </p>
    </form>
  );
}

export default ResetPasswordForm;
