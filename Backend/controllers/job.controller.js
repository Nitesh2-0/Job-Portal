import { Job } from './../models/job.model.js';

export const postJob = async (req, res) => {
  try {
    const { title, description, requirements, salary, location, jobType, experience, openings, companyId } = req.body;
    const userId = req.id;

    if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !openings || !companyId) {
      return res.status(400).json({
        message: "something is missing! 👿",
        success: false
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(','),
      salary,
      location,
      jobType,
      experienceLevel: experience,
      openings: Number(openings),
      company: companyId,
      created_by: userId
    });

    return res.status(201).json({
      message: "Job created successfully.👍",
      job,
      success: true
    });
  } catch (error) {
    console.log("👿" + error);
    return res.status(500).json({
      message: "Internal server error.👿",
      success: false
    });
  }
};

export const getAllJob = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: `${keyword}`, $options: 'i' } },
        { description: { $regex: `${keyword}`, $options: 'i' } }
      ]
    };
    const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 }); // interview point of you => populate
    if (jobs.length === 0) {
      return res.status(404).json({
        message: "Job not found.",
        success: false
      })
    }
    return res.status(200).json({
      jobs,
      success: true
    })
  } catch (error) {
    console.log("👿" + error);
  }
}

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate('applications').populate('company'); 
    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
        success: false
      })
    }
    return res.status(200).json({
      job,
      success: true
    })
  } catch (error) {
    console.log("👿" + error);
  }
}

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId })
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false
      })
    }
    return res.status(200).json({
      jobs,
      success: true
    })
  } catch (error) {
    console.log("👿" + error);
  }
}