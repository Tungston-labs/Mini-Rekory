import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.0.163:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("accessToken");
  console.log("TOKEN:", token);
   if (token && !config.url.includes("login")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;