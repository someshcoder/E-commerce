const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
    
    images: [{
      type: String,
    }],
    
    rating: {
      type: Number,
      default: 0,
    },
    
    reviews: {
      type: Number,
      default: 0,
    },
    
    specs: [{
      key: String,
      value: String,
    }],

    category: {
      type: String,
      required: true,
    },
    
    tag: {
      type: String,
    },

    stock: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
