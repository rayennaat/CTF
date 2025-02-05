const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  
    console.log('Token received:', token); // Debugging: Log the token
  
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log('Token verification failed:', err.message); // Debugging: Log the error
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
      }
  
      console.log('Decoded user data:', user); // Debugging: Log the decoded user data
      req.user = user;
      next();
    });
  }

module.exports = {
    authenticateToken,
};

/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTU1Yjg5YWRiYmEyMjliOTE4MWFmMiIsImZ1bGxOYW1lIjoiaGlsbW91Y2giLCJlbWFpbCI6ImhpbG1vdWNoQGV4YW1wbGUuY29tIiwiaWF0IjoxNzM4MDA5MDkwLCJleHAiOjE3NDAxNjkwOTB9.APjfHdcM2xzoXPzNX3d04GPIzHRi4GNrNY6hB_DI680*/
/*eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc5ODE5NmU0NTIxOWZlOTU0NDc4ZDBhIiwiZnVsbE5hbWUiOiJoaWxtb3VjaCIsImVtYWlsIjoiaGlsbW91Y2hAZXhhbXBsZS5jb20ifSwiaWF0IjoxNzM4MDIxMjMxLCJleHAiOjE3NDAxODEyMzF9.IjCZNi5zDs2cUflAnylOaQxeLX0wpLnwD67KNg3s86k*/