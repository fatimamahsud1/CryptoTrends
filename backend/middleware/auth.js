// Middleware to authenticate the Firebase token
const authenticateToken = async (req, res, next) => {
    const header = req.headers['authorization'];
    if (!header) return res.status(401).send('No token provided');
  
    const token = header.split(' ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(403).send('Invalid token');
    }
  };

    export default authenticateToken;