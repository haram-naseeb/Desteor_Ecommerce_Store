import { useCallback, useEffect, useMemo, useState } from 'react';

import { CartContext } from '@/contexts/cart-context';
import { useAuth } from '@/hooks/useAuth';
import {
  addCartItem,
  clearCart as clearCartRequest,
  getCart,
  removeCartItem,
  updateCartItem,
} from '@/services/cart.service';

const EMPTY_CART = {
  id: null,
  items: [],
  summary: {
    totalItems: 0,
    subtotal: 0,
    estimatedShipping: 0,
    estimatedTax: 0,
    estimatedTotal: 0,
  },
};

export function CartProvider({ children }) {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [cart, setCart] = useState(EMPTY_CART);
  const [loading, setLoading] = useState(false);
  const [mutatingItemId, setMutatingItemId] = useState('');
  const [error, setError] = useState('');

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(EMPTY_CART);
      return EMPTY_CART;
    }

    setLoading(true);
    setError('');

    try {
      const nextCart = await getCart();
      setCart(nextCart);
      return nextCart;
    } catch (requestError) {
      setError(requestError.message || 'Unable to load cart.');
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (authLoading) return;
    refreshCart().catch(() => {});
  }, [authLoading, refreshCart]);

  const addItem = useCallback(async ({ productId, quantity = 1 }) => {
    setMutatingItemId(productId);
    setError('');

    try {
      const nextCart = await addCartItem({ productId, quantity });
      setCart(nextCart);
      return nextCart;
    } catch (requestError) {
      setError(requestError.message || 'Unable to add item to cart.');
      throw requestError;
    } finally {
      setMutatingItemId('');
    }
  }, []);

  const updateItem = useCallback(async (itemId, quantity) => {
    setMutatingItemId(itemId);
    setError('');

    try {
      const nextCart = await updateCartItem(itemId, { quantity });
      setCart(nextCart);
      return nextCart;
    } catch (requestError) {
      setError(requestError.message || 'Unable to update cart item.');
      throw requestError;
    } finally {
      setMutatingItemId('');
    }
  }, []);

  const removeItem = useCallback(async (itemId) => {
    setMutatingItemId(itemId);
    setError('');

    try {
      const nextCart = await removeCartItem(itemId);
      setCart(nextCart);
      return nextCart;
    } catch (requestError) {
      setError(requestError.message || 'Unable to remove cart item.');
      throw requestError;
    } finally {
      setMutatingItemId('');
    }
  }, []);

  const clear = useCallback(async () => {
    setMutatingItemId('clear');
    setError('');

    try {
      const nextCart = await clearCartRequest();
      setCart(nextCart);
      return nextCart;
    } catch (requestError) {
      setError(requestError.message || 'Unable to clear cart.');
      throw requestError;
    } finally {
      setMutatingItemId('');
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      error,
      loading,
      mutatingItemId,
      totalItems: cart.summary.totalItems,
      addItem,
      clear,
      refreshCart,
      removeItem,
      updateItem,
    }),
    [
      addItem,
      cart,
      clear,
      error,
      loading,
      mutatingItemId,
      refreshCart,
      removeItem,
      updateItem,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
