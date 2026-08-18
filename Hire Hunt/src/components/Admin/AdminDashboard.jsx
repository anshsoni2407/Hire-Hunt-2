import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import StatsOverview from './StatsOverview';
import AnalyticsSection from './AnalyticsSection';
import RecentActivity from './RecentActivity';
import UsersManagement from './UsersManagement';
import JobsManagement from './JobsManagement';
import ApplicationsOverview from './ApplicationsOverview';
import { fetchAdminStats, fetchRecentActivity } from './AdminApi';
import { HiOutlineCog6Tooth } from 'react-icons/hi2';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const [adminUser, setAdminUser] = useState(null);
  
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      navigate('/');
      return;
    }

    const empStr = localStorage.getItem('loggedInEmp');
    if (empStr) {
      try {
        setAdminUser(JSON.parse(empStr));
      } catch (e) {
        console.error('Failed to parse admin user', e);
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (activeSection === 'dashboard') {
      loadDashboardData();
    }
  }, [activeSection]);

  const loadDashboardData = async () => {
    try {
      setStatsLoading(true);
      setStatsError(null);
      const res = await fetchAdminStats();
      setStats(res.data);
    } catch (err) {
      setStatsError(err.response?.data?.message || 'Failed to load stats');
    } finally {
      setStatsLoading(false);
    }

    try {
      setActivitiesLoading(true);
      const res = await fetchRecentActivity();
      setActivities(res.data.activities || []);
    } catch (err) {
      console.error('Failed to load recent activity', err);
    } finally {
      setActivitiesLoading(false);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <>
            {statsError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                {statsError}
              </div>
            )}
            <StatsOverview stats={stats} loading={statsLoading} />
            <AnalyticsSection stats={stats} />
            <RecentActivity activities={activities} loading={activitiesLoading} />
          </>
        );
      case 'users':
        return <UsersManagement />;
      case 'jobs':
        return <JobsManagement />;
      case 'applications':
        return <ApplicationsOverview />;
      case 'settings':
        return (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <HiOutlineCog6Tooth className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Settings Coming Soon</h2>
            <p className="text-gray-500">Platform configuration options will be available here.</p>
          </div>
        );
      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <AdminSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <AdminHeader
          activeSection={activeSection}
          onMobileMenuToggle={() => setMobileSidebarOpen(true)}
          adminUser={adminUser}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
