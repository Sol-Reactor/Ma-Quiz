import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  // Debug logging
  console.log('🔐 Auth Middleware - Token present:', !!token);
  console.log('🔐 Auth Middleware - JWT_SECRET configured:', !!process.env.JWT_SECRET);

  if (!token) {
    console.log('❌ Auth failed: No token provided');
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      console.log('❌ JWT Verification failed:', err.name, err.message);
      return res.status(403).json({
        message: 'Invalid or expired token',
        error: err.name // Include error type for debugging
      });
    }
    console.log('✅ Auth successful for user:', user.id);
    req.user = user;
    next();
  });
};

