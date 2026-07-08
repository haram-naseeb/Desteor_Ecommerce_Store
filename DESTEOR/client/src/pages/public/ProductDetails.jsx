import { FiShield, FiTruck } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

import Breadcrumbs from '@/components/storefront/Breadcrumbs';
import ProductGallery from '@/components/storefront/ProductGallery';
import ProductGrid from '@/components/storefront/ProductGrid';
import SectionHeading from '@/components/storefront/SectionHeading';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import { ROUTES } from '@/constants/routes';
import { formatPrice, products } from '@/data/storefront';

function ProductDetails() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-4xl text-matte-black">Piece not found</h1>
        <p className="mt-4 text-matte-black/60">
          This design may have moved or left the collection.
        </p>
        <Link to={ROUTES.SHOP} className="mt-8 inline-block">
          <Button variant="secondary" className="rounded-none">
            Return to Shop
          </Button>
        </Link>
      </Container>
    );
  }

  const relatedProducts = products
    .filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id)
    .slice(0, 3);

  return (
    <Container className="py-10 md:py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.HOME },
          { label: 'Shop', to: ROUTES.SHOP },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <ProductGallery product={product} />

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
            {product.collection}
          </p>
          <h1 className="mt-4 text-4xl leading-tight text-matte-black md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-5 text-2xl font-semibold text-matte-black">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 leading-8 text-matte-black/68">{product.description}</p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="border border-matte-black/10 bg-white p-4">
              <FiTruck className="text-champagne-gold" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-matte-black">
                Delivery Ready
              </p>
              <p className="mt-1 text-xs leading-5 text-matte-black/55">
                Frontend preview only; checkout arrives in a later sprint.
              </p>
            </div>
            <div className="border border-matte-black/10 bg-white p-4">
              <FiShield className="text-champagne-gold" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-matte-black">
                Carefully Packed
              </p>
              <p className="mt-1 text-xs leading-5 text-matte-black/55">
                Stored with care guidance for long-lasting shine.
              </p>
            </div>
          </div>

          <div className="mt-9 border-y border-matte-black/10 py-7">
            <h2 className="text-2xl text-matte-black">Specifications</h2>
            <dl className="mt-5 grid gap-4">
              {Object.entries(product.specs).map(([label, value]) => (
                <div key={label} className="grid grid-cols-[120px_1fr] gap-4 text-sm">
                  <dt className="font-semibold text-matte-black">{label}</dt>
                  <dd className="text-matte-black/64">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      <section className="pt-16 md:pt-24">
        <SectionHeading
          eyebrow="Related"
          title="Complete the look"
          description="Pieces from the same category with a matching sense of polish."
        />
        <div className="mt-10">
          <ProductGrid products={relatedProducts.length ? relatedProducts : products.slice(0, 3)} />
        </div>
      </section>
    </Container>
  );
}

export default ProductDetails;
