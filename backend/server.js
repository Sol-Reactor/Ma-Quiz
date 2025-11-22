import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import quizRoutes from './routes/quizRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { setupDatabase } from './db.js';


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false, // Disable CSP for API to avoid blocking requests
})); // Apply security headers

// CORS configuration - allow multiple origins for development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // In development, allow any localhost origin
    if (process.env.NODE_ENV !== 'production') {
      if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
        return callback(null, true);
      }
    }
    
    // Check against allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
})); // Enable Cross-Origin Resource Sharing

app.use(morgan('dev')); // Log HTTP requests in dev format
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: false })); // To parse URL-encoded bodies

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', quizRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // Set up the database tables on startup
  try {
    await setupDatabase();
    console.log('Database setup completed');
  } catch (error) {
    console.error('Database setup failed:', error);
  }
});