const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
     const token = req.header('Authorization')?.split(' ')[1];
     if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

     try {
         const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
         req.user = decodeUser;
         next();
     } catch (error) {
         res.status(400).json({ error: 'Invalid Token' });
     }
};

module.exports = auth;