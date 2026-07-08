import { useMemo, useState } from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

import PageHero from '@/components/storefront/PageHero';
import ProductGrid from '@/components/storefront/ProductGrid';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import { categories, products } from '@/data/storefront';

const PAGE_SIZE = 6;

function Shop() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);

  const filteredProducts = useMemo(() => {
    const searched = products.filter((product) => {
      const query = search.toLowerCase();
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.collection.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || product.categorySlug === category;

      return matchesSearch && matchesCategory;
    });

    return [...searched].sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      if (sort === 'name') return a.name.localeCompare(b.name);
      return Number(b.isBestSeller) - Number(a.isBestSeller);
    });
  }, [category, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const pagedProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateCategory = (value) => {
    setCategory(value);
    setPage(1);
  };

  const updateSearch = (value) => {
    setSearch(value);
    setPage(1);
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
                    checked={category === 'all'}
                    onChange={() => updateCategory('all')}
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
                      checked={category === item.slug}
                      onChange={() => updateCategory(item.slug)}
                      className="accent-champagne-gold"
                    />
                    {item.name}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="mt-8 border-t border-matte-black/10 pt-6">
              <p className="text-sm font-semibold text-matte-black">Availability</p>
              <label className="mt-4 flex items-center gap-3 text-sm text-matte-black/70">
                <input type="checkbox" checked readOnly className="accent-champagne-gold" />
                Ready to style
              </label>
            </div>
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
                  placeholder="Search necklaces, earrings, bridal sets..."
                  value={search}
                  onChange={(event) => updateSearch(event.target.value)}
                  className="pl-11"
                  aria-label="Search products"
                />
              </div>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="h-[46px] rounded-md border border-matte-black/20 bg-ivory-white px-4 text-sm text-matte-black focus:outline-none focus:ring-2 focus:ring-champagne-gold"
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4 text-sm text-matte-black/58">
              <p>{filteredProducts.length} pieces found</p>
              <p>
                Page {page} of {totalPages}
              </p>
            </div>

            <ProductGrid products={pagedProducts} />

            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                <button
                  key={number}
                  type="button"
                  onClick={() => setPage(number)}
                  className={`h-10 w-10 border text-sm font-semibold ${
                    page === number
                      ? 'border-matte-black bg-matte-black text-ivory-white'
                      : 'border-matte-black/15 text-matte-black hover:border-champagne-gold'
                  }`}
                  aria-label={`Go to page ${number}`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Shop;
