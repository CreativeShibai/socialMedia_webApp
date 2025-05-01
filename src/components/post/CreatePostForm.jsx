import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Image, X, Paperclip } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/api";
import toast from "react-hot-toast";
import Button from "../ui/Button";

const CreatePostForm = ({
  postType = "TWEET",
  parentId,
  topicId,
  onSuccess,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(topicId || null);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [showTopicSelector, setShowTopicSelector] = useState(false);

  // Character limit based on post type
  const getCharacterLimit = () => {
    switch (postType) {
      case "TWEET":
        return 280;
      case "QUESTION":
        return 500;
      case "BOARD_POST":
        return 1000;
      case "ANSWER":
        return 2000;
      default:
        return 280;
    }
  };

  const characterLimit = getCharacterLimit();
  const charactersLeft = characterLimit - content.length;

  React.useEffect(() => {
    if (postType === "BOARD_POST" && !topicId) {
      fetchTopics();
      setShowTopicSelector(true);
    }
  }, [postType, topicId]);

  const fetchTopics = async () => {
    try {
      const response = await api.get("/api/topics");
      setAvailableTopics(response.data);
    } catch (error) {
      toast.error("Failed to load topics");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size too large. Maximum allowed is 5MB.");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    setImageFile(file);

    // Create a preview URL
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.trim() === "") {
      toast.error("Please enter some content");
      return;
    }

    if (postType === "BOARD_POST" && !selectedTopic) {
      toast.error("Please select a topic");
      return;
    }

    setIsSubmitting(true);

    try {
      let formData = new FormData();
      formData.append("content", content);
      formData.append("type", postType);

      if (parentId) {
        formData.append("parentId", parentId.toString());
      }

      if (selectedTopic) {
        formData.append("topicId", selectedTopic.toString());
      }

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await api.post("/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post created successfully");
      setContent("");
      removeImage();

      if (onSuccess) {
        onSuccess();
      } else {
        // Redirect based on post type
        switch (postType) {
          case "TWEET":
            navigate("/");
            break;
          case "BOARD_POST":
            navigate(`/board/${selectedTopic}`);
            break;
          case "QUESTION":
            navigate("/questions");
            break;
          default:
            navigate("/");
        }
      }
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPlaceholderText = () => {
    switch (postType) {
      case "TWEET":
        return "What's happening?";
      case "QUESTION":
        return "Ask your question...";
      case "BOARD_POST":
        return "Share something with the community...";
      case "ANSWER":
        return "Write your answer...";
      default:
        return "What's on your mind?";
    }
  };

  const getButtonText = () => {
    switch (postType) {
      case "TWEET":
        return "Post";
      case "QUESTION":
        return "Ask Question";
      case "BOARD_POST":
        return "Post to Board";
      case "ANSWER":
        return "Submit Answer";
      default:
        return "Post";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start mb-4">
          {user?.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.displayName}
              className="h-10 w-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-medium mr-3">
              {user?.displayName?.charAt(0).toUpperCase() || "U"}
            </div>
          )}

          <div className="flex-1">
            {showTopicSelector && (
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select a topic
                </label>
                <select
                  value={selectedTopic || ""}
                  onChange={(e) => setSelectedTopic(Number(e.target.value))}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select a topic</option>
                  {availableTopics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={getPlaceholderText()}
              rows={4}
              maxLength={characterLimit}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none"
              disabled={isSubmitting}
            />

            {/* Character count */}
            <div className="flex justify-end mt-1">
              <span
                className={`text-xs ${
                  charactersLeft <= 20
                    ? "text-red-500"
                    : charactersLeft <= 50
                    ? "text-yellow-500"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {charactersLeft} characters left
              </span>
            </div>

            {/* Image preview */}
            {imagePreview && (
              <div className="mt-3 relative">
                <img
                  src={imagePreview}
                  alt="Upload preview"
                  className="w-full max-h-64 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-gray-800 bg-opacity-75 text-white rounded-full p-1 hover:bg-opacity-100"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <label className="cursor-pointer text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
              <Image size={20} />
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            disabled={
              content.trim() === "" ||
              (postType === "BOARD_POST" && !selectedTopic) ||
              isSubmitting
            }
          >
            {getButtonText()}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
