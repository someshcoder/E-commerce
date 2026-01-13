import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ShoppingBag, Search, User, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "../context/CartContext";
import AccountDropdown from "./AccountDropdown";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [searchParams] = useSearchParams();
  const { cartItems, wishlist } = useCart();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const accountDropdownRef = useRef(null);
  const accountDropdownButtonRef = useRef(null);
  const navigate = useNavigate();
  
  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && accountDropdownButtonRef.current && !accountDropdownButtonRef.current.contains(event.target) && 
          accountDropdownRef.current && !accountDropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // Update search query when URL parameter changes
  useEffect(() => {
    const newQuery = searchParams.get('q') || "";
    setSearchQuery(newQuery);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`);
    } else {
      // If search query is empty, navigate to products page without query parameter
      navigate('/products');
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Navigate to products page with the search query in real-time
    if (value.trim()) {
      navigate(`/products?q=${encodeURIComponent(value)}`);
    } else {
      // If search query is empty, navigate to products page without query parameter
      navigate('/products');
    }
  };

  return (
    <header className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 sticky top-0 z-50 shadow-lg backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo + Navigation Links (Left Side) */}
          <div className="flex items-center gap-1 lg:gap-2">
            {/* Logo */}
            <Link
              to="/"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 hover:text-blue-600 transition-all duration-300"
            >
              Shop<span className="text-blue-600 drop-shadow-md">Kart</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              <Link
                to="/"
                className="px-3 py-1.5 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
              >
                Home
              </Link>
              
              <Link
                to="/products"
                className="px-3 py-1.5 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
              >
                Products
              </Link>
              
              <Link
                to="/about"
                className="px-3 py-1.5 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
              >
                About
              </Link>
              
              <Link
                to="/contact"
                className="px-3 py-1.5 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Search (Center - Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-2">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-5 py-2.5 bg-white border border-gray-200 rounded-full text-sm shadow-inner focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-lg outline-none transition-all duration-300"
                />
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-blue-600 transition-colors cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </form>
          </div>

          {/* Actions (Right Side) */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-800 hover:text-blue-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-all duration-300"
            >
              <div className="relative">
                <ShoppingBag size={22} strokeWidth={1.8} />
                {isAuthenticated && cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse-once">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-xs font-medium">Cart</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex items-center gap-1 text-gray-700 hover:text-red-600 transition-all duration-300"
            >
              <div className="relative">
                <Heart size={20} strokeWidth={1.8} className="hover:fill-red-500 transition-all duration-300" />
                {isAuthenticated && wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse-once">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-xs font-medium">Wishlist</span>
            </Link>

            {/* Login Button (Prominent) */}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <User size={16} /> Login
              </Link>
            )}

            {/* Account Dropdown */}
            {isAuthenticated && (
              <div className="relative hidden md:block">
                <button
                  ref={accountDropdownButtonRef}
                  onClick={() => setOpen(!open)}
                  className="hidden md:flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <User size={16} /> Account <ChevronDown size={14} />
                </button>

                {open && <div ref={accountDropdownRef}><AccountDropdown /></div>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search + Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-6 animate-slideDown">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-full text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <Search size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" onClick={handleSearch} />
            </div>
          </form>

          {/* Mobile Navigation */}
          <nav className="space-y-5 text-lg font-semibold text-gray-800">
            <Link to="/" className="block hover:text-blue-600 transition-colors">Home</Link>
            <Link to="/products" className="block hover:text-blue-600 transition-colors">Products</Link>
            <Link to="/about" className="block hover:text-blue-600 transition-colors">About</Link>
            <Link to="/contact" className="block hover:text-blue-600 transition-colors">Contact</Link>
            <div className="flex items-center justify-between">
              <Link to="/cart" className="block hover:text-blue-600 transition-colors flex-1">Cart</Link>
              {isAuthenticated && cartItems.length > 0 && (
                <span className="bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-2">
                  {cartItems.length}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Link to="/wishlist" className="block hover:text-blue-600 transition-colors flex-1">Wishlist</Link>
              {isAuthenticated && wishlist.length > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-2">
                  {wishlist.length}
                </span>
              )}
            </div>
            <Link to="/profile" className="block hover:text-blue-600 transition-colors">Profile</Link>
            <Link to="/orders" className="block hover:text-blue-600 transition-colors">My Orders</Link>
            <Link to="/settings" className="block hover:text-blue-600 transition-colors">Settings</Link>
            <Link to="/login" className="block text-blue-600 hover:text-blue-700 transition-colors">Login</Link>
            <button onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            navigate('/');
                          }} className="block text-red-600 hover:text-red-700 transition-colors w-full text-left">Logout</button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;