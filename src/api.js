import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/v1",
});

export const shortenUrl = async (originalUrl) => {
  const res = await api.post("/shorten", { originalUrl });
  return res.data;
};

export default api;