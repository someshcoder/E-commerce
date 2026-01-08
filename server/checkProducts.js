const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/e-commerce')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    const products = await Product.find();
    console.log('Products in DB:', products.map(p => ({id: p.id, _id: p._id, title: p.title})));
    
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error:', err);
    mongoose.connection.close();
  });