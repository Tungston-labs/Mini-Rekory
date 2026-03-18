import api from "../api";

export const getEmployeeProfile = async () => {
  const res = await api.get("/employee/profile");
  return res.data.data; 
};

export const getEmployeeAttendance = async ({ month, year }) => {
  const res = await api.get("/attendance/me/monthly/", {
    params: { month, year },
  });
  return res.data.data; 
};

export const getEmployeeDayAttendance = async ( date ) => {
  const res = await api.get("/attendance/me/day/", {
    params: { date },
  });

  return res.data; 
};