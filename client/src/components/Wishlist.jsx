// Wishlist.jsx - Premium Wishlist Page
import { useCart } from '../context/CartContext';
import { Trash2, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist, addToCart } = useCart();

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
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-2">
                {wishlist.length > 0 ? (
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                    {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved for later
                  </span>
                ) : 'Your wishlist is empty'}
              </p>
            </div>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="group px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl font-semibold flex items-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-red-400/30 backdrop-blur-sm"
            >
              <Trash2 size={20} className="group-hover:rotate-12 transition-transform" />
              Clear All
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-2xl p-12 text-center border border-gray-100/50 backdrop-blur-sm animate-fade-in-up">
            <div className="relative inline-block mb-8">
              <Heart size={120} className="mx-auto text-pink-300 mb-6" strokeWidth={1} />
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-red-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Heart size={24} className="text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Your Wishlist Feels Lonely
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Save your favorite products here to buy them later. Start exploring amazing deals today!
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
              className="group inline-flex items-center gap-4 bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white px-12 py-6 rounded-2xl font-bold text-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-pink-400/30 backdrop-blur-sm shadow-xl"
            >
              <span>Explore Products</span>
              <ArrowLeft size={24} className="group-hover:-translate-x-2 transition-transform rotate-180" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlist.map((product, index) => (
              <div
                key={product.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <Link to={`/product/${product.id}`} className="block">
                    <div className="relative h-64 bg-gradient-to-br from-gray-50 to-white p-8 flex items-center justify-center group-hover:from-pink-50 group-hover:to-red-50 transition-all duration-300">
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="max-h-44 w-full object-contain transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                      </div>
                    </div>
                  </Link>
                  
                  {/* Heart Icon Overlay */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group/btn"
                  >
                    <Heart size={20} className="group-hover/btn:fill-current" />
                  </button>
                </div>

                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-xl text-gray-900 line-clamp-2 mb-3 group-hover:text-pink-600 transition-all duration-300">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm font-medium mb-4">
                    <Heart size={14} className="text-red-500" />
                    Saved Item
                  </div>

                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
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

                  <div className="flex gap-3">
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="flex-1 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-50 transition"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => addToCart({...product, quantity: 1})}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  
  .animate-fade-in-down {
    animation: fade-in-down 0.8s ease-out forwards;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default Wishlist;