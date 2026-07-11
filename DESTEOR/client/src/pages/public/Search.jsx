import { useEffect, useMemo, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

import Pagination from '@/components/storefront/Pagination';
import ProductGrid from '@/components/storefront/ProductGrid';
import ProductGridSkeleton from '@/components/storefront/ProductGridSkeleton';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import Input from '@/components/ui/Input';
import { getProducts } from '@/services/product.service';

const PAGE_SIZE = 9;

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [term, setTerm] = useState(query);
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1, hasNextPage: false, hasPreviousPage: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const page = Number(searchParams.get('page') || 1);
  const hasQuery = useMemo(() => query.trim().length > 0, [query]);

  useEffect(() => { setTerm(query); }, [query]);
  useEffect(() => {
    if (!hasQuery) { setProducts([]); setMeta({ total: 0, page: 1, totalPages: 1 }); return undefined; }
    let active = true;
    setLoading(true); setError('');
    getProducts({ search: query, page, limit: PAGE_SIZE, sort: 'featured' })
      .then((data) => { if (active) { setProducts(data.products); setMeta(data.meta); } })
      .catch((requestError) => { if (active) setError(requestError.message || 'Unable to search products.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [hasQuery, page, query]);

  const submit = (event) => { event.preventDefault(); const next = new URLSearchParams(); if (term.trim()) next.set('q', term.trim()); setSearchParams(next); };
  const changePage = (nextPage) => { const next = new URLSearchParams(searchParams); next.set('page', String(nextPage)); setSearchParams(next); };

  return <Container className="py-12 md:py-16"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne-gold">Discover DESTEOR</p><h1 className="mt-3 text-4xl text-matte-black">Search the collection</h1><form onSubmit={submit} className="mt-8 max-w-2xl"><div className="relative"><FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-matte-black/40" aria-hidden="true" /><Input id="search-results" value={term} onChange={(event) => setTerm(event.target.value)} placeholder="Search necklaces, earrings, rings..." className="pl-11" aria-label="Search products" /></div></form>{hasQuery && <p className="mt-7 text-sm text-matte-black/60">{loading ? 'Searching…' : `${meta.total} pieces found for “${query}”`}</p>}{error && <p className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p>}<div className="mt-8">{loading ? <ProductGridSkeleton /> : hasQuery ? <ProductGrid products={products} /> : <EmptyState icon={FiSearch} title="Find a piece you love" description="Enter a product, category, or collection to begin your search." />}</div><Pagination meta={meta} onPageChange={changePage} /></Container>;
}

export default Search;
