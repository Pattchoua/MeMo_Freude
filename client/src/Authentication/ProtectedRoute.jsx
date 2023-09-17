

// Import necessary dependencies
import { useContext } from 'react';
import { AuthContext } from '../context/Auth'; 
import { Navigate, Outlet } from 'react-router-dom';

// ProtectedRoute component
const ProtectedRoute = () => {
  // Access the authentication context
  const { user, loading } = useContext(AuthContext);

  // Render the content of the protected route based on authentication status
  return (
    <>
      {!loading && (
        <>
          {/* Show the nested routes within Outlet if user is authenticated */}
          {user ? <Outlet /> : <Navigate to="/login" />}
        </>
      )}
    </>
  );
};

export default ProtectedRoute;
