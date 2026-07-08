import ProductCard from '@/components/storefront/ProductCard';

function ProductGrid({ products }) {
  if (!products.length) {
    return (
      <div className="border border-matte-black/10 bg-white/50 p-10 text-center">
        <p className="font-heading text-2xl text-matte-black">No pieces found</p>
        <p className="mt-3 text-sm text-matte-black/60">
          Try a different search term or filter combination.
        </p>
      </div>
    );
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
