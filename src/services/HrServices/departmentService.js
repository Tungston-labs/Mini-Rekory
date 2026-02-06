import api from "../api";

export const getDepartments = async () => {
  const res = await api.get("/departments");
  return res.data.data;
};

export const addDepartment = async (payload) => {
  const res = await api.post("/departments", payload);
  return res.data;
};
