import React, { createContext, useEffect, useState } from 'react';
import * as api from '../api';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await api.getCart();
      setCart(res.data);
    } catch (err) {
      console.error('Error loading cart', err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, qty = 1) => {
  if (!productId || typeof qty !== 'number' || qty < 1) {
    console.error('Invalid productId or quantity:', productId, qty);
    return; 
  }
  setLoading(true);
  try {
    await api.addToCart(productId, qty);
    await fetchCart();
  } catch (err) {
    console.error('Error adding to cart', err);
  } finally {
    setLoading(false);
  }
};


  const removeItem = async (id) => {
    setLoading(true);
    try {
      await api.removeFromCart(id);
      await fetchCart();
    } catch (err) {
      console.error('Error removing from cart', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, loading, addItem, removeItem, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}
