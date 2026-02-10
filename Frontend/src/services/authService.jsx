import axios from "axios";

// Base URL of your Spring Boot backend
const API_URL = "http://localhost:8081";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ---------------------------
// ✅ LOGIN FUNCTION
// ---------------------------
export const login = async (loginData) => {
  try {
    console.log("Sending login request to:", `${API_URL}/auth/login`);
    console.log("Login data:", loginData);
    
    const response = await api.post('/auth/login', loginData);
    console.log("✅ Login successful - FULL RESPONSE:", response.data);
    console.log("📋 Available fields in response:", Object.keys(response.data));
    console.log("🔍 Response details:", {
      jwtToken: response.data.jwtToken,
      username: response.data.username,
      email: response.data.email,
      name: response.data.name,
      userId: response.data.userId,
      id: response.data.id
    });

    const token = response.data.jwtToken;
    if (token) {
      setAuthToken(token);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login error:", error.response?.data || error.message);
    console.error("Error details:", error);
    throw error;
  }
};

// ---------------------------
// ✅ SIGNUP FUNCTION
// ---------------------------
export const signup = async (userData) => {
  try {
    console.log("Sending signup request to:", `${API_URL}/auth/signup`);
    console.log("Signup data:", userData);
    
    const response = await api.post('/auth/signup', userData);
    console.log("✅ Signup successful - FULL RESPONSE:", response.data);
    console.log("📋 Available fields in signup response:", Object.keys(response.data));

    return response.data;
  } catch (error) {
    console.error("❌ Signup error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------------
// ✅ SET TOKEN FOR FUTURE REQUESTS
// ---------------------------
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
    console.log("🔑 JWT token set in headers and localStorage");
  } else {
    delete api.defaults.headers.common["Authorization"];
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    console.log("🔓 JWT token removed");
  }
};

// ---------------------------
// ✅ GET TOKEN FROM STORAGE
// ---------------------------
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

// ---------------------------
// ✅ CHECK IF USER IS AUTHENTICATED
// ---------------------------
export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};

// ---------------------------
// ✅ LOGOUT FUNCTION
// ---------------------------
export const logout = () => {
  setAuthToken(null);
  localStorage.removeItem("user"); // Also remove user data
  console.log("🚪 User logged out successfully");
};

// ---------------------------
// ✅ GET USER PROFILE (if your backend has this endpoint)
// ---------------------------
export const getUserProfile = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await api.get('/auth/profile');
    console.log("✅ User profile fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Get profile error:", error.response?.data || error.message);
    throw error;
  }
};

// ---------------------------
// ✅ INITIALIZE AUTH TOKEN ON APP START
// ---------------------------
export const initializeAuth = () => {
  const token = getAuthToken();
  if (token) {
    setAuthToken(token);
    console.log("🔄 Auth token initialized from localStorage");
  }
};

// Add request interceptor to log requests
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response received from: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error(`❌ Response error from: ${error.config?.url}`, error.response?.status);
    return Promise.reject(error);
  }
);

export default api;