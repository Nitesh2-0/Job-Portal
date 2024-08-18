import express from 'express'
import isAuthorized from '../middleware/isAuthenticated.js';
import { getAdminJobs, getAllJob, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.route('/post').post(isAuthorized, postJob);
router.route('/get').get(getAllJob);
router.route('/getadminjob').get(isAuthorized, getAdminJobs);
router.route('/get/:id').get(isAuthorized, getJobById);

export default router