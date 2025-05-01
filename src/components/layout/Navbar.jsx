import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  Menu,
  X,
  Moon,
  Sun,
  Bell,
  MessageCircle,
  LogOut,
  Settings,
  User,
} from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () =>
      localStorage.getItem("darkMode") === "true" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Apply dark mode class to HTML
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo and toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus:outline-none"
              aria-label="Toggle sidebar"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Fusion
              </span>
            </Link>
          </div>

          {/* Middle section: Search */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-4"
          >
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full py-2 pl-10 pr-3 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
                placeholder="Search for people, topics, or posts..."
              />
            </div>
            <button
              type="submit"
              className="ml-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </form>

          {/* Right section: Theme toggle and user menu */}
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/messages"
                  className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus:outline-none"
                >
                  <MessageCircle size={20} />
                </Link>
                <Link
                  to="/notifications"
                  className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 focus:outline-none"
                >
                  <Bell size={20} />
                </Link>

                <div className="relative ml-3">
                  <button
                    onClick={toggleUserMenu}
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="user-menu-button"
                    aria-expanded={showUserMenu}
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    {user?.avatarUrl ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover"
                        src={user.avatarUrl}
                        alt={user.displayName}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium">
                        {user?.displayName.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </button>

                  {/* Dropdown menu */}
                  {showUserMenu && (
                    <div
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-700"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <div className="py-1" role="none">
                        <Link
                          to={`/profile/${user?.username}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <User size={16} className="mr-2" />
                          Profile
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings size={16} className="mr-2" />
                          Settings
                        </Link>
                      </div>
                      <div className="py-1" role="none">
                        <button
                          onClick={() => {
                            logout();
                            setShowUserMenu(false);
                          }}
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          role="menuitem"
                        >
                          <LogOut size={16} className="mr-2" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <form
        onSubmit={handleSearch}
        className="md:hidden p-2 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full py-2 pl-10 pr-3 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            placeholder="Search..."
          />
        </div>
      </form>
    </header>
  );
};

export default Navbar;
