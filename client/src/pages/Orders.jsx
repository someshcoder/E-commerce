import { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronRight, AlertCircle, ShieldCheck } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              My Orders
            </h1>
            <p className="text-lg text-gray-600 mt-3">
              Track, view, and manage all your recent orders
            </p>
          </div>

          <button className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
            <Package size={20} /> All Orders
          </button>
        </div>

        {/* Orders List */}
        {loading ? (
          // Loading Skeleton
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow animate-pulse h-40"></div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
            <Package size={80} className="mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't placed any orders. Start shopping now!
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Order Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      Order #{order.id}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Placed on {order.date} • {order.items} items
                    </p>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium ${order.color}`}>
                    <order.icon size={18} />
                    {order.statusDisplay || order.status}
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6 grid md:grid-cols-3 gap-6">
                  {/* Order Summary */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                    <div className="space-y-2 text-gray-700">
                      <p className="flex justify-between">
                        <span>Total Amount:</span>
                        <span className="font-medium">{order.total}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Payment:</span>
                        <span className="text-green-600 font-medium">Paid via UPI</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Tracking:</span>
                        <span className="font-medium">{order.tracking}</span>
                      </p>
                    </div>
                  </div>

                  {/* Delivery Info */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Delivery Details</h4>
                    <p className="text-gray-700">
                      Delivered to:<br />
                      Somesh Bhatnagar<br />
                      123, Green Park Society, Sector 18<br />
                      Noida, UP 201301
                    </p>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col justify-end">
                    <Link
                      to={`/order/${order._id}`}
                      className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.02]"
                    >
                      View Details <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-600" />
              Secure Shopping
            </div>
            <div className="flex items-center gap-2">
              <Truck size={20} className="text-blue-600" />
              Fast Delivery
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} className="text-green-600" />
              100% Authentic
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;