import express from 'express'
import isAuthorized from '../middleware/isAuthenticated.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from './../controllers/company.controller.js';

const router = express.Router();

router.route('/register').post(isAuthorized, registerCompany)
router.route('/get').get(isAuthorized, getCompany)
router.route('/get/:id').get(isAuthorized, getCompanyById)
router.route('/update/:id').put(isAuthorized, updateCompany)

export default router