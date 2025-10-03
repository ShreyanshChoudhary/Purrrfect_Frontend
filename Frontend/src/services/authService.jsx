import axios from "axios";

// Base URL of your Spring Boot backend
const API_URL = "http://localhost:8081";

// ---------------------------
// ✅ LOGIN FUNCTION
// ---------------------------
export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    console.log("Login successful:", response.data);

    const token = response.data.jwtToken;
    setAuthToken(token);

    return response.data; // { jwtToken, username }
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------------
// ✅ SIGNUP FUNCTION
// ---------------------------
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    console.log("Signup successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------------
// ✅ SET TOKEN FOR FUTURE REQUESTS
// ---------------------------
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    console.log("JWT token set");
  } else {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    console.log("JWT token removed");
  }
};

// ---------------------------
// ✅ OPTIONAL: LOGOUT
// ---------------------------
export const logout = () => {
  setAuthToken(null);
  alert("Logged out successfully!");
};
