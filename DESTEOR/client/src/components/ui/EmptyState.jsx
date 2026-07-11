import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';

import Button from '@/components/ui/Button';

function EmptyState({ title = 'Nothing here yet', description, actionLabel, actionTo, icon: Icon = FiPackage }) {
  return <div className="border border-matte-black/10 bg-white/50 px-6 py-12 text-center"><Icon className="mx-auto text-3xl text-champagne-gold" aria-hidden="true" /><h2 className="mt-4 font-heading text-2xl text-matte-black">{title}</h2>{description && <p className="mx-auto mt-3 max-w-md text-sm text-matte-black/60">{description}</p>}{actionLabel && actionTo && <Link to={actionTo} className="mt-6 inline-block"><Button variant="secondary" className="rounded-none">{actionLabel}</Button></Link>}</div>;
}

export default EmptyState;
