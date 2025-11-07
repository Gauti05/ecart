import React, { useContext } from 'react';
import { CartContext } from './contexts/CartContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cart, loading, removeItem, addItem, fetchCart } = useContext(CartContext);
  const navigate = useNavigate();

 
  const updateQty = async (id, productId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;

    try {
      await removeItem(id);
      await addItem(productId, newQty);
      await fetchCart();
    } catch {
      alert('Failed to update quantity');
    }
  };

  const handleRemove = (id) => {
    removeItem(id).catch(() => alert('Failed to remove item'));
  };

  if (loading) return <p>Loading cart...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cart.items.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300 shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border border-gray-300 p-2">Product</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Subtotal</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(item => (
              <tr
                key={item.id}
                className="border border-gray-300 hover:bg-blue-50 transition-colors duration-200"
              >
                <td className="border border-gray-300 p-2">{item.product}</td>
                <td className="border border-gray-300 p-2">${item.price.toFixed(2)}</td>
                <td className="border border-gray-300 p-2 flex items-center space-x-2">
                  <button
                    onClick={() => updateQty(item.id, item.productId, item.qty, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.id, item.productId, item.qty, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                </td>
                <td className="border border-gray-300 p-2 font-semibold">${item.subtotal.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-600 hover:text-red-800 font-semibold transition"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="text-right font-bold p-2">Total:</td>
              <td colSpan="2" className="font-bold p-2">${cart.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      )}
      {cart.items.length > 0 && (
        <button
          onClick={() => navigate('/checkout')}
          className="mt-6 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition"
        >
          Proceed to Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;
