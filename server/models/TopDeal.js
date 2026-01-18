const mongoose = require("mongoose");

const topDealSchema = new mongoose.Schema(
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
    
    mrp: {
      type: Number,
      required: true,
    },
    
    discount: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,
      required: true,
    },
    
    images: [{
      type: String,
    }],
    
    tag: {
      type: String,
    },
    
    specs: [{
      key: String,
      value: String,
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("TopDeal", topDealSchema);
