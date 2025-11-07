
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const getProducts = () => axios.get(`${API_BASE}/products`);
export const getCart = () => axios.get(`${API_BASE}/cart`);
export const addToCart = (productId, qty = 1) => axios.post(`${API_BASE}/cart`, { productId, qty });
export const removeFromCart = (id) => axios.delete(`${API_BASE}/cart/${id}`);


export const checkoutCart = (payload) => axios.post(`${API_BASE}/cart/checkout`, payload);
