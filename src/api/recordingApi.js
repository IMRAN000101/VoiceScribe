import api from "./axios";

export async function saveRecording(data) {
  return api.post("/recordings", data);
}
export async function getRecordings() {
  return api.get("/recordings");
}
export async function getRecording(id) {
  return api.get(`/recordings/${id}`);
}
export async function updateRecording(id, data) {
  return api.put(`/recordings/${id}`, data);
}
export async function deleteRecording(id) {
  return api.delete(`/recordings/${id}`);
}
