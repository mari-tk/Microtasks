const express = require('express');
const router = express.Router();
const jobsCtrl = require('../../controllers/api/jobs');

// POST /api/jobs
router.get('/', jobsCtrl.getAllJobs);

router.get('/dashboard', jobsCtrl.showDashboard);
router.post('/new', jobsCtrl.createJob);

router.get(
  '/:id/applications',
  jobsCtrl.ensureJobAuthor,
  jobsCtrl.getJobApplications
);
router.get('/:id', jobsCtrl.showJob);
router.delete('/:id', jobsCtrl.ensureJobAuthor(), jobsCtrl.deleteJob);
router.put('/:id/hire', jobsCtrl.ensureJobAuthor(), jobsCtrl.hire);
router.put('/:id/end', jobsCtrl.ensureJobAuthor(), jobsCtrl.endJob);
router.put('/:id', jobsCtrl.ensureJobAuthor(), jobsCtrl.editJob);

//job applications
router.post(
  '/:id/apply',
  jobsCtrl.ensureJobAuthor(false),
  jobsCtrl.applyForJob
);

module.exports = router;
