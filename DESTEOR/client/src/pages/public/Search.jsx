import { useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

// Pagination removed for single-page search results
import ProductGrid from '@/components/storefront/ProductGrid';
import ProductGridSkeleton from '@/components/storefront/ProductGridSkeleton';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import Input from '@/components/ui/Input';
import { getProducts } from '@/services/product.service';

const PAGE_SIZE = 36;

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [term, setTerm] = useState(query);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // single-page search results - no page param
  const hasQuery = useMemo(() => query.trim().length > 0, [query]);

  useEffect(() => { setTerm(query); }, [query]);
  useEffect(() => {
    if (!hasQuery) { setProducts([]); setMeta({ total: 0, totalPages: 1 }); return undefined; }
    let active = true;
    setLoading(true); setError('');
    getProducts({ search: query, limit: PAGE_SIZE, sort: 'featured' })
      .then((data) => { if (active) { setProducts(data.products); setMeta(data.meta); } })
      .catch((requestError) => { if (active) setError(requestError.message || 'Unable to search products.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [hasQuery, query]);

  const submit = (event) => { event.preventDefault(); const next = new URLSearchParams(); if (term.trim()) next.set('q', term.trim()); setSearchParams(next); };
  // no page changes - single-page results

  return <Container className="py-12 md:py-16"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne-gold">Discover DESTEOR</p><h1 className="mt-3 text-4xl text-matte-black">Search the shop</h1><form onSubmit={submit} className="mt-8 max-w-3xl"><div className="relative"><div className="pointer-events-none absolute inset-y-1.5 right-1.5 grid w-11 place-items-center rounded-full bg-champagne-gold/14 text-champagne-gold shadow-sm ring-1 ring-champagne-gold/10"><FiSearch className="h-4 w-4" aria-hidden="true" /></div><Input id="search-results" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search necklaces, earrings, rings..." className="h-14 rounded-full !border-matte-black/15 !bg-transparent pl-5 pr-16 text-base shadow-none ring-0 placeholder:text-matte-black/35 focus:ring-0" aria-label="Search products" /></div></form>{hasQuery && <p className="mt-7 text-sm text-matte-black/60">{loading ? 'Searching…' : `${meta.total} pieces found for “${query}”`}</p>}{error && <p className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}<div className="mt-8">{loading ? <ProductGridSkeleton /> : hasQuery ? <ProductGrid products={products} /> : <EmptyState icon={FiSearch} title="Find a piece you love" description="Enter a product or category to begin your search." />}</div></Container>;
}

export default Search;
