import React, { useContext, useState } from 'react';
import { CartContext } from './contexts/CartContext';
import * as api from './api';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cart, loading } = useContext(CartContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email) {
      setError('Please fill name and email');
      return;
    }
    if (!cart.items || cart.items.length === 0) {
      setError('Cart is empty');
      return;
    }

    setSubmitting(true);
    try {
      const cartItems = cart.items.map(item => ({
        productId: item.productId,
        qty: item.qty,
      }));

      const payload = { cartItems, name, email };

      const res = await api.checkoutCart(payload);
      setReceipt(res.data.receipt);
    } catch {
      setError('Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setReceipt(null);
    navigate('/');
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">Name:</label>
          <input
            id="name"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition disabled:opacity-50"
        >
          {submitting ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {receipt && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg animate-scaleUp"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">Receipt</h3>
            <p><strong>Total:</strong> ${receipt.total?.toFixed(2) ?? '0.00'}</p>
            <p><strong>Timestamp:</strong> {receipt.timestamp ? new Date(receipt.timestamp).toLocaleString() : 'N/A'}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700 focus:ring-4 focus:ring-red-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
