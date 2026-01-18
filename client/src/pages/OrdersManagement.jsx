// src/pages/OrdersManagement.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Eye, Edit, CheckCircle, Clock, Truck, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

const OrdersManagement = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    // Admin check
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.isAdmin) {
      alert('Access denied. Admin only.');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch orders
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/admin/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
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

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        const fetchOrders = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/orders', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            });

            if (response.ok) {
              const data = await response.json();
              setOrders(data);
            }
          } catch (error) {
            console.error('Error fetching orders for auto-refresh:', error);
          }
        };

        fetchOrders();
      }, 30000); // Refresh every 30 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        
        // Update the order in the local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: updatedOrder.status } : order
          )
        );
        
        alert('Order status updated successfully!');
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed':
        return 'bg-blue-100 text-blue-800';
      case 'Packed':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus) => {
    const statusOrder = ['Placed', 'Packed', 'Shipped', 'Delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    if (currentIndex >= 0 && currentIndex < statusOrder.length - 1) {
      return statusOrder[currentIndex + 1];
    }
    
    return currentStatus; // Return current if already delivered
  };

  const getPreviousStatus = (currentStatus) => {
    const statusOrder = ['Placed', 'Packed', 'Shipped', 'Delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    if (currentIndex > 0) {
      return statusOrder[currentIndex - 1];
    }
    
    return currentStatus; // Return current if already placed
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-gray-600 mt-1">Manage and update all customer orders</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Auto-refresh</span>
                <button
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${autoRefresh ? 'bg-blue-600' : 'bg-gray-300'}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoRefresh ? 'translate-x-6' : 'translate-x-1'}`}
                  />
                </button>
                <button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const token = localStorage.getItem('token');
                      const response = await fetch('http://localhost:5000/api/admin/orders', {
                        headers: {
                          'Authorization': `Bearer ${token}`,
                          'Content-Type': 'application/json'
                        }
                      });

                      if (response.ok) {
                        const data = await response.json();
                        setOrders(data);
                      } else {
                        console.error('Failed to fetch orders');
                      }
                    } catch (error) {
                      console.error('Error fetching orders:', error);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
                  title="Refresh orders"
                >
                  <Package size={18} />
                </button>
              </div>
              <button 
                onClick={() => navigate('/admin/dashboard')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-mono text-sm text-gray-900">#{order._id.substring(0, 8)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900">
                            {order.userId?.name || 'Unknown Customer'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.userId?.email || 'Email not available'}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-700">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status === 'Placed' && <Clock size={14} />}
                            {order.status === 'Packed' && <Package size={14} />}
                            {order.status === 'Shipped' && <Truck size={14} />}
                            {order.status === 'Delivered' && <CheckCircle size={14} />}
                            {order.status === 'Cancelled' && <XCircle size={14} />}
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900">
                            ₹{order.products.reduce((sum, item) => sum + ((item.productId?.price || 0) * item.quantity), 0)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-2 min-w-[150px]">
                            <button 
                              onClick={() => toggleExpand(order._id)}
                              className={`inline-flex items-center justify-between gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition min-w-[120px] ${expandedOrderId === order._id ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}
                              title="View Details"
                            >
                              <span>{expandedOrderId === order._id ? 'Hide Details' : 'View Details'}</span>
                              {expandedOrderId === order._id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                            
                            {/* Status Update Dropdown */}
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                              className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            >
                              <option value="Placed">Placed</option>
                              <option value="Packed">Packed</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Row for Details */}
                      {expandedOrderId === order._id && (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Order Details</h4>
                                <div className="space-y-2 text-sm">
                                  <p><span className="text-gray-600">Order ID:</span> {order._id}</p>
                                  <p><span className="text-gray-600">Created:</span> {new Date(order.createdAt).toLocaleString()}</p>
                                  <p><span className="text-gray-600">Updated:</span> {new Date(order.updatedAt).toLocaleString()}</p>
                                  <p><span className="text-gray-600">Payment Method:</span> {order.paymentMethod}</p>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-3">Shipping Address</h4>
                                <div className="text-sm text-gray-700">
                                  {order.address.split('\n').map((line, index) => (
                                    <div key={index}>{line}</div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="font-semibold text-gray-900 mb-3">Products</h4>
                              <div className="space-y-2">
                                {order.products.filter(item => item.productId).length > 0 ? (
                                  order.products.filter(item => item.productId).map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 p-2 border border-gray-200 rounded">
                                    <img 
                                      src={item.productId?.image || 'https://via.placeholder.com/100x100?text=No+Image'} 
                                      alt={item.productId?.title || 'Unknown Product'} 
                                      className="w-12 h-12 object-cover rounded"
                                      onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                                      }}
                                    />
                                    <div className="flex-1">
                                      <div className="font-medium text-sm">{item.productId?.title || 'Unknown Product'}</div>
                                      <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                                      <div className="font-semibold text-sm">₹{(item.productId?.price || 0) * item.quantity}</div>
                                    </div>
                                  </div>
                                ))
                                ) : (
                                  <div className="text-gray-500 italic">Product information not available</div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersManagement;