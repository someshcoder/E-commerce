import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, ChevronRight, AlertCircle, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      id: 'SK12345',
      date: '12 Jan 2026',
      status: 'Delivered',
      total: '₹4,999',
      items: 3,
      tracking: 'DELIVERED',
      color: 'text-green-600 bg-green-100',
      icon: CheckCircle,
    },
    {
      id: 'SK12346',
      date: '20 Jan 2026',
      status: 'In Transit',
      total: '₹12,499',
      items: 5,
      tracking: 'OUT FOR DELIVERY',
      color: 'text-yellow-600 bg-yellow-100',
      icon: Truck,
    },
    {
      id: 'SK12347',
      date: '05 Jan 2026',
      status: 'Processing',
      total: '₹2,799',
      items: 2,
      tracking: 'ORDER CONFIRMED',
      color: 'text-blue-600 bg-blue-100',
      icon: Clock,
    },
    {
      id: 'SK12348',
      date: '28 Dec 2025',
      status: 'Cancelled',
      total: '₹1,999',
      items: 1,
      tracking: 'CANCELLED BY USER',
      color: 'text-red-600 bg-red-100',
      icon: AlertCircle,
    },
  ]);

  const [loading, setLoading] = useState(false); // For future real API loading

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
                    {order.status}
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
                      to={`/order/${order.id}`}
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