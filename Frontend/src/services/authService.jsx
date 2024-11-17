import axios from "axios";

// Replace with your actual backend URL (adjust the port if needed)
const API_URL = "http://localhost:8081";  // Make sure this matches your backend URL

// Login API
export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    console.log("Login successful:", response.data); // Debugging
    return response.data; // Should return { jwtToken, username }
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error; // You can handle this more gracefully in your UI
  }
};

// Signup API
export const signup = async (userData) => {
  try {
    // Use the correct public signup endpoint
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    console.log("Signup successful:", response.data); // Debugging
    return response.data; // Success message or other relevant data
  } catch (error) {
    console.error("Error during signup:", error.response?.data || error.message);
    throw error; // Handle the error as needed in your UI
  }
};

// Set JWT Token for future requests
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Auth token set:", token); // Debugging
  } else {
    delete axios.defaults.headers.common["Authorization"];
    console.log("Auth token removed."); // Debugging
  }
};

// Example: Call this after successful login to set the token for future requests
export const handleLogin = async (loginData) => {
  try {
    const loginResponse = await login(loginData);
    setAuthToken(loginResponse.jwtToken); // Store JWT token for subsequent requests
    return loginResponse;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error; // Handle the error in the UI
  }
};

// Example: Call this after successful signup to set the token (if you want to auto-login after signup)
export const handleSignup = async (userData) => {
  try {
    const signupResponse = await signup(userData);
    // You can choose to auto-login after signup:
    // await handleLogin({ username: userData.username, password: userData.password });
    return signupResponse;
  } catch (error) {
    console.error("Signup failed:", error.response?.data || error.message);
    throw error; // Handle the error in the UI
  }
};

// Get current authenticated user details (optional)
export const getUserDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/user`);
    console.log("User details fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error.response?.data || error.message);
    throw error;
  }
};
