import React from 'react';
import { useParams } from 'react-router-dom';

const QuestionThreadPage = () => {
  const { questionId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Question Thread: {questionId}</h1>
        <div className="space-y-4">
          {/* Question thread content will be implemented later */}
          <p className="text-gray-600 dark:text-gray-300">Question thread content coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionThreadPage;