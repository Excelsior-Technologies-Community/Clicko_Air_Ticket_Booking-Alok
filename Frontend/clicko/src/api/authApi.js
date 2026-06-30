import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCompanyInfo = () => API.get("/company-info");
export const submitContactForm = (formData) => API.post("/contact", formData);

export default API;
