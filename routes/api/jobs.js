const express = require('express');
const router = express.Router();
const jobsCtrl = require('../../controllers/api/jobs');

// POST /api/jobs
router.get('/', jobsCtrl.getAllJobs);

// router.get('/new', jobsCtrl.newJob);
router.post('/new', jobsCtrl.createJob);

// router.get('/:id/applications', jobsCtrl.getJobApplications);
router.get('/:id/edit', jobsCtrl.editJob);
router.get('/:id', jobsCtrl.showJob);
router.delete('/:id', jobsCtrl.deleteJob);
router.put('/:id', jobsCtrl.editJob);

//job applications
router.post('/:id/apply', jobsCtrl.applyForJob);

module.exports = router;