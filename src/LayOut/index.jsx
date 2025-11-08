import { NavLink, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <ul className="flex justify-center space-x-8 p-4">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600 text-lg transition-colors duration-200"
                  : "text-gray-600 hover:text-blue-500 text-lg transition-colors duration-200"
              }
              to="/"
            >
              Report
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-blue-600 text-lg transition-colors duration-200"
                  : "text-gray-600 hover:text-blue-500 text-lg transition-colors duration-200"
              }
              to="/transaction"
            >
              Transactions
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
