import React from 'react';
import { HiOutlineBars3, HiOutlineBell } from 'react-icons/hi2';

const AdminHeader = ({ activeSection, onMobileMenuToggle, adminUser }) => {
  const getSectionInfo = () => {
    switch (activeSection) {
      case 'dashboard': return { title: 'Dashboard', subtitle: 'Overview of your platform' };
      case 'users': return { title: 'Users Management', subtitle: 'Manage all platform users' };
      case 'jobs': return { title: 'Jobs Management', subtitle: 'Manage all job listings' };
      case 'applications': return { title: 'Applications', subtitle: 'Track all applications' };
      case 'settings': return { title: 'Settings', subtitle: 'Platform configuration' };
      default: return { title: '', subtitle: '' };
    }
  };

  const { title, subtitle } = getSectionInfo();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between h-16">
        <div className="flex items-center">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden mr-4 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#E0C163] rounded-md"
          >
            <span className="sr-only">Open sidebar</span>
            <HiOutlineBars3 className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <p className="hidden sm:block text-sm text-gray-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <span className="sr-only">View notifications</span>
            <HiOutlineBell className="h-6 w-6" />
          </button>
          <div className="flex items-center">
            <span className="hidden sm:block text-sm font-medium text-gray-700 mr-3">
              {adminUser?.name || 'Admin'}
            </span>
            <div className="h-8 w-8 rounded-full bg-black text-[#E0C163] flex items-center justify-center font-bold">
              {(adminUser?.name || 'A')[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
