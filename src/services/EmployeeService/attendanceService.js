import api from "../api";

export const punchInApi = async (data) => {
  const res = await api.post("/attendance/sessions/punch-in/", data);
  return res.data;
};

export const locationUpdateApi = async (data) => {
  try {
    console.log(data)
    const res = await api.post(
      "/attendance/sessions/location-update/",
      data
    );

    console.log("📥 API SUCCESS:", res.data);

    return res.data;

  } catch (err) {
    console.log("❌ API FAILED:", err?.response?.data || err.message);
    throw err;
  }
};

export const punchOutApi = async (data) => {
  const res = await api.post("/attendance/sessions/punch-out/", data);
  return res.data;
};