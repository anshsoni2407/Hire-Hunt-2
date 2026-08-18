import React from 'react';

const StatusBadge = ({ status, size = "sm" }) => {
  const s = status?.toLowerCase() || 'default';
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-600';

  if (s === 'accepted' || s === 'active') {
    bgColor = 'bg-green-100';
    textColor = 'text-green-800';
  } else if (s === 'pending') {
    bgColor = 'bg-yellow-100';
    textColor = 'text-yellow-800';
  } else if (s === 'rejected' || s === 'blocked') {
    bgColor = 'bg-red-100';
    textColor = 'text-red-800';
  }

  const px = size === 'md' ? 'px-3 py-1' : 'px-2.5 py-0.5';
  const textSz = size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${px} ${textSz} ${bgColor} ${textColor}`}>
      {status || 'Unknown'}
    </span>
  );
};

export default StatusBadge;
