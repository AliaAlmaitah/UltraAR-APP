import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    const token = response.data.token;
    await AsyncStorage.setItem('token', token); // Save token in AsyncStorage for React Native
    return token;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

// Update protected data retrieval to use AsyncStorage
export const getProtectedData = async () => {
  const token = await AsyncStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Protected Route Error:", error.response?.data || error.message);
    throw error;
  }
};