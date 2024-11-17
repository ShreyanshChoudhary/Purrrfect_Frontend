import React, { useState } from "react";
import "./SignupLoginPage.css";
import { login, signup, setAuthToken } from "../services/authService";

function SignupLoginPage() {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "", // Added address field
  });

  const [loginData, setLoginData] = useState({ username: "", password: "" });

  // Handle input changes for both signup and login forms
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup Data:", signupData); // Log to verify signup data
    try {
      const message = await signup(signupData); // Call signup service
      alert(message); // Notify user of successful signup
      setIsRightPanelActive(false); // Switch to login panel
    } catch (error) {
      alert(error.response?.data || "Signup failed");
    }
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(loginData); // Call login service
      setAuthToken(data.jwtToken); // Set token in axios headers
      alert(`Welcome ${data.username}!`);
      // Redirect or update UI for logged-in user
    } catch (error) {
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
              name="username"
              placeholder="Username"
              required
              value={signupData.username}
              onChange={(e) => handleInputChange(e, "signup")}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={signupData.password}
              onChange={(e) => handleInputChange(e, "signup")}
            />
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
              placeholder="Address"  // New Address input field
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
              type="text"
              name="username"
              placeholder="Username"
              required
              value={loginData.username}
              onChange={(e) => handleInputChange(e, "login")}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={loginData.password}
              onChange={(e) => handleInputChange(e, "login")}
            />
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
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
