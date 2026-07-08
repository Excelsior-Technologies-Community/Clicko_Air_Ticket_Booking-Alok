import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getCompanyInfo = () => API.get("/company-info");
export const getAboutInfo = () => API.get("/about-info");
export const updateAboutInfo = (aboutData) => API.put("/about-info", aboutData);
export const getBestDeal = () => API.get("/best-deal");
export const updateBestDeal = (bestDealData) => API.put("/best-deal", bestDealData);
export const submitContactForm = (formData) => API.post("/contact", formData);
export const getContacts = () => API.get("/contact");
export const deleteContact = (id) => API.delete(`/contact/${id}`);
export const replyContact = (replyData) => API.post("/contact/reply", replyData);

export default API;
