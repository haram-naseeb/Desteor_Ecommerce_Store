function ProductGridSkeleton({ count = 9 }) {
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading products">{Array.from({ length: count }, (_, index) => <div key={index} className="overflow-hidden border border-matte-black/10 bg-white"><div className="aspect-[4/5] animate-pulse bg-matte-black/10" /><div className="space-y-3 p-5"><div className="h-3 w-20 animate-pulse bg-matte-black/10" /><div className="h-5 w-4/5 animate-pulse bg-matte-black/10" /><div className="h-4 w-2/5 animate-pulse bg-matte-black/10" /><div className="h-9 animate-pulse bg-matte-black/10" /></div></div>)}</div>;
}
export default ProductGridSkeleton;
