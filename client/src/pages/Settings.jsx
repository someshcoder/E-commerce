import { useState } from 'react';
import { Eye, EyeOff, Camera, Save, ShieldCheck, Bell, MapPin, Moon, Sun, CheckCircle, Edit2, Trash2, Lock } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Somesh Bhatnagar',
    email: 'somesh@gmail.com',
    phone: '+91 98765 43210',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert('Settings updated successfully! 🎉');
    }, 1500);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'addresses', label: 'Addresses' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Account <span className="text-blue-600">Settings</span>
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Manage your profile, security, preferences, and more
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 border-b border-gray-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full font-medium text-sm md:text-base transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
          {activeTab === 'personal' && (
            <div className="space-y-12">
              {/* Avatar & Name */}
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                  <img
                    src={formData.avatar}
                    alt="Profile"
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover transition-transform group-hover:scale-105"
                  />
                  <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={28} className="text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-900">{formData.fullName}</h2>
                  <p className="text-gray-600 mt-2 flex items-center gap-2">
                    <ShieldCheck size={18} className="text-green-600" /> Verified Member
                  </p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 peer"
                    placeholder=" "
                  />
                  <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                    Full Name
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 peer"
                    placeholder=" "
                  />
                  <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                    Email Address
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 peer"
                    placeholder=" "
                  />
                  <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                    Phone Number
                  </label>
                </div>

                <div className="col-span-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    <Save size={18} />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Security Settings</h3>

              {/* Change Password */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <h4 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <Lock size={24} className="text-blue-600" /> Change Password
                </h4>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="currentPassword"
                      placeholder=" "
                      className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 peer pr-12"
                    />
                    <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                      Current Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="newPassword"
                      placeholder=" "
                      className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 peer pr-12"
                    />
                    <label className="absolute left-5 top-4 text-gray-500 transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-600 peer-focus:bg-white peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                      New Password
                    </label>
                  </div>
                </div>

                <button className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
                  Update Password
                </button>
              </div>

              {/* 2FA */}
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-4">
                  <ShieldCheck size={32} className="text-green-600" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Two-Factor Authentication</h4>
                    <p className="text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Notification Preferences</h3>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 space-y-6">
                {[
                  { label: 'Order Updates', desc: 'Receive notifications about order status changes' },
                  { label: 'Promotions & Offers', desc: 'Get exclusive deals and flash sales' },
                  { label: 'New Arrivals', desc: 'Stay updated with latest products' },
                  { label: 'Email Notifications', desc: 'Receive important updates via email' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.label}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">Saved Addresses</h3>
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
                  <MapPin size={18} /> Add New Address
                </button>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="space-y-6">
                  <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Home</h4>
                        <p className="text-gray-700">
                          Somesh Bhatnagar<br />
                          123, Green Park Society<br />
                          Sector 18, Noida, Uttar Pradesh 201301<br />
                          Phone: +91 98765 43210
                        </p>
                      </div>
                      <div className="flex gap-4">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit2 size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Add more address cards */}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 mt-12 text-sm">
          Last updated on January 02, 2026 • Your data is secure with us
        </p>
      </div>
    </div>
  );
};

export default Settings;