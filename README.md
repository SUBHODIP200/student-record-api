# 🎓 Student Record API (Backend)

A lightweight **RESTful API** for managing student records, built with **Node.js, Express, MongoDB**, and secured using **JWT authentication** and **bcrypt password hashing**.

---

## 🚀 Features
- 🔑 **Authentication** (Register, Login, JWT-based auth)
- 👨‍🎓 **Student Management** (CRUD operations)
- 🔒 **Role-based access control** (Admin can delete students)
- ✅ **Input validation** with Zod
- 💾 **MongoDB** for persistence

---

## 🛠️ Tech Stack
- **Node.js** (runtime)
- **Express.js** (framework)
- **MongoDB + Mongoose** (database)
- **JWT Authentication** (security)
- **Zod** (validation)
- **Bcrypt** (password hashing)

---

## 📂 Folder Structure

student-record-backend/
├── models/
│ ├── User.js # User schema (email, password, role)
│ └── Student.js # Student schema (name, email, age, course)
├── routes/
│ ├── auth.js # Auth routes (register, login)
│ └── students.js # Student CRUD routes
├── middleware/
│ └── auth.js # JWT auth & role middleware
├── validation/
│ └── schemas.js # Zod validation schemas
├── index.js # Main entry point (Express server setup)
├── package.json # Dependencies and scripts
├── .env.example # Example environment variables
├── .gitignore # Ignored files (node_modules, .env, etc.)
└── README.md # Project documentation

yaml
Copy code

---

## ⚙️ Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/student-record-backend.git
cd student-record-backend
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Set up environment variables
Create a .env file in the root directory and copy values from .env.example.

4️⃣ Start the server
bash
Copy code
npm start
By default, the server runs at:
👉 http://localhost:3000

🔐 Environment Variables
Your .env file should look like this:

ini
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/student-records
JWT_SECRET=your_jwt_secret_key
📡 API Endpoints
🔑 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login user & get token

👨‍🎓 Student Routes (Protected with JWT)
Method	Endpoint	Description
GET	/api/students	Get all students
GET	/api/students/:id	Get a student by ID
POST	/api/students	Create new student (JWT)
PUT	/api/students/:id	Update student by ID (JWT)
DELETE	/api/students/:id	Delete student by ID (Admin)

📄 File Explanations
index.js
Main server file

Connects to MongoDB

Loads Express middleware (JSON parsing, CORS)

Mounts routes: /api/auth and /api/students

models/User.js
Defines User schema with:

email (unique, required)

password (hashed with bcrypt)

role (user or admin)

models/Student.js
Defines Student schema with:

name

email

age

course

routes/auth.js
POST /register → Register user (Zod validation, bcrypt password hashing)

POST /login → Authenticate user, return JWT token

routes/students.js
GET /students → Get all students

GET /students/:id → Get student by ID

POST /students → Create student (requires JWT)

PUT /students/:id → Update student (requires JWT)

DELETE /students/:id → Delete student (requires Admin role)

middleware/auth.js
authMiddleware → Verifies JWT token, attaches user to req.user

adminMiddleware → Checks if user role is admin

validation/schemas.js
Contains Zod schemas for validating request bodies (register, login, students)

.env.example
ini
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/student-records
JWT_SECRET=your_jwt_secret_key
.gitignore
bash
Copy code
node_modules
.env
🧪 Example Requests (Postman)
✅ Register
http
Copy code
POST /api/auth/register
Request body:

json
Copy code
{
  "email": "admin@example.com",
  "password": "admin123"
}
✅ Login
http
Copy code
POST /api/auth/login
Request body:

json
Copy code
{
  "email": "admin@example.com",
  "password": "admin123"
}
Response:

json
Copy code
{
  "message": "Login successful",
  "token": "your_jwt_token_here"
}
Use the token in headers:

makefile
Copy code
Authorization: Bearer <your_jwt_token>
✅ Create Student (Protected)
http
Copy code
POST /api/students
Request body:

json
Copy code
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 21,
  "course": "Computer Science"
}
📝 License
MIT License © 2025

yaml
Copy code

---

⚡ Now your `README.md` includes **everything**: setup, `.env.example`, file explanations, API docs, and sample requests.  

Do you also want me to generate a **sample Postman collection JSON file
