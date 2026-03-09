import api from "../api";


export const createEmployee = async (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const val = data[key];

    if ((key === "profilepic" || key === "profile_pic") && val) {
      formData.append("profilepic", {
        uri: val,
        name: "profile.jpg",
        type: "image/jpeg",
      });
    } else if (val !== undefined && val !== null) {
      formData.append(key, String(val));
    }
  });
  const res = await api.post("/employee/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const getEmployeeDetails = async (id) => {
  const res = await api.get(`/employee/${id}/`);

  return {
    id: res.data.id,
    name: res.data.name,
    photo: res.data.profile_pic,
    jobTitle: res.data.job_title,
    department: res.data.department_name,
    email: res.data.email,
    phone: res.data.phone,
  };
};

export const getEmployeeRoute = async (id, date) => {
  const res = await api.get(`/attendance/employees/${id}/route/?date=${date}`);

  const route = res.data.route || [];
  const sortedRoute = route.sort(
    (a, b) => new Date(b.recorded_at) - new Date(a.recorded_at)
  );

  return sortedRoute.map((item, index) => ({
    place: item.place_name ? item.place_name.split(",")[0].trim() : "Unknown location",
    time: new Date(item.recorded_at).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    current: index === 0, 
  }));
};


