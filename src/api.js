import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export const shortenUrl = async (originalUrl) => {
  const res = await api.post("/shorten", { url: originalUrl });
  return res.data;
};

export const getInfo = async (code) => {
  const res = await api.get(`/${code}/details`);
  return res.data;
};

export default api;
