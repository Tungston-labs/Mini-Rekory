import api from "../api";

export const getDashboardSummary = async () => {
  const res = await api.get("/companies/dashboard/summary/");
  return res.data;
};