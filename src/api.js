import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Back-end endpoints
export const summarize = (transcript, prompt) =>
  api.post("/summarize", { transcript, prompt });

export const sendEmail = (to, subject, body) =>
  api.post("/send-email", { to, subject, body });

export default api;
