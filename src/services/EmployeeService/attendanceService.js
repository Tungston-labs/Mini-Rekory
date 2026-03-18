import api from "../api";

export const punchInApi = async (data) => {
  const res = await api.post("/attendance/sessions/punch-in/", data);
  return res.data;
};

export const locationUpdateApi = async (data) => {
  const res = await api.post("/attendance/sessions/location-update/", data);
  return res.data;
};

export const punchOutApi = async (data) => {
  const res = await api.post("/attendance/sessions/punch-out/", data);
  return res.data;
};