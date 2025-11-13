const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'An error occurred' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    // Handle network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Please make sure the backend server is running on http://localhost:5000');
    }
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (username, email, password) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },

  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  getProfile: async () => {
    return apiRequest('/auth/profile', {
      method: 'GET',
    });
  },
};

// Quiz API
export const quizAPI = {
  getAllQuizzes: async () => {
    return apiRequest('/quizzes', {
      method: 'GET',
    });
  },

  getQuizById: async (quizId) => {
    return apiRequest(`/quizzes/${quizId}`, {
      method: 'GET',
    });
  },

  submitQuiz: async (quizId, answers) => {
    return apiRequest(`/quizzes/${quizId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  },

  getUserResults: async () => {
    return apiRequest('/results', {
      method: 'GET',
    });
  },
};

// Admin API
export const adminAPI = {
  createQuiz: async (quizData) => {
    return apiRequest('/admin/quizzes', {
      method: 'POST',
      body: JSON.stringify(quizData),
    });
  },

  updateQuiz: async (quizId, quizData) => {
    return apiRequest(`/admin/quizzes/${quizId}`, {
      method: 'PUT',
      body: JSON.stringify(quizData),
    });
  },

  deleteQuiz: async (quizId) => {
    return apiRequest(`/admin/quizzes/${quizId}`, {
      method: 'DELETE',
    });
  },

  getActivities: async () => {
    return apiRequest('/admin/activities', {
      method: 'GET',
    });
  },

  getDashboardStats: async () => {
    return apiRequest('/admin/stats', {
      method: 'GET',
    });
  },
};

// Dashboard API
export const dashboardAPI = {
  getUserDashboard: async () => {
    return apiRequest('/dashboard/user', {
      method: 'GET',
    });
  },
};

export default {
  authAPI,
  quizAPI,
  adminAPI,
  dashboardAPI,
};

