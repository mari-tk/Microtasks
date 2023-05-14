const express = require('express');
const router = express.Router();
const applicationsCtrl = require('../../controllers/api/applications');

// api/applications
router.get('/', applicationsCtrl.getMyApplications);

module.exports = router;
