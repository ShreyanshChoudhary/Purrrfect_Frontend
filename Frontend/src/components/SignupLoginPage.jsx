import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./contexts/UserContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SignupLoginPage.css";
import axios from "axios";
import { FaDog } from "react-icons/fa"; // Import the dog icon

function SignupLoginPage() {
  const navigate = useNavigate();
  const { login: userLogin } = useUser();

  const BASE_URL = "https://purrrfect-backend.onrender.com";

  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showOtpPanel, setShowOtpPanel] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const [signupData, setSignupData] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [otpData, setOtpData] = useState({
    otp: "",
    identifier: "",
  });

  // ---------------- TOAST NOTIFICATIONS ----------------
  const showSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const showInfo = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // ---------------- HANDLE INPUT ----------------
  const handleInputChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupData((prev) => ({ ...prev, [name]: value }));
    } else {
      setLoginData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ---------------- SIGNUP - SEND OTP ----------------
  const handleSignup = async (e) => {
    e.preventDefault();
    
    const identifier = signupData.email;

    if (!signupData.email || signupData.email.trim() === "") {
      showError("Please provide email address");
      return;
    }

    try {
      console.log("🔄 Sending OTP to email:", identifier);
      
      await axios.post(`${BASE_URL}/api/otp/send`, {
        identifier,
        purpose: "SIGNUP",
      });

      setOtpData({ identifier, otp: "" });
      setShowOtpPanel(true);

      showSuccess(`OTP sent to your email: ${identifier}`);

    } catch (error) {
      console.error("❌ OTP send error:", error);
      if (error.response) {
        showError(error.response.data?.message || "Failed to send OTP");
      } else if (error.request) {
        showError("Network error: Could not reach server");
      } else {
        showError("An unexpected error occurred");
      }
    }
  };

  // ---------------- VERIFY OTP AND CREATE USER ----------------
  const handleVerifyOtp = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      console.log("🔄 STEP 1: Verifying OTP:", otpData.otp, "for:", otpData.identifier);

      const verifyRes = await axios.post(`${BASE_URL}/api/otp/verify`, {
        identifier: otpData.identifier,
        purpose: "SIGNUP",
        otp: otpData.otp,
      });

      console.log("✅ STEP 1: OTP verification response:", verifyRes.data);

      if (!verifyRes.data.verified) {
        showError("Invalid OTP. Please try again.");
        return;
      }

      console.log("🔄 STEP 2: Creating user account...");
      
      const signupResponse = await axios.post(`${BASE_URL}/api/auth/signup`, {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        phoneNumber: signupData.phoneNumber,
        address: signupData.address
      });

      console.log("✅ STEP 2: User creation successful:", signupResponse.data);
      
      showSuccess("🎉 Account created successfully! Welcome to Purrrfect!");
      
      setShowOtpPanel(false);
      setSignupData({
        name: "",
        password: "",
        email: "",
        phoneNumber: "",
        address: "",
      });
      setOtpData({ identifier: "", otp: "" });
      
      setTimeout(() => {
        setIsRightPanelActive(false);
      }, 2000);
      
    } catch (err) {
      console.error("❌ OTP verification error:", err);
      
      if (err.code === 'ERR_NETWORK') {
        showError("Network error: Could not connect to server");
      } else if (err.response) {
        showError(err.response.data?.message || "Registration failed");
      } else {
        showError("An unexpected error occurred");
      }
    }
  };

  // ---------------- RESEND OTP ----------------
  const handleResendOtp = async () => {
    if (resendTimer > 0) return;

    try {
      await axios.post(`${BASE_URL}/api/otp/send`, {
        identifier: otpData.identifier,
        purpose: "SIGNUP",
      });

      showInfo("OTP resent successfully!");

      setResendTimer(60);
      const timer = setInterval(() => {
        setResendTimer((t) => {
          if (t <= 1) {
            clearInterval(timer);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } catch (err) {
      console.error(err);
      showError("Failed to resend OTP");
    }
  };

  // ---------------- CANCEL OTP PANEL ----------------
  const handleCancelOtp = () => {
    setShowOtpPanel(false);
    setOtpData({ identifier: "", otp: "" });
    setIsRightPanelActive(true);
  };

  // ---------------- LOGIN ----------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, loginData);

      if (!res.data.jwtToken) {
        showError("Invalid credentials");
        return;
      }

      const userData = {
        email: loginData.email,
        name: res.data.username || loginData.email.split("@")[0],
        username: res.data.username || loginData.email.split("@")[0],
        id: res.data.userId || Date.now(),
      };

      userLogin(res.data.jwtToken, userData);
      showSuccess(`👋 Welcome back, ${userData.name}!`);
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
      
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.message || "Login failed");
    }
  };

  // ---------------- GOOGLE LOGIN ----------------
  const handleGoogleLogin = () => {
    showInfo("Redirecting to Google...");
    window.location.href = `${BASE_URL}/oauth2/authorization/google`;
  };

  // ---------------- REDIRECT TO HOMEPAGE ----------------
  const handleLogoClick = () => {
    navigate("/");
  };

  // ---------------- UI ----------------
  return (
    <div className="auth-page">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Purrrfect Logo Header */}
      <div className="auth-page__logo" onClick={handleLogoClick}>
        <div className="navbar-brand">
          Purrrfect <FaDog size={24} className="dog-logo" />
        </div>
      </div>
      
      <div
        className={`auth-page__container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
      >
        {/* -------- SIGNUP FORM -------- */}
        {!showOtpPanel && (
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
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
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
                placeholder="Phone Number (optional)"
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
              <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
                📧 OTP will be sent to your email
              </p>
            </form>
          </div>
        )}

        {/* -------- PROFESSIONAL OTP PANEL -------- */}
        {showOtpPanel && (
          <div className="auth-page__form auth-page__sign-up">
            <div className="otp-verification-panel">
              <div className="otp-header">
                <h2>Enter Verification Code</h2>
                <p className="otp-subtitle">
                  A 6-digit code was sent to
                  <br />
                  <strong>{otpData.identifier}</strong>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="otp-form">
                <div className="otp-input-container">
                  <input
                    type="text"
                    value={otpData.otp}
                    onChange={(e) =>
                      setOtpData({
                        ...otpData,
                        otp: e.target.value.replace(/\D/g, "").slice(0, 6),
                      })
                    }
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    className="otp-input"
                    autoFocus
                  />
                </div>

                <div className="otp-timer">
                  {resendTimer > 0 ? (
                    <span className="timer">Resend code in {resendTimer}s</span>
                  ) : (
                    <span className="timer-placeholder">Code expires in 10 minutes</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={otpData.otp.length !== 6}
                  className="verify-button"
                >
                  Verify
                </button>

                <div className="otp-actions">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0}
                    className="resend-button"
                  >
                    Resend Code
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleCancelOtp}
                    className="cancel-button"
                  >
                    Cancel
                  </button>
                </div>

                <p className="security-note">
                  For your security, this code will expire in 10 minutes.
                </p>
              </form>
            </div>
          </div>
        )}

        {/* -------- LOGIN FORM -------- */}
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
              <span
                className="eye-icon"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? "👁️" : "👀"}
              </span>
            </div>
            <button type="submit">Sign In</button>

            <div className="divider">
              <span>Or continue with</span>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="google-btn"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt="Google"
                width="20"
                style={{ marginRight: "8px" }}
              />
              Continue with Google
            </button>
          </form>
        </div>

        {/* -------- OVERLAY PANELS -------- */}
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