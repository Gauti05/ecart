import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './Products';
import Cart from './Cart';
import Checkout from './Checkout';
import ProductDetail from './ProductDetail';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Router>
        <header className="p-4 bg-gray-800 text-white">
          <nav className="max-w-6xl mx-auto flex space-x-8">
            <Link to="/" className="hover:underline">Products</Link>
            <Link to="/cart" className="hover:underline">Cart</Link>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;

