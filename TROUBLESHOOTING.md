# 🔧 Troubleshooting "Failed to fetch" Error

## Problem
Getting "Failed to fetch" error when trying to login as admin.

## Solutions

### 1. Restart Backend Server
The backend server needs to be restarted after CORS configuration changes:

```bash
# Stop the server (Ctrl+C)
# Then restart it
npm run dev
```

### 2. Check if Backend is Running
Verify the backend is running on port 5000:
- Open browser: `http://localhost:5000/health`
- Should see: `{"status":"OK","message":"Server is running"}`

### 3. Check if Frontend is Running
Verify the frontend is running on port 5173:
- Open browser: `http://localhost:5173`
- Should see the app homepage

### 4. Check Browser Console
Open browser DevTools (F12) and check:
- **Console tab**: Look for error messages
- **Network tab**: Check if requests are being made and what errors they show
- Look for CORS errors or connection refused errors

### 5. Verify CORS Configuration
The backend CORS is configured to allow:
- Origin: `http://localhost:5173`
- Methods: GET, POST, PUT, DELETE, OPTIONS
- Headers: Content-Type, Authorization
- Credentials: true

### 6. Clear Browser Cache
Sometimes browser cache can cause issues:
- Clear browser cache
- Or use incognito/private mode
- Or hard refresh (Ctrl+Shift+R)

### 7. Check API URL
Verify the frontend is using the correct API URL:
- Default: `http://localhost:5000/api`
- Check browser console for the actual URL being called

### 8. Check Firewall/Antivirus
Sometimes firewall or antivirus can block localhost connections:
- Temporarily disable firewall/antivirus to test
- Add exception for localhost:5000 and localhost:5173

### 9. Test Backend Directly
Test the login endpoint directly:
```bash
# Using PowerShell
$body = @{email='admin@quiz.com';password='admin123'} | ConvertTo-Json
Invoke-WebRequest -Uri 'http://localhost:5000/api/auth/login' -Method POST -Body $body -ContentType 'application/json'
```

### 10. Check Environment Variables
Verify `.env` file exists in root directory with:
```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## Common Issues

### Issue: CORS Error
**Solution**: Restart backend server after CORS configuration changes

### Issue: Connection Refused
**Solution**: Make sure backend server is running on port 5000

### Issue: Network Error
**Solution**: Check if both frontend and backend are running

### Issue: 401 Unauthorized
**Solution**: Check admin credentials:
- Email: `admin@quiz.com`
- Password: `admin123`

## Still Having Issues?

1. Check backend server logs for errors
2. Check browser console for detailed error messages
3. Verify both servers are running
4. Try accessing the API directly in browser/Postman
5. Check if ports 5000 and 5173 are available

## Quick Fix Checklist

- [ ] Backend server is running on port 5000
- [ ] Frontend server is running on port 5173
- [ ] Backend server has been restarted after CORS changes
- [ ] Browser cache has been cleared
- [ ] `.env` file exists with correct configuration
- [ ] Admin user exists in database
- [ ] No firewall blocking localhost connections
- [ ] Browser console shows no CORS errors

