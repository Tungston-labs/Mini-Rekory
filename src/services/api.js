import axios from "axios";

const api = axios.create({
  baseURL: "http://YOUR_SERVER_IP:PORT/api",
  headers: { "Content-Type": "application/json" },
});

export default api;
