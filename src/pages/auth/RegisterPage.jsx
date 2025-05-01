import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";

const RegisterPage = () => {
  const { register: registerUser, error, loading } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    const { confirmPassword, ...registerData } = data;
    await registerUser(registerData);
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join Fusion today and connect with a vibrant community
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-md text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 sm:text-sm"
                  placeholder="johndoe"
                  {...register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message:
                        "Username can only contain letters, numbers, and underscores",
                    },
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username cannot exceed 20 characters",
                    },
                  })}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 sm:text-sm"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Display Name
              </label>
              <div className="mt-1">
                <input
                  id="displayName"
                  type="text"
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 sm:text-sm"
                  placeholder="John Doe"
                  {...register("displayName", {
                    required: "Display name is required",
                    minLength: {
                      value: 2,
                      message: "Display name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Display name cannot exceed 50 characters",
                    },
                  })}
                />
                {errors.displayName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.displayName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 sm:text-sm pr-10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 flex items-center bg-transparent border-0 text-gray-500 dark:text-gray-400"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className="block w-full appearance-none rounded-md border border-gray-300 dark:border-gray-700 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 sm:text-sm pr-10"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 dark:border-gray-700 text-indigo-600 focus:ring-indigo-500"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={loading}
              >
                Create account
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
