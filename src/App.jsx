import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import LoadingSpinner from "./components/ui/LoadingSpinner";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import TopicBoardPage from "./pages/TopicBoardPage";
import QuestionThreadPage from "./pages/QuestionThreadPage";
import CreatePostPage from "./pages/CreatePostPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import SettingsPage from "./pages/SettingsPage";

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSidebar, setShowSidebar] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Auto-show sidebar on desktop, hide on mobile
      if (!mobile && !showSidebar) {
        setShowSidebar(true);
      } else if (mobile && showSidebar) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showSidebar]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <Toaster position="top-right" />
        <Navbar toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 pt-16">
          {showSidebar && (
            <Sidebar closeSidebar={() => isMobile && setShowSidebar(false)} />
          )}

          <main
            className={`flex-1 p-4 transition-all duration-300 ${
              showSidebar ? "md:ml-64" : ""
            }`}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/board/:topicId" element={<TopicBoardPage />} />
              <Route
                path="/thread/:questionId"
                element={<QuestionThreadPage />}
              />
              <Route path="/search" element={<SearchPage />} />

              {/* Protected routes */}
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <CreatePostPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />

              {/* 404 route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
