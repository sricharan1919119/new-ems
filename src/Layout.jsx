import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Container, Row, Col } from "react-bootstrap";
import "./Layout.css"; // We'll create this file next

const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarCollapsed(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <div className="app-container">
      <Header onMenuClick={toggleSidebar} isSidebarCollapsed={sidebarCollapsed} />
      <div className="app-content">
        <div className={`sidebar-container ${sidebarCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`}>
          <Sidebar isCollapsed={sidebarCollapsed} isMobile={isMobile} />
        </div>
        <main className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
          <Container fluid className="p-3 p-md-4">
            <Outlet />
          </Container>
        </main>
        {isMobile && sidebarCollapsed && (
          <div className="sidebar-overlay" onClick={toggleSidebar}></div>
        )}
      </div>
    </div>
  );
};

export default Layout;
