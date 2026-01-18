const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    address: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Placed",
    },

    paymentId: {
      type: String,
      required: false, // Not required since cash on delivery won't have paymentId
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
