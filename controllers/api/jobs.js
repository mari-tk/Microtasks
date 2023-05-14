const Job = require('../../models/job');
const JobApplication = require('../../models/jobApplication');

module.exports = {
  createJob,
  getAllJobs,
  showJob,
  deleteJob,
  editJob,
  applyForJob,
  getJobApplications,
  hire,
  showDashboard,
  endJob,
  ensureJobAuthor,
};

async function createJob(req, res) {
  try {
    const job = await Job.create({
      userId: req.user._id,
      name: req.body.name,
      description: req.body.description,
    });
    await job.populate('userId');
    res.json(job);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find({})
      .sort({ createdAt: -1 })
      .populate([{ path: 'userId' }]);
    res.json(jobs);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function showJob(req, res) {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      res.status(404).json({ message: 'Job not found' });
      return;
    }
    await job.populate('userId');
    res.json(job);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function deleteJob(req, res) {
  await Job.deleteOne({ _id: req.params.id });
  res.status(200).json({});
}

async function editJob(req, res) {
  try {
    const job = await Job.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });

    await job.populate('userId');
    res.json(job);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function applyForJob(req, res) {
  try {
    const jobApplication = await JobApplication.create(req.body);
    await jobApplication.populate('userId');
    res.json(jobApplication);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function getJobApplications(req, res) {
  try {
    const applications = await JobApplication.find({ jobId: req.params.id })
      .sort({ createdAt: -1 })
      .populate('userId');
    res.json(applications);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function hire(req, res) {
  try {
    console.log(req.body);
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id },
      { state: 'in progress', chosenApplicationId: req.body.id },
      { new: true }
    );
    await job.populate('userId');
    res.json(job);
  } catch (error) {
    res.status(400).json(error);
  }
}

// Show jobs created by currently authorized user
async function showDashboard(req, res) {
  try {
    console.log(req.params.id);
    const applications = await Job.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('jobId')
      .populate('userId');
    res.json(applications);
  } catch (error) {
    res.status(400).json(error);
  }
}

async function endJob(req, res) {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id },
      { state: 'inactive' },
      { new: true }
    );
    await job.populate('userId');
    res.json(job);
  } catch (error) {
    res.status(400).json(error);
  }
}

function ensureJobAuthor(isAuthor = true) {
  const op = isAuthor ? '$eq' : '$ne';
  return async function (req, res, next) {
    const job = await Job.findOne({
      _id: req.params.id,
      userId: { [op]: req.user._id },
    });
    if (!job) {
      res
        .status(403)
        .json({ message: 'U do not have acces 4 this resource, Get out' });
      return;
    }
    next();
  };
}
