import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            className="navbar  navbar-expand-lg sticky-top border-bottom "
            style={{ backgroundColor: "#ffffff" }}
        >
            <div className="container p-2 ">
                <Link className="navbar-brand d-flex justify-center" to='/'>
                    <img
                        src="media/images/logo.svg"
                        alt="logo"
                        style={{ width: "25%" }}
                    ></img>
                </Link>
               
                <div className="collapse navbar-collapse  " id="navbarSupportedContent">
                    <form className="d-flex " role="search">
                        <ul className="navbar-nav me-auto mb-2   mb-lg-0">
                            <li className="nav-item ">
                                <Link className="nav-link active " aria-current="page" to='/signup'>
                                    Signup
                                </Link>
                            </li>
                            <li className="nav-item  ">
                                <Link className="nav-link active" to='/about'>
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/product'>
                                    Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to='/pricing'>
                                    Pricing
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to='/support'>
                                    Support
                                </Link>
                            </li>

                        </ul>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
