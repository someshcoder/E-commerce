// src/pages/AdminDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import {
  Users, Package, ShoppingCart, DollarSign, TrendingUp,
  Calendar, Search, Filter, MoreVertical, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalRevenue: 16800000,
    totalOrders: 16820,
    totalCustomers: 47300,
    totalProducts: 2341,
    monthlyGrowth: 42,
    avgOrderValue: 999
  });

  useEffect(() => {
    // Admin check
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.isAdmin) {
      alert('Access denied. Admin only.');
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const StatCard = ({ title, value, change, icon: Icon, trend = 'up' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gray-100 rounded-lg">
          <Icon size={24} className="text-gray-700" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  const revenueData = [
    { month: 'Jul', revenue: 850000 },
    { month: 'Aug', revenue: 1100000 },
    { month: 'Sep', revenue: 980000 },
    { month: 'Oct', revenue: 1250000 },
    { month: 'Nov', revenue: 1420000 },
    { month: 'Dec', revenue: 1680000 },
  ];

  const topProducts = [
    { name: 'Apple AirPods Pro 2', sold: 1243, revenue: '₹29.8L', growth: 42 },
    { name: 'Samsung Galaxy S24 Ultra', sold: 987, revenue: '₹49.5L', growth: 31 },
    { name: 'Sony WH-1000XM5', sold: 812, revenue: '₹24.4L', growth: 28 },
    { name: 'iPhone 15 Pro Max', sold: 674, revenue: '₹40.4L', growth: 19 },
    { name: 'MacBook Air M3', sold: 531, revenue: '₹79.7L', growth: 15 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
            </div>
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Revenue"
            value={`₹${(stats.totalRevenue / 10000000).toFixed(2)} Cr`}
            change={stats.monthlyGrowth}
            icon={DollarSign}
            trend="up"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            change={28}
            icon={ShoppingCart}
            trend="up"
          />
          <StatCard
            title="Active Customers"
            value={stats.totalCustomers.toLocaleString()}
            change={19}
            icon={Users}
            trend="up"
          />
          <StatCard
            title="Products in Catalog"
            value={stats.totalProducts.toLocaleString()}
            change={8}
            icon={Package}
            trend="up"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
              <select className="text-sm border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>

            {/* New Line Chart */}
            <div className="h-80 w-full">
              <LineChart
                width={600}
                height={320}
                data={revenueData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                />
                <Tooltip
                  formatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '8px' }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={4}
                  dot={{ fill: '#3b82f6', r: 6 }}
                  activeDot={{ r: 8 }}
                  animationDuration={1500}
                />
              </LineChart>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between text-sm">
              <div>
                <p className="text-gray-600">Average Order Value</p>
                <p className="text-xl font-bold text-gray-900">₹{stats.avgOrderValue}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Monthly Growth</p>
                <p className="text-xl font-bold text-green-600">+{stats.monthlyGrowth}%</p>
              </div>
            </div>
          </div>
          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Top Selling Products</h2>
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-lg font-bold text-gray-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sold.toLocaleString()} units sold</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{product.revenue}</p>
                    <p className="text-sm text-green-600">+{product.growth}%</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => navigate('/admin/products')}
              className="w-full mt-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
            >
              View All Products
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => navigate('/admin/products')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-left hover:shadow-md hover:border-gray-300 transition"
          >
            <Package size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Products</h3>
            <p className="text-gray-600">Add, edit, or remove products from inventory</p>
          </button>

          <button
            onClick={() => navigate('/admin/orders')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-left hover:shadow-md hover:border-gray-300 transition"
          >
            <ShoppingCart size={32} className="text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">View Orders</h3>
            <p className="text-gray-600">Track and manage all customer orders</p>
          </button>

          <button
            onClick={() => navigate('/admin/customers')}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-left hover:shadow-md hover:border-gray-300 transition"
          >
            <Users size={32} className="text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Customer Management</h3>
            <p className="text-gray-600">View customer details and activity</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;