import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import "./SignupLoginPage.css";
import { login, signup } from "../services/authService";

function SignupLoginPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const navigate = useNavigate();
  const { login: userLogin } = useUser();

  const [signupData, setSignupData] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending signup data:', signupData);
      const message = await signup(signupData);
      alert(message);
      setIsRightPanelActive(false); // Switch to login panel after signup
    } catch (error) {
      console.error('Signup error:', error);
      alert(error.response?.data || "Signup failed");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending login data:', loginData);
      const data = await login(loginData);
      console.log('Login response:', data);
      
      if (!data.jwtToken) throw new Error("Invalid login response");
      
      // Use the context login function
      userLogin(data.jwtToken, { 
        email: data.email, 
        name: data.name,
        id: data.userId 
      });
      
      alert(`Welcome ${data.name || data.email}!`);
      navigate("/");
    } catch (error) {
      console.error('Login error:', error);
      alert(error.response?.data || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className={`auth-page__container ${isRightPanelActive ? "right-panel-active" : ""}`}>
        {/* Signup Form */}
        <div className="auth-page__form auth-page__sign-up">
          <form className="auth-page__form-content" onSubmit={handleSignup}>
            <h1>Create Account</h1>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={signupData.name}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={signupData.password}
                onChange={(e) => handleInputChange(e, "signup")}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "👁️" : "👀"}
              </span>
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={signupData.email}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              value={signupData.phoneNumber}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              value={signupData.address}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Login Form */}
        <div className="auth-page__form auth-page__sign-in">
          <form className="auth-page__form-content" onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={loginData.email}
              onChange={(e) => handleInputChange(e, "login")}
            />
            <div className="password-container">
              <input
                type={showLoginPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                value={loginData.password}
                onChange={(e) => handleInputChange(e, "login")}
              />
              <span className="eye-icon" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                {showLoginPassword ? "👁️" : "👀"}
              </span>
            </div>
            <button type="submit">Sign In</button>

            {/* Google Login */}
            <a href="http://localhost:8081/oauth2/authorization/google" className="google-btn">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="Google"
                width="20"
                style={{ marginRight: "8px" }}
              />
              Continue with Google
            </a>
          </form>
        </div>

        {/* Overlay Panels */}
        <div className="auth-page__overlay-container">
          <div className="auth-page__overlay">
            <div className="auth-page__overlay-panel auth-page__overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
                Sign In
              </button>
            </div>
            <div className="auth-page__overlay-panel auth-page__overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupLoginPage;