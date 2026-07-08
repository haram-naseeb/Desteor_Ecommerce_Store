import { useEffect, useState } from 'react';
import { FiShield, FiTruck } from 'react-icons/fi';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import Breadcrumbs from '@/components/storefront/Breadcrumbs';
import ProductGallery from '@/components/storefront/ProductGallery';
import ProductGrid from '@/components/storefront/ProductGrid';
import SectionHeading from '@/components/storefront/SectionHeading';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { getProductBySlug } from '@/services/product.service';
import { formatPrice } from '@/utils/format';

function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadProduct() {
      setLoading(true);
      setError('');

      try {
        const data = await getProductBySlug(slug);
        if (!isMounted) return;
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts);
      } catch (requestError) {
        if (isMounted) {
          setProduct(null);
          setError(requestError.message || 'Unable to load this product.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, {
        state: {
          from: {
            pathname: location.pathname,
            search: location.search,
          },
        },
      });
      return;
    }

    navigate(location.pathname, {
      replace: true,
      state: {
        notice: 'Checkout arrives in a later sprint. Your account is ready.',
      },
    });
  };

  if (loading) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center py-20">
        <Loader label="Loading product" />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-4xl text-matte-black">Piece not found</h1>
        <p className="mt-4 text-matte-black/60">
          {error || 'This design may have moved or left the collection.'}
        </p>
        <Link to={ROUTES.SHOP} className="mt-8 inline-block">
          <Button variant="secondary" className="rounded-none">
            Return to Shop
          </Button>
        </Link>
      </Container>
    );
  }

  const displayPrice = product.salePrice || product.price;
  const stockLabel = product.stock > 0 ? `${product.stock} pieces available` : 'Out of stock';

  return (
    <Container className="py-10 md:py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.HOME },
          { label: 'Shop', to: ROUTES.SHOP },
          { label: product.categoryName, to: `${ROUTES.SHOP}?category=${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <ProductGallery product={product} />

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
            {product.collectionName}
          </p>
          <h1 className="mt-4 text-4xl leading-tight text-matte-black md:text-5xl">
            {product.name}
          </h1>
          <div className="mt-5 flex items-center gap-3 text-2xl font-semibold text-matte-black">
            <span>{formatPrice(displayPrice)}</span>
            {product.salePrice && (
              <span className="text-base font-medium text-matte-black/45 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-matte-black/55">
            {product.categoryName} / {stockLabel}
          </p>
          <p className="mt-6 leading-8 text-matte-black/68">{product.description}</p>

          {location.state?.notice && (
            <div className="mt-6 border border-champagne-gold/45 bg-champagne-gold/10 p-4 text-sm text-matte-black/70">
              {location.state.notice}
            </div>
          )}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="border border-matte-black/10 bg-white p-4">
              <FiTruck className="text-champagne-gold" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-matte-black">
                Delivery Ready
              </p>
              <p className="mt-1 text-xs leading-5 text-matte-black/55">
                Cash on Delivery checkout will be connected in a future sprint.
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

          <Button
            type="button"
            variant="secondary"
            size="lg"
            className="mt-8 w-full rounded-none sm:w-auto"
            disabled={product.stock < 1}
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>

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
          <ProductGrid products={relatedProducts} />
        </div>
      </section>
    </Container>
  );
}

export default ProductDetails;
