const express = require("express");
const router = express.Router();

const Product = require('../models/Product');

// Get all products with optional category filter
router.get("/", async (req, res) => {
  try {
    const { category, limit } = req.query;
    let filter = {};
    
    if (category) {
      filter.category = category;
    }
    
    const query = Product.find(filter);
    
    if (limit) {
      query.limit(parseInt(limit));
    }
    
    const products = await query.exec();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let product;
    
    // First, try to find by MongoDB ObjectId
    if (id.length === 24 && /^[0-9a-fA-F]{24}$/.test(id)) {
      product = await Product.findById(id);
    }
    
    // If not found by ObjectId, try to find by numeric ID field
    if (!product) {
      product = await Product.findOne({ id: parseInt(id) });
    }
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;