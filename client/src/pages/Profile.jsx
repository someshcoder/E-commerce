import { useState, useEffect } from 'react';
import { Camera, Edit2, Save, User, Mail, Phone, MapPin, ShieldCheck, CheckCircle } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isSaving, setIsSaving] = useState(false);
  
  // Real user data (can come from context, API, or localStorage)
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
    verified: true,
  });

  // Simulate fetching real user data on mount (replace with real API/context later)
  useEffect(() => {
    // Example: fetch from localStorage or auth context
    const savedUser = JSON.parse(localStorage.getItem('user')) || {
      fullName: 'Somesh Bhatnagar',
      email: 'somesh@gmail.com',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
      verified: true,
    };
    setUserData(savedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call / save to localStorage
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(userData));
      setIsSaving(false);
      setIsEditing(false);
      alert('Profile updated successfully! 🎉');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12">
          {/* Cover */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="relative px-6 md:px-12 pb-10 md:pb-12">
            {/* Avatar */}
            <div className="absolute -top-16 md:-top-24 left-6 md:left-12">
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-200">
                  <img
                    src={userData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={28} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="pt-20 md:pt-28 pl-40 md:pl-56">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {userData.fullName || 'User Name'}
                  </h1>
                  <p className="text-gray-600 mt-2 flex items-center gap-3 text-lg">
                    {userData.email}
                    {userData.verified && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <ShieldCheck size={14} /> Verified
                      </span>
                    )}
                  </p>
                </div>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-md ${
                    isEditing
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isEditing ? (
                    <>
                      <Save size={18} /> {isSaving ? 'Saving...' : 'Save Profile'}
                    </>
                  ) : (
                    <>
                      <Edit2 size={18} /> Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-12 border-b border-gray-200 pb-4 overflow-x-auto">
          {['Personal Info', 'Addresses', 'Orders Summary'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 shadow-sm ${
                activeTab === tab.toLowerCase().replace(' ', '-')
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'personal-info' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-10">Personal Information</h3>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 peer text-lg font-medium ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-100 cursor-not-allowed'
                    }`}
                    placeholder=" "
                  />
                  <label className="absolute left-6 top-5 text-gray-500 text-base transition-all duration-300 pointer-events-none peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg">
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 peer text-lg font-medium ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-100 cursor-not-allowed'
                    }`}
                    placeholder=" "
                  />
                  <label className="absolute left-6 top-5 text-gray-500 text-base transition-all duration-300 pointer-events-none peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="space-y-8">
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`w-full px-6 py-5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 peer text-lg font-medium ${
                      isEditing ? 'bg-white cursor-text' : 'bg-gray-100 cursor-not-allowed'
                    }`}
                    placeholder=" "
                  />
                  <label className="absolute left-6 top-5 text-gray-500 text-base transition-all duration-300 pointer-events-none peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-placeholder-shown:top-5 peer-placeholder-shown:text-lg">
                    Phone Number
                  </label>
                </div>

                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4">
                  <ShieldCheck size={32} className="text-blue-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Account Verified</h4>
                    <p className="text-gray-600">Your account is fully secure and verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Addresses Tab (Placeholder) */}
        {activeTab === 'addresses' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 text-center">
            <MapPin size={64} className="mx-auto text-blue-600 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Addresses Added Yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Add your delivery addresses to make checkout faster and easier.
            </p>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl">
              Add New Address
            </button>
          </div>
        )}

        {/* Orders Summary Tab (Placeholder) */}
        {activeTab === 'orders-summary' && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 text-center">
            <Package size={64} className="mx-auto text-blue-600 mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No Recent Orders</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start shopping now to see your order history here.
            </p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 text-white px-10 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;