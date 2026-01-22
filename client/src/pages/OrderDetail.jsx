import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, ArrowLeft, MapPin, CreditCard, User } from 'lucide-react';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customerName, setCustomerName] = useState('');

  // Get customer name from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    setCustomerName(user.name || 'Guest User');
  }, []);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setOrder(data);
        } else {
          console.error('Failed to fetch order');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Order Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">The order you're looking for doesn't exist or may have been removed.</p>
            <Link to="/orders" className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'text-green-700 bg-green-100 border-green-300';
      case 'Shipped':
        return 'text-blue-700 bg-blue-100 border-blue-300';
      case 'Packed':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'Placed':
        return 'text-purple-700 bg-purple-100 border-purple-300';
      case 'Cancelled':
        return 'text-red-700 bg-red-100 border-red-300';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return CheckCircle;
      case 'Shipped':
        return Truck;
      case 'Packed':
        return Package;
      case 'Placed':
        return Clock;
      default:
        return Package;
    }
  };

  const getStatusSteps = (currentStatus) => {
    const steps = ['Placed', 'Packed', 'Shipped', 'Delivered'];
    const currentStepIndex = steps.indexOf(currentStatus);
    
    return steps.map((step, index) => ({
      step,
      isCompleted: index <= currentStepIndex,
      isCurrent: index === currentStepIndex
    }));
  };

  const statusSteps = getStatusSteps(order.status);

  const totalAmount = order.products.reduce((sum, item) => {
    return sum + ((item.productId?.price || 0) * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <Link to="/products" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4 transition-colors duration-200 font-medium">
            <ArrowLeft size={18} />
            Back to Products
          </Link>
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Order Details</h1>
                <p className="text-gray-600">Order ID: #{order._id.substring(0, 8)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm border ${getStatusColor(order.status)}`}>
                  {React.createElement(getStatusIcon(order.status), { size: 16 })}
                  {order.status}
                </span>
                <p className="text-sm text-gray-500">
                  Placed: {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Order Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package size={20} className="text-blue-600" />
                </div>
                Order Status Tracking
              </h2>
              
              {/* Status Progress */}
              <div className="flex items-center justify-between relative">
                {/* Progress Line */}
                <div className="absolute top-5 left-0 right-0 h-2 bg-gray-200 rounded-full z-0"></div>
                <div 
                  className="absolute top-5 left-0 h-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full z-10 transition-all duration-1000 ease-out shadow-sm"
                  style={{ 
                    width: `${(statusSteps.filter(s => s.isCompleted).length / statusSteps.length) * 100}%` 
                  }}
                ></div>

                {statusSteps.map((statusStep, index) => {
                  const IconComponent = getStatusIcon(statusStep.step);
                  return (
                    <div key={statusStep.step} className="flex flex-col items-center relative z-20 group">
                      <div 
                        className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                          statusStep.isCompleted 
                            ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white scale-110 shadow-blue-200' 
                            : statusStep.isCurrent
                              ? 'bg-white text-blue-600 border-4 border-blue-500 shadow-xl scale-125 ring-4 ring-blue-200'
                              : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                        }`}
                      >
                        <div className="transform transition-transform duration-300 group-hover:scale-110">
                          {React.createElement(IconComponent, { size: 24 })}
                        </div>
                      </div>
                      <span 
                        className={`text-sm mt-3 font-semibold transition-all duration-300 ${
                          statusStep.isCompleted ? 'text-blue-600' : statusStep.isCurrent ? 'text-blue-700' : 'text-gray-500'
                        }`}
                      >
                        {statusStep.step}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        {statusStep.isCompleted && index === 0 && 'Just placed'}
                        {statusStep.isCompleted && index === 1 && 'Preparing'}
                        {statusStep.isCompleted && index === 2 && 'On the way'}
                        {statusStep.isCompleted && index === 3 && 'Delivered'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Items ({order.products.length})</h2>
              
              <div className="space-y-5">
                {order.products.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white transition-colors duration-200">
                    <img 
                      src={item.productId?.image || 'https://via.placeholder.com/120x120?text=No+Image'} 
                      alt={item.productId?.title || 'Unknown Product'} 
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 shadow-sm"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/120x120?text=No+Image';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{item.productId?.title || 'Unknown Product'}</h3>
                      <p className="text-sm text-gray-600 mb-2">Quantity: {item.quantity}</p>
                      <p className="text-sm text-gray-500">₹{item.productId?.price?.toLocaleString() || 0} per item</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-lg">
                        ₹{((item.productId?.price || 0) * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Information</h2>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Customer Name</p>
                    <p className="text-sm text-gray-600">{customerName}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Delivery Address</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{order.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Payment Method</p>
                    <p className="text-sm text-gray-600 capitalize">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-5">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-medium text-gray-900">#{order._id.substring(0, 8)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">
                    {new Date(order.createdAt).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium text-gray-900">{order.products.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">Free</span>
                </div>
                <div className="pt-4">
                  <div className="flex justify-between items-center font-bold text-lg text-gray-900 border-t border-gray-200 pt-4">
                    <span>Total</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;