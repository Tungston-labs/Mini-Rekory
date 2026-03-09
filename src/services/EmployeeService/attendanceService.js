import api from "../api";

export const punchIn = async (payload) => {
  const response = await api.post("/attendance/sessions/punch-in/", payload);
  return response.data;
};

export const punchOut = async (payload) => {
  const response = await api.post("/attendance/sessions/punch-out/", payload);
  return response.data;
};

export const updateLocation = async (payload) => {
  const response = await api.post("/attendance/sessions/location-update/", payload);
  return response.data;
};

// Add this:
export const getTodaySession = async () => {
  const response = await api.get("/attendance/today-session/"); 
  return response.data;
};