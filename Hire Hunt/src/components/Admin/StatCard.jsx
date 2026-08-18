import React from 'react';

const StatCard = ({ icon, label, value, subtitle, color }) => {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    indigo: 'bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-100 text-purple-600',
    amber: 'bg-amber-100 text-amber-600',
    gold: 'bg-[#E0C163]/20 text-[#E0C163]',
    green: 'bg-green-100 text-green-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600',
    default: 'bg-gray-100 text-gray-600'
  };

  const colorClass = colorMap[color] || colorMap.default;

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center space-x-4 border border-gray-100 transition-all duration-300 hover:shadow-md">
      <div className={`p-3 rounded-full ${colorClass}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;
