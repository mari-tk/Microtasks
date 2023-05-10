const Job = require('../../models/job')
const User = require('../../models/user')

module.exports = {
  createJob,
  getAllJobs
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