module.exports = function (req, res, next) {
  // Status code of 401 --> 'Unauthorized'
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  next();
};
