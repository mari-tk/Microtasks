const JobApplication = require('../../models/jobApplication');

module.exports = {
  getMyApplications,
};

async function getMyApplications(req, res) {
  try {
    console.log(req.params.id);
    const applications = await JobApplication.find({ userId: req.params.id })
      .sort({ createdAt: -1 })
      .populate('jobId')
      .populate('userId');
    res.json(applications);
  } catch (error) {
    res.status(400).json(error);
  }
}
