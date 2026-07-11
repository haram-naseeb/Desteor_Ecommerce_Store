import ProductCard from '@/components/storefront/ProductCard';
import EmptyState from '@/components/ui/EmptyState';
import { ROUTES } from '@/constants/routes';

function ProductGrid({ products }) {
  if (!products.length) {
    return <EmptyState title="No pieces found" description="Try a different search term or filter combination." actionLabel="Browse all pieces" actionTo={ROUTES.SHOP} />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;
