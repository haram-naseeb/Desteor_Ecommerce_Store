import { Send } from 'lucide-react';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

function Newsletter() {
  return (
    <section className="bg-matte-black px-6 py-16 text-ivory-white md:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
            Private Notes
          </p>
          <h2 className="mt-3 text-3xl md:text-4xl">Join the DESTEOR circle</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ivory-white/68">
            Receive new arrivals, styling notes, and early access announcements before they are public.
          </p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
          <Input
            id="newsletter-email"
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            className="border-ivory-white/20 bg-ivory-white text-matte-black"
          />
          <Button type="submit" variant="secondary" className="gap-2">
            <Send className="h-4 w-4" aria-hidden="true" />
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
