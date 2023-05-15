const express = require('express');
const path = require('path');
const logger = require('morgan');
require('dotenv').config();
require('./config/database');

const app = express();

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.use(require('./config/checkToken'));

//routes
app.use('/api/users', require('./routes/api/users'));

const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/jobs', ensureLoggedIn, require('./routes/api/jobs'));
app.use(
  '/api/applications',
  ensureLoggedIn,
  require('./routes/api/applications')
);

//catch all
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//listener
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
