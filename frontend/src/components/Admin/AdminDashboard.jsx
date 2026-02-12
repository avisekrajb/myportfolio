import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  Mail, Eye, EyeOff, Trash2, Archive, CheckCircle, Clock, 
  Search, ChevronLeft, ChevronRight, LogOut, User, Calendar, 
  Filter, X, Plus, Edit, Save, FolderKanban, Code, BookOpen,
  Briefcase, Award, Globe, Layout, Server, Database, Terminal,
  Smartphone, Cloud, Shield, Zap, Settings, Upload
} from 'lucide-react';


// Add this at the top of AdminDashboard.jsx, before the component
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const AdminDashboard = ({ onLogout, adminData, dark }) => {
  // State Management
  const [activeTab, setActiveTab] = useState('contacts');
  const [contacts, setContacts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [learning, setLearning] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  
  // UI States
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingLearning, setEditingLearning] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  
  // Form States
  const [projectForm, setProjectForm] = useState({
    ti: '', desc: '', tags: [], c: '#7c6fff', grad: 'linear-gradient(135deg,#667eea,#764ba2)',
    stars: 0, img: '', live: false, category: 'fullstack'
  });
  const [skillForm, setSkillForm] = useState({
    name: '', pct: 50, color: '#61dafb', icon: 'Code'
  });
  const [learningForm, setLearningForm] = useState({
    name: '', category: 'learning', progress: 0
  });
  const [tagInput, setTagInput] = useState('');

  // Icons mapping
  const iconMap = {
    Layout, Code, Terminal, Server, Database, GitBranch: require('lucide-react').GitBranch,
    Smartphone, Cloud, Shield, Zap, Award, Globe, Briefcase, BookOpen, FolderKanban
  };

  // ============ DATA FETCHING ============
  useEffect(() => {
    fetchContacts();
    fetchProjects();
    fetchSkills();
    fetchLearning();
    fetchStats();
  }, [currentPage, search, statusFilter]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/contact', {
        params: { page: currentPage, limit: 10, search, status: statusFilter || undefined },
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setContacts(res.data.data);
        setTotalPages(res.data.pagination.pages);
      }
    } catch (error) {
      toast.error('Failed to fetch contacts');
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setProjects(res.data.data);
    } catch (error) {
      console.error('Failed to fetch projects');
      // Fallback to localStorage for demo
      const saved = localStorage.getItem('admin_projects');
      if (saved) setProjects(JSON.parse(saved));
    }
  };

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/skills', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setSkills(res.data.data);
    } catch (error) {
      // Fallback to localStorage for demo
      const saved = localStorage.getItem('admin_skills');
      if (saved) setSkills(JSON.parse(saved));
      else {
        const defaultSkills = [
          { name: "React.js / Next.js", pct: 88, color: "#61dafb", icon: "Layout" },
          { name: "JavaScript / TypeScript", pct: 85, color: "#f9ca24", icon: "Code" },
          { name: "Python", pct: 82, color: "#4584b6", icon: "Terminal" },
          { name: "Node.js / Express", pct: 76, color: "#68a063", icon: "Server" },
          { name: "SQL / MongoDB", pct: 73, color: "#ff6b9d", icon: "Database" },
          { name: "Git / Linux / DevOps", pct: 78, color: "#f05133", icon: "GitBranch" }
        ];
        setSkills(defaultSkills);
        localStorage.setItem('admin_skills', JSON.stringify(defaultSkills));
      }
    }
  };

  const fetchLearning = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/learning', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setLearning(res.data.data);
    } catch (error) {
      // Fallback to localStorage for demo
      const saved = localStorage.getItem('admin_learning');
      if (saved) setLearning(JSON.parse(saved));
      else {
        const defaultLearning = [
          { name: "React Native", category: "learning", progress: 65 },
          { name: "GraphQL", category: "learning", progress: 40 },
          { name: "Microservices", category: "learning", progress: 30 },
          { name: "Web3", category: "learning", progress: 25 },
          { name: "Machine Learning", category: "learning", progress: 20 }
        ];
        setLearning(defaultLearning);
        localStorage.setItem('admin_learning', JSON.stringify(defaultLearning));
      }
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('/api/contact/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) setStats(res.data.data);
    } catch (error) {
      toast.error('Failed to fetch stats');
    }
  };

  // ============ CONTACT MANAGEMENT ============
  const updateContactStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`/api/contact/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Status updated');
      fetchContacts();
      fetchStats();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Contact deleted');
      fetchContacts();
      fetchStats();
      setSelectedContact(null);
    } catch (error) {
      toast.error('Failed to delete contact');
    }
  };

  // ============ PROJECT MANAGEMENT ============
  const saveProject = async () => {
    if (!projectForm.ti || !projectForm.desc) {
      toast.error('Title and description required');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const projectData = {
        ...projectForm,
        tags: projectForm.tags.length ? projectForm.tags : ['React', 'Node.js'],
        stars: projectForm.stars || Math.floor(Math.random() * 200) + 50,
        img: projectForm.img || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80'
      };

      if (editingProject) {
        // Update existing
        const res = await axios.put(`/api/projects/${editingProject._id}`, projectData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          toast.success('Project updated');
          setProjects(projects.map(p => p._id === editingProject._id ? res.data.data : p));
        }
      } else {
        // Create new
        const res = await axios.post('/api/projects', projectData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          toast.success('Project created');
          setProjects([...projects, res.data.data]);
        }
      }
      
      // Fallback to localStorage if API fails
      if (!token) {
        const updatedProjects = editingProject 
          ? projects.map(p => p._id === editingProject._id ? { ...projectForm, _id: editingProject._id } : p)
          : [...projects, { ...projectForm, _id: Date.now().toString() }];
        setProjects(updatedProjects);
        localStorage.setItem('admin_projects', JSON.stringify(updatedProjects));
        toast.success(editingProject ? 'Project updated (local)' : 'Project created (local)');
      }

      setShowAddModal(false);
      setEditingProject(null);
      resetProjectForm();
    } catch (error) {
      toast.error('Failed to save project');
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Project deleted');
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      // Fallback to localStorage
      const updated = projects.filter(p => p._id !== id);
      setProjects(updated);
      localStorage.setItem('admin_projects', JSON.stringify(updated));
      toast.success('Project deleted (local)');
    }
  };

  // ============ SKILLS MANAGEMENT ============
  const saveSkill = async () => {
    if (!skillForm.name) {
      toast.error('Skill name required');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (editingSkill) {
        const res = await axios.put(`/api/skills/${editingSkill._id}`, skillForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          toast.success('Skill updated');
          setSkills(skills.map(s => s._id === editingSkill._id ? res.data.data : s));
        }
      } else {
        const res = await axios.post('/api/skills', skillForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          toast.success('Skill added');
          setSkills([...skills, res.data.data]);
        }
      }

      // Fallback to localStorage
      if (!token) {
        const updatedSkills = editingSkill
          ? skills.map(s => s._id === editingSkill._id ? { ...skillForm, _id: editingSkill._id } : s)
          : [...skills, { ...skillForm, _id: Date.now().toString() }];
        setSkills(updatedSkills);
        localStorage.setItem('admin_skills', JSON.stringify(updatedSkills));
        toast.success(editingSkill ? 'Skill updated (local)' : 'Skill added (local)');
      }

      setEditingSkill(null);
      setSkillForm({ name: '', pct: 50, color: '#61dafb', icon: 'Code' });
    } catch (error) {
      toast.error('Failed to save skill');
    }
  };

  const deleteSkill = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/skills/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Skill deleted');
      setSkills(skills.filter(s => s._id !== id));
    } catch (error) {
      const updated = skills.filter(s => s._id !== id);
      setSkills(updated);
      localStorage.setItem('admin_skills', JSON.stringify(updated));
      toast.success('Skill deleted (local)');
    }
  };

  // ============ LEARNING MANAGEMENT ============
  const saveLearning = async () => {
    if (!learningForm.name) {
      toast.error('Topic name required');
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      if (editingLearning) {
        const res = await axios.put(`/api/learning/${editingLearning._id}`, learningForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          toast.success('Learning topic updated');
          setLearning(learning.map(l => l._id === editingLearning._id ? res.data.data : l));
        }
      } else {
        const res = await axios.post('/api/learning', learningForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          toast.success('Learning topic added');
          setLearning([...learning, res.data.data]);
        }
      }

      // Fallback to localStorage
      if (!token) {
        const updatedLearning = editingLearning
          ? learning.map(l => l._id === editingLearning._id ? { ...learningForm, _id: editingLearning._id } : l)
          : [...learning, { ...learningForm, _id: Date.now().toString() }];
        setLearning(updatedLearning);
        localStorage.setItem('admin_learning', JSON.stringify(updatedLearning));
        toast.success(editingLearning ? 'Topic updated (local)' : 'Topic added (local)');
      }

      setEditingLearning(null);
      setLearningForm({ name: '', category: 'learning', progress: 0 });
    } catch (error) {
      toast.error('Failed to save learning topic');
    }
  };

  const deleteLearning = async (id) => {
    if (!window.confirm('Delete this learning topic?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/learning/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Topic deleted');
      setLearning(learning.filter(l => l._id !== id));
    } catch (error) {
      const updated = learning.filter(l => l._id !== id);
      setLearning(updated);
      localStorage.setItem('admin_learning', JSON.stringify(updated));
      toast.success('Topic deleted (local)');
    }
  };

  // ============ UTILITIES ============
  const resetProjectForm = () => {
    setProjectForm({
      ti: '', desc: '', tags: [], c: '#7c6fff', 
      grad: 'linear-gradient(135deg,#667eea,#764ba2)',
      stars: 0, img: '', live: false, category: 'fullstack'
    });
    setTagInput('');
  };

  const addTag = () => {
    if (tagInput.trim() && !projectForm.tags.includes(tagInput.trim())) {
      setProjectForm({ ...projectForm, tags: [...projectForm.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setProjectForm({ ...projectForm, tags: projectForm.tags.filter(t => t !== tag) });
  };

  // ============ STYLES ============
  const statusColors = {
    new: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    read: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    replied: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
  };

  const statusIcons = { new: Clock, read: Eye, replied: CheckCircle, archived: Archive };

  const categoryOptions = [
    { value: 'fullstack', label: 'Full Stack', color: '#7c6fff' },
    { value: 'frontend', label: 'Frontend', color: '#61dafb' },
    { value: 'mobile', label: 'Mobile', color: '#ff6b9d' },
    { value: 'tools', label: 'Tools', color: '#00d4aa' },
    { value: 'ai', label: 'AI/ML', color: '#ffb547' }
  ];

  const iconOptions = ['Layout', 'Code', 'Terminal', 'Server', 'Database', 'GitBranch', 'Smartphone', 'Cloud', 'Shield', 'Zap', 'Award', 'Globe', 'Briefcase', 'BookOpen'];

  // ============ RENDER ============
  return (
    <div style={{
      minHeight: '100vh',
      background: dark ? '#070714' : '#f4f4fb',
      color: dark ? '#e8e8ff' : '#0f0f2d',
      transition: 'all 0.4s'
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: dark ? 'rgba(7,7,20,0.9)' : 'rgba(244,244,251,0.9)',
        backdropFilter: 'blur(24px) saturate(2)',
        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        padding: '16px 5%'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}>
          {/* Top Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(124,111,255,0.3)'
              }}>
                <Shield size={24} color="#fff" />
              </div>
              <div>
                <h1 style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
                  color: dark ? '#e8e8ff' : '#0f0f2d',
                  marginBottom: 4
                }}>Admin Dashboard</h1>
                <p style={{ color: dark ? '#6868a0' : '#7070a0', fontSize: '.85rem' }}>
                  {adminData?.email} · {adminData?.role || 'Administrator'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={onLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px',
                  background: 'linear-gradient(135deg,#ff6b9d,#ff4757)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(255,107,157,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <LogOut size={16} />
                <span className="logout-text" style={{ display: 'inline' }}>Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{
            display: 'flex',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4,
            scrollbarWidth: 'none'
          }}>
            {[
              { id: 'contacts', label: '📬 Contacts', icon: Mail },
              { id: 'projects', label: '🚀 Projects', icon: FolderKanban },
              { id: 'skills', label: '⚡ Skills', icon: Code },
              { id: 'learning', label: '📚 Learning', icon: BookOpen }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 20px',
                    borderRadius: '50px',
                    border: 'none',
                    background: isActive 
                      ? 'linear-gradient(135deg,#7c6fff,#ff6b9d)'
                      : 'transparent',
                    color: isActive ? '#fff' : (dark ? '#6868a0' : '#7070a0'),
                    fontSize: '.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all .3s',
                    whiteSpace: 'nowrap',
                    border: !isActive ? `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` : 'none'
                  }}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '32px 5%' }}>
        {/* ============ CONTACTS TAB ============ */}
        {activeTab === 'contacts' && (
          <div>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 20,
              marginBottom: 30
            }}>
              {[
                { label: 'Total Messages', value: stats.total || 0, icon: Mail, color: '#7c6fff' },
                { label: 'New Today', value: stats.today || 0, icon: Calendar, color: '#00d4aa' },
                { label: 'Unread', value: stats.stats?.find(s => s._id === 'new')?.count || 0, icon: EyeOff, color: '#ffb547' },
                { label: 'Replied', value: stats.stats?.find(s => s._id === 'replied')?.count || 0, icon: CheckCircle, color: '#ff6b9d' }
              ].map((stat, i) => (
                <div key={i} style={{
                  background: dark ? '#1a1a38' : '#ffffff',
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 20,
                  padding: 20,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all .3s'
                }}>
                  <div>
                    <p style={{ color: dark ? '#6868a0' : '#7070a0', fontSize: '.8rem', marginBottom: 8 }}>{stat.label}</p>
                    <p style={{ fontSize: '2rem', fontWeight: 900, color: stat.color }}>{stat.value}</p>
                  </div>
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 16,
                    background: `${stat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <stat.icon size={24} color={stat.color} />
                  </div>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div style={{
              background: dark ? '#1a1a38' : '#ffffff',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 20,
              padding: 20,
              marginBottom: 24
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 16,
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 16,
                  alignItems: 'center',
                  flex: 1
                }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
                    <Search size={18} style={{
                      position: 'absolute',
                      left: 14,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: dark ? '#6868a0' : '#7070a0'
                    }} />
                    <input
                      type="text"
                      placeholder="Search messages..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 44px',
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 12,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        fontSize: '.9rem',
                        fontFamily: "'Outfit', sans-serif",
                        outline: 'none'
                      }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Filter size={18} color={dark ? '#6868a0' : '#7070a0'} />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      style={{
                        padding: '12px 16px',
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 12,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        fontSize: '.9rem',
                        fontFamily: "'Outfit', sans-serif",
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">All Status</option>
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => { fetchContacts(); fetchStats(); }}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '50px',
                    fontSize: '.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all .3s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M23 4v6h-6M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                  Refresh
                </button>
              </div>
            </div>

            {/* Contacts Table - Responsive */}
            <div style={{
              background: dark ? '#1a1a38' : '#ffffff',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 20,
              overflow: 'hidden'
            }}>
              {/* Desktop Table View */}
              <div className="contacts-table-desktop" style={{ display: 'block' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{
                        background: dark ? 'rgba(124,111,255,0.1)' : 'rgba(124,111,255,0.05)',
                        borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`
                      }}>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '.8rem', fontWeight: 800, color: dark ? '#e8e8ff' : '#0f0f2d', letterSpacing: '.06em' }}>SENDER</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '.8rem', fontWeight: 800, color: dark ? '#e8e8ff' : '#0f0f2d', letterSpacing: '.06em' }}>SUBJECT</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '.8rem', fontWeight: 800, color: dark ? '#e8e8ff' : '#0f0f2d', letterSpacing: '.06em' }}>STATUS</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '.8rem', fontWeight: 800, color: dark ? '#e8e8ff' : '#0f0f2d', letterSpacing: '.06em' }}>DATE</th>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '.8rem', fontWeight: 800, color: dark ? '#e8e8ff' : '#0f0f2d', letterSpacing: '.06em' }}>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map(contact => {
                        const StatusIcon = statusIcons[contact.status] || Clock;
                        return (
                          <tr key={contact._id} style={{
                            borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                            transition: 'background .3s'
                          }}
                            onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(124,111,255,0.05)' : 'rgba(124,111,255,0.02)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                          >
                            <td style={{ padding: '16px 20px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 12,
                                  background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#fff',
                                  fontWeight: 800
                                }}>{contact.name?.charAt(0) || '?'}</div>
                                <div>
                                  <div style={{ fontWeight: 700, color: dark ? '#e8e8ff' : '#0f0f2d', marginBottom: 4 }}>{contact.name}</div>
                                  <div style={{ fontSize: '.75rem', color: dark ? '#6868a0' : '#7070a0' }}>{contact.email}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '16px 20px', color: dark ? '#e8e8ff' : '#0f0f2d', maxWidth: 250 }}>
                              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{contact.subject}</div>
                            </td>
                            <td style={{ padding: '16px 20px' }}>
                              <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '6px 12px',
                                borderRadius: 50,
                                fontSize: '.7rem',
                                fontWeight: 800,
                                background: statusColors[contact.status]?.split(' ')[0] || 'bg-gray-100',
                                color: statusColors[contact.status]?.split(' ')[2] || '#666'
                              }}>
                                <StatusIcon size={12} />
                                {contact.status?.charAt(0).toUpperCase() + contact.status?.slice(1)}
                              </span>
                            </td>
                            <td style={{ padding: '16px 20px', color: dark ? '#6868a0' : '#7070a0', fontSize: '.8rem' }}>
                              {new Date(contact.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                            <td style={{ padding: '16px 20px' }}>
                              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                <button
                                  onClick={() => setSelectedContact(contact)}
                                  style={{
                                    padding: '8px 16px',
                                    background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 8,
                                    fontSize: '.75rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    transition: 'all .3s'
                                  }}
                                >View</button>
                                <select
                                  value={contact.status}
                                  onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                                  style={{
                                    padding: '8px',
                                    background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                                    border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                                    borderRadius: 8,
                                    color: dark ? '#e8e8ff' : '#0f0f2d',
                                    fontSize: '.75rem',
                                    cursor: 'pointer',
                                    outline: 'none'
                                  }}
                                >
                                  <option value="new">New</option>
                                  <option value="read">Read</option>
                                  <option value="replied">Replied</option>
                                  <option value="archived">Archived</option>
                                </select>
                                <button
                                  onClick={() => deleteContact(contact._id)}
                                  style={{
                                    padding: '8px',
                                    background: 'rgba(255,107,157,0.1)',
                                    border: `1px solid rgba(255,107,157,0.3)`,
                                    borderRadius: 8,
                                    color: '#ff6b9d',
                                    cursor: 'pointer',
                                    transition: 'all .3s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="contacts-table-mobile" style={{ display: 'none', padding: 16 }}>
                {contacts.map(contact => {
                  const StatusIcon = statusIcons[contact.status] || Clock;
                  return (
                    <div key={contact._id} style={{
                      background: dark ? 'rgba(124,111,255,0.05)' : 'rgba(124,111,255,0.02)',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 16,
                      padding: 16,
                      marginBottom: 12
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <div style={{
                          width: 48,
                          height: 48,
                          borderRadius: 12,
                          background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '1.2rem'
                        }}>{contact.name?.charAt(0) || '?'}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, color: dark ? '#e8e8ff' : '#0f0f2d', marginBottom: 4 }}>{contact.name}</div>
                          <div style={{ fontSize: '.75rem', color: dark ? '#6868a0' : '#7070a0' }}>{contact.email}</div>
                        </div>
                      </div>
                      <div style={{ marginBottom: 12 }}>
                        <div style={{ fontWeight: 700, color: dark ? '#e8e8ff' : '#0f0f2d', marginBottom: 4 }}>{contact.subject}</div>
                        <div style={{ fontSize: '.75rem', color: dark ? '#6868a0' : '#7070a0' }}>{new Date(contact.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 12px',
                          borderRadius: 50,
                          fontSize: '.7rem',
                          fontWeight: 800,
                          background: statusColors[contact.status]?.split(' ')[0] || 'bg-gray-100',
                          color: statusColors[contact.status]?.split(' ')[2] || '#666'
                        }}>
                          <StatusIcon size={12} />
                          {contact.status?.charAt(0).toUpperCase() + contact.status?.slice(1)}
                        </span>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button onClick={() => setSelectedContact(contact)} style={{
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: '.75rem',
                            fontWeight: 700
                          }}>View</button>
                          <button onClick={() => deleteContact(contact._id)} style={{
                            padding: '8px',
                            background: 'rgba(255,107,157,0.1)',
                            border: '1px solid rgba(255,107,157,0.3)',
                            borderRadius: 8,
                            color: '#ff6b9d'
                          }}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  padding: '20px',
                  borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16
                }}>
                  <div style={{ color: dark ? '#6868a0' : '#7070a0', fontSize: '.85rem' }}>
                    Page {currentPage} of {totalPages}
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      style={{
                        padding: '8px 16px',
                        background: 'transparent',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 8,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                        opacity: currentPage === 1 ? 0.5 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <ChevronLeft size={16} />
                      <span style={{ display: 'inline' }}>Prev</span>
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      style={{
                        padding: '8px 16px',
                        background: 'transparent',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 8,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                        opacity: currentPage === totalPages ? 0.5 : 1,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                      }}
                    >
                      <span style={{ display: 'inline' }}>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============ PROJECTS TAB ============ */}
        {activeTab === 'projects' && (
          <div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
              gap: 16
            }}>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: '1.8rem',
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Projects Management</h2>
              
              <button
                onClick={() => {
                  resetProjectForm();
                  setEditingProject(null);
                  setShowAddModal(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .3s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(124,111,255,0.4)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Plus size={18} />
                Add New Project
              </button>
            </div>

            {/* Projects Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: 24
            }}>
              {projects.map((project, idx) => (
                <div key={project._id || idx} style={{
                  background: dark ? '#1a1a38' : '#ffffff',
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 20,
                  overflow: 'hidden',
                  transition: 'all .3s'
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
                    e.currentTarget.style.boxShadow = `0 24px 48px ${dark ? 'rgba(0,0,0,0.5)' : 'rgba(100,100,200,0.15)'}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ position: 'relative', height: 180 }}>
                    <img 
                      src={project.img || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80'} 
                      alt={project.ti}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {project.live && (
                      <span style={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        padding: '6px 14px',
                        background: 'rgba(0,212,170,0.9)',
                        color: '#fff',
                        borderRadius: 50,
                        fontSize: '.7rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff' }} />
                        LIVE
                      </span>
                    )}
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                      <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: dark ? '#e8e8ff' : '#0f0f2d' }}>{project.ti}</h3>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#ffb547' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffb547">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                        </svg>
                        {project.stars}
                      </span>
                    </div>
                    <p style={{ color: dark ? '#6868a0' : '#7070a0', fontSize: '.85rem', marginBottom: 16, lineHeight: 1.6 }}>
                      {project.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                      {project.tags?.slice(0, 3).map(tag => (
                        <span key={tag} style={{
                          padding: '4px 10px',
                          background: `${project.c || '#7c6fff'}15`,
                          color: project.c || '#7c6fff',
                          border: `1px solid ${project.c || '#7c6fff'}30`,
                          borderRadius: 16,
                          fontSize: '.65rem',
                          fontWeight: 700
                        }}>{tag}</span>
                      ))}
                      {project.tags?.length > 3 && (
                        <span style={{ color: dark ? '#6868a0' : '#7070a0', fontSize: '.65rem' }}>+{project.tags.length - 3}</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <button
                        onClick={() => {
                          setProjectForm(project);
                          setEditingProject(project);
                          setShowAddModal(true);
                        }}
                        style={{
                          flex: 1,
                          padding: '10px',
                          background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 12,
                          fontSize: '.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6
                        }}
                      >
                        <Edit size={14} /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setPreviewData(project);
                          setShowPreview(true);
                        }}
                        style={{
                          padding: '10px',
                          background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                          borderRadius: 12,
                          color: dark ? '#e8e8ff' : '#0f0f2d',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => deleteProject(project._id)}
                        style={{
                          padding: '10px',
                          background: 'rgba(255,107,157,0.1)',
                          border: '1px solid rgba(255,107,157,0.3)',
                          borderRadius: 12,
                          color: '#ff6b9d',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============ SKILLS TAB ============ */}
        {activeTab === 'skills' && (
          <div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
              gap: 16
            }}>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: '1.8rem',
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Skills Management</h2>
              
              <button
                onClick={() => {
                  setSkillForm({ name: '', pct: 50, color: '#61dafb', icon: 'Code' });
                  setEditingSkill(null);
                  setShowAddModal(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .3s'
                }}
              >
                <Plus size={18} />
                Add New Skill
              </button>
            </div>

            {/* Skills List */}
            <div style={{
              background: dark ? '#1a1a38' : '#ffffff',
              border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: 20,
              padding: 24
            }}>
              {skills.map((skill, idx) => {
                const IconComponent = iconMap[skill.icon] || Code;
                return (
                  <div key={skill._id || idx} style={{ marginBottom: idx === skills.length - 1 ? 0 : 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{
                          width: 40,
                          height: 40,
                          borderRadius: 10,
                          background: `${skill.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <IconComponent size={20} color={skill.color} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: dark ? '#e8e8ff' : '#0f0f2d', marginBottom: 4 }}>{skill.name}</div>
                          <div style={{ fontSize: '.75rem', color: dark ? '#6868a0' : '#7070a0' }}>
                            {skill.pct}% Proficiency
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          onClick={() => {
                            setSkillForm(skill);
                            setEditingSkill(skill);
                            setShowAddModal(true);
                          }}
                          style={{
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 8,
                            fontSize: '.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSkill(skill._id)}
                          style={{
                            padding: '8px',
                            background: 'rgba(255,107,157,0.1)',
                            border: '1px solid rgba(255,107,157,0.3)',
                            borderRadius: 8,
                            color: '#ff6b9d',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div style={{
                      height: 8,
                      background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                      borderRadius: 10,
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${skill.pct}%`,
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                        borderRadius: 10,
                        transition: 'width 0.3s'
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============ LEARNING TAB ============ */}
        {activeTab === 'learning' && (
          <div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 24,
              gap: 16
            }}>
              <h2 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: '1.8rem',
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Learning Journey</h2>
              
              <button
                onClick={() => {
                  setLearningForm({ name: '', category: 'learning', progress: 0 });
                  setEditingLearning(null);
                  setShowAddModal(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  fontSize: '.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all .3s'
                }}
              >
                <Plus size={18} />
                Add New Topic
              </button>
            </div>

            {/* Learning Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 20
            }}>
              {learning.map((item, idx) => (
                <div key={item._id || idx} style={{
                  background: dark ? '#1a1a38' : '#ffffff',
                  border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  borderRadius: 20,
                  padding: 20
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <span style={{
                        padding: '4px 12px',
                        background: 'rgba(0,212,170,0.1)',
                        color: '#00d4aa',
                        borderRadius: 50,
                        fontSize: '.65rem',
                        fontWeight: 800,
                        letterSpacing: '.06em'
                      }}>LEARNING</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        onClick={() => {
                          setLearningForm(item);
                          setEditingLearning(item);
                          setShowAddModal(true);
                        }}
                        style={{
                          padding: '6px',
                          background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                          border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                          borderRadius: 6,
                          color: dark ? '#e8e8ff' : '#0f0f2d',
                          cursor: 'pointer'
                        }}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => deleteLearning(item._id)}
                        style={{
                          padding: '6px',
                          background: 'rgba(255,107,157,0.1)',
                          border: '1px solid rgba(255,107,157,0.3)',
                          borderRadius: 6,
                          color: '#ff6b9d',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: dark ? '#e8e8ff' : '#0f0f2d', marginBottom: 12 }}>
                    {item.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        height: 6,
                        background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
                        borderRadius: 3,
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${item.progress || 0}%`,
                          background: 'linear-gradient(90deg,#00d4aa,#0096c7)',
                          borderRadius: 3
                        }} />
                      </div>
                    </div>
                    <span style={{ fontSize: '.8rem', fontWeight: 700, color: '#00d4aa' }}>
                      {item.progress || 0}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ============ CONTACT DETAIL MODAL ============ */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setSelectedContact(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                background: dark ? '#1a1a38' : '#ffffff',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: 24,
                padding: 32,
                maxWidth: 600,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedContact(null)}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: dark ? '#6868a0' : '#7070a0',
                  padding: 8
                }}
              >
                <X size={20} />
              </button>

              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: '1.5rem',
                color: dark ? '#e8e8ff' : '#0f0f2d',
                marginBottom: 24
              }}>{selectedContact.subject}</h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '1.5rem'
                }}>{selectedContact.name?.charAt(0)}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.1rem', color: dark ? '#e8e8ff' : '#0f0f2d', marginBottom: 4 }}>
                    {selectedContact.name}
                  </div>
                  <div style={{ color: dark ? '#6868a0' : '#7070a0', marginBottom: 4 }}>{selectedContact.email}</div>
                  <div style={{ fontSize: '.8rem', color: dark ? '#6868a0' : '#7070a0' }}>
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <div style={{
                background: dark ? 'rgba(124,111,255,0.05)' : 'rgba(124,111,255,0.02)',
                borderRadius: 16,
                padding: 20,
                marginBottom: 24
              }}>
                <p style={{ color: dark ? '#e8e8ff' : '#0f0f2d', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                  {selectedContact.message}
                </p>
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  onClick={() => updateContactStatus(selectedContact._id, 'replied')}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg,#00d4aa,#0096c7)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: '.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Mark as Replied
                </button>
                <button
                  onClick={() => updateContactStatus(selectedContact._id, 'archived')}
                  style={{
                    padding: '12px 24px',
                    background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: 12,
                    color: dark ? '#e8e8ff' : '#0f0f2d',
                    fontSize: '.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Archive
                </button>
                <button
                  onClick={() => deleteContact(selectedContact._id)}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(255,107,157,0.1)',
                    border: '1px solid rgba(255,107,157,0.3)',
                    borderRadius: 12,
                    color: '#ff6b9d',
                    fontSize: '.85rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ ADD/EDIT PROJECT MODAL ============ */}
      <AnimatePresence>
        {showAddModal && activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                background: dark ? '#1a1a38' : '#ffffff',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: 24,
                padding: 32,
                maxWidth: 600,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingProject(null);
                  resetProjectForm();
                }}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: dark ? '#6868a0' : '#7070a0',
                  padding: 8
                }}
              >
                <X size={20} />
              </button>

              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 24
              }}>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    PROJECT TITLE *
                  </label>
                  <input
                    type="text"
                    value={projectForm.ti}
                    onChange={(e) => setProjectForm({ ...projectForm, ti: e.target.value })}
                    placeholder="e.g., EduNepal Platform"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.95rem',
                      fontFamily: "'Outfit', sans-serif",
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    DESCRIPTION *
                  </label>
                  <textarea
                    value={projectForm.desc}
                    onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                    placeholder="Describe your project..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.95rem',
                      fontFamily: "'Outfit', sans-serif",
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    CATEGORY
                  </label>
                  <select
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.95rem',
                      fontFamily: "'Outfit', sans-serif",
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {categoryOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    IMAGE URL
                  </label>
                  <input
                    type="text"
                    value={projectForm.img}
                    onChange={(e) => setProjectForm({ ...projectForm, img: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.95rem',
                      fontFamily: "'Outfit', sans-serif",
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    TAGS
                  </label>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add a tag and press Enter"
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 12,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        fontSize: '.9rem',
                        fontFamily: "'Outfit', sans-serif",
                        outline: 'none'
                      }}
                    />
                    <button
                      onClick={addTag}
                      style={{
                        padding: '12px 24px',
                        background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 12,
                        fontSize: '.85rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {projectForm.tags.map(tag => (
                      <span key={tag} style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 12px',
                        background: `${projectForm.c}15`,
                        color: projectForm.c,
                        border: `1px solid ${projectForm.c}30`,
                        borderRadius: 20,
                        fontSize: '.75rem',
                        fontWeight: 700
                      }}>
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: projectForm.c,
                            cursor: 'pointer',
                            padding: 2,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={projectForm.live}
                      onChange={(e) => setProjectForm({ ...projectForm, live: e.target.checked })}
                      style={{ width: 18, height: 18, cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '.9rem', color: dark ? '#e8e8ff' : '#0f0f2d' }}>Live Project</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button
                    onClick={saveProject}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      fontSize: '.9rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                  >
                    <Save size={16} />
                    {editingProject ? 'Update Project' : 'Create Project'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingProject(null);
                      resetProjectForm();
                    }}
                    style={{
                      padding: '14px 24px',
                      background: 'transparent',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.9rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ ADD/EDIT SKILL MODAL ============ */}
      <AnimatePresence>
        {showAddModal && activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => {
              setShowAddModal(false);
              setEditingSkill(null);
              setSkillForm({ name: '', pct: 50, color: '#61dafb', icon: 'Code' });
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                background: dark ? '#1a1a38' : '#ffffff',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: 24,
                padding: 32,
                maxWidth: 500,
                width: '100%',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingSkill(null);
                  setSkillForm({ name: '', pct: 50, color: '#61dafb', icon: 'Code' });
                }}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: dark ? '#6868a0' : '#7070a0',
                  padding: 8
                }}
              >
                <X size={20} />
              </button>

              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 24
              }}>
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    SKILL NAME *
                  </label>
                  <input
                    type="text"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    placeholder="e.g., React.js"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.95rem',
                      fontFamily: "'Outfit', sans-serif",
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    PROFICIENCY ({skillForm.pct}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skillForm.pct}
                    onChange={(e) => setSkillForm({ ...skillForm, pct: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      height: 8,
                      borderRadius: 4,
                      background: `linear-gradient(90deg, ${skillForm.color} ${skillForm.pct}%, ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} ${skillForm.pct}%)`,
                      cursor: 'pointer',
                      WebkitAppearance: 'none',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    ACCENT COLOR
                  </label>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input
                      type="color"
                      value={skillForm.color}
                      onChange={(e) => setSkillForm({ ...skillForm, color: e.target.value })}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 12,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    />
                    <input
                      type="text"
                      value={skillForm.color}
                      onChange={(e) => setSkillForm({ ...skillForm, color: e.target.value })}
                      style={{
                        flex: 1,
                        padding: '14px 18px',
                        background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        borderRadius: 12,
                        color: dark ? '#e8e8ff' : '#0f0f2d',
                        fontSize: '.9rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    ICON
                  </label>
                  <select
                    value={skillForm.icon}
                    onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.95rem',
                      fontFamily: "'Outfit', sans-serif",
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {iconOptions.map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button
                    onClick={saveSkill}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      fontSize: '.9rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                  >
                    <Save size={16} />
                    {editingSkill ? 'Update Skill' : 'Add Skill'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingSkill(null);
                      setSkillForm({ name: '', pct: 50, color: '#61dafb', icon: 'Code' });
                    }}
                    style={{
                      padding: '14px 24px',
                      background: 'transparent',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.9rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ ADD/EDIT LEARNING MODAL ============ */}
      <AnimatePresence>
        {showAddModal && activeTab === 'learning' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => {
              setShowAddModal(false);
              setEditingLearning(null);
              setLearningForm({ name: '', category: 'learning', progress: 0 });
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                background: dark ? '#1a1a38' : '#ffffff',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: 24,
                padding: 32,
                maxWidth: 500,
                width: '100%',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingLearning(null);
                  setLearningForm({ name: '', category: 'learning', progress: 0 });
                }}
                style={{
                  position: 'absolute',
                  top: 20,
                  right: 20,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: dark ? '#6868a0' : '#7070a0',
                  padding: 8
                }}
              >
                <X size={20} />
              </button>

              <h3 style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 900,
                fontSize: '1.5rem',
                background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: 24
              }}>
                {editingLearning ? 'Edit Learning Topic' : 'Add Learning Topic'}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    TOPIC NAME *
                  </label>
                  <input
                    type="text"
                    value={learningForm.name}
                    onChange={(e) => setLearningForm({ ...learningForm, name: e.target.value })}
                    placeholder="e.g., React Native"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.95rem',
                      fontFamily: "'Outfit', sans-serif",
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 700, color: dark ? '#6868a0' : '#7070a0', marginBottom: 8, letterSpacing: '.06em' }}>
                    PROGRESS ({learningForm.progress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={learningForm.progress}
                    onChange={(e) => setLearningForm({ ...learningForm, progress: parseInt(e.target.value) })}
                    style={{
                      width: '100%',
                      height: 8,
                      borderRadius: 4,
                      background: `linear-gradient(90deg, #00d4aa ${learningForm.progress}%, ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} ${learningForm.progress}%)`,
                      cursor: 'pointer',
                      WebkitAppearance: 'none',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button
                    onClick={saveLearning}
                    style={{
                      flex: 1,
                      padding: '14px',
                      background: 'linear-gradient(135deg,#7c6fff,#ff6b9d)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 12,
                      fontSize: '.9rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8
                    }}
                  >
                    <Save size={16} />
                    {editingLearning ? 'Update Topic' : 'Add Topic'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingLearning(null);
                      setLearningForm({ name: '', category: 'learning', progress: 0 });
                    }}
                    style={{
                      padding: '14px 24px',
                      background: 'transparent',
                      border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                      borderRadius: 12,
                      color: dark ? '#e8e8ff' : '#0f0f2d',
                      fontSize: '.9rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============ PROJECT PREVIEW MODAL ============ */}
      <AnimatePresence>
        {showPreview && previewData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.9)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                background: dark ? '#1a1a38' : '#ffffff',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: 24,
                maxWidth: 800,
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ position: 'relative', height: 300 }}>
                <img 
                  src={previewData.img || 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80'} 
                  alt={previewData.ti}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <button
                  onClick={() => setShowPreview(false)}
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(4px)',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={20} />
                </button>
                {previewData.live && (
                  <span style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    padding: '8px 16px',
                    background: 'rgba(0,212,170,0.9)',
                    color: '#fff',
                    borderRadius: 50,
                    fontSize: '.75rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                    LIVE
                  </span>
                )}
              </div>
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h2 style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 900,
                    fontSize: '1.8rem',
                    color: dark ? '#e8e8ff' : '#0f0f2d'
                  }}>{previewData.ti}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffb547">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffb547' }}>{previewData.stars}</span>
                  </div>
                </div>
                <p style={{ color: dark ? '#6868a0' : '#7070a0', fontSize: '1rem', lineHeight: 1.8, marginBottom: 24 }}>
                  {previewData.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
                  {previewData.tags?.map(tag => (
                    <span key={tag} style={{
                      padding: '6px 14px',
                      background: `${previewData.c || '#7c6fff'}15`,
                      color: previewData.c || '#7c6fff',
                      border: `1px solid ${previewData.c || '#7c6fff'}30`,
                      borderRadius: 20,
                      fontSize: '.8rem',
                      fontWeight: 700
                    }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <a href="#" style={{
                    padding: '14px 28px',
                    background: `linear-gradient(135deg,${previewData.c || '#7c6fff'},${previewData.c || '#ff6b9d'})`,
                    color: '#fff',
                    borderRadius: 12,
                    fontSize: '.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <Globe size={16} />
                    Live Demo
                  </a>
                  <a href="#" style={{
                    padding: '14px 28px',
                    background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: 12,
                    color: dark ? '#e8e8ff' : '#0f0f2d',
                    fontSize: '.9rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .contacts-table-desktop { display: none !important; }
          .contacts-table-mobile { display: block !important; }
          .logout-text { display: none !important; }
        }
        @media (min-width: 769px) {
          .contacts-table-desktop { display: block !important; }
          .contacts-table-mobile { display: none !important; }
        }
        @media (max-width: 640px) {
          .grid { grid-template-columns: 1fr !important; }
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #7c6fff;
          box-shadow: 0 2px 10px rgba(124,111,255,0.3);
          cursor: pointer;
          transition: all 0.2s;
        }
        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #7c6fff;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;