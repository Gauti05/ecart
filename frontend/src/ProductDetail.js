import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as api from './api';
import { CartContext } from './contexts/CartContext';
import toast from 'react-hot-toast';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getProducts()
      .then(res => {
        const found = res.data.find(p => p._id === id);
        if (found) setProduct(found);
        else setError('Product not found');
      })
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addItem(product._id, 1);
    toast.success('Added successfully to cart');
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 border rounded shadow hover:shadow-lg transition">
      <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
      <p className="text-xl text-gray-700 mb-6">${product.price.toFixed(2)}</p>

      <button
        onClick={handleAddToCart}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;

