const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerSchema, loginSchema } = require('../validation/schemas');
const User = require('../models/User');


const router = express.Router();


function generateToken(user) {
return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
expiresIn: process.env.JWT_EXPIRES_IN || '1d'
});
}


router.post('/register', async (req, res) => {
    try {
      const parsed = registerSchema.parse(req.body);
      const exists = await User.findOne({ email: parsed.email });
      if (exists) return res.status(409).json({ error: 'Email already registered' });
  
      const hashed = await bcrypt.hash(parsed.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10));
      const user = new User({ ...parsed, password: hashed });
      await user.save();
  
      const token = generateToken(user);
      res.status(201).json({ message: 'User registered', token });
    } catch (err) {
      console.error('Register route error:', err); // <--- add this
      if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
      res.status(500).json({ error: 'Server error' });
    }
  });
  


router.post('/login', async (req, res) => {
try {
const parsed = loginSchema.parse(req.body);
const user = await User.findOne({ email: parsed.email });
if (!user) return res.status(401).json({ error: 'Invalid credentials' });
const ok = await bcrypt.compare(parsed.password, user.password);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
const token = generateToken(user);
res.json({ message: 'Authenticated', token });
} catch (err) {
if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;