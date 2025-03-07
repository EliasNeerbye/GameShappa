import { useState, useContext } from "react";
import { ChevronRight, ChevronLeft, Menu } from "lucide-react";
import { AuthContext } from "../auth/AuthContext";
import "../css/components/NavBar.css";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { user } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Left Side - Logo and Main Links */}
                <div className="navbar-left">
                    <a href="/" className="navbar-logo">
                        Game Shappa
                    </a>
                    <div className="navbar-main-links">
                        <a href="/games" className="navbar-link">
                            All Games
                        </a>
                        <a href="/search" className="navbar-link">
                            Search
                        </a>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button className="mobile-menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu size={24} />
                </button>

                {/* Right Side - Expandable Menu */}
                <div className="navbar-right">
                    <div className={`navbar-expandable ${isOpen ? "expanded" : ""}`}>
                        <div className="navbar-menu-links">
                            {user ? (
                                <>
                                    <a href="/profile" className="navbar-link">
                                        Profile
                                    </a>
                                    <a href="/settings" className="navbar-link">
                                        Settings
                                    </a>
                                    <a href="/logout" className="navbar-link">
                                        Logout
                                    </a>
                                </>
                            ) : (
                                <a href="/login" className="navbar-link">
                                    Login
                                </a>
                            )}
                            <a href="/about" className="navbar-link">
                                About
                            </a>
                        </div>
                    </div>

                    {/* Toggle Button */}
                    <button onClick={() => setIsOpen(!isOpen)} className="navbar-toggle">
                        {isOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        <p className="navbar-more-text">More</p>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
                <a href="/games" className="navbar-link">
                    All Games
                </a>
                <a href="/search" className="navbar-link">
                    Search
                </a>
                {user ? (
                    <>
                        <a href="/profile" className="navbar-link">
                            {user.name} (Profile)
                        </a>
                        <a href="/settings" className="navbar-link">
                            Settings
                        </a>
                        <a href="/logout" className="navbar-link">
                            Logout
                        </a>
                    </>
                ) : (
                    <a href="/login" className="navbar-link">
                        Login
                    </a>
                )}
                <a href="/about" className="navbar-link">
                    About
                </a>
            </div>
        </nav>
    );
};

export default NavBar;
