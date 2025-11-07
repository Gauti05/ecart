const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');


router.post('/', async (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty || qty < 1)
    return res.status(400).json({ error: 'Invalid productId or quantity' });

  try {
    let cartItem = await CartItem.findOne({ productId });
    if (cartItem) {
      cartItem.qty += qty;
      await cartItem.save();
      return res.json(cartItem);
    }
    cartItem = new CartItem({ productId, qty });
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch {
    res.status(500).json({ error: 'Error adding to cart' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cartItem = await CartItem.findByIdAndDelete(req.params.id);
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
    res.json({ message: 'Deleted', cartItem });
  } catch {
    res.status(500).json({ error: 'Error deleting cart item' });
  }
});


router.get('/', async (req, res) => {
  try {
    const cartItems = await CartItem.find({}).populate('productId');
    const items = cartItems.map(item => ({
      id: item._id,
      productId: item.productId._id,  
      product: item.productId.name,
      price: item.productId.price,
      qty: item.qty,
      subtotal: item.productId.price * item.qty
    }));
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    res.json({ items, total });
  } catch {
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

router.post('/checkout', async (req, res) => {
  const { cartItems, name, email } = req.body;
  
  if (!cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'Invalid cartItems' });
  }

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }

  try {
    let total = 0;
    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product)
        return res.status(400).json({ error: `Product not found: ${item.productId}` });
      total += product.price * item.qty;
    }
    const receipt = {
      total,
      timestamp: new Date().toISOString(),
      customerName: name,
      customerEmail: email,
    };
    res.json({ receipt });
  } catch {
    res.status(500).json({ error: 'Error during checkout' });
  }
});


module.exports = router;
