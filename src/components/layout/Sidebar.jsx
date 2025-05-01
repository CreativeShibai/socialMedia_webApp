import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Home,
  Newspaper,
  MessageSquare,
  HelpCircle,
  Users,
  Bookmark,
  PlusCircle,
  Hash as Hashtag,
  Compass,
  TrendingUp,
  X,
} from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 pt-16 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 md:translate-x-0">
      {/* Mobile close button */}
      <div className="md:hidden absolute top-4 right-4">
        <button
          onClick={closeSidebar}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X size={24} />
        </button>
      </div>

      {/* Main navigation */}
      <div className="h-full px-3 py-4 overflow-y-auto">
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                isActive("/")
                  ? "text-white bg-indigo-600 hover:bg-indigo-700"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={closeSidebar}
            >
              <Home size={20} className="mr-3" />
              <span>Home</span>
            </Link>
          </li>

          <li>
            <Link
              to="/explore"
              className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                isActive("/explore")
                  ? "text-white bg-indigo-600 hover:bg-indigo-700"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={closeSidebar}
            >
              <Compass size={20} className="mr-3" />
              <span>Explore</span>
            </Link>
          </li>

          <li>
            <Link
              to="/boards"
              className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                location.pathname.startsWith("/board")
                  ? "text-white bg-indigo-600 hover:bg-indigo-700"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={closeSidebar}
            >
              <Newspaper size={20} className="mr-3" />
              <span>Boards</span>
            </Link>
          </li>

          <li>
            <Link
              to="/questions"
              className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                location.pathname.startsWith("/thread")
                  ? "text-white bg-indigo-600 hover:bg-indigo-700"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={closeSidebar}
            >
              <HelpCircle size={20} className="mr-3" />
              <span>Q&A</span>
            </Link>
          </li>

          <li>
            <Link
              to="/trending"
              className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                isActive("/trending")
                  ? "text-white bg-indigo-600 hover:bg-indigo-700"
                  : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={closeSidebar}
            >
              <TrendingUp size={20} className="mr-3" />
              <span>Trending</span>
            </Link>
          </li>

          {isAuthenticated && (
            <>
              <li className="pt-5">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  Your Content
                </div>
              </li>

              <li>
                <Link
                  to="/bookmarks"
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                    isActive("/bookmarks")
                      ? "text-white bg-indigo-600 hover:bg-indigo-700"
                      : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={closeSidebar}
                >
                  <Bookmark size={20} className="mr-3" />
                  <span>Bookmarks</span>
                </Link>
              </li>

              <li>
                <Link
                  to={`/profile/${user?.username}`}
                  className={`flex items-center px-4 py-3 text-base font-medium rounded-lg ${
                    location.pathname === `/profile/${user?.username}`
                      ? "text-white bg-indigo-600 hover:bg-indigo-700"
                      : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={closeSidebar}
                >
                  <Users size={20} className="mr-3" />
                  <span>My Profile</span>
                </Link>
              </li>
            </>
          )}
        </ul>

        {isAuthenticated && (
          <div className="mt-8">
            <Link
              to="/create"
              className="w-full flex items-center justify-center px-4 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
              onClick={closeSidebar}
            >
              <PlusCircle size={20} className="mr-2" />
              <span>Create Post</span>
            </Link>
          </div>
        )}

        {/* Trending Topics (simple version) */}
        <div className="mt-8">
          <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
            Trending Topics
          </h3>
          <ul className="mt-2 space-y-1">
            {["technology", "design", "programming", "ai", "travel"].map(
              (topic) => (
                <li key={topic}>
                  <Link
                    to={`/board/${topic}`}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    onClick={closeSidebar}
                  >
                    <Hashtag size={16} className="mr-2 text-indigo-500" />
                    <span>{topic}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
