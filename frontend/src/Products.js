import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from './contexts/CartContext';
import * as api from './api';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Products() {
  const [products, setProducts] = useState([]);
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    api.getProducts()
      .then(res => setProducts(res.data))
      .catch(() => alert('Error fetching products'));
  }, []);

  const handleAddToCart = (productId) => {
    addItem(productId, 1);
    toast.success('Added successfully to cart');
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-lg mb-4 shadow-lg max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">Welcome to Vibe Commerce</h1>
        <p className="text-lg">Find the best products and add them to your cart with ease!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 max-w-6xl mx-auto">
        {products.map(p => (
          <Link
            key={p._id}
            to={`/product/${p._id}`}
            className="
              border rounded-lg p-4 shadow-sm hover:shadow-lg
              hover:scale-105 transform transition flex flex-col justify-between text-inherit no-underline
            "
          >
            <h4 className="text-lg font-semibold mb-2">{p.name}</h4>
            <p className="text-gray-700 mb-4">${p.price.toFixed(2)}</p>
            <button
              onClick={e => {
                e.preventDefault();
                handleAddToCart(p._id);
              }}
              className="
                bg-blue-600 text-white py-2 px-4 rounded
                hover:bg-blue-700 focus:ring-4 focus:ring-blue-300
                transition-colors duration-200
              "
            >
              Add to Cart
            </button>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Products;
