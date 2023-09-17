import { useState, useContext } from 'react';
import { AuthContext } from '../context/Auth'; 
import { Navigate } from 'react-router-dom';

function Login(props) {
  const context = useContext(AuthContext);

  // State to manage user input
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    context.login(user); 
    props.closeModal();
  };

  // Handle cancel button click
  const handleCancel = () => {
    props.closeModal();
  };

  // Define a custom class for the form background color
  const formBackgroundColor = context.loading ? 'bg-white' : 'bg-black/60';

  // Redirect to postsListing Page if user is already authenticated
  if (!context.loading && context.user) {
    return <Navigate to="/posts/dashboard" />;
  }

  // Render the login form as a modal overlay
  if (!context.loading && !context.user) {
    return (
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${formBackgroundColor}`}>
        <div className="w-96 p-8 bg-white rounded-lg shadow-lg relative z-50">
          {context.errors?.message} 
          <h2 className="text-2xl font-semibold mb-4">Login</h2>

          {/* Display a message to register if the user is not registered */}
          <p className="text-gray-700 mb-4">
            Not registered yet? <a href="/register" className="text-primary hover:underline">Register now</a>.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition duration-300 ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
