import { createContext, useState, useEffect } from 'react';
import axios from '../Axios'; 
import { useNavigate } from 'react-router-dom';

// Create an authentication context
export const AuthContext = createContext();

// Define the AuthProvider component
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null); // Add token state
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

  // Function to set state variables
    const setState = (user, token, loading, errors) => {
    setUser(user);
    setToken(token); // Set the token
    setLoading(loading);
    setErrors(errors);
    };

  // Fetch the current user's data when the component mounts
    useEffect(() => {
    axios
        .get('auth/currentUser')
        .then(res => setState(res.data.user, res.data.token, false, null)) // Set user data and token if successful
        .catch(error => {
        setState(null, null, false, null); 
        });
    }, []);

  // Function to handle user login
    const login = async user => {
    setLoading(true);
    try {
        const res = await axios.post('auth/login', user);
        setState(res.data.user, res.data.token, false, null); 
        navigate('/posts/dashboard'); 
    } catch (error) {
        console.log(error.response);
        setState(null, null, false, error.response.data); 
    }
    };

  // Function to handle user registration
    const register = async user => {
    setLoading(true);
    try {
        const res = await axios.post('auth/register', user);
        setState(res.data.user, res.data.token, false, null);  
        navigate('/posts/dashboard');  
    } catch (error) {
        console.log(error.response);
        setState(null, null, false, error.response.data.errors);  
    }
    };

  // Function to handle user logout
    const logout = async () => {
    setLoading(true);
    try {
        await axios.post('auth/logout', {});
        setState(null, null, false, null); 
        navigate("/"); 
      window.location.reload(); 
    } catch (error) {
        console.log(error.response);
       setState(null, null, false, error.response.errors); 
    }
    };

  // Provide the context values to child components
    return (
    <AuthContext.Provider value={{ user, token, loading, errors, login, register, logout }}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;
