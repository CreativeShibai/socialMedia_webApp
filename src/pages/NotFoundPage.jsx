import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Button from "../components/ui/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-center">
      <div className="mb-6">
        <AlertTriangle size={64} className="mx-auto text-yellow-500" />
      </div>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
        Page not found
      </h2>

      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          as={Link}
          to="/"
          variant="primary"
          size="lg"
          leftIcon={<span aria-hidden="true">&larr;</span>}
        >
          Return to home
        </Button>

        <Button as={Link} to="/explore" variant="outline" size="lg">
          Explore content
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
