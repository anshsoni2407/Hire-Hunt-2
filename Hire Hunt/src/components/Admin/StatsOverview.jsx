import React from 'react';
import { HiOutlineUsers, HiOutlineUser, HiOutlineBuildingOffice, HiOutlineBriefcase, HiOutlineDocumentText, HiOutlineClock } from 'react-icons/hi2';
import StatCard from './StatCard';

const StatsOverview = ({ stats, loading }) => {
  const statConfig = [
    { label: 'Total Users', key: 'totalUsers', icon: <HiOutlineUsers className="h-6 w-6" />, color: 'blue' },
    { label: 'Job Seekers', key: 'jobSeekers', icon: <HiOutlineUser className="h-6 w-6" />, color: 'indigo' },
    { label: 'Employers', key: 'employers', icon: <HiOutlineBuildingOffice className="h-6 w-6" />, color: 'purple' },
    { label: 'Total Jobs', key: 'totalJobs', icon: <HiOutlineBriefcase className="h-6 w-6" />, color: 'amber' },
    { label: 'Total Applications', key: 'totalApplications', icon: <HiOutlineDocumentText className="h-6 w-6" />, color: 'green' },
    { label: 'Pending Applications', key: 'pendingApplications', icon: <HiOutlineClock className="h-6 w-6" />, color: 'yellow' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex items-center space-x-4 border border-gray-100 animate-pulse">
            <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      {statConfig.map((config, idx) => (
        <StatCard
          key={idx}
          label={config.label}
          value={stats?.[config.key] || 0}
          icon={config.icon}
          color={config.color}
        />
      ))}
    </div>
  );
};

export default StatsOverview;
