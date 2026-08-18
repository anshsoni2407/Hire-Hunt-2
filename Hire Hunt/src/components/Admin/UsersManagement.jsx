import React, { useState, useEffect } from 'react';
import { HiOutlineEllipsisVertical, HiOutlineEye, HiOutlineNoSymbol, HiOutlineTrash, HiOutlineInformationCircle } from 'react-icons/hi2';
import SearchBar from './SearchBar';
import FilterTabs from './FilterTabs';
import Pagination from './Pagination';
import StatusBadge from './StatusBadge';
import ConfirmDialog from './ConfirmDialog';
import UserDetailsModal from './UserDetailsModal';
import { fetchAllUsers, blockUser, deleteUser } from './AdminApi';
import { toast } from 'react-toastify';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: '', user: null });
  const [actionLoading, setActionLoading] = useState(false);

  const filters = [
    { label: 'All Users', value: 'all' },
    { label: 'Job Seekers', value: 'jobseeker' },
    { label: 'Employers', value: 'employer' },
    { label: 'Admins', value: 'admin' },
  ];

  useEffect(() => {
    loadUsers();
  }, [searchTerm, roleFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (roleFilter !== 'all') params.role = roleFilter;
      
      const res = await fetchAllUsers(params);
      setUsers(res.data.users || []);
      setCurrentPage(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!confirmDialog.user) return;
    const { _id } = confirmDialog.user;
    
    try {
      setActionLoading(true);
      if (confirmDialog.type === 'block') {
        await blockUser(_id);
        toast.success(`User ${confirmDialog.user.isBlocked ? 'unblocked' : 'blocked'} successfully`);
      } else if (confirmDialog.type === 'delete') {
        await deleteUser(_id);
        toast.success('User deleted successfully');
      }
      loadUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${confirmDialog.type} user`);
    } finally {
      setActionLoading(false);
      setConfirmDialog({ isOpen: false, type: '', user: null });
    }
  };

  const openConfirm = (type, user) => {
    setConfirmDialog({ isOpen: true, type, user });
  };

  const openDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const currentData = users.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name, email..." />
        <FilterTabs filters={filters} activeFilter={roleFilter} onFilterChange={setRoleFilter} />
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadUsers} className="px-4 py-2 bg-red-100 rounded hover:bg-red-200 font-medium">Retry</button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  [1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                          <div className="ml-4">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 w-16 bg-gray-200 rounded"></div></td>
                      <td className="px-6 py-4 whitespace-nowrap"><div className="h-6 w-16 bg-gray-200 rounded-full"></div></td>
                      <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
                      <td className="px-6 py-4 whitespace-nowrap text-right"><div className="h-4 w-4 bg-gray-200 rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : currentData.length > 0 ? (
                  currentData.map(user => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-black text-[#E0C163] flex items-center justify-center font-bold">
                            {user.name?.[0]?.toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="capitalize text-sm text-gray-700">{user.RegisterAs}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={user.isBlocked ? 'blocked' : 'active'} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100">
                            <HiOutlineEllipsisVertical className="h-5 w-5" />
                          </button>
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 hidden group-hover:block z-10">
                            <div className="py-1">
                              <button onClick={() => openDetails(user)} className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                                <HiOutlineEye className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                View Details
                              </button>
                              <button onClick={() => openConfirm('block', user)} className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                                <HiOutlineNoSymbol className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                {user.isBlocked ? 'Unblock User' : 'Block User'}
                              </button>
                            </div>
                            <div className="py-1">
                              <button onClick={() => openConfirm('delete', user)} className="group flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 w-full text-left">
                                <HiOutlineTrash className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
                                Delete User
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <HiOutlineInformationCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-500 text-lg">No users found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {!loading && users.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      )}

      {selectedUser && (
        <UserDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          userId={selectedUser._id}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, type: '', user: null })}
        onConfirm={handleAction}
        title={confirmDialog.type === 'block' ? (confirmDialog.user?.isBlocked ? 'Unblock User' : 'Block User') : 'Delete User'}
        message={
          confirmDialog.type === 'block'
            ? `Are you sure you want to ${confirmDialog.user?.isBlocked ? 'unblock' : 'block'} ${confirmDialog.user?.name}?`
            : `Are you sure you want to delete ${confirmDialog.user?.name}? This action cannot be undone.`
        }
        confirmText={confirmDialog.type === 'block' ? (confirmDialog.user?.isBlocked ? 'Unblock' : 'Block') : 'Delete'}
        confirmColor="red"
        loading={actionLoading}
      />
    </div>
  );
};

export default UsersManagement;
