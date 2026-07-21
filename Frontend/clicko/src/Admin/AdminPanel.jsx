import React, { useState, useEffect } from 'react';
import { 
  getContacts, 
  deleteContact, 
  getCompanyInfo, 
  replyContact, 
  getAboutInfo, 
  updateAboutInfo, 
  getBestDeal, 
  updateBestDeal,
  getFaqSettings,
  updateFaqSettings,
  getFaqAccordion,
  addFaqAccordion,
  updateFaqAccordion,
  deleteFaqAccordion,
  getServicesSettings,
  updateServicesSettings,
  getServicesList,
  addServiceItem,
  updateServiceItem,
  deleteServiceItem,
  getBookingRoadmapSettings,
  updateBookingRoadmapSettings,
  getBookingRoadmapSteps,
  addBookingRoadmapStep,
  updateBookingRoadmapStep,
  deleteBookingRoadmapStep,
  getServiceDetailSettings,
  updateServiceDetailSettings,
  getServiceDetailChecklist,
  addServiceDetailChecklist,
  updateServiceDetailChecklist,
  deleteServiceDetailChecklist,
  getServiceDetailFaq,
  addServiceDetailFaq,
  updateServiceDetailFaq,
  deleteServiceDetailFaq
} from '../api/authApi';
import '../Css/admin.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [companyInfo, setCompanyInfo] = useState({
    title: 'Clicko Air Ticket Booking',
    subtitle: 'Search, Book, and Fly Easily',
    address: '123 Aviation Way, Sector 62, Noida, India',
    phone1: '+91 99999 88888',
    phone2: '+91 77777 66666',
    email1: 'support@clicko.com',
    email2: 'info@clicko.com',
  });

  const [aboutForm, setAboutForm] = useState({
    subtitle: '',
    heading: '',
    description: '',
    feature_title: '',
    feature_desc: '',
    checklist1: '',
    checklist2: '',
    image1: '',
    image2: ''
  });

  const [bestDealForm, setBestDealForm] = useState({
    subtitle: '',
    heading: '',
    metric1_val: '',
    metric1_lbl: '',
    metric2_val: '',
    metric2_lbl: '',
    video_url: ''
  });

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const [faqForm, setFaqForm] = useState({
    subtitle: '',
    heading: '',
    description: '',
    image: ''
  });
  const [faqAccordionItems, setFaqAccordionItems] = useState([]);
  const [isAccModalOpen, setIsAccModalOpen] = useState(false);
  const [currentAccItem, setCurrentAccItem] = useState({ id: null, question: '', answer: '' });
  const [savingAccItem, setSavingAccItem] = useState(false);

  const [servicesForm, setServicesForm] = useState({
    subtitle: '',
    heading: '',
    description: '',
    more_service_btn_text: 'More Service',
    bottom_subtitle: '',
    bottom_heading: '',
    bottom_btn_text: 'Find Solution'
  });
  const [servicesList, setServicesList] = useState([]);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [currentServiceItem, setCurrentServiceItem] = useState({ id: null, service_number: '', title: '', description: '' });
  const [savingServiceItem, setSavingServiceItem] = useState(false);

  const [roadmapForm, setRoadmapForm] = useState({
    subtitle: '',
    heading: ''
  });
  const [roadmapSteps, setRoadmapSteps] = useState([]);
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);
  const [currentRoadmapStep, setCurrentRoadmapStep] = useState({ id: null, step_number: '', title: '', description: '' });
  const [savingRoadmapStep, setSavingRoadmapStep] = useState(false);

  // Service Detail State
  const [serviceDetailForm, setServiceDetailForm] = useState({
    banner_title: '',
    main_heading: '',
    main_description: '',
    list_heading: '',
    list_description: '',
    image1: '',
    image2: '',
    bottom_description: '',
    faq_heading: ''
  });
  const [serviceDetailChecklist, setServiceDetailChecklist] = useState([]);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [currentChecklistItem, setCurrentChecklistItem] = useState({ id: null, item_text: '' });
  const [savingChecklistItem, setSavingChecklistItem] = useState(false);

  const [serviceDetailFaqs, setServiceDetailFaqs] = useState([]);
  const [isDetailFaqModalOpen, setIsDetailFaqModalOpen] = useState(false);
  const [currentDetailFaqItem, setCurrentDetailFaqItem] = useState({ id: null, question: '', answer: '' });
  const [savingDetailFaqItem, setSavingDetailFaqItem] = useState(false);

  const fetchQueries = async () => {
    setLoading(true);
    try {
      const response = await getContacts();
      if (response.data && response.data.success) {
        setQueries(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching contact queries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyDetails = async () => {
    try {
      const response = await getCompanyInfo();
      if (response.data && response.data.success) {
        setCompanyInfo(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching company details:", error);
    }
  };

  const fetchAboutDetails = async () => {
    try {
      const response = await getAboutInfo();
      if (response.data && response.data.success) {
        setAboutForm(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching about info:", error);
    }
  };

  const fetchBestDealDetails = async () => {
    try {
      const response = await getBestDeal();
      if (response.data && response.data.success) {
        setBestDealForm(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching best deal details:", error);
    }
  };

  const fetchFaqDetails = async () => {
    try {
      const response = await getFaqSettings();
      if (response.data && response.data.success) {
        setFaqForm(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching FAQ details:", error);
    }
  };

  const fetchFaqAccordionDetails = async () => {
    try {
      const response = await getFaqAccordion();
      if (response.data && response.data.success) {
        setFaqAccordionItems(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching FAQ accordion details:", error);
    }
  };

  const fetchServicesSettingsDetails = async () => {
    try {
      const response = await getServicesSettings();
      if (response.data && response.data.success) {
        setServicesForm(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching services settings:", error);
    }
  };

  const fetchServicesListDetails = async () => {
    try {
      const response = await getServicesList();
      if (response.data && response.data.success) {
        setServicesList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching services list:", error);
    }
  };

  const fetchRoadmapSettingsDetails = async () => {
    try {
      const response = await getBookingRoadmapSettings();
      if (response.data && response.data.success) {
        setRoadmapForm(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching booking roadmap settings:", error);
    }
  };

  const fetchRoadmapStepsDetails = async () => {
    try {
      const response = await getBookingRoadmapSteps();
      if (response.data && response.data.success) {
        setRoadmapSteps(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching booking roadmap steps:", error);
    }
  };

  const fetchServiceDetailSettings = async () => {
    try {
      const response = await getServiceDetailSettings();
      if (response.data && response.data.success) {
        setServiceDetailForm(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching service detail settings:", error);
    }
  };

  const fetchServiceDetailChecklist = async () => {
    try {
      const response = await getServiceDetailChecklist();
      if (response.data && response.data.success) {
        setServiceDetailChecklist(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching service detail checklist:", error);
    }
  };

  const fetchServiceDetailFaqs = async () => {
    try {
      const response = await getServiceDetailFaq();
      if (response.data && response.data.success) {
        setServiceDetailFaqs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching service detail faqs:", error);
    }
  };

  useEffect(() => {
    fetchQueries();
    fetchCompanyDetails();
    fetchAboutDetails();
    fetchBestDealDetails();
    fetchFaqDetails();
    fetchFaqAccordionDetails();
    fetchServicesSettingsDetails();
    fetchServicesListDetails();
    fetchRoadmapSettingsDetails();
    fetchRoadmapStepsDetails();
    fetchServiceDetailSettings();
    fetchServiceDetailChecklist();
    fetchServiceDetailFaqs();
  }, []);

  const handleResolveQuery = async (id) => {
    if (window.confirm("Are you sure you want to mark this query as resolved? It will be deleted from the database.")) {
      try {
        const response = await deleteContact(id);
        if (response.data && response.data.success) {
          alert("Query resolved successfully!");
          fetchQueries();
        } else {
          alert("Failed to resolve query.");
        }
      } catch (error) {
        console.error("Error resolving query:", error);
        alert("Server error occurred while resolving the query.");
      }
    }
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setSendingReply(true);
    try {
      const response = await replyContact({
        email: selectedQuery.email,
        subject: selectedQuery.subject,
        message: replyText,
      });

      if (response.data && response.data.success) {
        alert("Email reply sent successfully!");
        setIsReplyModalOpen(false);
        setReplyText("");
        
        if (window.confirm("Would you like to resolve (remove) this query from the list now?")) {
          await deleteContact(selectedQuery.id);
          fetchQueries();
        }
      } else {
        alert("Failed to send email. Check SMTP settings.");
      }
    } catch (error) {
      console.error("Error sending reply email:", error);
      alert("Error: Failed to send reply email.");
    } finally {
      setSendingReply(false);
    }
  };

  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateAboutInfo(aboutForm);
      if (response.data && response.data.success) {
        alert("About information updated successfully!");
        fetchAboutDetails();
      } else {
        alert("Failed to update About information.");
      }
    } catch (error) {
      console.error("Error saving about details:", error);
      alert("Server error occurred while saving About details.");
    }
  };

  const handleResetAboutInfo = async () => {
    if (window.confirm("Are you sure you want to reset About page details to seed defaults?")) {
      const defaultAbout = {
        subtitle: "Know About Flight",
        heading: "Experience The Luxury Private Jet",
        description: "Choosing the right private jet is essential for a comfortable, efficient that and travel experience. Whether you're flying for business.",
        feature_title: "Easy & Quick Booking",
        feature_desc: "right private jet is essential for a comfortable, efficient that and travel experience.",
        checklist1: "Private Jet Is Essential For A Comfortable",
        checklist2: "Essential For A Comfortable",
        image1: "https://clicko-html.vercel.app/assets/image/about/about-img-h2.jpg",
        image2: "https://clicko-html.vercel.app/assets/image/about/about-img2-h2.jpg"
      };
      try {
        const response = await updateAboutInfo(defaultAbout);
        if (response.data && response.data.success) {
          setAboutForm(defaultAbout);
          alert("About information reset to defaults successfully!");
        } else {
          alert("Failed to reset About information.");
        }
      } catch (error) {
        console.error("Error resetting about details:", error);
        alert("Server error occurred while resetting About details.");
      }
    }
  };

  const handleBestDealSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateBestDeal(bestDealForm);
      if (response.data && response.data.success) {
        alert("Best Deals information updated successfully!");
        fetchBestDealDetails();
      } else {
        alert("Failed to update Best Deals information.");
      }
    } catch (error) {
      console.error("Error saving best deal details:", error);
      alert("Server error occurred while saving Best Deals details.");
    }
  };

  const handleResetBestDealInfo = async () => {
    if (window.confirm("Are you sure you want to reset Best Deals details to defaults?")) {
      const defaultBestDeal = {
        subtitle: "Best Deals Offer",
        heading: "Experience The Luxury Private Jet",
        metric1_val: "35000",
        metric1_lbl: "Happy Customers",
        metric2_val: "100",
        metric2_lbl: "Client Satisfied",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
      };
      try {
        const response = await updateBestDeal(defaultBestDeal);
        if (response.data && response.data.success) {
          setBestDealForm(defaultBestDeal);
          alert("Best Deals information reset to defaults successfully!");
        } else {
          alert("Failed to reset Best Deals information.");
        }
      } catch (error) {
        console.error("Error resetting best deal details:", error);
        alert("Server error occurred while resetting Best Deals details.");
      }
    }
  };

  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateFaqSettings(faqForm);
      if (response.data && response.data.success) {
        alert("FAQ settings updated successfully!");
        fetchFaqDetails();
      } else {
        alert("Failed to update FAQ settings.");
      }
    } catch (error) {
      console.error("Error saving FAQ details:", error);
      alert("Server error occurred while saving FAQ details.");
    }
  };

  const handleResetFaqInfo = async () => {
    if (window.confirm("Are you sure you want to reset FAQ details to defaults?")) {
      const defaultFaq = {
        subtitle: "Faq Questions",
        heading: "Frequently Ask Questions Of Customer",
        description: "Our Goal Each Day Is To Ensure That Our Residents' Needs Are Not Only Met But Exceeded. To Make That Happen.",
        image: "https://clicko-html.vercel.app/assets/image/about/faq-img.png"
      };
      try {
        const response = await updateFaqSettings(defaultFaq);
        if (response.data && response.data.success) {
          setFaqForm(defaultFaq);
          alert("FAQ settings reset to defaults successfully!");
        } else {
          alert("Failed to reset FAQ settings.");
        }
      } catch (error) {
        console.error("Error resetting FAQ details:", error);
        alert("Server error occurred while resetting FAQ details.");
      }
    }
  };

  const handleAccSubmit = async (e) => {
    e.preventDefault();
    if (!currentAccItem.question.trim() || !currentAccItem.answer.trim()) return;

    setSavingAccItem(true);
    try {
      if (currentAccItem.id) {
        const response = await updateFaqAccordion(currentAccItem.id, {
          question: currentAccItem.question,
          answer: currentAccItem.answer
        });
        if (response.data && response.data.success) {
          alert("FAQ accordion item updated successfully!");
          setIsAccModalOpen(false);
          fetchFaqAccordionDetails();
        } else {
          alert("Failed to update FAQ accordion item.");
        }
      } else {
        const response = await addFaqAccordion({
          question: currentAccItem.question,
          answer: currentAccItem.answer
        });
        if (response.data && response.data.success) {
          alert("FAQ accordion item added successfully!");
          setIsAccModalOpen(false);
          fetchFaqAccordionDetails();
        } else {
          alert("Failed to add FAQ accordion item.");
        }
      }
    } catch (error) {
      console.error("Error saving FAQ accordion item:", error);
      alert("Error saving FAQ accordion item.");
    } finally {
      setSavingAccItem(false);
    }
  };

  const handleDeleteAccItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ accordion item?")) {
      try {
        const response = await deleteFaqAccordion(id);
        if (response.data && response.data.success) {
          alert("FAQ accordion item deleted successfully!");
          fetchFaqAccordionDetails();
        } else {
          alert("Failed to delete FAQ accordion item.");
        }
      } catch (error) {
        console.error("Error deleting FAQ accordion item:", error);
        alert("Server error occurred while deleting the item.");
      }
    }
  };

  const handleServicesSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateServicesSettings(servicesForm);
      if (response.data && response.data.success) {
        alert("Services settings updated successfully!");
        fetchServicesSettingsDetails();
      } else {
        alert("Failed to update services settings.");
      }
    } catch (error) {
      console.error("Error saving services settings:", error);
      alert("Server error occurred while saving services settings.");
    }
  };

  const handleResetServicesSettings = async () => {
    if (window.confirm("Are you sure you want to reset services settings to defaults?")) {
      const defaultServices = {
        subtitle: "Why Choose Us",
        heading: "Experience Browse By Topic & Service",
        description: "Frequently Asked Questions Just One Click Away.",
        more_service_btn_text: "More Service",
        bottom_subtitle: "Get Your Air Ticket Booking",
        bottom_heading: "Don't Waste A Second! Call Us Solve Your Any Problem",
        bottom_btn_text: "Find Solution"
      };
      try {
        const response = await updateServicesSettings(defaultServices);
        if (response.data && response.data.success) {
          setServicesForm(defaultServices);
          alert("Services settings reset to defaults successfully!");
        } else {
          alert("Failed to reset services settings.");
        }
      } catch (error) {
        console.error("Error resetting services settings:", error);
        alert("Server error occurred while resetting services settings.");
      }
    }
  };

  const handleServiceItemSubmit = async (e) => {
    e.preventDefault();
    if (!currentServiceItem.service_number.trim() || !currentServiceItem.title.trim() || !currentServiceItem.description.trim()) return;

    setSavingServiceItem(true);
    try {
      if (currentServiceItem.id) {
        const response = await updateServiceItem(currentServiceItem.id, {
          service_number: currentServiceItem.service_number,
          title: currentServiceItem.title,
          description: currentServiceItem.description
        });
        if (response.data && response.data.success) {
          alert("Service item updated successfully!");
          setIsServiceModalOpen(false);
          fetchServicesListDetails();
        } else {
          alert("Failed to update service item.");
        }
      } else {
        const response = await addServiceItem({
          service_number: currentServiceItem.service_number,
          title: currentServiceItem.title,
          description: currentServiceItem.description
        });
        if (response.data && response.data.success) {
          alert("Service item added successfully!");
          setIsServiceModalOpen(false);
          fetchServicesListDetails();
        } else {
          alert("Failed to add service item.");
        }
      }
    } catch (error) {
      console.error("Error saving service item:", error);
      alert("Error saving service item.");
    } finally {
      setSavingServiceItem(false);
    }
  };

  const handleDeleteServiceItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this service item?")) {
      try {
        const response = await deleteServiceItem(id);
        if (response.data && response.data.success) {
          alert("Service item deleted successfully!");
          fetchServicesListDetails();
        } else {
          alert("Failed to delete service item.");
        }
      } catch (error) {
        console.error("Error deleting service item:", error);
        alert("Server error occurred while deleting the service item.");
      }
    }
  };

  const handleRoadmapSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateBookingRoadmapSettings(roadmapForm);
      if (response.data && response.data.success) {
        alert("Booking roadmap settings updated successfully!");
        fetchRoadmapSettingsDetails();
      } else {
        alert("Failed to update booking roadmap settings.");
      }
    } catch (error) {
      console.error("Error saving booking roadmap settings:", error);
      alert("Server error occurred while saving booking roadmap settings.");
    }
  };

  const handleResetRoadmapSettings = async () => {
    if (window.confirm("Are you sure you want to reset booking roadmap settings to defaults?")) {
      const defaultRoadmap = {
        subtitle: "Booking Roadmap",
        heading: "4 Easy Steps Source Incredible Journey"
      };
      try {
        const response = await updateBookingRoadmapSettings(defaultRoadmap);
        if (response.data && response.data.success) {
          setRoadmapForm(defaultRoadmap);
          alert("Booking roadmap settings reset to defaults successfully!");
        } else {
          alert("Failed to reset booking roadmap settings.");
        }
      } catch (error) {
        console.error("Error resetting booking roadmap settings:", error);
        alert("Server error occurred while resetting settings.");
      }
    }
  };

  const handleRoadmapStepSubmit = async (e) => {
    e.preventDefault();
    if (!currentRoadmapStep.step_number.trim() || !currentRoadmapStep.title.trim() || !currentRoadmapStep.description.trim()) return;

    setSavingRoadmapStep(true);
    try {
      if (currentRoadmapStep.id) {
        const response = await updateBookingRoadmapStep(currentRoadmapStep.id, {
          step_number: currentRoadmapStep.step_number,
          title: currentRoadmapStep.title,
          description: currentRoadmapStep.description
        });
        if (response.data && response.data.success) {
          alert("Booking roadmap step updated successfully!");
          setIsRoadmapModalOpen(false);
          fetchRoadmapStepsDetails();
        } else {
          alert("Failed to update step.");
        }
      } else {
        const response = await addBookingRoadmapStep({
          step_number: currentRoadmapStep.step_number,
          title: currentRoadmapStep.title,
          description: currentRoadmapStep.description
        });
        if (response.data && response.data.success) {
          alert("Booking roadmap step added successfully!");
          setIsRoadmapModalOpen(false);
          fetchRoadmapStepsDetails();
        } else {
          alert("Failed to add step.");
        }
      }
    } catch (error) {
      console.error("Error saving booking roadmap step:", error);
      alert("Error saving step.");
    } finally {
      setSavingRoadmapStep(false);
    }
  };

  const handleDeleteRoadmapStep = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking roadmap step?")) {
      try {
        const response = await deleteBookingRoadmapStep(id);
        if (response.data && response.data.success) {
          alert("Booking roadmap step deleted successfully!");
          fetchRoadmapStepsDetails();
        } else {
          alert("Failed to delete step.");
        }
      } catch (error) {
        console.error("Error deleting step:", error);
        alert("Server error occurred while deleting the step.");
      }
    }
  };

  // Service Detail handlers
  const handleServiceDetailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateServiceDetailSettings(serviceDetailForm);
      if (response.data && response.data.success) {
        alert("Service detail settings updated successfully!");
        fetchServiceDetailSettings();
      } else {
        alert("Failed to update Service detail settings.");
      }
    } catch (error) {
      console.error("Error saving service detail settings:", error);
      alert("Server error occurred while saving service detail settings.");
    }
  };

  const handleResetServiceDetailSettings = async () => {
    if (window.confirm("Are you sure you want to reset service detail settings to defaults?")) {
      const defaultSettings = {
        banner_title: "Service Details",
        main_heading: "Departure & Arrival Airports",
        main_description: "Looking For Flight Status Information For Flights In The USA, Here Are Some Helpful Links And Tips To Distinguish. In Thes Free Hour, When Our Power Of Choice Is Untraelled Data Structures Manages And Dislike Men Who Are Begued Demoralized By The Charms Of Pleasure We Focus On Optimi Zinyg Efficncy Managing Risk Deliveri When Our Power Of Choice Is Untraelled Datsolution Manages And Dislike Men.",
        list_heading: "Included Services",
        list_description: "Blinded By Desire, That They Cannot Foresee The Pain And Trouble That Are Bound To Ensue Cannot Fors These Hte Case Perfectly Simple And Easy To Distinguish. In A Free Hour, When Our Power Of Choice Is Untraelled Datad Structures Manages And Dislike Men Who Are So Begued & Demoralized By The Charms",
        image1: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600&auto=format&fit=crop",
        image2: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop",
        bottom_description: "Blinded By Desire, That They Cannot Foresee The Pain And Trouble That Are Bound To Ensue Cannot Fors These Hte Case Perfectly Simple And Easy To Distinguish. In A Free Hour, When Our Power Of Choice Is Untraelled Data Structures Manages And Dislike Men Who Are So Begued & Demoralized By The Charms",
        faq_heading: "FAQs: Your Questions Answered"
      };
      try {
        const response = await updateServiceDetailSettings(defaultSettings);
        if (response.data && response.data.success) {
          setServiceDetailForm(defaultSettings);
          alert("Service detail settings reset successfully!");
        } else {
          alert("Failed to reset settings.");
        }
      } catch (error) {
        console.error("Error resetting settings:", error);
        alert("Server error occurred while resetting settings.");
      }
    }
  };

  const handleChecklistSubmit = async (e) => {
    e.preventDefault();
    if (!currentChecklistItem.item_text.trim()) return;

    setSavingChecklistItem(true);
    try {
      if (currentChecklistItem.id) {
        const response = await updateServiceDetailChecklist(currentChecklistItem.id, {
          item_text: currentChecklistItem.item_text
        });
        if (response.data && response.data.success) {
          alert("Checklist item updated successfully!");
          setIsChecklistModalOpen(false);
          fetchServiceDetailChecklist();
        } else {
          alert("Failed to update checklist item.");
        }
      } else {
        const response = await addServiceDetailChecklist({
          item_text: currentChecklistItem.item_text
        });
        if (response.data && response.data.success) {
          alert("Checklist item added successfully!");
          setIsChecklistModalOpen(false);
          fetchServiceDetailChecklist();
        } else {
          alert("Failed to add checklist item.");
        }
      }
    } catch (error) {
      console.error("Error saving checklist item:", error);
      alert("Error saving checklist item.");
    } finally {
      setSavingChecklistItem(false);
    }
  };

  const handleDeleteChecklistItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this checklist item?")) {
      try {
        const response = await deleteServiceDetailChecklist(id);
        if (response.data && response.data.success) {
          alert("Checklist item deleted successfully!");
          fetchServiceDetailChecklist();
        } else {
          alert("Failed to delete checklist item.");
        }
      } catch (error) {
        console.error("Error deleting checklist item:", error);
        alert("Server error occurred while deleting the checklist item.");
      }
    }
  };

  const handleDetailFaqSubmit = async (e) => {
    e.preventDefault();
    if (!currentDetailFaqItem.question.trim() || !currentDetailFaqItem.answer.trim()) return;

    setSavingDetailFaqItem(true);
    try {
      if (currentDetailFaqItem.id) {
        const response = await updateServiceDetailFaq(currentDetailFaqItem.id, {
          question: currentDetailFaqItem.question,
          answer: currentDetailFaqItem.answer
        });
        if (response.data && response.data.success) {
          alert("FAQ item updated successfully!");
          setIsDetailFaqModalOpen(false);
          fetchServiceDetailFaqs();
        } else {
          alert("Failed to update FAQ item.");
        }
      } else {
        const response = await addServiceDetailFaq({
          question: currentDetailFaqItem.question,
          answer: currentDetailFaqItem.answer
        });
        if (response.data && response.data.success) {
          alert("FAQ item added successfully!");
          setIsDetailFaqModalOpen(false);
          fetchServiceDetailFaqs();
        } else {
          alert("Failed to add FAQ item.");
        }
      }
    } catch (error) {
      console.error("Error saving FAQ item:", error);
      alert("Error saving FAQ item.");
    } finally {
      setSavingDetailFaqItem(false);
    }
  };

  const handleDeleteDetailFaqItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ item?")) {
      try {
        const response = await deleteServiceDetailFaq(id);
        if (response.data && response.data.success) {
          alert("FAQ item deleted successfully!");
          fetchServiceDetailFaqs();
        } else {
          alert("Failed to delete FAQ item.");
        }
      } catch (error) {
        console.error("Error deleting FAQ item:", error);
        alert("Server error occurred while deleting the FAQ item.");
      }
    }
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <i className="fa-solid fa-plane-departure"></i>
          <span>Clicko Admin</span>
        </div>
        <nav className="admin-menu">
          <div className={`admin-menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <i className="fa-solid fa-chart-line"></i>
            <span>Dashboard</span>
          </div>
          <div className={`admin-menu-item ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
            <i className="fa-solid fa-circle-info"></i>
            <span>About Us</span>
          </div>
          <div className={`admin-menu-item ${activeTab === 'best-deal' ? 'active' : ''}`} onClick={() => setActiveTab('best-deal')}>
            <i className="fa-solid fa-tags"></i>
            <span>Best Deals</span>
          </div>
          <div className={`admin-menu-item ${activeTab === 'faq' ? 'active' : ''}`} onClick={() => setActiveTab('faq')}>
            <i className="fa-solid fa-circle-question"></i>
            <span>FAQ Settings</span>
          </div>
          <div className={`admin-menu-item ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>
            <i className="fa-solid fa-list-check"></i>
            <span>Services</span>
          </div>
          <div className={`admin-menu-item ${activeTab === 'roadmap' ? 'active' : ''}`} onClick={() => setActiveTab('roadmap')}>
            <i className="fa-solid fa-route"></i>
            <span>Booking Roadmap</span>
          </div>
          <div className={`admin-menu-item ${activeTab === 'service-detail' ? 'active' : ''}`} onClick={() => setActiveTab('service-detail')}>
            <i className="fa-solid fa-plane-arrival"></i>
            <span>Service Detail</span>
          </div>
          <div className={`admin-menu-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <i className="fa-solid fa-gears"></i>
            <span>Settings</span>
          </div>
        </nav>
        <div className="admin-logout">
          <div className="admin-menu-item" onClick={() => window.location.href = '/'}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Back to Site</span>
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-title">
            <h1>Admin Panel</h1>
            <p>Welcome back, Administrator</p>
          </div>
          <div className="admin-profile">
            <span>Admin Control</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div>
            <div className="admin-stats-grid">
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h3>Total Queries</h3>
                  <p>{queries.length}</p>
                </div>
                <div className="admin-stat-icon">
                  <i className="fa-solid fa-circle-question"></i>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h3>Support Email</h3>
                  <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>{companyInfo.email1}</p>
                </div>
                <div className="admin-stat-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
              </div>
              <div className="admin-stat-card">
                <div className="admin-stat-info">
                  <h3>Contact Helpline</h3>
                  <p style={{ fontSize: '1.1rem', marginTop: '0.5rem' }}>{companyInfo.phone1}</p>
                </div>
                <div className="admin-stat-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
              </div>
            </div>

            <div className="admin-panel-card">
              <div className="card-header">
                <h2>Contact Form Submissions</h2>
                <button className="btn-primary" onClick={fetchQueries} disabled={loading}>
                  <i className={`fa-solid fa-arrows-rotate ${loading ? 'fa-spin' : ''}`} style={{ marginRight: '0.5rem' }}></i> Refresh
                </button>
              </div>
              {loading ? (
                <p style={{ color: 'var(--admin-text-secondary)' }}>Loading queries...</p>
              ) : queries.length === 0 ? (
                <p style={{ color: 'var(--admin-text-secondary)' }}>No queries found. Messages sent from the Contact page will appear here.</p>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Customer Details</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queries.map((q) => (
                        <tr key={q.id}>
                          <td>
                            <strong>{q.name}</strong>
                            <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>{q.email}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>{q.phone}</div>
                          </td>
                          <td><strong>{q.subject}</strong></td>
                          <td style={{ maxWidth: '350px', whiteSpace: 'normal', fontSize: '0.9rem' }}>{q.message}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button className="btn-primary" onClick={() => { setSelectedQuery(q); setIsReplyModalOpen(true); }}>
                                Reply
                              </button>
                              <button className="btn-secondary" style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }} onClick={() => handleResolveQuery(q.id)}>
                                Resolve
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="admin-panel-card" style={{ maxWidth: '750px' }}>
            <div className="card-header">
              <h2>About Us Page Settings</h2>
            </div>
            <form onSubmit={handleAboutSubmit}>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Subtitle</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={aboutForm.subtitle} 
                    onChange={(e) => setAboutForm({ ...aboutForm, subtitle: e.target.value })} 
                    required 
                  />
                </div>
                <div className="admin-form-group">
                  <label>Heading</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={aboutForm.heading} 
                    onChange={(e) => setAboutForm({ ...aboutForm, heading: e.target.value })} 
                    required 
                  />
                </div>
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  className="admin-form-control" 
                  value={aboutForm.description} 
                  onChange={(e) => setAboutForm({ ...aboutForm, description: e.target.value })} 
                  required
                ></textarea>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Feature Title</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={aboutForm.feature_title} 
                    onChange={(e) => setAboutForm({ ...aboutForm, feature_title: e.target.value })} 
                    required 
                  />
                </div>
                <div className="admin-form-group">
                  <label>Feature Description</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={aboutForm.feature_desc} 
                    onChange={(e) => setAboutForm({ ...aboutForm, feature_desc: e.target.value })} 
                    required 
                  />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Checklist Item 1</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={aboutForm.checklist1} 
                    onChange={(e) => setAboutForm({ ...aboutForm, checklist1: e.target.value })} 
                    required 
                  />
                </div>
                <div className="admin-form-group">
                  <label>Checklist Item 2</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={aboutForm.checklist2} 
                    onChange={(e) => setAboutForm({ ...aboutForm, checklist2: e.target.value })} 
                    required 
                  />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Image 1 URL</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={aboutForm.image1} 
                    onChange={(e) => setAboutForm({ ...aboutForm, image1: e.target.value })} 
                  />
                </div>
                <div className="admin-form-group">
                  <label>Image 2 URL</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={aboutForm.image2} 
                    onChange={(e) => setAboutForm({ ...aboutForm, image2: e.target.value })} 
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary">Save Changes</button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }}
                  onClick={handleResetAboutInfo}
                >
                  Reset to Defaults
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'best-deal' && (
          <div className="admin-panel-card" style={{ maxWidth: '750px' }}>
            <div className="card-header">
              <h2>Best Deals Section Settings</h2>
            </div>
            <form onSubmit={handleBestDealSubmit}>
              <div className="admin-form-group">
                <label>Subtitle</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={bestDealForm.subtitle} 
                  onChange={(e) => setBestDealForm({ ...bestDealForm, subtitle: e.target.value })} 
                  required 
                />
              </div>
              <div className="admin-form-group">
                <label>Heading</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={bestDealForm.heading} 
                  onChange={(e) => setBestDealForm({ ...bestDealForm, heading: e.target.value })} 
                  required 
                />
              </div>

              <h4 style={{ margin: '1.5rem 0 0.5rem 0', color: 'var(--admin-text)' }}>Metrics (Odometer Counters)</h4>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Metric 1 Target Value (e.g. 35000)</label>
                  <input 
                    type="number" 
                    className="admin-form-control" 
                    value={bestDealForm.metric1_val} 
                    onChange={(e) => setBestDealForm({ ...bestDealForm, metric1_val: e.target.value })} 
                    required 
                  />
                </div>
                <div className="admin-form-group">
                  <label>Metric 1 Label</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={bestDealForm.metric1_lbl} 
                    onChange={(e) => setBestDealForm({ ...bestDealForm, metric1_lbl: e.target.value })} 
                    required 
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Metric 2 Target Value (e.g. 100)</label>
                  <input 
                    type="number" 
                    className="admin-form-control" 
                    value={bestDealForm.metric2_val} 
                    onChange={(e) => setBestDealForm({ ...bestDealForm, metric2_val: e.target.value })} 
                    required 
                  />
                </div>
                <div className="admin-form-group">
                  <label>Metric 2 Label</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={bestDealForm.metric2_lbl} 
                    onChange={(e) => setBestDealForm({ ...bestDealForm, metric2_lbl: e.target.value })} 
                    required 
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Video URL (YouTube Embed / MP4)</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={bestDealForm.video_url} 
                  onChange={(e) => setBestDealForm({ ...bestDealForm, video_url: e.target.value })} 
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                <button type="submit" className="btn-primary">Save Changes</button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }}
                  onClick={handleResetBestDealInfo}
                >
                  Reset to Defaults
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'faq' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="admin-panel-card" style={{ maxWidth: '750px' }}>
              <div className="card-header">
                <h2>FAQ Section Settings</h2>
              </div>
              <form onSubmit={handleFaqSubmit}>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Subtitle</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={faqForm.subtitle} 
                      onChange={(e) => setFaqForm({ ...faqForm, subtitle: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Heading</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={faqForm.heading} 
                      onChange={(e) => setFaqForm({ ...faqForm, heading: e.target.value })} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="admin-form-group">
                  <label>Description / Paragraph (Goal)</label>
                  <textarea 
                    rows="3" 
                    className="admin-form-control" 
                    value={faqForm.description} 
                    onChange={(e) => setFaqForm({ ...faqForm, description: e.target.value })} 
                    required
                  ></textarea>
                </div>

                <div className="admin-form-group">
                  <label>FAQ Image URL</label>
                  <input 
                    type="text" 
                    className="admin-form-control" 
                    value={faqForm.image} 
                    onChange={(e) => setFaqForm({ ...faqForm, image: e.target.value })} 
                    required
                  />
                  {faqForm.image && (
                    <div style={{ marginTop: '10px' }}>
                      <img 
                        src={faqForm.image} 
                        alt="FAQ Preview" 
                        style={{ maxWidth: '180px', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #ccc' }} 
                      />
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn-primary">Save Settings</button>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }}
                    onClick={handleResetFaqInfo}
                  >
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </div>

            <div className="admin-panel-card" style={{ maxWidth: '850px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>FAQ Accordion Questions</h2>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setCurrentAccItem({ id: null, question: '', answer: '' });
                    setIsAccModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-plus" style={{ marginRight: '0.5rem' }}></i> Add New FAQ
                </button>
              </div>

              {faqAccordionItems.length === 0 ? (
                <p style={{ color: 'var(--admin-text-secondary)' }}>No FAQ items found. Click "Add New FAQ" to create one.</p>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {faqAccordionItems.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td style={{ fontWeight: 'bold', maxWidth: '200px', whiteSpace: 'normal' }}>{item.question}</td>
                          <td style={{ maxWidth: '350px', whiteSpace: 'normal', fontSize: '0.9rem' }}>{item.answer}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button 
                                className="btn-primary" 
                                onClick={() => {
                                  setCurrentAccItem(item);
                                  setIsAccModalOpen(true);
                                }}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn-secondary" 
                                style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }} 
                                onClick={() => handleDeleteAccItem(item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="admin-panel-card" style={{ maxWidth: '600px' }}>
            <div className="card-header">
              <h2>Company Details Settings</h2>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Settings saved locally.'); }}>
              <div className="admin-form-group">
                <label>Company Website Title</label>
                <input type="text" className="admin-form-control" value={companyInfo.title} onChange={(e) => setCompanyInfo({ ...companyInfo, title: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Subtitle / Slogan</label>
                <input type="text" className="admin-form-control" value={companyInfo.subtitle} onChange={(e) => setCompanyInfo({ ...companyInfo, subtitle: e.target.value })} required />
              </div>
              <div className="admin-form-group">
                <label>Address</label>
                <textarea rows="2" className="admin-form-control" value={companyInfo.address} onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })} required></textarea>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Primary Phone</label>
                  <input type="text" className="admin-form-control" value={companyInfo.phone1} onChange={(e) => setCompanyInfo({ ...companyInfo, phone1: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label>Secondary Phone</label>
                  <input type="text" className="admin-form-control" value={companyInfo.phone2} onChange={(e) => setCompanyInfo({ ...companyInfo, phone2: e.target.value })} />
                </div>
              </div>
              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Support Email</label>
                  <input type="email" className="admin-form-control" value={companyInfo.email1} onChange={(e) => setCompanyInfo({ ...companyInfo, email1: e.target.value })} required />
                </div>
                <div className="admin-form-group">
                  <label>Info Email</label>
                  <input type="email" className="admin-form-control" value={companyInfo.email2} onChange={(e) => setCompanyInfo({ ...companyInfo, email2: e.target.value })} />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Save Changes</button>
            </form>
          </div>
        )}

        {activeTab === 'services' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="admin-panel-card" style={{ maxWidth: '750px' }}>
              <div className="card-header">
                <h2>Services Page Header Settings</h2>
              </div>
              <form onSubmit={handleServicesSettingsSubmit}>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Subtitle (e.g. Why Choose Us)</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={servicesForm.subtitle} 
                      onChange={(e) => setServicesForm({ ...servicesForm, subtitle: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Heading</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={servicesForm.heading} 
                      onChange={(e) => setServicesForm({ ...servicesForm, heading: e.target.value })} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="admin-form-group">
                  <label>Description / Paragraph</label>
                  <textarea 
                    rows="3" 
                    className="admin-form-control" 
                    value={servicesForm.description} 
                    onChange={(e) => setServicesForm({ ...servicesForm, description: e.target.value })} 
                    required
                  ></textarea>
                </div>

                <h3 style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1.5rem', color: 'var(--admin-text)' }}>Bottom Banner Settings</h3>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Bottom Subtitle</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={servicesForm.bottom_subtitle} 
                      onChange={(e) => setServicesForm({ ...servicesForm, bottom_subtitle: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Bottom Heading</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={servicesForm.bottom_heading} 
                      onChange={(e) => setServicesForm({ ...servicesForm, bottom_heading: e.target.value })} 
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn-primary">Save Settings</button>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }}
                    onClick={handleResetServicesSettings}
                  >
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </div>

            <div className="admin-panel-card" style={{ maxWidth: '850px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Services List</h2>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setCurrentServiceItem({ id: null, service_number: '', title: '', description: '' });
                    setIsServiceModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-plus" style={{ marginRight: '0.5rem' }}></i> Add New Service
                </button>
              </div>

              {servicesList.length === 0 ? (
                <p style={{ color: 'var(--admin-text-secondary)' }}>No service items found. Click "Add New Service" to create one.</p>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {servicesList.map((item) => (
                        <tr key={item.id}>
                          <td><strong>{item.service_number}</strong></td>
                          <td style={{ fontWeight: 'bold', maxWidth: '200px', whiteSpace: 'normal' }}>{item.title}</td>
                          <td style={{ maxWidth: '350px', whiteSpace: 'normal', fontSize: '0.9rem' }}>{item.description}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button 
                                className="btn-primary" 
                                onClick={() => {
                                  setCurrentServiceItem(item);
                                  setIsServiceModalOpen(true);
                                }}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn-secondary" 
                                style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }} 
                                onClick={() => handleDeleteServiceItem(item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="admin-panel-card" style={{ maxWidth: '750px' }}>
              <div className="card-header">
                <h2>Booking Roadmap Header Settings</h2>
              </div>
              <form onSubmit={handleRoadmapSettingsSubmit}>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Subtitle (e.g. Booking Roadmap)</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={roadmapForm.subtitle} 
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, subtitle: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Heading</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={roadmapForm.heading} 
                      onChange={(e) => setRoadmapForm({ ...roadmapForm, heading: e.target.value })} 
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn-primary">Save Settings</button>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }}
                    onClick={handleResetRoadmapSettings}
                  >
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </div>

            <div className="admin-panel-card" style={{ maxWidth: '850px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Booking Roadmap Steps</h2>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setCurrentRoadmapStep({ id: null, step_number: '', title: '', description: '' });
                    setIsRoadmapModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-plus" style={{ marginRight: '0.5rem' }}></i> Add New Step
                </button>
              </div>

              {roadmapSteps.length === 0 ? (
                <p style={{ color: 'var(--admin-text-secondary)' }}>No steps found. Click "Add New Step" to create one.</p>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Step No.</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roadmapSteps.map((item) => (
                        <tr key={item.id}>
                          <td><strong>{item.step_number}</strong></td>
                          <td style={{ fontWeight: 'bold', maxWidth: '200px', whiteSpace: 'normal' }}>{item.title}</td>
                          <td style={{ maxWidth: '350px', whiteSpace: 'normal', fontSize: '0.9rem' }}>{item.description}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button 
                                className="btn-primary" 
                                onClick={() => {
                                  setCurrentRoadmapStep(item);
                                  setIsRoadmapModalOpen(true);
                                }}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn-secondary" 
                                style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }} 
                                onClick={() => handleDeleteRoadmapStep(item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'service-detail' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* General settings */}
            <div className="admin-panel-card" style={{ maxWidth: '750px' }}>
              <div className="card-header">
                <h2>Service Detail Settings</h2>
              </div>
              <form onSubmit={handleServiceDetailSubmit}>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Banner Title</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={serviceDetailForm.banner_title} 
                      onChange={(e) => setServiceDetailForm({ ...serviceDetailForm, banner_title: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Main Heading</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={serviceDetailForm.main_heading} 
                      onChange={(e) => setServiceDetailForm({ ...serviceDetailForm, main_heading: e.target.value })} 
                      required 
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Main Description / Paragraph</label>
                  <textarea 
                    rows="3" 
                    className="admin-form-control" 
                    value={serviceDetailForm.main_description} 
                    onChange={(e) => setServiceDetailForm({ ...serviceDetailForm, main_description: e.target.value })} 
                    required
                  ></textarea>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>List Section Heading</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={serviceDetailForm.list_heading} 
                      onChange={(e) => setServiceDetailForm({ ...serviceDetailForm, list_heading: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>FAQ Accordion Heading</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={serviceDetailForm.faq_heading} 
                      onChange={(e) => setServiceDetailForm({ ...serviceDetailForm, faq_heading: e.target.value })} 
                      required 
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>List Section Description</label>
                  <textarea 
                    rows="3" 
                    className="admin-form-control" 
                    value={serviceDetailForm.list_description} 
                    onChange={(e) => setServiceDetailForm({ ...serviceDetailForm, list_description: e.target.value })} 
                    required
                  ></textarea>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Middle Image 1 URL</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={serviceDetailForm.image1} 
                      onChange={(e) => setServiceDetailForm({ ...serviceDetailForm, image1: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Middle Image 2 URL</label>
                    <input 
                      type="text" 
                      className="admin-form-control" 
                      value={serviceDetailForm.image2} 
                      onChange={(e) => setServiceDetailForm({ ...serviceDetailForm, image2: e.target.value })} 
                      required 
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Bottom Description (under images)</label>
                  <textarea 
                    rows="3" 
                    className="admin-form-control" 
                    value={serviceDetailForm.bottom_description} 
                    onChange={(e) => setServiceDetailForm({ ...serviceDetailForm, bottom_description: e.target.value })} 
                    required
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '1.5rem' }}>
                  <button type="submit" className="btn-primary">Save Settings</button>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }}
                    onClick={handleResetServiceDetailSettings}
                  >
                    Reset to Defaults
                  </button>
                </div>
              </form>
            </div>

            {/* Checklist Items Management */}
            <div className="admin-panel-card" style={{ maxWidth: '850px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Checklist Items</h2>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setCurrentChecklistItem({ id: null, item_text: '' });
                    setIsChecklistModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-plus" style={{ marginRight: '0.5rem' }}></i> Add New Item
                </button>
              </div>

              {serviceDetailChecklist.length === 0 ? (
                <p style={{ color: 'var(--admin-text-secondary)' }}>No checklist items found. Click "Add New Item" to create one.</p>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Item Text</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceDetailChecklist.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 'bold', whiteSpace: 'normal' }}>{item.item_text}</td>
                          <td style={{ width: '150px' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button 
                                className="btn-primary" 
                                onClick={() => {
                                  setCurrentChecklistItem(item);
                                  setIsChecklistModalOpen(true);
                                }}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn-secondary" 
                                style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }} 
                                onClick={() => handleDeleteChecklistItem(item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* FAQs Accordion Management */}
            <div className="admin-panel-card" style={{ maxWidth: '850px' }}>
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Service FAQ Accordion Items</h2>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setCurrentDetailFaqItem({ id: null, question: '', answer: '' });
                    setIsDetailFaqModalOpen(true);
                  }}
                >
                  <i className="fa-solid fa-plus" style={{ marginRight: '0.5rem' }}></i> Add New FAQ
                </button>
              </div>

              {serviceDetailFaqs.length === 0 ? (
                <p style={{ color: 'var(--admin-text-secondary)' }}>No FAQ items found. Click "Add New FAQ" to create one.</p>
              ) : (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {serviceDetailFaqs.map((item) => (
                        <tr key={item.id}>
                          <td style={{ fontWeight: 'bold', maxWidth: '250px', whiteSpace: 'normal' }}>{item.question}</td>
                          <td style={{ maxWidth: '350px', whiteSpace: 'normal', fontSize: '0.9rem' }}>{item.answer}</td>
                          <td style={{ width: '150px' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              <button 
                                className="btn-primary" 
                                onClick={() => {
                                  setCurrentDetailFaqItem(item);
                                  setIsDetailFaqModalOpen(true);
                                }}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn-secondary" 
                                style={{ border: '1px solid var(--admin-danger)', color: 'var(--admin-danger)' }} 
                                onClick={() => handleDeleteDetailFaqItem(item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {isReplyModalOpen && selectedQuery && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Send Email Reply</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--admin-text-secondary)', marginBottom: '1.5rem' }}>
              Replying to: <strong>{selectedQuery.name} ({selectedQuery.email})</strong>
            </p>
            <form onSubmit={handleSendReply}>
              <div className="admin-form-group">
                <label>Subject</label>
                <input type="text" className="admin-form-control" value={`Re: ${selectedQuery.subject}`} disabled />
              </div>
              <div className="admin-form-group">
                <label>Message Content</label>
                <textarea 
                  rows="5" 
                  className="admin-form-control" 
                  placeholder="Type your reply here..." 
                  value={replyText} 
                  onChange={(e) => setReplyText(e.target.value)} 
                  required
                ></textarea>
              </div>
              <div className="admin-modal-buttons">
                <button type="button" className="btn-secondary" onClick={() => { setIsReplyModalOpen(false); setReplyText(""); }} disabled={sendingReply}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={sendingReply}>
                  {sendingReply ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isAccModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{currentAccItem.id ? 'Edit FAQ Item' : 'Add New FAQ Item'}</h3>
            <form onSubmit={handleAccSubmit}>
              <div className="admin-form-group">
                <label>Question</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={currentAccItem.question} 
                  onChange={(e) => setCurrentAccItem({ ...currentAccItem, question: e.target.value })} 
                  placeholder="Enter FAQ Question..."
                  required 
                />
              </div>
              <div className="admin-form-group">
                <label>Answer</label>
                <textarea 
                  rows="4" 
                  className="admin-form-control" 
                  value={currentAccItem.answer} 
                  onChange={(e) => setCurrentAccItem({ ...currentAccItem, answer: e.target.value })} 
                  placeholder="Enter FAQ Answer..."
                  required
                ></textarea>
              </div>
              <div className="admin-modal-buttons">
                <button type="button" className="btn-secondary" onClick={() => setIsAccModalOpen(false)} disabled={savingAccItem}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={savingAccItem}>
                  {savingAccItem ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isServiceModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{currentServiceItem.id ? 'Edit Service Item' : 'Add New Service Item'}</h3>
            <form onSubmit={handleServiceItemSubmit}>
              <div className="admin-form-group">
                <label>Service Number (e.g. 01, 02)</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={currentServiceItem.service_number} 
                  onChange={(e) => setCurrentServiceItem({ ...currentServiceItem, service_number: e.target.value })} 
                  placeholder="Enter Service Number..."
                  required 
                />
              </div>
              <div className="admin-form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={currentServiceItem.title} 
                  onChange={(e) => setCurrentServiceItem({ ...currentServiceItem, title: e.target.value })} 
                  placeholder="Enter Service Title..."
                  required 
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea 
                  rows="4" 
                  className="admin-form-control" 
                  value={currentServiceItem.description} 
                  onChange={(e) => setCurrentServiceItem({ ...currentServiceItem, description: e.target.value })} 
                  placeholder="Enter Service Description..."
                  required
                ></textarea>
              </div>
              <div className="admin-modal-buttons">
                <button type="button" className="btn-secondary" onClick={() => setIsServiceModalOpen(false)} disabled={savingServiceItem}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={savingServiceItem}>
                  {savingServiceItem ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isRoadmapModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{currentRoadmapStep.id ? 'Edit Roadmap Step' : 'Add New Roadmap Step'}</h3>
            <form onSubmit={handleRoadmapStepSubmit}>
              <div className="admin-form-group">
                <label>Step Number (e.g. 01, 02)</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={currentRoadmapStep.step_number} 
                  onChange={(e) => setCurrentRoadmapStep({ ...currentRoadmapStep, step_number: e.target.value })} 
                  placeholder="Enter Step Number..."
                  required 
                />
              </div>
              <div className="admin-form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={currentRoadmapStep.title} 
                  onChange={(e) => setCurrentRoadmapStep({ ...currentRoadmapStep, title: e.target.value })} 
                  placeholder="Enter Step Title..."
                  required 
                />
              </div>
              <div className="admin-form-group">
                <label>Description</label>
                <textarea 
                  rows="4" 
                  className="admin-form-control" 
                  value={currentRoadmapStep.description} 
                  onChange={(e) => setCurrentRoadmapStep({ ...currentRoadmapStep, description: e.target.value })} 
                  placeholder="Enter Step Description..."
                  required
                ></textarea>
              </div>
              <div className="admin-modal-buttons">
                <button type="button" className="btn-secondary" onClick={() => setIsRoadmapModalOpen(false)} disabled={savingRoadmapStep}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={savingRoadmapStep}>
                  {savingRoadmapStep ? 'Saving...' : 'Save Step'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isChecklistModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{currentChecklistItem.id ? 'Edit Checklist Item' : 'Add New Checklist Item'}</h3>
            <form onSubmit={handleChecklistSubmit}>
              <div className="admin-form-group">
                <label>Item Text</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={currentChecklistItem.item_text} 
                  onChange={(e) => setCurrentChecklistItem({ ...currentChecklistItem, item_text: e.target.value })} 
                  placeholder="Enter Checklist Item Text..."
                  required 
                />
              </div>
              <div className="admin-modal-buttons">
                <button type="button" className="btn-secondary" onClick={() => setIsChecklistModalOpen(false)} disabled={savingChecklistItem}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={savingChecklistItem}>
                  {savingChecklistItem ? 'Saving...' : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDetailFaqModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>{currentDetailFaqItem.id ? 'Edit FAQ Item' : 'Add New FAQ Item'}</h3>
            <form onSubmit={handleDetailFaqSubmit}>
              <div className="admin-form-group">
                <label>Question</label>
                <input 
                  type="text" 
                  className="admin-form-control" 
                  value={currentDetailFaqItem.question} 
                  onChange={(e) => setCurrentDetailFaqItem({ ...currentDetailFaqItem, question: e.target.value })} 
                  placeholder="Enter FAQ Question..."
                  required 
                />
              </div>
              <div className="admin-form-group">
                <label>Answer</label>
                <textarea 
                  rows="4" 
                  className="admin-form-control" 
                  value={currentDetailFaqItem.answer} 
                  onChange={(e) => setCurrentDetailFaqItem({ ...currentDetailFaqItem, answer: e.target.value })} 
                  placeholder="Enter FAQ Answer..."
                  required
                ></textarea>
              </div>
              <div className="admin-modal-buttons">
                <button type="button" className="btn-secondary" onClick={() => setIsDetailFaqModalOpen(false)} disabled={savingDetailFaqItem}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={savingDetailFaqItem}>
                  {savingDetailFaqItem ? 'Saving...' : 'Save FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
