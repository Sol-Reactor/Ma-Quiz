import pool from './db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

// Script to create an admin user
async function createAdminUser() {
  try {
    const client = await pool.connect();
    
    try {
      // Check if admin user already exists
      const existingAdmin = await client.query(
        "SELECT id FROM users WHERE email = $1 OR role = 'admin'",
        ['admin@quiz.com']
      );

      if (existingAdmin.rows.length > 0) {
        console.log('Admin user already exists');
        // Update existing user to admin if not already
        await client.query(
          "UPDATE users SET role = 'admin' WHERE email = $1",
          ['admin@quiz.com']
        );
        console.log('Updated user to admin role');
        return;
      }

      // Create admin user
      const passwordHash = await bcrypt.hash('admin123', 10);
      const result = await client.query(
        `INSERT INTO users (username, email, password_hash, role) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, username, email, role`,
        ['admin', 'admin@quiz.com', passwordHash, 'admin']
      );

      console.log('Admin user created successfully:');
      console.log('Username: admin');
      console.log('Email: admin@quiz.com');
      console.log('Password: admin123');
      console.log('Role: admin');
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

createAdminUser();

