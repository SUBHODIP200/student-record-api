const express = require('express');
const Student = require('../models/Student');
const { createStudentSchema, updateStudentSchema } = require('../validation/schemas');
const { authMiddleware, requireAdmin } = require('../middleware/auth');


const router = express.Router();


// Create
router.post('/', authMiddleware, async (req, res) => {
try {
const parsed = createStudentSchema.parse(req.body);
const student = new Student({ ...parsed, enrollmentDate: parsed.enrollmentDate ? new Date(parsed.enrollmentDate) : undefined });
await student.save();
res.status(201).json({ message: 'Student created', student });
} catch (err) {
if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
res.status(500).json({ error: 'Server error' });
}
});


// Get all
router.get('/', async (req, res) => {
const { page = 1, limit = 20 } = req.query;
const students = await Student.find().skip((page - 1) * limit).limit(parseInt(limit)).sort({ createdAt: -1 });
res.json({ students });
});


// Get one
router.get('/:id', async (req, res) => {
const student = await Student.findById(req.params.id);
if (!student) return res.status(404).json({ error: 'Not found' });
res.json({ student });
});


// Update
router.put('/:id', authMiddleware, async (req, res) => {
try {
const parsed = updateStudentSchema.parse(req.body);
if (parsed.enrollmentDate) parsed.enrollmentDate = new Date(parsed.enrollmentDate);
const student = await Student.findByIdAndUpdate(req.params.id, parsed, { new: true });
if (!student) return res.status(404).json({ error: 'Not found' });
res.json({ message: 'Updated', student });
} catch (err) {
if (err.name === 'ZodError') return res.status(400).json({ error: err.errors });
res.status(500).json({ error: 'Server error' });
}
});


// Delete
router.delete('/:id', authMiddleware, requireAdmin, async (req, res) => {
const student = await Student.findByIdAndDelete(req.params.id);
if (!student) return res.status(404).json({ error: 'Not found' });
res.json({ message: 'Deleted' });
});


module.exports = router;