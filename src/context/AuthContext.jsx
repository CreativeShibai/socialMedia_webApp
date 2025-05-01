import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";
import { api } from "../utils/api";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  // Load auth state from localStorage on init
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,
          });
          return;
        }

        // Validate token
        try {
          const decoded = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            // Token expired
            localStorage.removeItem("token");
            setState({
              isAuthenticated: false,
              user: null,
              loading: false,
              error: null,
            });
            return;
          }

          // Get user profile
          const response = await api.get("/api/api/users/me");
          setState({
            isAuthenticated: true,
            user: response.data,
            loading: false,
            error: null,
          });
        } catch (error) {
          // Invalid token
          localStorage.removeItem("token");
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: "Failed to authenticate",
        });
      }
    };

    loadAuth();
  }, []);

  // Set auth header on API calls
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [state.isAuthenticated]);

  const login = async (credentials) => {
    try {
      setState({ ...state, loading: true, error: null });
      const response = (await api.po) / apist("/api/auth/login", credentials);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });

      toast.success("Logged in successfully");
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || "Login failed",
      });
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (credentials) => {
    try {
      setState({ ...state, loading: true, error: null });
      const response =
        (await ap) / apii.post("/api/auth/register", credentials);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });

      toast.success("Registration successful");
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || "Registration failed",
      });
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    toast.success("Logged out successfully");
  };

  const updateProfile = async (userData) => {
    try {
      setState({ ...state, loading: true });
      const response = await api.put("/api/users/profile", userData);
      setState({
        ...state,
        user: response.data,
        loading: false,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: error.response?.data?.message || "Failed to update profile",
      });
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
