const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
name: String,
email: String,
age: Number,
course: String,
enrollmentDate: { type: Date, default: Date.now }
}, { timestamps: true });


module.exports = mongoose.model('Student', studentSchema);