import api from "../api";

export const getLiveEmployees = async ({
  pageParam = 1,
  search = "",
  filter = "all",
}) => {
  const params = {
    page: pageParam,
    page_size: 10,
    search: search,
  };

  const response = await api.get("/attendance/employees/live/", { params });

  let results = response.data.results || [];

  // Filter Active / Inactive
  if (filter === "active") {
    results = results.filter((emp) => emp.is_active_now === true);
  }

  if (filter === "inactive") {
    results = results.filter((emp) => emp.is_active_now === false);
  }

  const formatTime = (date) => {
  if (!date) return "No Check-In";

  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
  const employees = results.map((emp) => ({
    id: emp.id,
    name: emp.name,
    location: emp.current_location?.place || "Offline",
    status: emp.is_active_now ? "Active" : "Inactive",
    profile_pic: emp.profile_pic,
  first_punch_in: formatTime(emp.first_punch_in),
  }));

  const currentPage = response.data.current_page;
  const totalPages = response.data.total_pages;

  return {
    employees,
    nextPage: currentPage < totalPages ? currentPage + 1 : undefined,
  };
};