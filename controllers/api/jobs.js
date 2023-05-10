const Job = require('../../models/job')
const User = require('../../models/user')

module.exports = {
  createJob,
  getAllJobs,
  showJob,
  deleteJob,
  editJob,
  // newJob
}

async function createJob(req, res) {
  try {
    const job = await Job.create({
      userId: req.user._id,
      name: req.body.name,
      description: req.body.description
    })
    await job.populate('userId');
    res.json(job)
  } catch (error) {
    res.status(400).json(error)
  }
}

async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find({}).populate([{ path: 'userId' }]);
    // await jobs.populate('userId');
    res.json(jobs);
  } catch (error) {
    res.status(400).json(error);
  }
}

// async function newJob(req, res) {
//   res.render('jobs/new');
// }

async function showJob(req, res) {
  const job = await Job.findById(req.params.id);
  await job.populate('userId');
  res.json(job);
}

async function deleteJob(req, res) {
  const job = await Job.findById(req.params.id);
  Job.deleteOne(req.params.id);
  res.status(200).json(job);
}

async function editJob(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    await job.populate('userId');
    res.json(job)
  } catch (error) {
    res.status(400).json(error)
  }
}