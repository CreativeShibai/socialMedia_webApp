import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import LoadingSpinner from '../ui/LoadingSpinner';
import ErrorMessage from '../ui/ErrorMessage';

function TopicPage() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopic = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.get(`/topic/${topicId}`);
        setTopic(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch topic.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopic();
  }, [topicId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!topic) {
    return <ErrorMessage message="Topic not found." />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{topic.name}</h1>
      <p className="text-gray-700">{topic.description}</p>
      <p className="text-gray-500 mt-2">Created At: {new Date(topic.created_at).toLocaleString()}</p>
      {/* You can add more details here if needed */}
    </div>
  );
}

export default TopicPage;