import axios from "axios";
// import jwt_decode from "jwt-decode";
axios.defaults.baseURL = import.meta.env.VITE_SERVER_DOMAIN;

// src/services/apiService.js

export async function loginUser(credentials) {
    try {
      const { data, status } = await axios.post("/user/login/", credentials);
  
      if (status === 200) {
        return Promise.resolve(data);
      }
    } catch (error) {
      return Promise.reject({
        error: error.response?.data?.message || "Login failed. Please try again.",
      });
    }
  }
  