import Container from '@/components/ui/Container';
import { useAuth } from '@/hooks/useAuth';

function Profile() {
  const { currentUser } = useAuth();

  return (
    <Container className="py-16 md:py-24">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
          Profile
        </p>
        <h1 className="mt-4 text-4xl text-matte-black md:text-5xl">
          {currentUser?.firstName} {currentUser?.lastName}
        </h1>
        <p className="mt-5 leading-8 text-matte-black/65">
          Your DESTEOR account is ready for authenticated purchase flows as checkout
          arrives in a future sprint.
        </p>
      </div>

      <dl className="mt-10 grid gap-4 border-y border-matte-black/10 py-8 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-semibold text-matte-black">Email</dt>
          <dd className="mt-2 text-sm text-matte-black/64">{currentUser?.email}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold text-matte-black">Role</dt>
          <dd className="mt-2 text-sm text-matte-black/64">{currentUser?.role}</dd>
        </div>
      </dl>
    </Container>
  );
}

export default Profile;
