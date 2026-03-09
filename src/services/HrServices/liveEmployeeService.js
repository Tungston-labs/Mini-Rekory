import api from "../api";

export const getLiveEmployees = async (search = "", filter = "all") => {
  const params = {
    page: 1,
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

  return results.map((emp) => ({
    id: emp.id,
    name: emp.name,
    location: emp.current_location?.place || "OffLine",
    status: emp.is_active_now ? "Active" : "Inactive",
  }));
};