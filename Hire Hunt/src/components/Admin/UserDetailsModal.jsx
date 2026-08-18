import React, { useState, useEffect } from 'react';
import { HiOutlineArrowLeft, HiOutlineXMark } from 'react-icons/hi2';
import { fetchUserDetails } from './AdminApi';
import StatusBadge from './StatusBadge';

const UserDetailsModal = ({ isOpen, onClose, userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && userId) {
      loadUser();
    }
  }, [isOpen, userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchUserDetails(userId);
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user details');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="sticky top-0 z-10 bg-black text-[#E0C163] px-4 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-4 hover:text-white focus:outline-none">
            <HiOutlineArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold">User Details</h2>
        </div>
        <button onClick={onClose} className="hover:text-white focus:outline-none">
          <HiOutlineXMark className="h-6 w-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">{error}</div>
        ) : user ? (
          <div className="space-y-8">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-24 w-24 rounded-full bg-black text-[#E0C163] flex items-center justify-center text-4xl font-bold">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <h3 className="text-3xl font-bold text-gray-900">{user.name}</h3>
              <StatusBadge status={user.isBlocked ? 'blocked' : 'active'} size="md" />
            </div>

            <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 font-medium">Email Address</p>
                <p className="text-lg text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Phone Number</p>
                <p className="text-lg text-gray-900">{user.phone || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Registration Type</p>
                <p className="text-lg text-gray-900 capitalize">{user.RegisterAs}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Member Since</p>
                <p className="text-lg text-gray-900">
                  {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Activity Stats</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-blue-600 font-medium">Applied Jobs</p>
                  <p className="text-2xl font-bold text-blue-900">{user.AppliedJobs?.length || 0}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-green-600 font-medium">Created Jobs</p>
                  <p className="text-2xl font-bold text-green-900">{user.CreatedJobs?.length || 0}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-purple-600 font-medium">Saved Jobs</p>
                  <p className="text-2xl font-bold text-purple-900">{user.SavedJobs?.length || 0}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserDetailsModal;
