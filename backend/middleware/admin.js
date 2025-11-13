// Admin middleware - checks if user is authenticated and is an admin
// This should be used after authenticateToken middleware
export const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin privileges required.' });
  }
};

