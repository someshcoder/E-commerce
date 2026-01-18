import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import { Star, ChevronLeft, ChevronRight, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

const TopDealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);



  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        
        // Fetch from TopDeals collection only
        const topDealResponse = await fetch(`http://localhost:5000/api/topdeals/${id}`);
        if (!topDealResponse.ok) {
          // If not found in TopDeals, redirect to regular product page
          window.location.href = `/product/${id}`;
          return;
        }
        const productData = await topDealResponse.json();
        setProduct(productData);
        
        // Fetch related products from the same category (from products collection)
        if (productData.category) {
          const relatedResponse = await fetch(`http://localhost:5000/api/products?category=${productData.category}&limit=4`);
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            // Filter out the current product from related products
            const filteredRelated = relatedData.filter(p => p.id !== productData.id);
            setRelatedProducts(filteredRelated);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching top deal product:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductAndRelated();
  }, [id]);



  // For image carousel auto-scroll (optional)
  useEffect(() => {
    if (!product || !product.images || product.images.length === 0) return;
    
    const timer = setInterval(() => {
      setSelectedImage(prev => (prev + 1) % product.images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [product?.images?.length]);

  if (loading) {
    return <div className="text-center py-20 text-2xl">Loading...</div>;
  }
  
  if (error || !product) {
    return <div className="text-center py-20 text-2xl">{error || 'Product not found'}</div>;
  }

  return (
    <div className="bg-gray-50/50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          Home {product.category && `/ ${product.category}`} / <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Images Section */}
          <div className="space-y-6">
            {/* Main Image with Zoom */}
            <div className="relative bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg group">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-[500px] md:h-[600px] object-contain transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center bg-gray-100">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm">
                Hover to Zoom
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {product.images && product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200
                    ${selectedImage === index ? 'border-blue-600 shadow-lg' : 'border-gray-200 hover:border-gray-400'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-8">
            {/* Title & Rating */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  {product.title}
                </h1>
                {product.tag && (
                  <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold">
                    {product.tag}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4">
                {product.rating && (
                  <div className="flex items-center bg-green-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                    {product.rating} <Star size={16} className="ml-1 fill-white" />
                  </div>
                )}
                {product.reviews && (
                  <span className="text-gray-600 text-sm">
                    {product.reviews.toLocaleString()} Ratings
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-end gap-3">
                {product.price && (
                  <div className="text-4xl md:text-5xl font-bold text-gray-900">
                    ₹{(product.price * quantity).toLocaleString()}
                  </div>
                )}
                {product.mrp && product.mrp > product.price && (
                  <div className="text-xl text-gray-500 line-through mb-2">
                    ₹{(product.mrp * quantity).toLocaleString()}
                  </div>
                )}
              </div>
              
              {product.discount && product.discount > 0 && (
                <div className="mt-2">
                  <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.discount}% OFF - Save ₹{((product.mrp - product.price) * quantity).toLocaleString()}
                  </span>
                </div>
              )}
              
              {product.price && (
                <p className="text-sm text-gray-500 mt-2">₹{product.price.toLocaleString()} × {quantity} item{quantity > 1 ? 's' : ''}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-white border border-gray-300 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-5 py-3 text-xl font-bold hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="px-8 py-3 text-xl font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-5 py-3 text-xl font-bold hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>

              <div className="flex-1 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    // Redirect to checkout page with product data
                    if (product) {
                      navigate('/checkout', { state: { product: {...product, quantity: quantity || 1}, buyNow: true } });
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition shadow-lg hover:shadow-xl"
                  disabled={!product}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Delivery & Offers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <Truck size={24} className="text-blue-600" />
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className="text-gray-600">Get by 2-4 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <ShieldCheck size={24} className="text-green-600" />
                <div>
                  <p className="font-medium">1 Year Warranty</p>
                  <p className="text-gray-600">Brand warranty included</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200">
                <RefreshCw size={24} className="text-purple-600" />
                <div>
                  <p className="font-medium">7 Days Replacement</p>
                  <p className="text-gray-600">If defective</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">About this item</h2>
              {product.description && (
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              )}
            </div>

            {/* Specifications */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs && product.specs.map((spec, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-600 font-medium">{spec.key}</span>
                    <span className="text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TopDealDetail;
