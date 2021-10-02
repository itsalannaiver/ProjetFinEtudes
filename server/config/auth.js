module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      next();
      return null;
    }

    res.status(401).json({ message: "Please Authentifie" });
  },
  ensureProf: function (req, res, next) {
    if (req.user.role === "professor") {
      return next();
    } else {
      res.status(401).json({ message: "only allowed for professors" });
    }
  },
};
