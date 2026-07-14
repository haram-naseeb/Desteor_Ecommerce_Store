import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { ROUTES } from '@/constants/routes';

function NotFound() {
  return (
    <section className="grid min-h-[calc(100vh-73px)] place-items-center bg-matte-black px-6 py-20 text-center text-ivory-white">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-champagne-gold">
          404
        </p>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl leading-tight md:text-6xl">
          This page could not be found
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-ivory-white/68 md:text-base">
          The route may be outdated, but the storefront is still ready for a
          graceful return.
        </p>
        <Link to={ROUTES.HOME} className="mt-8 inline-block">
          <Button variant="secondary" size="lg">
            Return Home
          </Button>
        </Link>
      </Container>
    </section>
  );
}

export default NotFound;
