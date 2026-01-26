import { useState, useEffect } from 'react';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Order Received',
      message: 'Order #ORD-2024-001 has been placed by John Doe for ₹2,500.',
      timestamp: '2 minutes ago',
      type: 'order',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      title: 'Product Stock Alert',
      message: 'Wireless Headphones (Model XYZ) stock is running low (only 5 units remaining).',
      timestamp: '1 hour ago',
      type: 'inventory',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'New Customer Registration',
      message: 'Sarah Johnson has registered as a new customer on the platform.',
      timestamp: '3 hours ago',
      type: 'user',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      title: 'Payment Received',
      message: 'Payment of ₹1,200 has been received for Order #ORD-2024-005.',
      timestamp: '5 hours ago',
      type: 'payment',
      read: true,
      priority: 'high'
    },
    {
      id: 5,
      title: 'Low Inventory Alert',
      message: 'Smart Watches (Model ABC) inventory is critically low (only 2 units remaining).',
      timestamp: '1 day ago',
      type: 'inventory',
      read: true,
      priority: 'high'
    },
    {
      id: 6,
      title: 'Return Request',
      message: 'Customer has requested return for Order #ORD-2024-003 (Wireless Earbuds).',
      timestamp: '2 days ago',
      type: 'return',
      read: true,
      priority: 'medium'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications
    .filter(notification => filter === 'all' || notification.type === filter)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return b.id - a.id;
      } else if (sortBy === 'oldest') {
        return a.id - b.id;
      } else if (sortBy === 'unread-first') {
        return a.read - b.read;
      }
      return 0;
    });

  const unreadCount = notifications.filter(n => !n.read).length;
  const totalCount = notifications.length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'order':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        );
      case 'payment':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card">
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <line x1="2" x2="22" y1="10" y2="10" />
          </svg>
        );
      case 'inventory':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-package">
            <path d="m7.5 4.27 9 5.15" />
            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
            <path d="m3.3 7 8.7 5 8.7-5" />
            <path d="M12 22V12" />
          </svg>
        );
      case 'user':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        );
      case 'return':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw">
            <path d="M3 2v6h6" />
            <path d="M3 13a9 9 0 1 0 3-7.7L3 8" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="mt-1 text-sm text-gray-500">
                Stay updated with important events and alerts
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                {unreadCount} unread
              </span>
              <span className="text-gray-500 text-sm">
                {totalCount} total
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex flex-wrap gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="order">Orders</option>
                <option value="payment">Payments</option>
                <option value="inventory">Inventory</option>
                <option value="user">Users</option>
                <option value="return">Returns</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="unread-first">Unread First</option>
              </select>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Mark All Read
              </button>
              <button
                onClick={deleteAllNotifications}
                disabled={totalCount === 0}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell-off">
                  <path d="M18.4 12c.37-.37.657-.838.816-1.352" />
                  <path d="M6.8 6.8C4.2 7.5 2 10.5 2 14a8 8 0 0 0 8 8" />
                  <path d="M10.5 13.5c.09.1.18.19.27.27" />
                  <path d="M17.5 17.5c.09.1.18.19.27.27" />
                  <path d="M19.8 14c.16.51.446.98.816 1.35" />
                  <path d="M17.73 17.73 16.27 16.27l.46-.46a2 2 0 0 0-2.83-2.83l-.46.46-1.46-1.46a2 2 0 0 0-2.83 0L7.73 14.27" />
                  <path d="m2 2 20 20" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-500">
                {filter === 'all' 
                  ? 'You have no notifications at this time.' 
                  : `No ${filter} notifications found.`
                }
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-lg shadow-sm border p-6 transition-all duration-200 ${
                  !notification.read 
                    ? 'border-blue-200 bg-blue-50/30' 
                    : 'border-gray-200 hover:shadow-md'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getTypeIcon(notification.type)}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`text-sm font-semibold ${
                            !notification.read ? 'text-blue-900' : 'text-gray-900'
                          }`}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                          )}
                        </div>
                        <p className={`text-sm ${
                          !notification.read ? 'text-blue-800' : 'text-gray-600'
                        }`}>
                          {notification.message}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                        <span className="text-xs text-gray-500">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500">
                    ID: #{String(notification.id).padStart(3, '0')}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => markAsRead(notification.id)}
                      disabled={notification.read}
                      className="text-xs px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {notification.read ? 'Read' : 'Mark as Read'}
                    </button>
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="text-xs px-3 py-1 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;