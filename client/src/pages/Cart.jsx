// Cart.jsx - Ultra Premium & Professional Cart Page (2025 e-commerce style)
import { useState } from 'react';
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, Truck, ShieldCheck, CreditCard, ArrowLeft, ChevronRight, Tag, Gift, CheckCircle2, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.price || (item.productId ? item.productId.price : 0);
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);
  const deliveryFee = subtotal > 999 ? 0 : 49;
  const tax = Math.round(subtotal * 0.05); // 5% GST example
  const discount = couponApplied ? Math.min(200, subtotal * 0.1) : 0; // max ₹200 discount
  const total = subtotal + deliveryFee + tax - discount;

  const freeDeliveryThreshold = 999;
  const progressToFree = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);

  const handleApplyCoupon = () => {
    if (coupon.trim() === "SAVE200") {
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
      setTimeout(() => setCouponError(""), 3000);
    }
  };

  // Helper function to get product details regardless of structure
  const getProductDetails = (item) => {
    if (item.productId) {
      // Structure: {productId: {product object}, quantity: number}
      return { product: item.productId, quantity: item.quantity, id: item.productId._id || item.productId.id };
    } else {
      // Structure: {product object with quantity}
      return { product: item, quantity: item.quantity || 1, id: item._id || item.id };
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition">
              <ArrowLeft size={20} /> Continue Shopping
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Your Shopping Cart ({cartItems.length})
            </h1>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800 text-sm font-semibold flex items-center gap-2 transition"
            >
              <Trash2 size={18} /> Clear All
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
            <div className="text-8xl mb-6 animate-bounce">🛒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart feels lonely!</h2>
            <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
              Add some amazing products to make it happy again. Great deals are waiting!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Browse Products <ChevronRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Delivery Progress */}
              <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-medium">
                    {subtotal >= freeDeliveryThreshold 
                      ? "Congratulations! Free Delivery Unlocked 🎉" 
                      : `Add ₹${(freeDeliveryThreshold - subtotal).toLocaleString()} more for FREE Delivery`}
                  </span>
                  <span className="text-sm font-semibold text-blue-600">
                    {progressToFree.toFixed(0)}%
                  </span>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-1000"
                    style={{ width: `${progressToFree}%` }}
                  />
                </div>
              </div>

              {cartItems.map((item) => {
                const { product, quantity, id } = getProductDetails(item);
                
                return (
                  <div
                    key={id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Product Image */}
                      <Link to={`/product/${id}`} className="sm:w-48 flex-shrink-0 bg-gradient-to-br from-gray-50 to-white p-6 flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-h-40 w-full object-contain transition-transform hover:scale-105 duration-300"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Product"; }}
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          <Link to={`/product/${id}`}>
                            <h3 className="font-semibold text-lg text-gray-900 hover:text-blue-600 transition line-clamp-2 mb-2">
                              {product.title}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500 mb-3">{product.category || "General"}</p>

                          <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-bold text-gray-900">
                               ₹{(product.price * quantity).toLocaleString()}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ₹{product.mrp.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                          {/* Quantity Selector */}
                          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-inner">
                            <button
                              onClick={() => decreaseQty(id)}
                              disabled={quantity <= 1}
                              className="px-5 py-3 text-gray-700 hover:bg-gray-200 disabled:opacity-40 transition"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="px-8 py-3 font-bold text-lg">{quantity}</span>
                            <button
                              onClick={() => increaseQty(id)}
                              className="px-5 py-3 text-gray-700 hover:bg-gray-200 transition"
                            >
                              <Plus size={18} />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeFromCart(id)}
                            className="text-red-600 hover:text-red-800 flex items-center gap-2 text-sm font-semibold transition"
                          >
                            <Trash2 size={18} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary - Sticky */}
            <div className="lg:col-span-4">
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Price Details</h2>

                <div className="space-y-4 mb-8 text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} items)</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-semibold" : "text-gray-900"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Coupon Discount</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-5 mt-2">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total Amount</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Coupon */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Tag size={18} /> Apply Coupon
                  </label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                      placeholder="e.g. SAVE200"
                      className="flex-1 px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={!coupon.trim()}
                      className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <div className="mt-3 text-green-600 flex items-center gap-2 text-sm animate-fadeIn">
                      <CheckCircle2 size={16} /> Coupon applied successfully!
                    </div>
                  )}
                  {couponError && (
                    <div className="mt-3 text-red-600 text-sm">{couponError}</div>
                  )}
                </div>

                {/* Checkout */}
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3">
                  <CreditCard size={22} /> Proceed to Checkout
                </button>

                {/* Trust Badges */}
                <div className="mt-10 grid grid-cols-3 gap-6 text-center text-xs md:text-sm">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-blue-50 rounded-full">
                      <Truck size={24} className="text-blue-600" />
                    </div>
                    <span className="font-medium">Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-green-50 rounded-full">
                      <ShieldCheck size={24} className="text-green-600" />
                    </div>
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-purple-50 rounded-full">
                      <RefreshCw size={24} className="text-purple-600" />
                    </div>
                    <span className="font-medium">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;