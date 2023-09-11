function Authentication(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({status: 'not authenticated'});
  }
}

module.exports = Authentication;
