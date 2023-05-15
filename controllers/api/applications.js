const JobApplication = require('../../models/jobApplication');

module.exports = {
  getMyApplications,
};

async function getMyApplications(req, res) {
  try {
    const applications = await JobApplication.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .populate('jobId')
      .populate('userId');
    res.json(applications);
  } catch (error) {
    res.status(400).json(error);
  }
}
