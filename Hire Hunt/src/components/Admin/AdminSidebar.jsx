import React from 'react';
import { HiOutlineSquares2X2, HiOutlineUsers, HiOutlineBriefcase, HiOutlineDocumentText, HiOutlineCog6Tooth, HiOutlineArrowRightOnRectangle, HiOutlineXMark } from 'react-icons/hi2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ activeSection, onSectionChange, isCollapsed, onToggleCollapse, isMobileOpen, onMobileClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BaseUrl}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.clear();
      navigate('/');
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <HiOutlineSquares2X2 className="h-6 w-6" /> },
    { id: 'users', label: 'Users', icon: <HiOutlineUsers className="h-6 w-6" /> },
    { id: 'jobs', label: 'Jobs', icon: <HiOutlineBriefcase className="h-6 w-6" /> },
    { id: 'applications', label: 'Applications', icon: <HiOutlineDocumentText className="h-6 w-6" /> },
    { id: 'settings', label: 'Settings', icon: <HiOutlineCog6Tooth className="h-6 w-6" /> },
  ];

  const sidebarClasses = `fixed inset-y-0 left-0 z-40 bg-gray-900 text-white transition-all duration-300 ease-in-out transform ${
    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
  } md:translate-x-0 md:static md:flex flex-col ${isCollapsed ? 'w-20' : 'w-64'}`;

  const renderNavItems = () => (
    <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => {
            onSectionChange(item.id);
            if (isMobileOpen) onMobileClose();
          }}
          className={`w-full flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
            activeSection === item.id
              ? 'bg-[#E0C163] text-black'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
          title={isCollapsed ? item.label : undefined}
        >
          {item.icon}
          {!isCollapsed && <span className="ml-4 font-medium">{item.label}</span>}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden backdrop-blur-sm" onClick={onMobileClose} />
      )}
      <div className={sidebarClasses}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div className="flex items-center justify-center w-full">
            <span className="text-2xl font-bold text-[#E0C163]">
              {isCollapsed ? 'HH' : 'Hire Hunt'}
            </span>
          </div>
          {isMobileOpen && (
            <button onClick={onMobileClose} className="md:hidden text-gray-400 hover:text-white">
              <HiOutlineXMark className="h-6 w-6" />
            </button>
          )}
        </div>
        
        {renderNavItems()}
        
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
            title={isCollapsed ? "Logout" : undefined}
          >
            <HiOutlineArrowRightOnRectangle className="h-6 w-6" />
            {!isCollapsed && <span className="ml-4 font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
