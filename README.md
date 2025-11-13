# MyQuiz - Full-Stack Quiz Application

A full-featured quiz application with Express.js backend and React frontend, featuring JWT authentication and PostgreSQL database.

## Features

- 🔐 JWT Authentication (Register/Login) with Role-Based Access Control
- 👤 User Dashboard - View quiz results, statistics, and available quizzes
- 👨‍💼 Admin Dashboard - Create quizzes, view activities, and manage system
- 📚 Multiple Quizzes with Questions
- 🎯 Quiz Selection and Taking
- 💾 Score Tracking and Results Storage
- 📊 Activity Tracking and Analytics
- 🎨 Modern UI with Tailwind CSS
- 🚀 RESTful API with Express.js
- 🗄️ PostgreSQL Database

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### Backend Setup

1. Navigate to the root directory
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory (or root) with the following variables:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/quizdb
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
PORT=5000
FRONTEND_URL=http://localhost:5173
```

4. Create a PostgreSQL database:
```bash
createdb quizdb
```

5. Run the database setup and seed script:
```bash
npm run seed
```

6. Create an admin user (optional, for admin dashboard access):
```bash
npm run seed-admin
```
This creates an admin user with:
- Email: admin@quiz.com
- Password: admin123
- Role: admin

7. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory (optional):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile (Protected)

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get a specific quiz with questions
- `POST /api/quizzes/:id/submit` - Submit quiz answers (Protected)
- `GET /api/results` - Get user's quiz results (Protected)

### Admin (Protected - Admin Only)
- `POST /api/admin/quizzes` - Create a new quiz
- `PUT /api/admin/quizzes/:id` - Update a quiz
- `DELETE /api/admin/quizzes/:id` - Delete a quiz
- `GET /api/admin/activities` - Get all activities and statistics
- `GET /api/admin/stats` - Get dashboard statistics

### Dashboard
- `GET /api/dashboard/user` - Get user dashboard data (Protected)

## Database Schema

- **users** - User accounts (with role: admin/user)
- **quizzes** - Quiz information (with created_by reference)
- **questions** - Quiz questions
- **quiz_results** - User quiz results

## Project Structure

```
MyQuiz/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── quizController.js
│   │   ├── adminController.js
│   │   └── dashboardController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── admin.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── adminRoutes.js
│   │   └── dashboardRoutes.js
│   ├── db.js
│   ├── quizRoutes.js
│   ├── seed.js
│   ├── seed-admin.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   └── UserDashboard.jsx
│   │   ├── services/
│   │   └── main.jsx
│   └── package.json
└── package.json
```

## Usage

1. Start the backend server
2. Start the frontend development server
3. Open `http://localhost:5173` in your browser
4. Register a new account or login
5. **For Regular Users:**
   - Access your dashboard at `/dashboard`
   - Select a quiz from the available quizzes
   - Take the quiz and submit your answers
   - View your results and statistics
6. **For Admin Users:**
   - Access admin dashboard at `/admin`
   - Create new quizzes with questions
   - View system activities and statistics
   - Monitor quiz performance and user activities

## Environment Variables

### Backend
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - JWT token expiration time
- `PORT` - Server port (default: 5000)
- `FRONTEND_URL` - Frontend URL for CORS

### Frontend
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:5000/api)

## License

ISC

