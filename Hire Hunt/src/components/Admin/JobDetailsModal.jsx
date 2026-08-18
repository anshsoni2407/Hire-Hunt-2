import React, { useState, useEffect } from 'react';
import { HiOutlineArrowLeft, HiOutlineXMark, HiOutlineTrash } from 'react-icons/hi2';
import { fetchJobDetails, deleteJob } from './AdminApi';
import { toast } from 'react-toastify';
import ConfirmDialog from './ConfirmDialog';

const JobDetailsModal = ({ isOpen, onClose, jobId, onJobDeleted }) => {
  const [job, setJob] = useState(null);
  const [applicantCount, setApplicantCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (isOpen && jobId) {
      loadJob();
    }
  }, [isOpen, jobId]);

  const loadJob = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchJobDetails(jobId);
      setJob(res.data.job);
      setApplicantCount(res.data.applicantCount || 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch job details');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteJob(jobId);
      toast.success('Job deleted successfully');
      setIsDeleteModalOpen(false);
      onClose();
      if (onJobDeleted) onJobDeleted();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete job');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="sticky top-0 z-10 bg-black text-[#E0C163] px-4 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center">
          <button onClick={onClose} className="mr-4 hover:text-white focus:outline-none">
            <HiOutlineArrowLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold">Job Details</h2>
        </div>
        <button onClick={onClose} className="hover:text-white focus:outline-none">
          <HiOutlineXMark className="h-6 w-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">{error}</div>
        ) : job ? (
          <div className="space-y-8 pb-20">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.jobTitle}</h1>
              <p className="text-lg text-gray-600">{job.companyName} &bull; {job.location}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Type: {job.jobType}</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Salary: {job.salary}</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">Exp: {job.experience}</span>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">Applicants: {applicantCount}</span>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h3>
              <div className="bg-gray-50 rounded-xl p-6 text-gray-700 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </div>
            </div>

            {job.skills && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {(typeof job.skills === 'string' ? job.skills.split(',') : Array.isArray(job.skills) ? job.skills : [job.skills]).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm border border-gray-200">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Posted By</h3>
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-black text-[#E0C163] flex items-center justify-center text-xl font-bold">
                  {job.postedBy?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">{job.postedBy?.name || 'Unknown'}</p>
                  <p className="text-gray-500">{job.postedBy?.email}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Posted on {new Date(job.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <HiOutlineTrash className="h-5 w-5 mr-2" />
                Delete Job
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <ConfirmDialog
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Job"
        message={`Are you sure you want to delete the job "${job?.jobTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmColor="red"
        loading={deleteLoading}
      />
    </div>
  );
};

export default JobDetailsModal;
