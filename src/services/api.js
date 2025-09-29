// src/services/api.js
const API_BASE_URL = 'https://iot-api-gyes.onrender.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Método para hacer requests HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Agregar token de autenticación si existe
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Autenticación
  async login(email, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request('/api/auth/refresh', {
      method: 'POST',
    });
  }

  // Gestión de usuarios
  async getUsers() {
    return this.request('/api/users');
  }

  async getUserById(id) {
    return this.request(`/api/users/${id}`);
  }

  async updateUser(id, userData) {
    return this.request(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Perfil de usuario
  async getProfile() {
    return this.request('/api/users/profile');
  }

  async updateProfile(userData) {
    return this.request('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return this.request('/api/users/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Dispositivos IoT
  async getDevices() {
    return this.request('/api/devices');
  }

  async getDeviceById(id) {
    return this.request(`/api/devices/${id}`);
  }

  async updateDevice(id, deviceData) {
    return this.request(`/api/devices/${id}`, {
      method: 'PUT',
      body: JSON.stringify(deviceData),
    });
  }

  async getDeviceData(id, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/devices/${id}/data${queryString ? `?${queryString}` : ''}`;
    return this.request(endpoint);
  }

  // Métricas y estadísticas
  async getMetrics() {
    return this.request('/api/metrics');
  }

  async getDeviceMetrics(deviceId) {
    return this.request(`/api/devices/${deviceId}/metrics`);
  }
}

// Instancia singleton
export const apiService = new ApiService();
export default apiService;
