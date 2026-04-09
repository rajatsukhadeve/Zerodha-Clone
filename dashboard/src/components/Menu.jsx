import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import axios from "axios";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";

const Menu = () => {
    const [selectedMenu, setSelectedMenu] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleMenuClick = (idx) => {
        setSelectedMenu(idx);
    };

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // --- NEW: LOGOUT FUNCTION ---
    const handleLogout = () => {
    // 1. Call backend to clear cookie
    axios.get("http://localhost:8080/logout", { withCredentials: true })
      .then(() => {
        // 2. Redirect to Frontend Login Page
        // CHANGE THIS PORT to match your Frontend (5174 or 3000)
        window.location.href = "http://localhost:5174/login";
      })
      .catch((err) => {
        console.log("Error logging out", err);
      });
  };
    // ---------------------------

    const menuClass = "menu";
    const activeMenuClass = "menu selected";

    return (
        <div className="menu-container">
            <img src="logo.png" style={{ width: "50px" }} alt="Logo" />
            
            <div className="menus">
                <ul>
                    <li>
                        <Link to="/" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(0)}>
                            <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/orders" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(1)}>
                            <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/holdings" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(2)}>
                            <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/positions" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(3)}>
                            <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/funds" style={{ textDecoration: "none" }} onClick={() => handleMenuClick(4)}>
                            <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
                        </Link>
                    </li>
                    
                </ul>
                <hr />

                
                <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer", position: "relative" }}>
                    <div className="avatar">ZU</div>
                    <p className="username">USERID</p>

                    {isDropdownOpen && (
                        <div
                            style={{
                                position: "absolute",
                                top: "100%",
                                right: "0",
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                padding: "10px",
                                zIndex: 1000,
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                                minWidth: "100px"
                            }}
                        >
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "red",
                                    cursor: "pointer",
                                    width: "100%",
                                    textAlign: "left"
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Menu;