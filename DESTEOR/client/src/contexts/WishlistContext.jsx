import { useCallback, useEffect, useMemo, useState } from 'react';
import { WishlistContext } from '@/contexts/wishlist-context';
import { useAuth } from '@/hooks/useAuth';
import { addWishlistItem, getWishlist, removeWishlistItem } from '@/services/wishlist.service';

const EMPTY_WISHLIST = { id: null, items: [] };
export function WishlistProvider({ children }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [wishlist, setWishlist] = useState(EMPTY_WISHLIST); const [loading, setLoading] = useState(false); const [mutatingProductId, setMutatingProductId] = useState('');
  const refreshWishlist = useCallback(async () => { if (!isAuthenticated) { setWishlist(EMPTY_WISHLIST); return EMPTY_WISHLIST; } setLoading(true); try { const next = await getWishlist(); setWishlist(next); return next; } finally { setLoading(false); } }, [isAuthenticated]);
  useEffect(() => { if (!authLoading) refreshWishlist().catch(() => {}); }, [authLoading, refreshWishlist]);
  const toggleItem = useCallback(async (productId) => { setMutatingProductId(productId); try { const exists = wishlist.items.some((item) => item.productId === productId); const next = exists ? await removeWishlistItem(productId) : await addWishlistItem(productId); setWishlist(next); return !exists; } finally { setMutatingProductId(''); } }, [wishlist.items]);
  const value = useMemo(() => ({ wishlist, loading, mutatingProductId, refreshWishlist, toggleItem, totalItems: wishlist.items.length, hasItem: (productId) => wishlist.items.some((item) => item.productId === productId) }), [wishlist, loading, mutatingProductId, refreshWishlist, toggleItem]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
