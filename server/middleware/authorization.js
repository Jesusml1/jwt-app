const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header('token');
    console.log(jwtToken);
    if (!jwtToken) {
      console.log('hay token');
      return res.status(403).json('Not authorize');
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret);
    req.user = payload.user;
    next();
  } catch (err) {
    console.log(err.message);
    console.log('aqui');
    return res.status(403).json('Not authorize');
  }
};
