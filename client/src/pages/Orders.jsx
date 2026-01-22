import { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronRight, AlertCircle, ShieldCheck, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
          
          // Transform the data to match the UI format
          const transformedOrders = data.map(order => {
            const totalAmount = order.products.reduce((sum, item) => {
              return sum + (item.productId.price * item.quantity);
            }, 0);
            
            let statusDisplay, color, icon;
            switch (order.status) {
              case 'Delivered':
                statusDisplay = 'Delivered';
                color = 'text-green-600 bg-green-100';
                icon = CheckCircle;
                break;
              case 'Shipped':
                statusDisplay = 'In Transit';
                color = 'text-yellow-600 bg-yellow-100';
                icon = Truck;
                break;
              case 'Packed':
                statusDisplay = 'Processing';
                color = 'text-blue-600 bg-blue-100';
                icon = Clock;
                break;
              case 'Placed':
                statusDisplay = 'Processing';
                color = 'text-blue-600 bg-blue-100';
                icon = Clock;
                break;
              case 'Cancelled':
                statusDisplay = 'Cancelled';
                color = 'text-red-600 bg-red-100';
                icon = AlertCircle;
                break;
              default:
                statusDisplay = order.status;
                color = 'text-gray-600 bg-gray-100';
                icon = Package;
            }
            
            return {
              _id: order._id,
              id: order._id.substring(0, 8),
              date: new Date(order.createdAt).toLocaleDateString(),
              status: order.status,
              statusDisplay,
              total: `₹${totalAmount.toLocaleString()}`,
              items: order.products.length,
              tracking: order.status,
              color,
              icon,
              address: order.address,
              paymentMethod: order.paymentMethod,
              products: order.products
            };
          });
          
          setOrders(transformedOrders);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with enhanced styling */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Package className="text-white" size={24} />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent tracking-tight">
                My Orders
              </h1>
            </div>
            <p className="text-lg text-gray-600 pl-15 max-w-2xl">
              Track, view, and manage all your recent orders with real-time updates
            </p>
          </div>
        </div>

        {/* Orders List with enhanced loading */}
        {loading ? (
          // Enhanced Loading Skeleton
          <div className="space-y-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-3">
                      <div className="h-6 bg-gray-200 rounded-lg w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                  </div>
                  <div className="mt-6 grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-24"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                    <div className="flex items-end">
                      <div className="h-12 bg-gray-200 rounded-xl w-full md:w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          // Enhanced Empty State
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-12 text-center border border-gray-100/50 backdrop-blur-sm animate-fade-in-up">
            <div className="relative inline-block mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                <Package size={50} className="text-blue-500" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Star size={16} className="text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-10 max-w-md mx-auto text-lg leading-relaxed">
              Looks like you haven't placed any orders yet. Start shopping now and enjoy our amazing products!
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-5 rounded-2xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-blue-400/30 backdrop-blur-sm group"
            >
              <span className="flex items-center gap-3">
                Start Shopping
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            
            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1000+</div>
                <div className="text-sm text-gray-500">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24h</div>
                <div className="text-sm text-gray-500">Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">5★</div>
                <div className="text-sm text-gray-500">Rating</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div
                key={order.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100/50 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2 group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Enhanced Order Header */}
                <div className="px-8 py-6 border-b border-gray-100/50 bg-gradient-to-r from-white to-gray-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        Order #{order.id}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 ml-6 flex items-center gap-2">
                      <Clock size={14} className="text-gray-400" />
                      Placed on {order.date} • {order.items} items
                    </p>
                  </div>

                  <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-sm shadow-lg transform transition-all duration-300 group-hover:scale-105 ${order.color} border border-white/20`}>
                    <order.icon size={18} className="animate-pulse" />
                    {order.statusDisplay || order.status}
                  </div>
                </div>

                {/* Enhanced Order Content */}
                <div className="p-8 grid md:grid-cols-3 gap-8">
                  {/* Enhanced Order Summary */}
                  <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-2xl p-6 border border-gray-100/30 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                        <TrendingUp size={20} className="text-blue-600" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg">Order Summary</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Package size={16} />
                          Total Amount:
                        </span>
                        <span className="font-bold text-xl text-gray-900">{order.total}</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <span className="text-gray-600 flex items-center gap-2">
                          <ShieldCheck size={16} />
                          Payment:
                        </span>
                        <span className="text-green-600 font-semibold flex items-center gap-1">
                          <CheckCircle size={14} />
                          Paid via UPI
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 flex items-center gap-2">
                          <Truck size={16} />
                          Tracking:
                        </span>
                        <span className="font-medium text-gray-800">{order.tracking}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Delivery Info */}
                  <div className="bg-gradient-to-br from-gray-50/50 to-white rounded-2xl p-6 border border-gray-100/30 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Truck size={20} className="text-green-600" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg">Delivery Details</h4>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">Delivered to:</span><br />
                        Somesh Bhatnagar<br />
                        123, Green Park Society, Sector 18<br />
                        Noida, UP 201301
                      </p>
                      <div className="flex items-center gap-2 text-sm text-green-600 mt-3">
                        <CheckCircle size={16} />
                        <span>Standard Delivery</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action */}
                  <div className="flex flex-col justify-end space-y-4">
                    <Link
                      to={`/order/${order._id}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-blue-400/30 backdrop-blur-sm group"
                    >
                      <span>View Details</span>
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Trust Badges */}
        <div className="mt-20 text-center animate-fade-in">
          <h3 className="text-xl font-bold text-gray-800 mb-8">Why Shop With Us?</h3>
          <div className="inline-flex flex-wrap justify-center gap-10">
            <div className="flex flex-col items-center gap-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/30 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} className="text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Secure Shopping</h4>
                <p className="text-sm text-gray-600">100% Safe & Secure</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/30 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Truck size={28} className="text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Fast Delivery</h4>
                <p className="text-sm text-gray-600">24h Express Service</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-3 p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/30 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle size={28} className="text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">100% Authentic</h4>
                <p className="text-sm text-gray-600">Original Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom CSS Animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.6s ease-out forwards;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .animate-pulse-slow {
    animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
`;
document.head.appendChild(style);

export default Orders;