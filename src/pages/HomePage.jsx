import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table as Tabs,
  MessageSquare,
  Newspaper,
  HelpCircle,
} from "lucide-react";
import { api } from "../utils/api";
import Post from "../components/posts/Post";
import CreatePostForm from "../components/post/CreatePostForm";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [postLoading, setPostLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState(null);

  const fetchPosts = async (reset = false) => {
    try {
      setError(null);

      if (reset) {
        setPage(0);
        setLoading(true);
      }

      const currentPage = reset ? 0 : page;

      let endpoint = "/posts";
      if (activeTab !== "all") {
        endpoint += `?type=${activeTab.toUpperCase()}`;
      }

      endpoint += activeTab === "all" ? (reset ? "?" : "&") : "&";
      endpoint += `page=${currentPage}&size=10`;

      setPostLoading(true);
      const response = await api.get(endpoint);

      if (reset) {
        setPosts(response.data.content);
      } else {
        if(response.data.content.length === 0) setHasMore(false)
        else
        setPosts((prev) => [...prev, ...response.data.content]);
      }

      setHasMore(!response.data.last);
      setPage(currentPage + 1);
    } catch (error) {
      setError(
        "Failed to load posts. Please ensure the backend server is running."
      );
      console.error("Failed to fetch posts:", error);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, [activeTab, refreshTrigger]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
        setPostLoading(true);
        fetchPosts();
    }
  };

  const handlePostCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Home</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
          {error}
        </div>
      )}

      {isAuthenticated && (
        <CreatePostForm postType="TWEET" onSuccess={handlePostCreated} />
      )}

      <div className="mb-6">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            <button
              onClick={() => handleTabChange("all")}
              className={`py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                activeTab === "all"
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => handleTabChange("tweets")}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                activeTab === "tweets"
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <MessageSquare size={16} className="mr-1" />
              Tweets
            </button>
            <button
              onClick={() => handleTabChange("boards")}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm mr-8 ${
                activeTab === "boards"
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <Newspaper size={16} className="mr-1" />
              Boards
            </button>
            <button
              onClick={() => handleTabChange("questions")}
              className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "questions"
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <HelpCircle size={16} className="mr-1" />
              Questions
            </button>
          </nav>
        </div>
      </div>

      {loading && page === 0 ? (
        <div className="py-8">
          <LoadingSpinner size="lg" className="mx-auto" />
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center border border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            {error ? "Failed to load posts" : "No posts found"}
          </p>
          {activeTab !== "all" && !error && (
              <button
                onClick={() => handleTabChange("all")}
                className="mt-2 text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                View all posts
              </button>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {posts?.map((post) => (
              <Post
                key={post.id}
                
                post={post}
                onPostUpdate={handlePostUpdate}
              />
            ))}
          </div>

          {hasMore && (
            <div className="mt-6 text-center">
              <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {postLoading ? (
                    <span className="flex items-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Loading...
                    </span>
                  
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
