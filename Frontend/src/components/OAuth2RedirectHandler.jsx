import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "./contexts/UserContext";
import React from "react";  

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { login } = useUser();

  useEffect(() => {
    const token = params.get("token");

    if (!token) return navigate("/login");

    const decoded = jwtDecode(token);

    login(token, {
      email: decoded.sub,
      name: decoded.name,
      picture: decoded.picture,
      roles: decoded.roles,
    });

    navigate("/");
  }, []);

  return <p>Signing in with Google…</p>;
}

export default OAuth2RedirectHandler;
