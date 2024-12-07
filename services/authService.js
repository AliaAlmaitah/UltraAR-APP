// services/authService.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.1.90:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Signup function
export const signup = async (username, email, phone, password) => {
  try {
    console.log('Sending signup request to:', `${API_BASE_URL}/auth/register`);
    
    const response = await api.post('/auth/register', {
      username,
      email,
      phone,
      password,
    });

    console.log('Signup response:', response.data);

    if (response.data && response.data.token) {
      await AsyncStorage.setItem('userToken', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response || error);
    throw error;
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });

    if (response.data && response.data.token) {
      await AsyncStorage.setItem('userToken', response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error('Login error:', error.response || error);
    throw error;
  }
};

// Logout function
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export default api;