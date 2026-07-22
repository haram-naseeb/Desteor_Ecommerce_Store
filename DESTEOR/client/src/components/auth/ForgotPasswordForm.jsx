import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import AuthFormHeader from '@/components/auth/AuthFormHeader';
import FormAlert from '@/components/auth/FormAlert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { requestPasswordReset } from '@/services/auth.service';

function ForgotPasswordForm() {
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState('');
  const [devToken, setDevToken] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ email }) => {
    setFormError('');
    setSuccess('');
    setDevToken('');

    try {
      const response = await requestPasswordReset(email);
      setSuccess(response.message);
      setDevToken(response.data?.resetToken || '');
    } catch (error) {
      setFormError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthFormHeader
        eyebrow="Account Recovery"
        title="Forgot Password"
        description="Enter your email to prepare a secure reset token. Email delivery will arrive in a later sprint."
      />
      <FormAlert>{formError}</FormAlert>
      <FormAlert type="success">{success}</FormAlert>
      {devToken && (
        <div className="mb-5 border border-champagne-gold/30 bg-champagne-gold/10 p-4 text-xs leading-6 text-matte-black">
          <p className="font-semibold uppercase tracking-[0.18em]">Development Reset Token</p>
          <p className="mt-2 break-all">{devToken}</p>
        </div>
      )}
      <Input
        id="email"
        label="Email"
        hideLabel
        placeholder="Email address"
        type="email"
        error={errors.email?.message}
        {...register('email', { required: 'Email is required.' })}
      />
      <Button type="submit" variant="secondary" className="mt-7 w-full" disabled={isSubmitting}>
        {isSubmitting ? <Loader size="sm" label="Preparing reset" /> : 'Prepare Reset'}
      </Button>
      <p className="mt-6 text-center text-sm text-matte-black/62">
        Remembered it?{' '}
        <Link to={ROUTES.LOGIN} className="font-semibold text-matte-black hover:text-champagne-gold">
          Return to login
        </Link>
      </p>
    </form>
  );
}

export default ForgotPasswordForm;
