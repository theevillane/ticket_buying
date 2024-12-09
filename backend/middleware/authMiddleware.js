const jwt = require('jsonwebtoken');

const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('No token provided');
  }
  const token = authHeader.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
};

exports.requireAuth = (req, res, next) => {
  try {
    const decoded = verifyToken(req);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message || 'Authentication failed' });
  }
};

exports.requireAdmin = (req, res, next) => {
  try {
    const decoded = verifyToken(req);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message || 'Authentication failed' });
  }
};