const { z } = require('zod');


const registerSchema = z.object({
name: z.string().min(2),
email: z.string().email(),
password: z.string().min(6)
});


const loginSchema = z.object({
email: z.string().email(),
password: z.string().min(6)
});


const createStudentSchema = z.object({
name: z.string().min(1),
email: z.string().email(),
age: z.number().int().positive().optional(),
course: z.string().optional(),
enrollmentDate: z.string().optional()
});


const updateStudentSchema = createStudentSchema.partial().refine(obj => Object.keys(obj).length > 0, { message: 'At least one field required' });


module.exports = { registerSchema, loginSchema, createStudentSchema, updateStudentSchema };