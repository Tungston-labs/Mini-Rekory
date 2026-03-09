import api from "../api";

export const getDepartments = async ({ pageParam = 1 }) => {
  const res = await api.get(`/departments/?page=${pageParam}`);
  return res.data;
};

export const addDepartment = async (payload) => {
  const res = await api.post("/departments/", payload);
  return res.data;
};