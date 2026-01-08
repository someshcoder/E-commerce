// Wishlist.jsx - Premium Wishlist Page
import { useCart } from '../context/CartContext';
import { Trash2, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist, addToCart } = useCart();

  return (
    <div className="bg-gray-50/50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
              <ArrowLeft size={20} /> Continue Shopping
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              My Wishlist ({wishlist.length})
            </h1>
          </div>

          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-2"
            >
              <Trash2 size={18} /> Clear Wishlist
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Heart size={80} className="mx-auto text-gray-300 mb-6" strokeWidth={1} />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Save your favorite products here to buy them later!
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="relative h-64 bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.mrp.toLocaleString()}
                      </span>
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

export default Wishlist;