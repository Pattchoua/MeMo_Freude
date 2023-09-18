import { useState, useContext } from 'react';
import { AuthContext } from '../context/Auth';
import { Navigate, Link } from 'react-router-dom';

function Register(props) {
  const context = useContext(AuthContext);
  const errors = context.errors;

  // State to manage user input
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // State to manage password length message
  const [passwordLengthMessage, setPasswordLengthMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Check password length and set the message
    if (name === 'password') {
      if (value.length < 8) {
        setPasswordLengthMessage('Passwort muss mindestens 8 Zeichen lang sein');
      } else {
        setPasswordLengthMessage('');
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    context.register(user);
    props.closeRegistrationModal();
  };

  // Handle cancel button click
  const handleCancel = () => {
    props.closeRegistrationModal();
  };

  // Define a custom class for the form background color
  const formBackgroundColor = context.loading ? 'bg-white' : 'bg-black/60';

  // Redirect to the dashboard if the user is already authenticated
  if (!context.loading && context.user) {
    return <Navigate to="/posts/dashboard" />;
  }

  // Render the registration form if not authenticated
  if (!context.loading && !context.user) {
    return (
      <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 ${formBackgroundColor}`}>
        <div className="w-96 p-8 bg-white rounded-lg shadow-lg relative z-50">
          {context.errors?.message}
          <h2 className="text-2xl font-semibold mb-4">Registrieren</h2>
          <form className="form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Benutzername:
              </label>
              {errors?.username && <p className="text-danger">{errors?.username.message}</p>}
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-Mail:
              </label>
              {errors?.email && <p className="text-danger">{errors?.email.message}</p>}
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Passwort:
              </label>
              {errors?.password && <p className="text-danger">{errors?.password.message}</p>}
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary"
              />
              {passwordLengthMessage && <p className="text-red-500">{passwordLengthMessage}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Passwort bestätigen:
              </label>
              {errors?.confirmPassword && (
                <p className="text-danger">{errors?.confirmPassword.message}</p>
              )}
              <input
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-primary"
              />
            </div>

            <div className="flex justify-between">
              <button className="w-5/12 bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition duration-300">
                Registrieren
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="w-5/12 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
              >
                Abbrechen
              </button>
            </div>
            <Link
              to="#"
              className="text-blue-600 hover:underline mt-2 block text-center"
              onClick={() => {
                props.closeRegistrationModal();
                props.openLoginModal();
                console.log("Login-Modal sollte hier geöffnet werden.");
              }}
            >
              Bereits ein Konto? Einloggen
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
