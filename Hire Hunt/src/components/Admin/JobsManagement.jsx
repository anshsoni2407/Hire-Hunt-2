import React, { useState, useEffect } from 'react';
import { HiOutlineEllipsisVertical, HiOutlineEye, HiOutlinePencilSquare, HiOutlineTrash, HiOutlineInformationCircle } from 'react-icons/hi2';
import SearchBar from './SearchBar';
import FilterTabs from './FilterTabs';
import Pagination from './Pagination';
import ConfirmDialog from './ConfirmDialog';
import JobDetailsModal from './JobDetailsModal';
import { fetchAllJobs, deleteJob } from './AdminApi';
import { toast } from 'react-toastify';

const JobsManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, job: null });
  const [deleteLoading, setDeleteLoading] = useState(false);

  const filters = [
    { label: 'All Jobs', value: 'all' },
    { label: 'Full-time', value: 'Full-time' },
    { label: 'Part-time', value: 'Part-time' },
    { label: 'Internship', value: 'Internship' },
    { label: 'Contract', value: 'Contract' },
    { label: 'Remote', value: 'Remote' },
  ];

  useEffect(() => {
    loadJobs();
  }, [searchTerm, typeFilter]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (typeFilter !== 'all') params.jobType = typeFilter;
      
      const res = await fetchAllJobs(params);
      setJobs(res.data.jobs || []);
      setCurrentPage(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirmDialog.job) return;
    const { _id } = confirmDialog.job;
    
    try {
      setDeleteLoading(true);
      await deleteJob(_id);
      toast.success('Job deleted successfully');
      loadJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete job');
    } finally {
      setDeleteLoading(false);
      setConfirmDialog({ isOpen: false, job: null });
    }
  };

  const openDetails = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const currentData = jobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search jobs, company, location..." />
        <FilterTabs filters={filters} activeFilter={typeFilter} onFilterChange={setTypeFilter} />
      </div>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button onClick={loadJobs} className="px-4 py-2 bg-red-100 rounded hover:bg-red-200 font-medium">Retry</button>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type & Salary</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posted Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  [1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-24 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 w-24 bg-gray-200 rounded"></div></td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 w-16 bg-gray-200 rounded"></div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap"><div className="h-4 w-20 bg-gray-200 rounded"></div></td>
                      <td className="px-6 py-4 whitespace-nowrap text-right"><div className="h-4 w-4 bg-gray-200 rounded ml-auto"></div></td>
                    </tr>
                  ))
                ) : currentData.length > 0 ? (
                  currentData.map(job => (
                    <tr key={job._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{job.jobTitle}</div>
                        <div className="text-sm text-gray-500">{job.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.companyName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{job.jobType}</div>
                        <div className="text-sm text-gray-500">{job.salary}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 rounded-full hover:bg-gray-100">
                            <HiOutlineEllipsisVertical className="h-5 w-5" />
                          </button>
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 hidden group-hover:block z-10">
                            <div className="py-1">
                              <button onClick={() => openDetails(job)} className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                                <HiOutlineEye className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                View Details
                              </button>
                              <button onClick={() => toast.info('Edit feature coming soon')} className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left">
                                <HiOutlinePencilSquare className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                                Edit Job
                              </button>
                            </div>
                            <div className="py-1">
                              <button onClick={() => setConfirmDialog({ isOpen: true, job })} className="group flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50 hover:text-red-900 w-full text-left">
                                <HiOutlineTrash className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500" />
                                Delete Job
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
                      <p className="text-gray-500 text-lg">No jobs found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {!loading && jobs.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </div>
      )}

      {selectedJob && (
        <JobDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          jobId={selectedJob._id}
          onJobDeleted={loadJobs}
        />
      )}

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, job: null })}
        onConfirm={handleDelete}
        title="Delete Job"
        message={`Are you sure you want to delete "${confirmDialog.job?.jobTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="red"
        loading={deleteLoading}
      />
    </div>
  );
};

export default JobsManagement;
