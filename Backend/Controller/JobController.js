import ApplicationModel from "../Model/Applications.model.js";
import jobModel from "../Model/jobModel.js";
import userModel from "../Model/user.model.js";


export const create = async (req, res) => {
  const {
    jobTitle,
    companyName,
    location,
    jobType,
    salary,
    experience,
    description,
    skills,
    postedBy,
  } = req.body;

  try {


x
    const CreatedJob = await jobModel.create(req.body);


    await userModel.findByIdAndUpdate(
      postedBy,
      { $push: { CreatedJobs: CreatedJob._id } },
      { new: true }
    );

    const populatedJob = await jobModel
      .findById(CreatedJob._id)
      .populate("postedBy");


    res
      .status(201)
      .json({ message: "Job created successfully", job: populatedJob });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// to fetch all jobs to show in job card in feautured jobs section

export const fetch = async (req, res) => {
  try {
    const jobs = await jobModel.find();
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// to save job
// to save the particular job in jobseeker's saved jobs array
// this will be used in job card  saved jobs bttn

export const saveJob = async (req, res) => {
  const { job, userId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: true, user, message: "User not found" });
    }

    // Check if the job is already saved
    if (user.SavedJobs.includes(job)) {
      return res.status(400).json({ message: "Job already saved" });
    }
    user.SavedJobs.push(job);
    await user.save();

    res
      .status(200)
      .json({ message: "Job saved successfully", SavedJobs: user });
  } catch (error) {
    console.error("Error saving job:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// to check all saved jobs of a user
// this will be used in saved jobs page to show all saved jobs of a user

export const fetchSaveJob = async (req, res) => {
  const { userId } = req.params;

  try {
    const getSavedJobs = await userModel.findById(userId).populate("SavedJobs");
    res.status(200).json(getSavedJobs);
  } catch (error) {
    console.log(error.message, `error in fetching saved jobs`);
  }
};

export const fetchCreatedJobs = async (req, res) => {
  const { userId } = req.params;

  try {
    const createdJobs = await userModel
      .findById(userId)
      .populate("CreatedJobs");
    res.status(200).json({ createdJobs });
  } catch (error) {
    console.log(error.message, `error in fetching created jobs`);
    res.status(500).json({
      message: "Internal server error in fetching created jobs for users ",
    });
  }
}

export const removeSavedJob = async (req, res) => {
  const { jobId, userId } = req.params;

  try {
   const RestJobs =  await userModel.findByIdAndUpdate(userId, {
      $pull: { SavedJobs: jobId },
      new: true,
    });
    res.status(200).json({RestJobs, message: "Job removed from saved jobs successfully"});
  } catch (error) {
    console.error("Error removing job from saved jobs:", error);
    res.status(500).json({ message: "Internal server error while removing jobs from saved jobs" });
  }
};


export const deleteJob =async (req, res)=>{
  const {jobId, userId} = req.params
  try {

  const deleteJob = await jobModel.findByIdAndDelete(jobId);
                    await ApplicationModel.deleteMany({ jobId });

  if(!deleteJob){
    return res.status(400).json('job not found, delete not possible', deleteJob)
  }
  res.status(200).json({message:'job deleted successfully'}, deleteJob)

  } catch (error) {
    console.log('error delete')
  }
}

export const updateJob = async (req, res) =>{
  const {jobId} = req.params
try {

 const updateJob = await jobModel.findByIdAndUpdate(jobId, req.body, {new:true}) 
res.status(200).json({message: 'Job updated successfully', updateJob})

} catch (error) {
  console.log('error in updating job', error.message)
  res.status(500).json({message: 'Internal server error while updating job'})
}

}
