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
    <header className="bg-gradient-to-r from-white via-gray-50 to-white border-b border-gray-200 sticky top-0 z-50 shadow-xl backdrop-blur-md header-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo + Navigation Links (Left Side) */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 hover:text-blue-600 transition-all duration-500 transform hover:scale-105"
            >
              Shop<span className="text-blue-600 drop-shadow-lg animate-pulse-slow">Kart</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md nav-link"
              >
                Home
              </Link>
              
              <Link
                to="/products"
                className="px-4 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md nav-link"
              >
                Products
              </Link>
              
              <Link
                to="/about"
                className="px-4 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md nav-link"
              >
                About
              </Link>
              
              <Link
                to="/contact"
                className="px-4 py-2 text-sm font-semibold text-gray-800 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-md nav-link"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Search (Center - Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for products, brands and more..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-5 py-3 bg-white border-2 border-gray-200 rounded-2xl text-sm shadow-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:shadow-xl outline-none transition-all duration-300 search-input"
                />
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-blue-600 transition-all duration-300 cursor-pointer transform group-hover:scale-110"
                  onClick={handleSearch}
                />
              </div>
            </form>
          </div>

          {/* Actions (Right Side) */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-800 hover:text-blue-600 transition-all duration-300 transform hover:scale-110"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} className="transition-transform duration-300" /> : <Menu size={28} className="transition-transform duration-300" />}
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 cart-icon"
            >
              <div className="relative">
                <ShoppingBag size={24} strokeWidth={2} className="transition-all duration-300" />
                {isAuthenticated && cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce-subtle">
                    {cartItems.length}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-xs font-medium">Cart</span>
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex items-center gap-1 text-gray-700 hover:text-red-600 transition-all duration-300 transform hover:scale-110 wishlist-icon"
            >
              <div className="relative">
                <Heart size={22} strokeWidth={2} className="transition-all duration-300 hover:fill-red-500" />
                {isAuthenticated && wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce-subtle">
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
                className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 login-btn"
              >
                <User size={18} /> Login
              </Link>
            )}

            {/* Account Dropdown */}
            {isAuthenticated && (
              <div className="relative hidden md:block">
                <button
                  ref={accountDropdownButtonRef}
                  onClick={() => setOpen(!open)}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 account-btn"
                >
                  <User size={18} /> Account <ChevronDown size={16} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
                </button>

                {open && <div ref={accountDropdownRef}><AccountDropdown /></div>}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search + Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 px-4 py-6 mobile-menu-container">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-base focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 shadow-md"
              />
              <Search size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer" onClick={handleSearch} />
            </div>
          </form>

          {/* Mobile Navigation */}
          <nav className="space-y-4 text-lg font-semibold text-gray-800">
            <Link to="/" className="block py-3 px-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 mobile-nav-item">Home</Link>
            <Link to="/products" className="block py-3 px-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 mobile-nav-item">Products</Link>
            <Link to="/about" className="block py-3 px-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 mobile-nav-item">About</Link>
            <Link to="/contact" className="block py-3 px-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 mobile-nav-item">Contact</Link>
            <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-blue-50 transition-all duration-300">
              <Link to="/cart" className="block hover:text-blue-600 transition-colors flex-1 mobile-cart-item">Cart</Link>
              {isAuthenticated && cartItems.length > 0 && (
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ml-2 shadow-md">
                  {cartItems.length}
                </span>
              )}
            </div>
            <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-red-50 transition-all duration-300">
              <Link to="/wishlist" className="block hover:text-red-600 transition-colors flex-1 mobile-wishlist-item">Wishlist</Link>
              {isAuthenticated && wishlist.length > 0 && (
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ml-2 shadow-md">
                  {wishlist.length}
                </span>
              )}
            </div>
            <Link to="/profile" className="block py-3 px-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 mobile-nav-item">Profile</Link>
            <Link to="/orders" className="block py-3 px-4 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 transform hover:translate-x-2 mobile-nav-item">My Orders</Link>
            <Link to="/login" className="block py-3 px-4 rounded-xl text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-300 transform hover:translate-x-2 mobile-nav-item">Login</Link>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/');
              }} 
              className="block w-full text-left py-3 px-4 rounded-xl text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300 transform hover:translate-x-2 mobile-nav-item"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;