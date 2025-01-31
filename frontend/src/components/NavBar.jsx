import { useState } from "react";
import "../css/components/NavBar.css";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="retro-navbar">
            <div className="navbar-left">
                <h1 className="navbar-title">Game Hub</h1>
                <div className="navbar-links">
                    <a href="/" className="navbar-link">
                        Home
                    </a>
                    <a href="/games" className="navbar-link">
                        All Games
                    </a>
                </div>
            </div>
            <div className="navbar-right">
                <div className="navbar-menu-container">
                    {isOpen ? (
                        <div className="navbar-menu-open">
                            <a href="/profile" className="navbar-link">
                                Profile
                            </a>
                            <a href="/settings" className="navbar-link">
                                Settings
                            </a>
                            <a href="/logout" className="navbar-link">
                                Logout
                            </a>
                        </div>
                    ) : null}
                    <button onClick={() => setIsOpen(!isOpen)} className={`navbar-toggle-btn ${isOpen ? "navbar-close-btn" : "navbar-menu-btn"}`}>
                        {isOpen ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
