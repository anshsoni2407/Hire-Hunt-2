import React from 'react';
import { HiOutlineUserPlus, HiOutlineBriefcase, HiOutlineDocumentCheck, HiOutlineInformationCircle } from 'react-icons/hi2';

const RecentActivity = ({ activities, loading }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'user': return <div className="p-2 bg-blue-100 text-blue-600 rounded-full"><HiOutlineUserPlus className="h-5 w-5" /></div>;
      case 'job': return <div className="p-2 bg-amber-100 text-amber-600 rounded-full"><HiOutlineBriefcase className="h-5 w-5" /></div>;
      case 'application': return <div className="p-2 bg-green-100 text-green-600 rounded-full"><HiOutlineDocumentCheck className="h-5 w-5" /></div>;
      default: return <div className="p-2 bg-gray-100 text-gray-600 rounded-full"><HiOutlineInformationCircle className="h-5 w-5" /></div>;
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just now';
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      
      <div className="p-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex space-x-4 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : activities && activities.length > 0 ? (
          <div className="relative">
            <div className="absolute top-0 left-5 bottom-0 w-0.5 bg-gray-100" aria-hidden="true"></div>
            <ul className="relative space-y-6">
              {activities.map((activity, idx) => (
                <li key={idx} className="flex space-x-4 items-start relative">
                  <div className="relative z-10 bg-white shadow-sm rounded-full">
                    {getIcon(activity.iconType || activity.type)}
                  </div>
                  <div className="flex-1 pt-1.5">
                    <p className="text-sm text-gray-800">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{getTimeAgo(activity.timestamp)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center py-8">
            <HiOutlineInformationCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
            <p className="text-gray-500">No recent activity to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
