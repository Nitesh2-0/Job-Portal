import { Job } from '../models/job.model.js';
import { Application } from './../models/application.model.js';

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id
    if (!jobId) {
      return res.status(400).json({
        message: 'Job id required.',
        success: false
      })
    }
    const isAlreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId
    })
    if (isAlreadyApplied) {
      return res.status(400).json({
        message: "You have already applied.",
        success: false
      })
    }
    let job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false
      })
    }

    //creating new application 
    let newApplication = await Application.create({
      job: jobId,
      applicant: userId
    })

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Job apply successfully.",
      success: true
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false
    })
  }
}

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } }
        }
      });
    if (!application) {
      return res.status(400).json({
        message: "No Applications",
        success: false
      })
    }
    return res.status(200).json({
      application,
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false
    })
  }
}

export const getApplicent = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant"
      }
    })
    if (!job) {
      return res.status(400).json({
        message: "Job not found.",
        success: false
      })
    }
    return res.status(200).json({
      job,
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false
    })
  }
}

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required.",
        success: false
      })
    }
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        message: "Application not found.",
        success: false
      })
    }
    
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully.",
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false
    })
  }
}