import React from 'react';

const AnalyticsSection = ({ stats }) => {
  if (!stats) return null;

  const totalUsers = (stats.jobSeekers || 0) + (stats.employers || 0);
  const jsPercent = totalUsers ? Math.round(((stats.jobSeekers || 0) / totalUsers) * 100) : 0;
  const empPercent = totalUsers ? Math.round(((stats.employers || 0) / totalUsers) * 100) : 0;

  const totalApps = stats.totalApplications || 0;
  const pendPercent = totalApps ? Math.round(((stats.pendingApplications || 0) / totalApps) * 100) : 0;
  const accPercent = totalApps ? Math.round(((stats.acceptedApplications || 0) / totalApps) * 100) : 0;
  const rejPercent = totalApps ? Math.round(((stats.rejectedApplications || 0) / totalApps) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Job Seekers</span>
              <span className="font-medium text-gray-900">{jsPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${jsPercent}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Employers</span>
              <span className="font-medium text-gray-900">{empPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${empPercent}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
        <div className="w-full h-8 flex rounded-lg overflow-hidden mb-4">
          <div className="bg-green-500 h-full" style={{ width: `${accPercent}%` }} title={`Accepted: ${accPercent}%`}></div>
          <div className="bg-yellow-400 h-full" style={{ width: `${pendPercent}%` }} title={`Pending: ${pendPercent}%`}></div>
          <div className="bg-red-500 h-full" style={{ width: `${rejPercent}%` }} title={`Rejected: ${rejPercent}%`}></div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <div className="flex items-center"><span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span> Accepted ({stats.acceptedApplications || 0})</div>
          <div className="flex items-center"><span className="w-3 h-3 bg-yellow-400 rounded-full mr-1"></span> Pending ({stats.pendingApplications || 0})</div>
          <div className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-1"></span> Rejected ({stats.rejectedApplications || 0})</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between pb-2 border-b border-gray-100">
            <span className="text-gray-600">Total Registered</span>
            <span className="font-semibold text-gray-900">{stats.totalUsers || 0}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-gray-100">
            <span className="text-gray-600">Active Jobs</span>
            <span className="font-semibold text-gray-900">{stats.totalJobs || 0}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-gray-100">
            <span className="text-gray-600">Total Applications</span>
            <span className="font-semibold text-gray-900">{stats.totalApplications || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
