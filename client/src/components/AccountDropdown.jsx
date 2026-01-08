import { Link, useNavigate } from "react-router-dom";

const AccountDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg border z-50">
      <ul className="py-2 text-sm text-gray-700">
        <li>
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Profile
          </Link>
        </li>

        <li>
          <Link
            to="/orders"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            My Orders
          </Link>
        </li>

        <li>
          <Link
            to="/settings"
            className="block px-4 py-2 hover:bg-gray-100"
          >
            Settings
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AccountDropdown;
