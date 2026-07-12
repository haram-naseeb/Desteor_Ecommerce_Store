import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';

import Button from '@/components/ui/Button';

function EmptyState({ title = 'Nothing here yet', description, actionLabel, actionTo, icon: Icon = FiPackage }) {
  return <div className="rounded-2xl border border-matte-black/10 bg-white/70 px-6 py-12 text-center shadow-subtle backdrop-blur-sm"><div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-champagne-gold/10 text-champagne-gold"><Icon className="text-2xl" aria-hidden="true" /></div><h2 className="mt-4 font-heading text-2xl text-matte-black">{title}</h2>{description && <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-matte-black/60">{description}</p>}{actionLabel && actionTo && <Link to={actionTo} className="mt-6 inline-block"><Button variant="secondary">{actionLabel}</Button></Link>}</div>;
}

export default EmptyState;
