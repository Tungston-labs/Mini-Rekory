import api from "../api";

export const getEmployees = async ({ search, status }) => {
  const params = {};
  if (search) params.search = search;
  if (status !== "all") params.status = status;

  const res = await api.get("/employees", { params });
  return res.data.data;
};

export const getEmployee = async (id) => {
  const res = await api.get(`/employees/${id}`);
  return res.data.data;
};

export const addEmployee = async (payload) => {
  const res = await api.post("/employees", payload);
  return res.data;
};

export const getEmployeeLocations = async (id) => {
  const res = await api.get(`/employees/${id}/locations`);
  return res.data.data;
};
