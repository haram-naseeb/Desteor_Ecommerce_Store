import { FiHeart } from 'react-icons/fi';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import ProductGrid from '@/components/storefront/ProductGrid';
import { ROUTES } from '@/constants/routes';
import { useWishlist } from '@/hooks/useWishlist';
function Wishlist() { const { wishlist, loading } = useWishlist(); const products = wishlist.items.map((item) => item.product); return <Container className="py-12 md:py-16"><div className="mb-10"><p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne-gold">Saved for later</p><h1 className="mt-3 text-4xl text-matte-black">Your wishlist</h1></div>{loading ? <div className="py-20"><Loader label="Loading wishlist" /></div> : products.length ? <ProductGrid products={products} /> : <EmptyState icon={FiHeart} title="Your wishlist is waiting" description="Save pieces you love and return whenever the moment feels right." actionLabel="Explore the collection" actionTo={ROUTES.SHOP} />}</Container>; }
export default Wishlist;
