import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Fusion
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              A unique social media platform that combines the best features of
              Twitter, Reddit, Quora, and Threads.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Navigation
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/explore"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Explore
                  </Link>
                </li>
                <li>
                  <Link
                    to="/boards"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Boards
                  </Link>
                </li>
                <li>
                  <Link
                    to="/questions"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Q&A
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Legal
              </h3>
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    to="/community-guidelines"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-0">
              © {new Date().getFullYear()} Fusion. All rights reserved.
            </p>

            <div className="flex items-center space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <Github size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
            Made with <Heart size={12} className="mx-1 text-red-500" /> in 2025
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
