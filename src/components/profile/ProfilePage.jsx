import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import LoadingSpinner from '../LoadingSpinner';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user: authUser } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get(`/profile/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="container mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{user.display_name}</h1>
        {authUser && authUser.username === username && (
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <div className="mb-4">
            <img
              src={user.avatar_url}
              alt={`${user.display_name}'s Avatar`}
              className="w-32 h-32 rounded-full mx-auto"
            />
          </div>
          <div className="mb-2">
            <span className="font-semibold">Username:</span> {user.username}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Bio:</span> {user.bio || "No bio available."}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Activity</h2>
          {/* Add user activity section here */}
          <p>No activity yet.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;