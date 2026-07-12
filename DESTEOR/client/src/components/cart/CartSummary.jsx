import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { formatPrice } from '@/utils/format';

function SummaryLine({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm text-matte-black/68">
      <span>{label}</span>
      <span className="font-semibold text-matte-black">{value}</span>
    </div>
  );
}

function CartSummary({ summary, disabled }) {
  const navigate = useNavigate();

  return (
    <aside className="h-fit rounded-2xl border border-matte-black/10 bg-white/90 p-6 shadow-subtle">
      <h2 className="font-heading text-2xl text-matte-black">Cart Summary</h2>
      <div className="mt-6 space-y-4">
        <SummaryLine label="Items" value={summary.totalItems} />
        <SummaryLine label="Subtotal" value={formatPrice(summary.subtotal)} />
        <SummaryLine label="Estimated shipping" value="Calculated at checkout" />
        <SummaryLine label="Estimated tax" value="Calculated at checkout" />
      </div>
      <div className="mt-6 border-t border-matte-black/10 pt-5">
        <div className="flex items-center justify-between gap-4 text-base font-semibold text-matte-black">
          <span>Estimated total</span>
          <span>{formatPrice(summary.estimatedTotal)}</span>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="mt-6 w-full"
        disabled={disabled || summary.totalItems < 1}
        onClick={() => navigate(ROUTES.CHECKOUT)}
      >
        Checkout <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
      </Button>
    </aside>
  );
}

export default CartSummary;
