import React, { useState, useEffect } from 'react';
import { getContacts, deleteContact, getCompanyInfo, replyContact, getAboutInfo, updateAboutInfo, getBestDeal, updateBestDeal } from '../api/authApi';
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

  useEffect(() => {
    fetchQueries();
    fetchCompanyDetails();
    fetchAboutDetails();
    fetchBestDealDetails();
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
    </div>
  );
};

export default AdminPanel;
