import express from 'express'
import isAuthorized from '../middleware/isAuthenticated.js';
import { applyJob, getApplicent, getAppliedJob, updateStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.route('/apply/:id').get(isAuthorized, applyJob);
router.route('/get').get(isAuthorized, getAppliedJob);
router.route('/:id/applicents').get(isAuthorized, getApplicent);
router.route('/status/:id/update').post(isAuthorized, updateStatus);

export default router