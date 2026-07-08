import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

import PageHero from '@/components/storefront/PageHero';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = () => {};

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Begin a conversation with DESTEOR"
        description="Ask about styling, availability, bridal appointments, or care guidance. This Sprint 2 form is frontend-only."
        image="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1800&q=80"
      />

      <Container className="grid gap-10 py-12 md:py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          className="border border-matte-black/10 bg-white p-6 md:p-8"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
            Send a Note
          </p>
          <h2 className="mt-3 text-3xl text-matte-black">Contact Form</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Input
              id="name"
              label="Name"
              error={errors.name?.message}
              {...register('name', { required: 'Name is required' })}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Enter a valid email',
                },
              })}
            />
            <Input
              id="phone"
              label="Phone"
              className="sm:col-span-2"
              {...register('phone')}
            />
            <div className="flex w-full flex-col gap-1.5 sm:col-span-2">
              <label htmlFor="message" className="text-sm font-medium text-matte-black/80">
                Message
              </label>
              <textarea
                id="message"
                rows="6"
                className="w-full rounded-md border border-matte-black/20 bg-ivory-white px-4 py-3 text-sm text-matte-black placeholder:text-matte-black/40 focus:outline-none focus:ring-2 focus:ring-champagne-gold"
                {...register('message', { required: 'Message is required' })}
              />
              {errors.message && (
                <span className="text-xs text-red-500">{errors.message.message}</span>
              )}
            </div>
          </div>
          <Button type="submit" variant="secondary" className="mt-6 rounded-none">
            Send Message
          </Button>
          {isSubmitSuccessful && (
            <p className="mt-4 text-sm text-matte-black/60">
              Thank you. This frontend preview captured the interaction state.
            </p>
          )}
        </form>

        <aside className="space-y-6">
          <div className="border border-matte-black/10 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
              Company Information
            </p>
            <div className="mt-6 space-y-5 text-sm text-matte-black/68">
              <p className="flex gap-3">
                <FiMapPin className="mt-1 text-champagne-gold" aria-hidden="true" />
                Lahore, Pakistan
              </p>
              <p className="flex gap-3">
                <FiMail className="mt-1 text-champagne-gold" aria-hidden="true" />
                hello@desteor.com
              </p>
              <p className="flex gap-3">
                <FiPhone className="mt-1 text-champagne-gold" aria-hidden="true" />
                +92 300 000 0000
              </p>
            </div>
          </div>
          <div className="grid min-h-80 place-items-center border border-matte-black/10 bg-matte-black p-6 text-center text-ivory-white">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
                Google Maps
              </p>
              <p className="mt-4 text-2xl font-heading">Map Placeholder</p>
              <p className="mt-3 text-sm leading-7 text-ivory-white/62">
                Embedded location map will be connected when the production
                store details are finalized.
              </p>
            </div>
          </div>
        </aside>
      </Container>
    </>
  );
}

export default Contact;
