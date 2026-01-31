import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  // Check user role on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserRole(userData.isAdmin ? 'admin' : 'user');
    } else {
      setUserRole('guest');
    }
  }, []);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Only allow users (not admins) to subscribe to newsletter
    if (userRole === 'admin') {
      setError('Admin accounts cannot subscribe to newsletter');
      return;
    }
    
    // Check if user is a guest and restrict access
    if (userRole === 'guest') {
      setError('You need to login first to access that page.');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redirect after 2 seconds to show the error message
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // Send subscription request to backend
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({ email }),
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Send notification to admin about new subscriber
        const notificationResponse = await fetch('http://localhost:5000/api/notifications/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify({
            title: 'New Newsletter Subscription',
            message: `A new user (${email}) has subscribed to the newsletter.`,
            type: 'newsletter',
            priority: 'medium',
            recipientType: 'admin' // Only send to admins
          }),
        });
        
        if (notificationResponse.ok) {
          console.log('Admin notification sent successfully');
        } else {
          console.error('Failed to send admin notification');
        }
        
        setIsSubmitted(true);
        setEmail('');
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'Failed to subscribe. Please try again later.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Don't show the newsletter section to admins
  if (userRole === 'admin') {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/20 to-black"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="text-sm">Stay Updated</span>
          </div>
          <h2 className="text-4xl lg:text-5xl mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Join Our Newsletter
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Subscribe to get special offers, free giveaways, and exclusive deals delivered straight to your inbox.
          </p>
          
          {isSubmitted && (
            <div className="mb-6 bg-green-500/20 border border-green-500/30 text-green-300 px-6 py-4 rounded-xl animate-fadeInUp">
              <p className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Success! You've been subscribed to our newsletter.
              </p>
            </div>
          )}
          
          {error && (
            <div className="mb-6 bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl animate-fadeInUp">
              <p className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-alert-circle">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12" y1="16" y2="16" />
                </svg>
                {error}
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-white/10 border ${error ? 'border-red-500/50' : 'border-white/20'} text-white placeholder:text-gray-400 px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all duration-300 backdrop-blur-sm`}
                disabled={isSubmitting}
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-white to-gray-200 text-black hover:from-gray-100 hover:to-gray-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                  Subscribe
                </>
              )}
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
export default Newsletter;