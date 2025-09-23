const jwt = require('jsonwebtoken');


function authMiddleware(req, res, next) {
const authHeader = req.headers['authorization'];
if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });
const token = authHeader.split(' ')[1];
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
req.user = payload;
next();
} catch (err) {
return res.status(401).json({ error: 'Invalid token' });
}
}


function requireAdmin(req, res, next) {
if (req.user && req.user.role === 'admin') return next();
return res.status(403).json({ error: 'Admin only' });
}


module.exports = { authMiddleware, requireAdmin };