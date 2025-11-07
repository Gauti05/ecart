require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Product = require('./models/Product');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const sampleProducts = [
  { name: 'Wireless Bluetooth Headphones', price: 59.99 },
  { name: 'Yoga Mat Non-Slip', price: 20.00 },
  { name: 'Stainless Steel Water Bottle', price: 15.50 },
  { name: 'Smart LED Light Bulb', price: 25.99 },
  { name: 'Portable Phone Charger', price: 30.00 },
  { name: 'Gaming Mechanical Keyboard', price: 75.00 },
  { name: 'Noise Cancelling Earbuds', price: 45.50 },
  { name: 'Digital Kitchen Scale', price: 18.00 },
  { name: 'Fitness Tracker Watch', price: 55.00 },
  { name: 'Wireless Mouse', price: 22.00 }
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected via Atlas'))
  .catch(err => console.error(err));

mongoose.connection.once('open', async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(sampleProducts);
    console.log('Inserted sample products without images');
  }
});

app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
