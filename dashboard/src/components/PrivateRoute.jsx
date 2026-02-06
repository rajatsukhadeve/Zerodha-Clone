import { useEffect, useState } from "react";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:8080/allHoldings", { withCredentials: true });
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // IF NOT LOGGED IN: Redirect to the Frontend Login Page
  if (isAuthenticated === false) {
    // CHANGE THIS PORT to match your Frontend (5174 or 3000)
    window.location.href = "http://localhost:5174/login"; 
    return null;
  }

  // IF LOGGED IN: Show the Dashboard
  return children;
};

export default PrivateRoute;