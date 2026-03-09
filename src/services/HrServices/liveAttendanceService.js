import api from "../api";

export const getLiveEmployees = async (search,
  page,
  page_size) => {
  const res = await api.get("/attendance/employees/live/", {
    params: {
      page,
      page_size,
      search,
      today_active: true, 
    },
  });

  return res.data;
};