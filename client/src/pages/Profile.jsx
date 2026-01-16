import React, { useState, useEffect, useRef, Children } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Package,
  Star,
  TrendingUp,
  Award,
  Bell,
  Mail,
  Phone,
  Edit2,
  Camera,
  ChevronRight,
  Gift,
  Truck,
  CheckCircle,
  Clock,
  HelpCircle,
  Plus,
  Trash2,
  X
} from 'lucide-react';
// Using Tailwind CSS classes instead of shadcn/ui components

// Simple component replacements
const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white rounded-xl border shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const Badge = ({ children, className = '', ...props }) => {
  // Extract status-related classes and convert to actual Tailwind classes
  const statusClasses = className.includes('bg-green') ? 'bg-green-100 text-green-700 border-green-200' :
    className.includes('bg-blue') ? 'bg-blue-100 text-blue-700 border-blue-200' :
      className.includes('bg-yellow') ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
        className.includes('bg-red') ? 'bg-red-100 text-red-700 border-red-200' :
          className.includes('bg-gray') ? 'bg-gray-100 text-gray-700 border-gray-200' :
            className.includes('bg-purple') ? 'bg-purple-100 text-purple-700 border-purple-200' :
              className.includes('bg-orange') ? 'bg-orange-100 text-orange-700 border-orange-200' :
                'bg-gray-100 text-gray-700 border-gray-200';
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statusClasses} ${className}`} {...props}>
      {children}
    </span>
  );
};

const Button = ({ children, variant = 'default', className = '', size = 'default', ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';

  const variantClasses = variant === 'outline' ? 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700' :
    variant === 'ghost' ? 'hover:bg-gray-100 text-gray-700' :
      'bg-blue-600 text-white hover:bg-blue-700';

  const sizeClasses = size === 'sm' ? 'h-8 px-3 text-xs' : size === 'lg' ? 'h-12 px-8 text-base' : 'h-10 px-4 py-2';

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Avatar components
const Avatar = ({ children, className = '' }) => (
  <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img src={src} alt={alt} className="aspect-square h-full w-full" />
);

const AvatarFallback = ({ children, className = '' }) => (
  <div className={`flex h-full w-full items-center justify-center rounded-full bg-gray-100 ${className}`}>
    {children}
  </div>
);

const Progress = ({ value, className = '' }) => {
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
      <div
        className="h-full w-full flex-1 bg-blue-600 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </div>
  );
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Load user data from localStorage or use default values
  const [userData, setUserData] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserData = storedUser ? JSON.parse(storedUser) : null;

    return {
      name: storedUserData?.name || 'Guest User',
      email: storedUserData?.email || 'guest@example.com',
      phone: storedUserData?.phone || '+91 98765 43210',
      avatar: storedUserData?.avatar || 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHBlcnNvbnxlbnwxfHx8fDE3NjgxMjA0MjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      memberSince: storedUserData?.memberSince || 'January 2024',
      loyaltyPoints: storedUserData?.loyaltyPoints || 2450,
      tier: storedUserData?.isAdmin ? 'Gold Member' : 'Member',
      totalOrders: storedUserData?.totalOrders || 47,
      totalSpent: storedUserData?.totalSpent || 124500,
      isAdmin: storedUserData?.isAdmin || false
    };
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Fetch user's orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/orders/my-orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          // Transform the order data to match the UI format
          const transformedOrders = data.map(order => {
            const totalAmount = order.products.reduce((sum, item) => {
              return sum + (item.productId.price * item.quantity);
            }, 0);
            
            return {
              id: `#${order._id.substring(0, 8)}`,
              date: new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
              items: order.products.length,
              total: totalAmount,
              status: order.status,
              image: order.products[0]?.productId?.image || 'https://placehold.co/400x400?text=No+Image',
              _id: order._id // Store the actual order ID for tracking
            };
          });
          
          setRecentOrders(transformedOrders);
          
          // Update user stats
          setUserData(prevData => ({
            ...prevData,
            totalOrders: data.length,
            totalSpent: transformedOrders.reduce((sum, order) => sum + order.total, 0)
          }));
          
          console.log('Fetched orders:', data); // Debug log
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch orders:', errorData);
          // Set loading to false even on error
          setLoadingOrders(false);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  const wishlistItems = [
    {
      id: 1,
      name: 'Premium Leather Jacket',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1630948688037-aa88dc433a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY2xvdGhpbmclMjBwcm9kdWN0fGVufDF8fHx8MTc2ODIzNzY2OXww&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: true,
      discount: 20
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1762513461072-5008c7f6511d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3YXRjaCUyMGFjY2Vzc29yaWVzfGVufDF8fHx8MTc2ODIwMjYzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: true,
      discount: 0
    },
    {
      id: 3,
      name: 'Designer Sneakers',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1765875485100-1afe930265ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzaG9lcyUyMHNuZWFrZXJzfGVufDF8fHx8MTc2ODIzODkzN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      inStock: false,
      discount: 15
    }
  ];

  // State for address management
  const [userAddresses, setUserAddresses] = useState([
    {
      id: 1,
      type: 'Home',
      name: userData.name || 'User Name',
      address: '123, Main Street, City - 123456',
      phone: userData.phone || '+91 98765 43210',
      default: true
    },
    {
      id: 2,
      type: 'Office',
      name: userData.name || 'User Name',
      address: '456, Business Park, Sector 15, City - 123456',
      phone: userData.phone || '+91 98765 43210',
      default: false
    }
  ]);
  
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    type: 'Home',
    name: userData.name || '',
    address: '',
    phone: userData.phone || '',
    default: false
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'In Transit':
        return <Truck className="w-4 h-4" />;
      case 'Processing':
        return <Clock className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.match('image.*')) {
        setErrors({ ...errors, image: 'Please select an image file' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: 'File size exceeds 5MB limit' });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditUserData({ ...editUserData, avatar: reader.result });
        setErrors({ ...errors, image: null });
      };
      reader.readAsDataURL(file);
    }
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!editUserData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (editUserData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (editUserData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Validate email
    if (!editUserData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editUserData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!editUserData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      // Basic phone validation - can be more specific based on requirements
      const phoneRegex = /^[+]?[0-9\s\-()]{10,15}$/;
      if (!phoneRegex.test(editUserData.phone.trim())) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Address management functions
  const handleSaveAddress = () => {
    // Simple validation
    if (!addressForm.name.trim() || !addressForm.address.trim() || !addressForm.phone.trim()) {
      alert('Please fill all required fields');
      return;
    }
    
    if (editingAddress) {
      // Update existing address
      setUserAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { ...addressForm, id: editingAddress.id }
          : addr
      ));
    } else {
      // Add new address
      const newAddress = {
        ...addressForm,
        id: Date.now() // Simple ID generation
      };
      setUserAddresses(prev => [...prev, newAddress]);
    }
    
    setShowAddressModal(false);
    setEditingAddress(null);
  };
  
  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setAddressForm({
      type: address.type,
      name: address.name,
      address: address.address,
      phone: address.phone,
      default: address.default
    });
    setShowAddressModal(true);
  };
  
  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setUserAddresses(prev => prev.filter(addr => addr.id !== addressId));
    }
  };
  
  const handleSetDefault = (addressId) => {
    setUserAddresses(prev => prev.map(addr => ({
      ...addr,
      default: addr.id === addressId
    })));
  };

  // Handle save profile
  const handleSaveProfile = () => {
    if (validateForm()) {
      // In a real application, you would make an API call here to save the data
      // For now, we'll just update the local state and close the modal
      console.log('Profile updated:', editUserData);

      // Update the main userData to reflect changes on the profile page
      setUserData(prevData => ({
        ...prevData,
        name: editUserData.name,
        email: editUserData.email,
        phone: editUserData.phone,
        avatar: editUserData.avatar
      }));

      // Update the user data in localStorage to persist changes
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userDataObj = JSON.parse(storedUser);
        const updatedUserData = {
          ...userDataObj,
          name: editUserData.name,
          email: editUserData.email,
          phone: editUserData.phone,
          avatar: editUserData.avatar
        };
        localStorage.setItem('user', JSON.stringify(updatedUserData));
      }

      setIsEditing(false);

      // Update the main userData (in a real app, this would come from API response)
      // For demo purposes, we'll just log that the update was successful
      alert('Profile updated successfully!');
    }
  };
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Avatar Section */}
                <div className="relative group">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-2xl ring-4 ring-white/30">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="text-3xl">{userData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl text-white">{userData.name}</h1>
                    {userData.isAdmin && (
                      <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 w-fit mx-auto md:mx-0">
                        <Award className="w-4 h-4 mr-1" />
                        {userData.tier}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 text-white/90 mb-4">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{userData.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{userData.phone}</span>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-2 mb-1">
                        <ShoppingBag className="w-5 h-5 text-white" />
                        <span className="text-2xl text-white">{userData.totalOrders}</span>
                      </div>
                      <p className="text-white/80 text-sm">Total Orders</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-5 h-5 text-white" />
                        <span className="text-2xl text-white">₹{(userData.totalSpent / 1000).toFixed(0)}K</span>
                      </div>
                      <p className="text-white/80 text-sm">Total Spent</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Gift className="w-5 h-5 text-white" />
                        <span className="text-2xl text-white">{userData.loyaltyPoints}</span>
                      </div>
                      <p className="text-white/80 text-sm">Reward Points</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-5 h-5 text-white" />
                        <span className="text-2xl text-white">4.9</span>
                      </div>
                      <p className="text-white/80 text-sm">Rating</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg font-medium"
                  onClick={() => {
                    setIsEditing(true);
                    setEditUserData({
                      name: userData.name,
                      email: userData.email,
                      phone: userData.phone,
                      avatar: userData.avatar,
                    });
                    setImagePreview(userData.avatar);
                    setErrors({});
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>

                {/* Edit Profile Modal */}
                {isEditing && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

                        {/* Profile Photo Section */}
                        <div className="flex flex-col items-center mb-6">
                          <div className="relative group mb-4">
                            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                              {imagePreview ? (
                                <AvatarImage src={imagePreview} alt="Profile Preview" />
                              ) : (
                                <AvatarFallback className="text-2xl">{userData.name.charAt(0)}</AvatarFallback>
                              )}
                            </Avatar>
                            <button
                              type="button"
                              className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all"
                              onClick={() => fileInputRef.current?.click()}
                            >
                              <Camera className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                          <p className="text-sm text-gray-500">Click camera icon to upload new photo</p>
                        </div>

                        {/* Name Input */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            value={editUserData.name}
                            onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-md ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your name"
                          />
                          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            value={editUserData.email}
                            onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your email"
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone Input */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            value={editUserData.phone}
                            onChange={(e) => setEditUserData({ ...editUserData, phone: e.target.value })}
                            className={`w-full px-3 py-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your phone number"
                          />
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => {
                              setIsEditing(false);
                              setErrors({});
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="button"
                            className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                            onClick={handleSaveProfile}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Loyalty Progress */}
              <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white">Loyalty Progress to Platinum</span>
                  <span className="text-white">{userData.loyaltyPoints} / 5000 points</span>
                </div>
                <Progress value={(userData.loyaltyPoints / 5000) * 100} className="h-3 bg-white/30" />
                <p className="text-white/80 text-sm mt-2">Earn {5000 - userData.loyaltyPoints} more points to unlock exclusive benefits!</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content with Tab Navigation */}
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 bg-white shadow-md p-1 h-auto justify-start">
            <button
              className={`px-4 py-2 rounded-lg font-medium text-sm ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('overview')}
            >
              <User className="w-4 h-4 mr-2 inline" />
              Overview
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium text-sm ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package className="w-4 h-4 mr-2 inline" />
              Orders
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium text-sm ${activeTab === 'addresses' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin className="w-4 h-4 mr-2 inline" />
              Addresses
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium text-sm ${activeTab === 'help'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
              onClick={() => setActiveTab('help')}
            >
              <HelpCircle className="w-4 h-4 mr-2 inline" />
              Help Center
            </button>

          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <Card className="lg:col-span-1 shadow-lg border-0">
                  <div className="p-6">
                    <h3 className="text-xl mb-4 flex items-center gap-2">
                      <span>Quick Actions</span>
                    </h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-blue-50 transition-all border border-gray-200 hover:border-blue-300 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <ShoppingBag className="w-5 h-5 text-blue-600" />
                          </div>
                          <span>Track Orders</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-green-50 transition-all border border-gray-200 hover:border-green-300 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <CreditCard className="w-5 h-5 text-green-600" />
                          </div>
                          <span>Payment Methods</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>

                      <button className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-orange-50 transition-all border border-gray-200 hover:border-orange-300 hover:shadow-md">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-100 rounded-lg">
                            <Bell className="w-5 h-5 text-orange-600" />
                          </div>
                          <span>Notifications</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="lg:col-span-2 shadow-lg border-0">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl flex items-center gap-2">
                        Recent Orders
                      </h3>
                      <Button variant="ghost" className="text-blue-600">
                        View All
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {loadingOrders ? (
                        <div className="text-center py-8">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          <p className="mt-2 text-gray-600">Loading orders...</p>
                        </div>
                      ) : recentOrders.length > 0 ? (
                        recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                            <img
                              src={order.image}
                              alt="Order"
                              className="w-20 h-20 rounded-lg object-cover"
                              onError={(e) => {
                                e.target.src = 'https://placehold.co/80x80?text=No+Image';
                              }}
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-blue-600">{order.id}</span>
                                <Badge className={`${getStatusColor(order.status)} border flex items-center gap-1`}>
                                  {getStatusIcon(order.status)}
                                  {order.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{order.date}</span>
                                <span>•</span>
                                <span>{order.items} items</span>
                                <span>•</span>
                                <span className="text-gray-900">₹{order.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <div className="text-gray-500 mb-2">No orders yet</div>
                          <p className="text-gray-400">Your order history will appear here</p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <Card className="shadow-lg border-0">
              <div className="p-6">
                <h3 className="text-xl mb-6">Order History</h3>
                <div className="space-y-4">
                  {loadingOrders ? (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <p className="mt-2 text-gray-600">Loading orders...</p>
                    </div>
                  ) : recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <div key={order.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all">
                        <img
                          src={order.image}
                          alt="Order"
                          className="w-24 h-24 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/96x96?text=No+Image';
                          }}
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-600">{order.id}</span>
                            <Badge className={`${getStatusColor(order.status)} border flex items-center gap-1`}>
                              {getStatusIcon(order.status)}
                              {order.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{order.date}</span>
                            <span>•</span>
                            <span>{order.items} items</span>
                          </div>
                          <div className="text-lg text-gray-900">₹{order.total.toLocaleString()}</div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                          {!userData.isAdmin && (
                            <Button
                              className="flex-1 md:flex-none"
                              variant="outline"
                              onClick={() => {
                                // Pass the actual order ID for tracking
                                setSelectedOrder(order);
                                setShowTracker(true);
                              }}
                            >
                              Track Order
                            </Button>
                          )}
                          <Button 
                            className="flex-1 md:flex-none"
                            onClick={() => {
                              // Navigate to the actual order details page
                              navigate(`/order/${order._id}`);
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500 mb-2">No orders yet</div>
                      <p className="text-gray-400">Your order history will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}



          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <Card className="shadow-lg border-0">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl">Saved Addresses</h3>
                  <Button onClick={() => {
                    setEditingAddress(null);
                    setAddressForm({
                      type: 'Home',
                      name: userData.name || '',
                      address: '',
                      phone: userData.phone || '',
                      default: userAddresses.length === 0
                    });
                    setShowAddressModal(true);
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Address
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userAddresses.length > 0 ? (
                    userAddresses.map((address) => (
                    <div key={address.id} className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all relative">
                      {address.default && (
                        <Badge className="absolute top-4 right-4 bg-green-100 text-green-700 border-green-200">
                          Default
                        </Badge>
                      )}
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <MapPin className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4>{address.type}</h4>
                          </div>
                          <p className="text-gray-900 mb-1">{address.name}</p>
                          <p className="text-gray-600 text-sm mb-2">{address.address}</p>
                          <p className="text-gray-600 text-sm flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            {address.phone}
                          </p>
                          <div className="flex gap-2 mt-4">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => handleEditAddress(address)}
                            >
                              <Edit2 className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            {!address.default && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleSetDefault(address.id)}
                              >
                                Set Default
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteAddress(address.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                        <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-medium text-gray-700 mb-2">No addresses saved</h3>
                        <p className="text-gray-500 mb-6">Add your delivery addresses to make checkout faster</p>
                        <Button 
                          onClick={() => {
                            setEditingAddress(null);
                            setAddressForm({
                              type: 'Home',
                              name: userData.name || '',
                              address: '',
                              phone: userData.phone || '',
                              default: true
                            });
                            setShowAddressModal(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Your First Address
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}
          {/* Track Order Modal */}
          {showTracker && selectedOrder && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl w-full max-w-xl shadow-xl">

                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="text-lg font-semibold">
                    🚚 Tracking Order: {selectedOrder.id}
                  </h3>
                  <button
                    onClick={() => setShowTracker(false)}
                    className="text-gray-500 hover:text-gray-800 text-xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">

                  {/* ✅ Order Status Timeline */}
                  <div>
                    <h4 className="font-medium mb-3">Order Status</h4>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex flex-col items-center text-green-600">
                        <CheckCircle />
                        <span>Placed</span>
                      </div>

                      <div className="flex flex-col items-center text-green-600">
                        <Package />
                        <span>Packed</span>
                      </div>

                      <div className="flex flex-col items-center text-blue-600">
                        <Truck />
                        <span>Shipped</span>
                      </div>

                      <div className="flex flex-col items-center text-gray-400">
                        <Clock />
                        <span>Delivered</span>
                      </div>
                    </div>
                  </div>

                  {/* ✅ Tracking Information Card */}
                  <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                    <h4 className="font-medium">Tracking Info</h4>
                    <p><b>Tracking ID:</b> TRK{selectedOrder.id.replace('#', '')}</p>
                    <p><b>Courier:</b> BlueDart Express</p>
                    <p><b>Expected Delivery:</b> 2–3 Days</p>
                    <p><b>Delivery Address:</b> New Delhi, India</p>
                  </div>

                  {/* ✅ Live Status Message */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700">
                    📢 Your order is currently <b>{selectedOrder.status}</b> and moving smoothly 🚀
                  </div>

                </div>
              </div>
            </div>
          )}


          {/* Help Center Tab */}
          {activeTab === 'help' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* FAQ Section */}
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl">
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-gray-800">
                    ❓ Frequently Asked Questions
                  </h3>

                  <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">

                    {/* FAQ ITEM */}
                    {[
                      {
                        q: "📦 How can I track my order?",
                        a: [
                          "Go to My Orders section in your profile.",
                          "Select the order you want to track.",
                          "Click on Track Order to see live status."
                        ]
                      },
                      {
                        q: "💳 How do I request a refund?",
                        a: [
                          "Open your order details page.",
                          "Click on Request Refund button.",
                          "Refund will be processed in 3–5 working days."
                        ]
                      },
                      {
                        q: "🔄 How can I cancel my order?",
                        a: [
                          "Go to My Orders section.",
                          "Select the order and click Cancel.",
                          "Cancellation is allowed before shipping."
                        ]
                      },
                      {
                        q: "🏠 How can I change my delivery address?",
                        a: [
                          "Open Address section in your profile.",
                          "Edit or add a new address.",
                          "Set it as default before placing order."
                        ]
                      },
                      {
                        q: "🔐 How do I change my account password?",
                        a: [
                          "Go to Security settings.",
                          "Enter old and new password.",
                          "Save changes to update password."
                        ]
                      },
                      {
                        q: "❤️ How do I add products to wishlist?",
                        a: [
                          "Open any product page.",
                          "Click on heart icon.",
                          "View wishlist in your profile."
                        ]
                      },
                      {
                        q: "🛒 How can I move wishlist items to cart?",
                        a: [
                          "Open Wishlist section.",
                          "Click Add to Cart button.",
                          "Product will appear in cart."
                        ]
                      },
                      {
                        q: "💰 When will I receive my refund?",
                        a: [
                          "Refund initiated after product inspection.",
                          "Usually credited in 3–7 working days.",
                          "Status visible in order history."
                        ]
                      },
                      {
                        q: "📱 Can I update my mobile number?",
                        a: [
                          "Go to Edit Profile.",
                          "Update mobile number field.",
                          "Verify using OTP."
                        ]
                      },
                      {
                        q: "🧾 How can I download my invoice?",
                        a: [
                          "Open order details page.",
                          "Click Download Invoice.",
                          "PDF will be downloaded."
                        ]
                      },
                      {
                        q: "🚚 What if my order is delayed?",
                        a: [
                          "Check tracking updates.",
                          "Contact support if delay exceeds 48 hours.",
                          "Compensation may apply."
                        ]
                      },
                      {
                        q: "🔄 Can I return a product?",
                        a: [
                          "Open order and select Return.",
                          "Choose return reason.",
                          "Pickup will be scheduled."
                        ]
                      },
                      {
                        q: "💳 How do I save payment methods?",
                        a: [
                          "Add card during checkout.",
                          "Enable save option.",
                          "Use it for future payments."
                        ]
                      },
                      {
                        q: "🔔 How can I manage notifications?",
                        a: [
                          "Go to notification settings.",
                          "Select email or push alerts.",
                          "Save your preferences."
                        ]
                      },
                      {
                        q: "🛡️ Is my personal data secure?",
                        a: [
                          "We use encrypted connections.",
                          "Data stored securely.",
                          "No sharing with third parties."
                        ]
                      },
                      {
                        q: "👥 Can I have multiple addresses?",
                        a: [
                          "You can add multiple addresses.",
                          "Set one as default.",
                          "Edit anytime."
                        ]
                      },
                      {
                        q: "📦 Can I reorder previous purchases?",
                        a: [
                          "Go to order history.",
                          "Select previous order.",
                          "Click Reorder."
                        ]
                      },
                      {
                        q: "🎁 How can I apply coupon codes?",
                        a: [
                          "Enter coupon code at checkout.",
                          "Verify discount applied.",
                          "Complete payment."
                        ]
                      },
                      {
                        q: "🧑‍💻 How can I contact customer support?",
                        a: [
                          "Use Contact Support form.",
                          "Submit your issue.",
                          "Our team will respond."
                        ]
                      },
                      {
                        q: "🗑️ How do I delete my account?",
                        a: [
                          "Go to profile settings.",
                          "Request account deletion.",
                          "Confirmation will be sent."
                        ]
                      }
                    ].map((item, index) => (
                      <details
                        key={index}
                        className="group rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
                      >
                        <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 font-medium text-gray-800">
                          <span>{item.q}</span>
                          <span className="text-gray-400 transition-transform duration-300 group-open:rotate-180">
                            ⌄
                          </span>
                        </summary>

                        <ul className="px-6 pb-4 text-sm text-gray-600 list-disc space-y-2">
                          {item.a.map((ans, i) => (
                            <li key={i}>{ans}</li>
                          ))}
                        </ul>
                      </details>
                    ))}

                  </div>
                </div>
              </Card>
              {/* Contact Support */}
              <Card className="shadow-lg border-0">
                <div className="p-6">
                  <h3 className="text-xl mb-6">Contact Support</h3>

                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full border rounded-lg p-3"
                    />

                    <textarea
                      rows="4"
                      placeholder="Describe your issue..."
                      className="w-full border rounded-lg p-3"
                    />

                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                      Submit Request
                    </button>
                  </div>
                </div>
              </Card>

            </div>
          )}

        </div>
      </div>
      
      {/* Address Management Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h3>
                <button 
                  onClick={() => setShowAddressModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                <select
                  value={addressForm.type}
                  onChange={(e) => setAddressForm({...addressForm, type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={addressForm.phone}
                  onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
                <textarea
                  value={addressForm.address}
                  onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter complete address with city and pincode"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="default-address"
                  checked={addressForm.default}
                  onChange={(e) => setAddressForm({...addressForm, default: e.target.checked})}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="default-address" className="ml-2 block text-sm text-gray-700">
                  Set as default address
                </label>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <Button 
                onClick={handleSaveAddress}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {editingAddress ? 'Update Address' : 'Save Address'}
              </Button>
              <Button 
                variant="outline"
                onClick={() => setShowAddressModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
