const Job = require('../../models/job')
const JobApplication = require('../../models/jobApplication')

module.exports = {
  createJob,
  getAllJobs,
  showJob,
  deleteJob,
  editJob,
  applyForJob,
  getJobApplications,
  hire
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
    const jobs = await Job.find({}).sort({createdAt:-1}).populate([{ path: 'userId' }]);
    res.json(jobs);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function showJob(req, res) {
  try {
  const job = await Job.findById(req.params.id);
  if (!job){
    res.status(404).json({message: "Job not found"})
    return
  }
  await job.populate('userId');
  res.json(job)

  } catch (error) {
    res.status(400).json(error)
  }
}

async function deleteJob(req, res) {
  await Job.deleteOne({ _id: req.params.id });
  res.status(200).json({});
}

async function editJob(req, res) {
  try {
    console.log(req.body);
    const job =  await Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

    await job.populate('userId');
    res.json(job)
  } catch (error) {
    res.status(400).json(error)
  }
}

async function applyForJob(req, res) {
  try {
    const jobApplication = await JobApplication.create(req.body)
    await jobApplication.populate('userId');
    res.json(jobApplication);
  } catch (error) {
    res.status(400).json(error)
  }
}

async function getJobApplications(req, res) {
  try {
    const applications = await JobApplication.find({jobId: req.params.id}).sort({createdAt:-1}).populate('userId');
    res.json(applications);
  } catch (error) {
    res.status(400).json(error)
  }
}

async function hire(req, res) {
  // console.log(req);
  try {
    console.log(req.body);
    const job =  await Job.findOneAndUpdate({ _id: req.params.id }, {state: 'active', chosenApplicationId: req.body.id}, { new: true });
    await job.populate('userId');
    res.json(job)
  } catch (error) {
    res.status(400).json(error)
  }
}
