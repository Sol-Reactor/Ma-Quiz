# 🚀 Quick Start Guide - See the App in Action

## To See the App Preview:

### Option 1: Run the Application (Recommended)

1. **Install Dependencies**
   ```bash
   # Backend
   npm install
   
   # Frontend
   cd frontend
   npm install
   cd ..
   ```

2. **Set Up Database**
   - Create PostgreSQL database
   - Update `.env` file with database credentials
   - Run seed script: `npm run seed`
   - Create admin user: `npm run seed-admin`

3. **Start Backend Server**
   ```bash
   npm run dev
   ```
   Backend runs on: `http://localhost:5000`

4. **Start Frontend Server** (in a new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on: `http://localhost:5173`

5. **Open in Browser**
   - Navigate to: `http://localhost:5173`
   - You'll see the app live!

### Option 2: View Screenshots/Video

If you want to see screenshots, you can:
1. Run the app (as above)
2. Take screenshots of each page
3. Or record a short video walkthrough

### Option 3: Check the Preview Document

See `APP_PREVIEW.md` for a detailed ASCII art and text-based preview of all pages.

---

## 📸 Pages to Preview:

1. **Home Page** - `/`
2. **Login/Signup** - `/signup`
3. **Quiz Selection** - `/quiz`
4. **Quiz Taking** - `/quiz` (after selecting a quiz)
5. **Quiz Results** - After completing a quiz
6. **User Dashboard** - `/dashboard` (requires login)
7. **Admin Dashboard** - `/admin` (requires admin login)

---

## 🔑 Test Accounts:

### Admin Account:
- **Email**: `admin@quiz.com`
- **Password**: `admin123`
- **Access**: Admin Dashboard at `/admin`

### Regular User:
- Create your own account at `/signup`
- **Access**: User Dashboard at `/dashboard`

---

## 🎨 Design Highlights:

- **Modern UI** with Tailwind CSS
- **Responsive Design** - works on mobile, tablet, desktop
- **Clean Navigation** - easy to navigate
- **Interactive Elements** - hover effects, animations
- **Card-based Layout** - organized information
- **Color Scheme** - Indigo primary, clean grays
- **Progress Indicators** - visual feedback
- **Loading States** - smooth user experience

---

## 📱 Mobile Preview:

The app is fully responsive and looks great on:
- 📱 Mobile phones (portrait/landscape)
- 📱 Tablets
- 💻 Desktop computers
- 🖥️ Large screens

---

## 🎯 Key Features to Test:

1. **Authentication**
   - Register new account
   - Login/Logout
   - Protected routes

2. **Quiz Functionality**
   - Select a quiz
   - Answer questions
   - View results
   - See score

3. **User Dashboard**
   - View statistics
   - See quiz history
   - Check available quizzes
   - View best performance

4. **Admin Dashboard** (Admin only)
   - Create new quiz
   - View statistics
   - Monitor activities
   - See user activities

---

## 🐛 Troubleshooting:

If you can't see the app:

1. **Check if servers are running**
   - Backend: `http://localhost:5000/health`
   - Frontend: `http://localhost:5173`

2. **Check database connection**
   - Verify `.env` file has correct database URL
   - Ensure PostgreSQL is running

3. **Check browser console**
   - Look for any errors
   - Check network tab for API calls

4. **Verify dependencies**
   - Run `npm install` in both root and frontend directories
   - Check for any missing packages

---

## 📝 Notes:

- The app uses JWT authentication
- All quiz data is stored in PostgreSQL
- Admin features require admin role
- User data is protected and personalized
- Real-time updates after actions

---

**Enjoy exploring the app! 🎉**

