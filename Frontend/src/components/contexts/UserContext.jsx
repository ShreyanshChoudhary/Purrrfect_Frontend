const handleLogin = async (e) => {
  e.preventDefault();
  try {
    console.log('Sending login data:', loginData);
    const data = await login(loginData);
    console.log('FULL LOGIN RESPONSE:', data); // Check ALL fields
    
    if (!data.jwtToken) throw new Error("Invalid login response");
    
    // Debug: Check all available fields
    console.log('Available fields in response:', Object.keys(data));
    
    const userData = {
      id: data.id || data.userId,
      email: data.email,
      name: data.name || data.username || data.fullName,
      // Try different possible field names
    };
    
    console.log('Processed user data:', userData);
    
    userLogin(data.jwtToken, userData);
    alert(`Welcome ${userData.name || data.email}!`);
    navigate("/");
  } catch (error) {
    console.error('Login error:', error);
    alert(error.response?.data || "Login failed");
  }
};