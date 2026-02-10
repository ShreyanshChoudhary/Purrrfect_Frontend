import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode(token);
    return {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      token
    };
  });

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    setUser({
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      token
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
