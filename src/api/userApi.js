import api from "./axios";

export async function getProfile() {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
}
