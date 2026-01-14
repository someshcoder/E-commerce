import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isPublic = false }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  // If it's a public route, anyone can access
  if (isPublic) {
    return children;
  }
  
  // If it's a private route and user is not authenticated, redirect to login
  if (!isAuthenticated) {
    // Get current location to redirect user back after login
    const currentLocation = window.location.pathname + window.location.search;
    // Redirect to login with a message and return URL
    return <Navigate to={`/login?message=login_required&from=${encodeURIComponent(currentLocation)}`} replace />;
  }

  // If it's a private route and user is authenticated, allow access
  return children;
};

export default ProtectedRoute;