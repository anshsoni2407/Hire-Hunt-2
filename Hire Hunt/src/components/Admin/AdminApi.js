import axios from "axios";
const BASE = import.meta.env.VITE_BaseUrl;

export const fetchAdminStats = () => axios.get(`${BASE}/admin/stats`, { withCredentials: true });
export const fetchAllUsers = (params) => axios.get(`${BASE}/admin/users`, { params, withCredentials: true });
export const fetchUserDetails = (id) => axios.get(`${BASE}/admin/users/${id}`, { withCredentials: true });
export const blockUser = (id) => axios.put(`${BASE}/admin/users/${id}/block`, {}, { withCredentials: true });
export const deleteUser = (id) => axios.delete(`${BASE}/admin/users/${id}`, { withCredentials: true });
export const fetchAllJobs = (params) => axios.get(`${BASE}/admin/jobs`, { params, withCredentials: true });
export const fetchJobDetails = (id) => axios.get(`${BASE}/admin/jobs/${id}`, { withCredentials: true });
export const updateJob = (id, data) => axios.put(`${BASE}/admin/jobs/${id}`, data, { withCredentials: true });
export const deleteJob = (id) => axios.delete(`${BASE}/admin/jobs/${id}`, { withCredentials: true });
export const fetchAllApplications = (params) => axios.get(`${BASE}/admin/applications`, { params, withCredentials: true });
export const fetchRecentActivity = () => axios.get(`${BASE}/admin/recent-activity`, { withCredentials: true });
