const express = require('express');
const router = express.Router();
const jobsCtrl = require('../../controllers/api/jobs');

// POST /api/jobs
router.post('/', jobsCtrl.createJob);
router.get('/', jobsCtrl.getAllJobs);

module.exports = router;