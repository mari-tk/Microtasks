const express = require('express');
const router = express.Router();
const jobsCtrl = require('../../controllers/api/jobs');

// POST /api/jobs
router.get('/', jobsCtrl.getAllJobs);
router.post('/new', jobsCtrl.createJob);

module.exports = router;