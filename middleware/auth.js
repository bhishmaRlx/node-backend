const jwt = require('jsonwebtoken');
const JWT_SECRET = "aashdjka5as67474545";

//middleware function
module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    //jwt.verify : does 3 checks : is token real, is token not expired, is token generated from this server only ?
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // userID, mobile available here // { userID: "...", mobile: "9999999999", iat: ..., exp: ... }
    next(); //Token valid, send request, w/o this request stops here
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};



