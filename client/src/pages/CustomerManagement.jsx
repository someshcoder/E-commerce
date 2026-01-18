import { useState, useEffect } from 'react';
import { Users, Search, Filter, Mail, Phone, Calendar, UserRound, MapPin } from 'lucide-react';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null); // Track which user is being updated

  useEffect(() => {
    // Fetch customers from the backend
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('http://localhost:5000/api/users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          // Filter out admin users and keep only regular users
          const regularUsers = data.filter(user => !user.isAdmin);
          setCustomers(regularUsers);
        } else {
          console.error('Failed to fetch customers');
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const blockUser = async (userId) => {
    const token = localStorage.getItem('token');
    setUpdatingUserId(userId);
    
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/block`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update the customer list locally
        setCustomers(prevCustomers => 
          prevCustomers.map(customer => 
            customer._id === userId ? {...customer, isActive: false} : customer
          )
        );
        setFilteredCustomers(prevFiltered => 
          prevFiltered.map(customer => 
            customer._id === userId ? {...customer, isActive: false} : customer
          )
        );
        alert('User blocked successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error blocking user: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error blocking user:', error);
      alert('Error blocking user: Network error');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const unblockUser = async (userId) => {
    const token = localStorage.getItem('token');
    setUpdatingUserId(userId);
    
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}/unblock`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Update the customer list locally
        setCustomers(prevCustomers => 
          prevCustomers.map(customer => 
            customer._id === userId ? {...customer, isActive: true} : customer
          )
        );
        setFilteredCustomers(prevFiltered => 
          prevFiltered.map(customer => 
            customer._id === userId ? {...customer, isActive: true} : customer
          )
        );
        alert('User unblocked successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error unblocking user: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error unblocking user:', error);
      alert('Error unblocking user: Network error');
    } finally {
      setUpdatingUserId(null);
    }
  };

  useEffect(() => {
    // Filter customers based on search term
    if (searchTerm) {
      const filtered = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    } else {
      setFilteredCustomers(customers);
    }
  }, [searchTerm, customers]);

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
              <p className="text-gray-600 mt-1">Manage and view all registered customers</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                Total Customers: {filteredCustomers.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search customers by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                <Filter size={20} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Joined Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Account Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {customer.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{customer.name}</div>
                            <div className="text-sm text-gray-500">ID: {customer._id?.substring(0, 8)}...</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail size={16} className="text-gray-400" />
                          {customer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone size={16} className="text-gray-400" />
                          {customer.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar size={16} className="text-gray-400" />
                          {new Date(customer.createdAt || customer.createdAt).toLocaleDateString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {customer.isActive !== undefined ? (
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${customer.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {customer.isActive ? 'Active' : 'Inactive'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {customer.isActive ? (
                          <button 
                            onClick={() => blockUser(customer._id)}
                            disabled={updatingUserId === customer._id}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${updatingUserId === customer._id ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
                          >
                            {updatingUserId === customer._id ? 'Blocking...' : 'Block'}
                          </button>
                        ) : (
                          <button 
                            onClick={() => unblockUser(customer._id)}
                            disabled={updatingUserId === customer._id}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium ${updatingUserId === customer._id ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                          >
                            {updatingUserId === customer._id ? 'Unblocking...' : 'Unblock'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No customers found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCustomers.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-gray-500">Try adjusting your search query or filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;