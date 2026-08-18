import userModel from "../Model/user.model.js";
import jobModel from "../Model/jobModel.js";
import ApplicationModel from "../Model/Applications.model.js";

export const getStats = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const jobSeekers = await userModel.countDocuments({ RegisterAs: "jobseeker" });
    const employers = await userModel.countDocuments({ RegisterAs: "employer" });
    
    const totalJobs = await jobModel.countDocuments();
    
    const totalApplications = await ApplicationModel.countDocuments();
    const pendingApplications = await ApplicationModel.countDocuments({ status: "Pending" });
    const acceptedApplications = await ApplicationModel.countDocuments({ status: "Accepted" });
    const rejectedApplications = await ApplicationModel.countDocuments({ status: "Rejected" });

    res.status(200).json({
      totalUsers,
      jobSeekers,
      employers,
      totalJobs,
      totalApplications,
      pendingApplications,
      acceptedApplications,
      rejectedApplications
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { search, role } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
      const phoneNum = Number(search);
      if (!isNaN(phoneNum)) {
        query.$or.push({ phone: phoneNum });
      }
    }

    if (role) {
      query.RegisterAs = role;
    }

    const users = await userModel.find(query).select("-password").sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id)
      .select("-password")
      .populate("CreatedJobs")
      .populate("AppliedJobs")
      .populate("SavedJobs");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error: error.message });
  }
};

export const blockUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.status(200).json({
      user,
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`
    });
  } catch (error) {
    res.status(500).json({ message: "Error blocking/unblocking user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await jobModel.deleteMany({ postedBy: userId });
    await ApplicationModel.deleteMany({ jobSeekerId: userId });
    await userModel.findByIdAndDelete(userId);

    res.status(200).json({ message: "User and their related data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const { search, jobType } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { jobTitle: { $regex: search, $options: "i" } },
        { companyName: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }
    
    if (jobType) {
      query.jobType = jobType;
    }

    const jobs = await jobModel.find(query)
      .populate("postedBy", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};

export const getJobDetails = async (req, res) => {
  try {
    const job = await jobModel.findById(req.params.id)
      .populate("postedBy", "name email phone");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicantCount = await ApplicationModel.countDocuments({ jobId: job._id });
    
    res.status(200).json({ job, applicantCount });
  } catch (error) {
    res.status(500).json({ message: "Error fetching job details", error: error.message });
  }
};

export const updateJob = async (req, res) => {
  try {
    const updatedJob = await jobModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job: updatedJob, message: "Job updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error: error.message });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await ApplicationModel.deleteMany({ jobId });
    
    if (job.postedBy) {
      await userModel.findByIdAndUpdate(job.postedBy, {
        $pull: { CreatedJobs: jobId }
      });
    }

    await jobModel.findByIdAndDelete(jobId);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error: error.message });
  }
};

export const getAllApplications = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    const applications = await ApplicationModel.find(query)
      .populate("jobId", "jobTitle companyName location")
      .populate("jobSeekerId", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 }).limit(5);
    const jobs = await jobModel.find().populate("postedBy", "name").sort({ createdAt: -1 }).limit(5);
    const applications = await ApplicationModel.find()
      .populate("jobId", "jobTitle")
      .populate("jobSeekerId", "name")
      .sort({ createdAt: -1 }).limit(5);

    let activities = [];

    users.forEach(user => {
      activities.push({
        type: "user",
        description: `New ${user.RegisterAs} registered: ${user.name}`,
        timestamp: user.createdAt,
        iconType: "user"
      });
    });

    jobs.forEach(job => {
      const posterName = job.postedBy ? job.postedBy.name : "Unknown User";
      activities.push({
        type: "job",
        description: `New job posted: ${job.jobTitle} by ${posterName}`,
        timestamp: job.createdAt,
        iconType: "job"
      });
    });

    applications.forEach(app => {
      const applicantName = app.jobSeekerId ? app.jobSeekerId.name : "Unknown User";
      const jobTitle = app.jobId ? app.jobId.jobTitle : "Unknown Job";
      activities.push({
        type: "application",
        description: `${applicantName} applied for ${jobTitle}`,
        timestamp: app.createdAt,
        iconType: "application"
      });
    });

    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const recentActivity = activities.slice(0, 15);

    res.status(200).json({ activities: recentActivity });
  } catch (error) {
    res.status(500).json({ message: "Error fetching recent activity", error: error.message });
  }
};
