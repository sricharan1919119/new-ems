import { useState, useEffect } from 'react';
import { FaBell, FaEnvelope, FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import Logo from "./assets/Screenshot.png";
import "./Header.css";

const Header = ({ onMenuClick, isSidebarCollapsed }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSearch(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle" 
          onClick={onMenuClick}
          aria-label={isSidebarCollapsed ? 'Open menu' : 'Close menu'}
        >
          {isSidebarCollapsed ? <FaBars /> : <FaTimes />}
        </button>
        
        <div className="logo-container">
          <img
            src={Logo}
            alt="Company Logo"
            className="logo"
          />
        </div>
      </div>

      <div className={`search-container ${showSearch ? 'mobile-visible' : ''}`}>
        <form className="search-form">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </form>
      </div>

      <div className="header-right">
        {isMobile && (
          <button 
            className="search-toggle" 
            onClick={() => setShowSearch(!showSearch)}
            aria-label={showSearch ? 'Hide search' : 'Show search'}
          >
            <FaSearch />
          </button>
        )}
        
        <div className="header-actions">
          <button className="header-icon" aria-label="Notifications">
            <FaBell />
            <span className="badge">3</span>
          </button>
          
          <button className="header-icon" aria-label="Messages">
            <FaEnvelope />
            <span className="badge">5</span>
          </button>
          
          <div className="user-profile">
            <span className="username">WDS0514</span>
            <div className="avatar">
              {String('WDS0514').charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
