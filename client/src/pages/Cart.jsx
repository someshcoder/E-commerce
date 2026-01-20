// Cart.jsx - Ultra Premium & Professional Cart Page (2025 e-commerce style)
import { useState } from 'react';
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, Truck, ShieldCheck, CreditCard, ArrowLeft, ChevronRight, Tag, Gift, CheckCircle2, RefreshCw, ShoppingCart, Package, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
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
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 animate-fade-in-down">
          <div className="flex items-center gap-6">
            <Link to="/" className="group flex items-center gap-3 text-blue-600 hover:text-blue-800 transition-all duration-300">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              </div>
              <span className="font-semibold text-lg">Continue Shopping</span>
            </Link>
            <div className="hidden md:block w-px h-8 bg-gray-200"></div>
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
                Shopping Cart
              </h1>
              <p className="text-gray-600 mt-2">
                {cartItems.length > 0 ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} ready to checkout
                  </span>
                ) : 'Your cart is empty'}
              </p>
            </div>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="group px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-red-400/30 backdrop-blur-sm"
            >
              <Trash2 size={20} className="group-hover:rotate-12 transition-transform" />
              Clear All
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-12 text-center border border-gray-100/50 backdrop-blur-sm animate-fade-in-up">
            <div className="relative inline-block mb-8">
              <div className="text-9xl mb-6 animate-bounce-slow">🛒</div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Gift size={24} className="text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Your cart feels lonely!
            </h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Add some amazing products to make it happy again. Great deals and exclusive offers are waiting for you!
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 mb-12 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
                <div className="text-sm text-gray-500">Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">5★</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
            </div>
            
            <Link
              to="/products"
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-blue-400/30 backdrop-blur-sm shadow-xl"
            >
              <span>Browse Products</span>
              <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-6">
              {/* Enhanced Free Delivery Progress */}
              <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-lg p-6 border border-gray-100/50 backdrop-blur-sm animate-slide-in-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                      <Truck size={20} className="text-green-600" />
                    </div>
                    <span className="text-gray-800 font-semibold text-lg">
                      {subtotal >= freeDeliveryThreshold 
                        ? "🎉 Free Delivery Unlocked!" 
                        : `Add ₹${(freeDeliveryThreshold - subtotal).toLocaleString()} for FREE Delivery`}
                    </span>
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-green-200">
                    <span className="text-sm font-bold text-green-600">
                      {progressToFree.toFixed(0)}% Complete
                    </span>
                  </div>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 transition-all duration-1000 ease-out shadow-lg"
                    style={{ width: `${progressToFree}%` }}
                  />
                </div>
                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span className="font-medium">Free Delivery at ₹{freeDeliveryThreshold.toLocaleString()}</span>
                  <span>₹{freeDeliveryThreshold.toLocaleString()}+</span>
                </div>
              </div>

              {cartItems.map((item, index) => {
                const { product, quantity, id } = getProductDetails(item);
                
                return (
                  <div
                    key={id}
                    className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Enhanced Product Image */}
                      <Link to={`/product/${id}`} className="sm:w-52 flex-shrink-0 bg-gradient-to-br from-gray-50 to-white p-8 flex items-center justify-center group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300">
                        <div className="relative">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="max-h-44 w-full object-contain transition-all duration-500 group-hover:scale-110"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/150?text=Product"; }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                        </div>
                      </Link>

                      {/* Enhanced Details */}
                      <div className="flex-1 p-8 flex flex-col justify-between">
                        <div>
                          <Link to={`/product/${id}`}>
                            <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-all duration-300 mb-3 line-clamp-2">
                              {product.title}
                            </h3>
                          </Link>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
                            <Tag size={14} />
                            {product.category || "General"}
                          </div>

                          <div className="flex items-baseline gap-4">
                            <span className="text-3xl font-bold text-gray-900">
                               ₹{(product.price * quantity).toLocaleString()}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                              <div className="flex items-center gap-2">
                                <span className="text-lg text-gray-500 line-through">
                                  ₹{product.mrp.toLocaleString()}
                                </span>
                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                                  {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                          {/* Enhanced Quantity Selector */}
                          <div className="flex items-center bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                            <button
                              onClick={() => decreaseQty(id)}
                              disabled={quantity <= 1}
                              className="px-6 py-4 text-gray-700 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 group/button"
                            >
                              <Minus size={20} className="group-hover/button:scale-110 transition-transform" />
                            </button>
                            <div className="px-8 py-4 bg-white font-bold text-xl shadow-inner min-w-[80px] text-center">
                              {quantity}
                            </div>
                            <button
                              onClick={() => increaseQty(id)}
                              className="px-6 py-4 text-gray-700 hover:bg-gray-200 transition-all duration-200 group/button"
                            >
                              <Plus size={20} className="group-hover/button:scale-110 transition-transform" />
                            </button>
                          </div>

                          {/* Enhanced Remove Button */}
                          <button
                            onClick={() => removeFromCart(id)}
                            className="group flex items-center gap-3 px-6 py-4 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-800 rounded-2xl font-semibold transition-all duration-300 border border-red-200 hover:border-red-300 hover:shadow-md"
                          >
                            <Trash2 size={20} className="group-hover:rotate-12 transition-transform" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced Order Summary - Sticky */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 p-8 sticky top-8 animate-slide-in-right">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CreditCard size={24} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">Price Details</h2>
                </div>

                <div className="space-y-5 mb-10 text-gray-700">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Package size={18} className="text-gray-500" />
                      <span className="font-medium">Subtotal</span>
                      <span className="text-sm text-gray-500">({cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} items)</span>
                    </div>
                    <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Truck size={18} className="text-gray-500" />
                      <span className="font-medium">Delivery Charges</span>
                    </div>
                    <span className={deliveryFee === 0 ? "text-green-600 font-bold flex items-center gap-1" : "text-gray-900 font-medium"}>
                      {deliveryFee === 0 ? (
                        <>
                          <CheckCircle2 size={16} />
                          FREE
                        </>
                      ) : `₹${deliveryFee}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Tag size={18} className="text-gray-500" />
                      <span className="font-medium">GST (5%)</span>
                    </div>
                    <span className="font-medium text-gray-900">₹{tax.toLocaleString()}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex justify-between items-center pb-3 border-b border-green-200 bg-green-50/50 p-3 rounded-xl">
                      <div className="flex items-center gap-2 text-green-700">
                        <Gift size={18} />
                        <span className="font-semibold">Coupon Discount</span>
                      </div>
                      <span className="font-bold text-green-700">-₹{discount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="border-t-2 border-gray-300 pt-6 mt-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">Total Amount</span>
                        <span className="text-sm text-gray-500">(incl. taxes)</span>
                      </div>
                      <span className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Coupon Section */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <Gift size={20} className="text-purple-600" />
                    </div>
                    <label className="block text-lg font-bold text-gray-800">
                      Apply Coupon Code
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code (e.g. SAVE200)"
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-sm hover:shadow-md"
                      />
                      {coupon.trim() && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <CheckCircle2 size={20} className="text-green-500" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={handleApplyCoupon}
                      disabled={!coupon.trim()}
                      className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl font-bold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-purple-400/30 backdrop-blur-sm shadow-lg"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3 animate-fade-in-up">
                      <CheckCircle2 size={20} className="text-green-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-green-800">Coupon applied successfully!</p>
                        <p className="text-sm text-green-600">You saved ₹{discount.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                  {couponError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 animate-shake">
                      <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
                      <p className="font-medium text-red-800">{couponError}</p>
                    </div>
                  )}
                </div>

                {/* Enhanced Checkout Button */}
                <div className="space-y-6">
                  <button 
                    onClick={() => {
                      // Redirect to checkout page with normalized cart items for immediate purchase
                      if (cartItems && cartItems.length > 0) {
                        // Normalize cart items to ensure consistent structure
                        const normalizedCartItems = cartItems.map(item => {
                          const { product, quantity, id } = getProductDetails(item);
                          return {
                            ...product,
                            quantity: quantity,
                            id: id
                          };
                        });
                        navigate('/checkout', { state: { cartItems: normalizedCartItems, buyNow: true } });
                      }
                    }}
                    disabled={cartItems.length === 0}
                    className="group w-full flex items-center justify-center gap-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white py-5 px-8 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-orange-400/30 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <ShoppingCart size={24} className="group-hover:animate-bounce" />
                    <span>Place Order Now</span>
                    <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                  
                  <p className="text-center text-sm text-gray-500">
                    Secure checkout • SSL encrypted • Easy returns
                  </p>
                </div>


              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Custom CSS Animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in-down {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  
  .animate-fade-in-down {
    animation: fade-in-down 0.8s ease-out forwards;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-slide-in-left {
    animation: slide-in-left 0.6s ease-out forwards;
  }
  
  .animate-slide-in-right {
    animation: slide-in-right 0.6s ease-out forwards;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
  
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

export default Cart;