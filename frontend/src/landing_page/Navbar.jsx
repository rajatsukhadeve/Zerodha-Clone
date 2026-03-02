import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    // Replace this with your actual Dashboard URL if it's hosted elsewhere
    // For local development, dashboard often runs on a different port like 5174
    const DASHBOARD_URL = "http://localhost:5174";

    return (
        <nav
            className="navbar navbar-expand-lg border-bottom sticky-top"
            style={{ backgroundColor: "#FFF" }}
        >
            <div className="container p-2">
                <Link className="navbar-brand" to="/">
                    <img
                        src="media/images/logo.svg"
                        style={{ width: "25%" }}
                        alt="Logo"
                    />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-lg-0 ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/signup">
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/about">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/product">
                                Product
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/pricing">
                                Pricing
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/support">
                                Support
                            </Link>
                        </li>
                        {/* Added Login and Dashboard Quick Access */}
                        <li className="nav-item">
                            <Link className="nav-link active" to="/signup">
                                Signup
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                to="/login"

                            >
                                Login
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;