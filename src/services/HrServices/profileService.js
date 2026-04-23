

import api from "../api";

export const getCompanyProfile = async () => {
  const res = await api.get("/companies/company/profile");
  return res.data;
};