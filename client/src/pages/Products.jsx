import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react'; // Install: npm install lucide-react

const products = [
  // Electronics
  { id: 1, title: "iPhone 17 Pro Max (256GB) Black Titanium", price: 144900, rating: 4.8, reviews: 1245, image: "https://m.media-amazon.com/images/I/71R8VsJ07nL._SX679_.jpg", category: "Electronics", tag: "New Launch" },
  { id: 2, title: "Samsung Galaxy S25 Ultra 5G (Titanium Silver)", price: 129999, rating: 4.7, reviews: 876, image: "https://hniesfp.imgix.net/8/images/detailed/1001/S25U128GB_TSB_1.jpg?fit=fill&bg=0FFF&w=1500&h=1000&auto=format,compress", category: "Electronics", tag: "Best Seller" },
  { id: 3, title: "Noise ColorFit Ultra 4 Smartwatch", price: 3499, rating: 4.5, reviews: 4521, image: "https://m.media-amazon.com/images/I/61gvNkugY4L._SX679_.jpg", category: "Electronics", tag: "Trending" },
  { id: 4, title: "boAt Airdopes 161 Pro TWS Earbuds", price: 1499, rating: 4.4, reviews: 7890, image: "https://m.media-amazon.com/images/I/41NcjJTXN5L._SY300_SX300_QL70_FMwebp_.jpg", category: "Electronics", tag: "Super Saver" },
  { id: 5, title: "OnePlus 15R (16GB+512GB) Midnight Ocean", price: 69999, rating: 4.6, reviews: 2341, image: "https://m.media-amazon.com/images/I/41WRtyMpHSL._SY300_SX300_QL70_FMwebp_.jpg", category: "Electronics", tag: "Flagship" },
  { id: 6, title: "Sony WH-1000XM6 Wireless Headphones", price: 29990, rating: 4.9, reviews: 3120, image: "https://m.media-amazon.com/images/I/61Y1KUYxmQL._SY450_.jpg", category: "Electronics", tag: "Premium Audio" },
  { id: 7, title: "Apple Watch Series 10 (46mm)", price: 49900, rating: 4.8, reviews: 1890, image: "https://m.media-amazon.com/images/I/41J2ByfeQwL._SX342_SY445_QL70_FMwebp_.jpg", category: "Electronics", tag: "New Release" },
  { id: 8, title: "JBL Tune 760NC Over-Ear Headphones", price: 5999, rating: 4.5, reviews: 4567, image: "https://m.media-amazon.com/images/I/71x1ljuwF8L._SY450_.jpg", category: "Electronics", tag: "Party Essential" },
  { id: 9, title: "Logitech MX Master 3S Wireless Mouse", price: 8999, rating: 4.7, reviews: 3214, image: "https://images.pexels.com/photos/7006947/pexels-photo-7006947.jpeg", category: "Electronics", tag: "Productivity" },
  { id: 10, title: "Sony PlayStation 5 Slim Console", price: 49990, rating: 4.8, reviews: 5432, image: "https://m.media-amazon.com/images/I/51afJC92cgL._SL1000_.jpg", category: "Electronics", tag: "Gaming" },

  // Fashion
  { id: 11, title: "Nike Air Max Sneakers (Men's)", price: 8999, rating: 4.6, reviews: 5678, image: "https://m.media-amazon.com/images/I/610L-9ZK7eL._SY695_.jpg", category: "Fashion", tag: "Fashion" },
  { id: 12, title: "Levi's Men's Slim Fit Jeans", price: 2499, rating: 4.4, reviews: 8901, image: "https://m.media-amazon.com/images/I/61UQ2kjdF8L._SY741_.jpg", category: "Fashion", tag: "Casual Wear" },
  { id: 13, title: "Puma Women's Running Shoes", price: 3499, rating: 4.5, reviews: 4321, image: "https://m.media-amazon.com/images/I/619d18a7h9L._SY500_.jpg", category: "Fashion", tag: "Sports" },
  { id: 14, title: "Ray-Ban Wayfarer Sunglasses", price: 7999, rating: 4.7, reviews: 6543, image: "https://m.media-amazon.com/images/I/614GABAKY3L._SX679_.jpg", category: "Fashion", tag: "Accessories" },
  { id: 15, title: "Adidas Men's Hoodie (Grey)", price: 2999, rating: 4.6, reviews: 3210, image: "https://m.media-amazon.com/images/I/41L-tFSf3EL._SX679_.jpg", category: "Fashion", tag: "Winter Wear" },
  { id: 16, title: "Zara Women's Summer Dress", price: 1999, rating: 4.3, reviews: 5678, image: "https://m.media-amazon.com/images/I/71FnJpw5J2L._SY741_.jpg", category: "Fashion", tag: "Fashion" },
  { id: 17, title: "Fastrack Analog Watch (Men's)", price: 1499, rating: 4.4, reviews: 7890, image: "https://m.media-amazon.com/images/I/718Z44GF0IL._SX679_.jpg", category: "Fashion", tag: "Accessories" },
  { id: 18, title: "BULLMER T-Shirt Pack (2 Pieces)", price: 999, rating: 4.2, reviews: 12345, image: "https://m.media-amazon.com/images/I/71KYZQHKduL._SY741_.jpg", category: "Fashion", tag: "Basics" },
  { id: 19, title: "Reebok Women's Leggings", price: 1299, rating: 4.5, reviews: 4567, image: "https://m.media-amazon.com/images/I/714tAle1nqL._SX569_.jpg", category: "Fashion", tag: "Activewear" },
  { id: 20, title: "Titan Women's Leather Wallet", price: 899, rating: 4.3, reviews: 3214, image: "https://m.media-amazon.com/images/I/613Zl7sRwML._SY575_.jpg", category: "Fashion", tag: "Accessories" },

  // Beauty
  { id: 21, title: "Lakme Absolute Matte Lipstick", price: 499, rating: 4.4, reviews: 8901, image: "https://m.media-amazon.com/images/I/61fJq3+BbSL._SL1000_.jpg", category: "Beauty", tag: "Makeup" },
  { id: 22, title: "Neutrogena Hydro Boost Moisturizer", price: 799, rating: 4.6, reviews: 6543, image: "https://m.media-amazon.com/images/I/51YTdG8RPSL._SY450_.jpg", category: "Beauty", tag: "Skincare" },
  { id: 23, title: "Gillette Fusion Razor Kit", price: 599, rating: 4.5, reviews: 12345, image: "https://m.media-amazon.com/images/I/41IdcG5xHUL._SY300_SX300_QL70_FMwebp_.jpg", category: "Beauty", tag: "Grooming" },
  { id: 24, title: "Maybelline New York Mascara", price: 349, rating: 4.3, reviews: 7890, image: "https://m.media-amazon.com/images/I/31O8dmASF6L._SY300_SX300_QL70_FMwebp_.jpg", category: "Beauty", tag: "Makeup" },
  { id: 25, title: "The Body Shop Tea Tree Face Wash", price: 899, rating: 4.7, reviews: 4321, image: "https://m.media-amazon.com/images/I/710wslGO8ZL._SL1500_.jpg", category: "Beauty", tag: "Skincare" },

  // Furniture
  { id: 26, title: "IKEA Wooden Coffee Table", price: 4999, rating: 4.4, reviews: 3210, image: "https://m.media-amazon.com/images/I/41rMMsE-+UL._SY300_SX300_QL70_FMwebp_.jpg", category: "Furniture", tag: "Home Decor" },
  { id: 27, title: "Godrej Study Chair (Ergonomic)", price: 3499, rating: 4.5, reviews: 5678, image: "https://m.media-amazon.com/images/I/71ziuV0YyYL._SL1500_.jpg", category: "Furniture", tag: "Office" },
  { id: 28, title: "Pepperfry Queen Size Bed", price: 19999, rating: 4.6, reviews: 2345, image: "https://m.media-amazon.com/images/I/71RgeM8+taL._SL1500_.jpg", category: "Furniture", tag: "Bedroom" },
  { id: 29, title: "Nilkamal Plastic Wardrobe (4 Doors)", price: 7999, rating: 4.3, reviews: 4567, image: "https://m.media-amazon.com/images/I/61MyTpBEn0L._SL1080_.jpg", category: "Furniture", tag: "Storage" },
  { id: 30, title: "Urban Ladder Sofa Set (3 Seater)", price: 24999, rating: 4.7, reviews: 1890, image: "https://m.media-amazon.com/images/I/61nltPdO7vL._SX569_.jpg", category: "Furniture", tag: "Living Room" },

  // Daily Essentials
  { id: 31, title: "Prestige Non-Stick Cookware Set", price: 1999, rating: 4.4, reviews: 6543, image: "https://m.media-amazon.com/images/I/51OUmYcUalL._SX569_.jpg", category: "Essentials", tag: "Kitchen" },
  { id: 32, title: "Tata Salt (1kg Pack)", price: 20, rating: 4.8, reviews: 123456, image: "https://m.media-amazon.com/images/I/51sKXCIV3+L._SY300_SX300_QL70_FMwebp_.jpg", category: "Essentials", tag: "Groceries" },
  { id: 33, title: "Dettol Antiseptic Liquid (500ml)", price: 149, rating: 4.7, reviews: 8901, image: "https://m.media-amazon.com/images/I/51Pk9xHMgGL._SY450_.jpg", category: "Essentials", tag: "Health" },
  { id: 34, title: "Colgate Toothpaste (200g Pack of 2)", price: 99, rating: 4.6, reviews: 76543, image: "https://m.media-amazon.com/images/I/41kzaFz6q5L._SY300_SX300_QL70_FMwebp_.jpg", category: "Essentials", tag: "Personal Care" },
  { id: 35, title: "Philips Air Fryer (4.1L)", price: 7999, rating: 4.5, reviews: 6543, image: "https://m.media-amazon.com/images/I/41exFmRRtqL._SX569_.jpg", category: "Essentials", tag: "Kitchen" },
  { id: 36, title: "Mi Power Bank 20000mAh", price: 2199, rating: 4.4, reviews: 9876, image: "https://m.media-amazon.com/images/I/21QnTw2-d9L._SY300_SX300_QL70_FMwebp_.jpg", category: "Essentials", tag: "Essentials" },
  { id: 37, title: "boAt Stone 1200F Bluetooth Speaker", price: 3999, rating: 4.3, reviews: 7654, image: "https://m.media-amazon.com/images/I/41FnJo9vp2L._SY300_SX300_QL70_FMwebp_.jpg", category: "Essentials", tag: "Audio" },
  { id: 38, title: "Himalaya Neem Face Wash", price: 199, rating: 4.5, reviews: 43210, image: "https://m.media-amazon.com/images/I/51ixwpTYK7L._SL1100_.jpg", category: "Essentials", tag: "Personal Care" },
  { id: 39, title: "Surf Excel Detergent Powder (2kg)", price: 299, rating: 4.6, reviews: 56789, image: "https://m.media-amazon.com/images/I/51xoF1fPbgL._SL1000_.jpg", category: "Essentials", tag: "Household" },
  { id: 40, title: "Dabur Honey (500g)", price: 249, rating: 4.7, reviews: 32145, image: "https://m.media-amazon.com/images/I/41RhjqOCLEL._SY300_SX300_QL70_FMwebp_.jpg", category: "Essentials", tag: "Groceries" },
  { id: 41, title: "Godrej Aer Pocket Air Freshener", price: 149, rating: 4.4, reviews: 23456, image: "https://m.media-amazon.com/images/I/516+BeHTRAL._SY300_SX300_QL70_FMwebp_.jpg", category: "Essentials", tag: "Household" },
  { id: 42, title: "Borosil Glass Water Bottle (1L)", price: 499, rating: 4.5, reviews: 1890, image: "https://m.media-amazon.com/images/I/419z9GCHy+L._SY300_SX300_QL70_FMwebp_.jpg", category: "Essentials", tag: "Kitchen" },
  { id: 43, title: "Prestige Induction Cooktop", price: 2499, rating: 4.6, reviews: 9876, image: "https://m.media-amazon.com/images/I/81z6RfbuUcL._SL1500_.jpg", category: "Electronics", tag: "Kitchen Appliances" },
  { id: 44, title: "Allen Solly Men's Leather Belt", price: 799, rating: 4.4, reviews: 5432, image: "https://m.media-amazon.com/images/I/71BB6lhheDL._SX679_.jpg", category: "Fashion", tag: "Fashion Accessories" },
  { id: 45, title: "Biozyme Performance Whey Protein Powder", price: 299, rating: 4.7, reviews: 23456, image: "https://m.media-amazon.com/images/I/71VnwikGbSL._SX679_.jpg", category: "Essentials", tag: "Wellness" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [sortOption, setSortOption] = useState("relevance");
  const { addToWishlist, removeFromWishlist, isInWishlist, wishlist } = useCart();

  // Update search query when URL parameter changes
  useEffect(() => {
    const newQuery = searchParams.get('q') || "";
    if (newQuery !== searchQuery) {
      setSearchQuery(newQuery);
    }
  }, [searchParams]);

  const categories = ["All", "Electronics", "Fashion", "Beauty", "Furniture", "Essentials"];

  // Filter and sort products
  let sortedProducts = products.filter(p => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  switch (sortOption) {
    case "price-low-high":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high-low":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "popularity":
      sortedProducts.sort((a, b) => b.reviews - a.reviews);
      break;
    case "newest":
      sortedProducts.sort((a, b) => b.id - a.id); // Assuming higher ID means newer
      break;
    case "relevance":
    default:
      // Keep original order when search is active, otherwise maintain default
      break;
  }

  const filteredProducts = sortedProducts;

  const toggleWishlist = (id) => {
    // Find the product by ID to pass to wishlist functions
    const product = products.find(p => p.id === id);
    if (product) {
      if (isInWishlist(id)) {
        removeFromWishlist(id);
      } else {
        addToWishlist(product);
      }
    }
  };

  return (
    <section className="py-10 md:py-16 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Discover Our Products
            </h1>
            <p className="mt-3 text-lg text-gray-600">
              Explore by category • Best prices • Fast delivery
            </p>
          </div>

          <div className="flex items-center gap-4">
           
            <select
              value={sortOption}
              onChange={(e) => {
                setSortOption(e.target.value);
                if (searchQuery) {
                  setSearchParams({ q: searchQuery, sort: e.target.value });
                } else {
                  setSearchParams({ sort: e.target.value });
                }
              }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Relevance</option>
              <option value="popularity">Popularity</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 text-sm md:text-base font-medium rounded-full transition-all duration-300 shadow-sm transform hover:scale-105
                ${selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-300'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="block">
                <div
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/300x300?text=Product"; }}
                    />

                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm z-10">
                      {product.tag}
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 z-20">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
                        className="p-3 bg-white rounded-full hover:bg-gray-100 transition transform hover:scale-110"
                        title="Add to Wishlist"
                      >
                        <Heart
                          size={22}
                          className={isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-700"}
                        />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-white rounded-full hover:bg-gray-100 transition transform hover:scale-110"
                        title="Quick View"
                      >
                        <Eye size={22} className="text-gray-700" />
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-110"
                        title="Add to Cart"
                      >
                        <ShoppingCart size={22} />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews.toLocaleString()})
                      </span>
                    </div>

                    <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[3rem] group-hover:text-blue-600 transition-colors text-base">
                      {product.title}
                    </h3>

                    <div className="mt-4">
                      <span className="text-2xl md:text-3xl font-bold text-gray-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-xl font-medium">
            No products found in this category yet...
          </div>
        )}

        {/* <div className="mt-16 text-center">
          <button className="px-12 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105">
            Load More Products
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Products;