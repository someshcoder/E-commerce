import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import TopDealDetail from "./pages/TopDealDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />

        <Routes>
          {/* Public Routes - Accessible to everyone */}
          <Route path="/" element={<ProtectedRoute isPublic={true}><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute isPublic={true}><About /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute isPublic={true}><Contact /></ProtectedRoute>} />
          <Route path="/login" element={<ProtectedRoute isPublic={true}><Login /></ProtectedRoute>} />
          <Route path="/register" element={<ProtectedRoute isPublic={true}><Register /></ProtectedRoute>} />
          
          {/* Private Routes - Require authentication */}
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
          <Route path="/topdeal/:id" element={<ProtectedRoute><TopDealDetail /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
