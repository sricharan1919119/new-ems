import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const modules = [
    { name: "Home", route: "/" },
    { name: "Profile", route: "/profile" },
    { name: "Company's", route: "/companies" },
    { name: "Employees", route: "/employees" },
    { name: "Accounts", route: "/accounts" },
    { name: "Contact Us", route: "/contact-us" },
    { name: "Notifications", route: "/notifications" },
    { name: "Logout", route: "/logout" },
  ];

  return (
    <aside className="col-12 col-md-3 col-lg-2 p-3">
      <h6 className="fw-bold mb-4">WORLD STAR</h6>

      <ul className="nav flex-column gap-1">
        {modules.map((module, i) => {
          return (
            <li key={i} className="nav-item">
              <NavLink
                to={module.route}
                className={({ isActive }) =>
                  `nav-link ${
                    isActive ? "sidebar-active rounded" : "text-dark"
                  }`
                }
              >
                {module.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;