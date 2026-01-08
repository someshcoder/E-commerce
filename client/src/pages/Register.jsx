import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Registration successful! 🎉');
        navigate('/login');
      } else {
        setErrors({ server: data.message || 'Registration failed' });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ server: 'Network error. Please try again.' });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 md:p-12 transform transition-all duration-500 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]">
          {/* Logo / Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400">ShopKart</span>
            </h1>
            <p className="text-gray-300 mt-3 text-lg">
              Create your account and start shopping today!
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none transition-all duration-300 peer"
                placeholder=" "
              />
              <label className="absolute left-5 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 peer-focus:bg-gray-900/80 peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                Full Name
              </label>
              {errors.fullName && <p className="text-red-400 text-sm mt-2">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none transition-all duration-300 peer"
                placeholder=" "
              />
              <label className="absolute left-5 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 peer-focus:bg-gray-900/80 peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                Email Address
              </label>
              {errors.email && <p className="text-red-400 text-sm mt-2">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 outline-none transition-all duration-300 peer pr-12"
                placeholder=" "
              />
              <label className="absolute left-5 top-4 text-gray-400 transition-all duration-300 pointer-events-none peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-400 peer-focus:bg-gray-900/80 peer-focus:px-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && <p className="text-red-400 text-sm mt-2">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center gap-3 shadow-lg relative overflow-hidden group ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="animate-pulse">Creating Account...</span>
              ) : (
                <>
                  Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            {/* Server Error Message */}
            {errors.server && (
              <p className="text-red-400 text-sm mt-2 text-center">{errors.server}</p>
            )}
          </form>

          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-white">
                <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
                Facebook
              </button>
            </div>
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-300 mt-10">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;