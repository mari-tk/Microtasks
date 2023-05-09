const Job = require('../../models/job')
const User = require('../../models/user')

module.exports = {
  createJob,
  getAllJobs
}

async function createJob(req, res) {
  try {
    const job = await Job.create(req.body)
    res.json(job)
  } catch (error) {
    res.status(400).json(error)
  }
}

async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find({}).populate('userId').sort('createdAt');
    res.json(jobs);
  } catch (error) {
    res.status(400).json(error);
  }
}