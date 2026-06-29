import api from "./axios";

export async function login(formData) {
  try {
    const response = await api.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
}

export async function signup(formData) {
  try {
    const response = await api.post("/auth/signup", formData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
}
