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

// FAQ Section
export const getFaqSettings = () => API.get("/faq-settings");
export const updateFaqSettings = (faqData) => API.put("/faq-settings", faqData);
export const getFaqAccordion = () => API.get("/faq-accordion");
export const addFaqAccordion = (data) => API.post("/faq-accordion", data);
export const updateFaqAccordion = (id, data) => API.put(`/faq-accordion/${id}`, data);
export const deleteFaqAccordion = (id) => API.delete(`/faq-accordion/${id}`);

// Services Section
export const getServicesSettings = () => API.get("/services-settings");
export const updateServicesSettings = (data) => API.put("/services-settings", data);
export const getServicesList = () => API.get("/services-list");
export const addServiceItem = (data) => API.post("/services-list", data);
export const updateServiceItem = (id, data) => API.put(`/services-list/${id}`, data);
export const deleteServiceItem = (id) => API.delete(`/services-list/${id}`);

// Booking Roadmap Section
export const getBookingRoadmapSettings = () => API.get("/booking-roadmap-settings");
export const updateBookingRoadmapSettings = (data) => API.put("/booking-roadmap-settings", data);
export const getBookingRoadmapSteps = () => API.get("/booking-roadmap-steps");
export const addBookingRoadmapStep = (data) => API.post("/booking-roadmap-steps", data);
export const updateBookingRoadmapStep = (id, data) => API.put(`/booking-roadmap-steps/${id}`, data);
export const deleteBookingRoadmapStep = (id) => API.delete(`/booking-roadmap-steps/${id}`);

// Service Detail Section
export const getServiceDetailSettings = () => API.get("/service-detail-settings");
export const updateServiceDetailSettings = (data) => API.put("/service-detail-settings", data);
export const getServiceDetailChecklist = () => API.get("/service-detail-checklist");
export const addServiceDetailChecklist = (data) => API.post("/service-detail-checklist", data);
export const updateServiceDetailChecklist = (id, data) => API.put(`/service-detail-checklist/${id}`, data);
export const deleteServiceDetailChecklist = (id) => API.delete(`/service-detail-checklist/${id}`);
export const getServiceDetailFaq = () => API.get("/service-detail-faq");
export const addServiceDetailFaq = (data) => API.post("/service-detail-faq", data);
export const updateServiceDetailFaq = (id, data) => API.put(`/service-detail-faq/${id}`, data);
export const deleteServiceDetailFaq = (id) => API.delete(`/service-detail-faq/${id}`);

export default API;
