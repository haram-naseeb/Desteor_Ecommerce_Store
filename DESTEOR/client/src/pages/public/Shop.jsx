import { useEffect, useMemo, useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

import PageHero from '@/components/storefront/PageHero';
import Pagination from '@/components/storefront/Pagination';
import ProductGrid from '@/components/storefront/ProductGrid';
import ProductGridSkeleton from '@/components/storefront/ProductGridSkeleton';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import { getCategories } from '@/services/category.service';
import { getCollections } from '@/services/collection.service';
import { getProducts } from '@/services/product.service';

const PAGE_SIZE = 9;

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: PAGE_SIZE,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const filters = useMemo(
    () => ({
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || 'all',
      collection: searchParams.get('collection') || 'all',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      inStock: searchParams.get('inStock') === 'true',
      featured: searchParams.get('featured') === 'true',
      new: searchParams.get('new') === 'true',
      sort: searchParams.get('sort') || 'featured',
      page: Number(searchParams.get('page') || 1),
    }),
    [searchParams]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadTaxonomy() {
      try {
        const [categoryData, collectionData] = await Promise.all([
          getCategories(),
          getCollections(),
        ]);
        if (!isMounted) return;
        setCategories(categoryData);
        setCollections(collectionData);
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Unable to load catalog filters.');
        }
      }
    }

    loadTaxonomy();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      setLoading(true);
      setError('');

      try {
        const params = {
          page: filters.page,
          limit: PAGE_SIZE,
          sort: filters.sort,
        };

        if (filters.search) params.search = filters.search;
        if (filters.category !== 'all') params.category = filters.category;
        if (filters.collection !== 'all') params.collection = filters.collection;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.inStock) params.inStock = 'true';
        if (filters.featured) params.featured = 'true';
        if (filters.new) params.new = 'true';

        const data = await getProducts(params);

        if (!isMounted) return;
        setProducts(data.products);
        setMeta(data.meta);
      } catch (requestError) {
        if (isMounted) {
          setProducts([]);
          setError(requestError.message || 'Unable to load products.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, [filters]);

  const updateFilter = (key, value) => {
    const nextParams = new URLSearchParams(searchParams);

    if (!value || value === 'all') {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }

    if (key !== 'page') nextParams.delete('page');
    setSearchParams(nextParams);
  };

  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Bridal jewellery for every chapter"
        description="Browse curated artificial jewellery pieces for nikah, mehndi, reception, and timeless everyday celebrations."
        image="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1800&q=80"
      />

      <Container className="py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="h-fit border border-matte-black/10 bg-white p-5">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-matte-black">
              <FiFilter aria-hidden="true" />
              Filters
            </div>
            <fieldset>
              <legend className="text-sm font-semibold text-matte-black">Category</legend>
              <div className="mt-4 space-y-3">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-matte-black/70">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === 'all'}
                    onChange={() => updateFilter('category', 'all')}
                    className="accent-champagne-gold"
                  />
                  All jewellery
                </label>
                {categories.map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-3 text-sm text-matte-black/70"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === item.slug}
                      onChange={() => updateFilter('category', item.slug)}
                      className="accent-champagne-gold"
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8 border-t border-matte-black/10 pt-6">
              <legend className="text-sm font-semibold text-matte-black">Collection</legend>
              <div className="mt-4 space-y-3">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-matte-black/70">
                  <input
                    type="radio"
                    name="collection"
                    checked={filters.collection === 'all'}
                    onChange={() => updateFilter('collection', 'all')}
                    className="accent-champagne-gold"
                  />
                  All collections
                </label>
                {collections.map((item) => (
                  <label
                    key={item.id}
                    className="flex cursor-pointer items-center gap-3 text-sm text-matte-black/70"
                  >
                    <input
                      type="radio"
                      name="collection"
                      checked={filters.collection === item.slug}
                      onChange={() => updateFilter('collection', item.slug)}
                      className="accent-champagne-gold"
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-8 border-t border-matte-black/10 pt-6">
              <legend className="text-sm font-semibold text-matte-black">Price</legend>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <input type="range" min="0" max="100000" step="500" value={filters.minPrice || 0} onChange={(event) => updateFilter('minPrice', event.target.value === '0' ? '' : event.target.value)} aria-label="Minimum price slider" className="accent-champagne-gold" />
                <input type="range" min="0" max="100000" step="500" value={filters.maxPrice || 100000} onChange={(event) => updateFilter('maxPrice', event.target.value === '100000' ? '' : event.target.value)} aria-label="Maximum price slider" className="accent-champagne-gold" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Input
                  id="min-price"
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(event) => updateFilter('minPrice', event.target.value)}
                  aria-label="Minimum price"
                />
                <Input
                  id="max-price"
                  type="number"
                  min="0"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(event) => updateFilter('maxPrice', event.target.value)}
                  aria-label="Maximum price"
                />
              </div>
            </fieldset>

            <fieldset className="mt-8 space-y-3 border-t border-matte-black/10 pt-6">
              <legend className="text-sm font-semibold text-matte-black">Availability & highlights</legend>
              {[['inStock', 'In stock'], ['featured', 'Featured'], ['new', 'New arrivals']].map(([key, label]) => <label key={key} className="flex cursor-pointer items-center gap-3 text-sm text-matte-black/70"><input type="checkbox" checked={filters[key]} onChange={(event) => updateFilter(key, event.target.checked ? 'true' : '')} className="accent-champagne-gold" />{label}</label>)}
            </fieldset>
          </aside>

          <div>
            <div className="mb-6 grid gap-4 md:grid-cols-[1fr_220px]">
              <div className="relative">
                <FiSearch
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-matte-black/40"
                />
                <Input
                  id="shop-search"
                  placeholder="Search necklaces, earrings, rings..."
                  value={filters.search}
                  onChange={(event) => updateFilter('search', event.target.value)}
                  className="pl-11"
                  aria-label="Search products"
                />
              </div>
              <select
                value={filters.sort}
                onChange={(event) => updateFilter('sort', event.target.value)}
                className="h-[46px] rounded-md border border-matte-black/20 bg-ivory-white px-4 text-sm text-matte-black focus:outline-none focus:ring-2 focus:ring-champagne-gold"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4 text-sm text-matte-black/58">
              <p>{meta.total} pieces found</p>
              <p>
                Page {meta.page} of {meta.totalPages}
              </p>
            </div>

            {error && (
              <div className="mb-6 border border-matte-black/10 bg-white p-5 text-sm text-matte-black/68">
                {error}
              </div>
            )}

            {loading ? (
              <ProductGridSkeleton />
            ) : (
              <ProductGrid products={products} />
            )}

            <Pagination meta={meta} onPageChange={(page) => updateFilter('page', String(page))} />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Shop;
