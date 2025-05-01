import React from 'react';
import { useParams } from 'react-router-dom';

const TopicBoardPage = () => {
  const { topicId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Topic Board: {topicId}</h1>
        <div className="space-y-4">
          {/* Topic board content will be implemented later */}
          <p className="text-gray-600 dark:text-gray-300">Topic board content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default TopicBoardPage;