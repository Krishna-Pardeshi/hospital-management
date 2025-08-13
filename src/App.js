import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css'; // Import your CSS styles
// Hospital Management System - Professional Implementation

// Mock Data
const mockPatients = [
  {
    id: 'P001',
    name: 'Sarah Williams',
    age: 34,
    gender: 'Female',
    phone: '+1-234-567-8901',
    email: 'sarah@email.com',
    bloodGroup: 'O+',
    status: 'Active',
    lastVisit: '2024-01-15',
    doctor: 'Dr. Smith',
    condition: 'Hypertension',
    address: '123 Main St, City, State',
    emergencyContact: 'John Williams - Husband',
    insurance: 'Blue Cross',
    allergies: 'Penicillin'
  },
  {
    id: 'P002',
    name: 'Michael Brown',
    age: 45,
    gender: 'Male',
    phone: '+1-234-567-8902',
    email: 'michael@email.com',
    bloodGroup: 'A+',
    status: 'Active',
    lastVisit: '2024-01-10',
    doctor: 'Dr. Johnson',
    condition: 'Diabetes',
    address: '456 Oak Ave, City, State',
    emergencyContact: 'Mary Brown - Wife',
    insurance: 'Aetna',
    allergies: 'None'
  },
  {
    id: 'P003',
    name: 'Emily Davis',
    age: 28,
    gender: 'Female',
    phone: '+1-234-567-8903',
    email: 'emily@email.com',
    bloodGroup: 'B-',
    status: 'Active',
    lastVisit: '2024-01-08',
    doctor: 'Dr. Wilson',
    condition: 'Asthma',
    address: '789 Pine St, City, State',
    emergencyContact: 'David Davis - Father',
    insurance: 'Cigna',
    allergies: 'Dust, Pollen'
  }
];

const mockDoctors = [
  {
    id: 'D001',
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    phone: '+1-555-0101',
    email: 'j.smith@hospital.com',
    experience: '15 years',
    patients: 45,
    status: 'Available',
    shift: 'Morning',
    department: 'Cardiology',
    license: 'MD12345',
    education: 'Harvard Medical School'
  },
  {
    id: 'D002',
    name: 'Dr. Sarah Johnson',
    specialization: 'Pediatrics',
    phone: '+1-555-0102',
    email: 's.johnson@hospital.com',
    experience: '12 years',
    patients: 38,
    status: 'Busy',
    shift: 'Evening',
    department: 'Pediatrics',
    license: 'MD12346',
    education: 'Johns Hopkins'
  },
  {
    id: 'D003',
    name: 'Dr. Emily Wilson',
    specialization: 'Dermatology',
    phone: '+1-555-0103',
    email: 'e.wilson@hospital.com',
    experience: '8 years',
    patients: 32,
    status: 'Available',
    shift: 'Morning',
    department: 'Dermatology',
    license: 'MD12347',
    education: 'Mayo Clinic'
  }
];

const mockAppointments = [
  {
    id: 'A001',
    patientName: 'Sarah Williams',
    patientId: 'P001',
    doctorName: 'Dr. Smith',
    doctorId: 'D001',
    date: '2024-01-22',
    time: '10:30 AM',
    type: 'Consultation',
    status: 'Confirmed',
    duration: '30 minutes',
    notes: 'Regular checkup',
    reason: 'Chest pain'
  },
  {
    id: 'A002',
    patientName: 'Michael Brown',
    patientId: 'P002',
    doctorName: 'Dr. Johnson',
    doctorId: 'D002',
    date: '2024-01-22',
    time: '11:15 AM',
    type: 'Follow-up',
    status: 'Pending',
    duration: '45 minutes',
    notes: 'Diabetes management',
    reason: 'Blood sugar monitoring'
  },
  {
    id: 'A003',
    patientName: 'Emily Davis',
    patientId: 'P003',
    doctorName: 'Dr. Wilson',
    doctorId: 'D003',
    date: '2024-01-22',
    time: '2:00 PM',
    type: 'Treatment',
    status: 'Confirmed',
    duration: '60 minutes',
    notes: 'Skin condition treatment',
    reason: 'Eczema flare-up'
  }
];

const mockBilling = [
  {
    id: 'B001',
    patientName: 'Sarah Williams',
    patientId: 'P001',
    amount: 450,
    date: '2024-01-15',
    status: 'Paid',
    paymentMethod: 'Credit Card',
    services: 'Consultation + Lab Tests',
    insuranceClaim: 'Approved',
    dueDate: '2024-02-15'
  },
  {
    id: 'B002',
    patientName: 'Michael Brown',
    patientId: 'P002',
    amount: 320,
    date: '2024-01-10',
    status: 'Pending',
    paymentMethod: 'Insurance',
    services: 'Follow-up + Prescription',
    insuranceClaim: 'Processing',
    dueDate: '2024-02-10'
  },
  {
    id: 'B003',
    patientName: 'Emily Davis',
    patientId: 'P003',
    amount: 180,
    date: '2024-01-08',
    status: 'Paid',
    paymentMethod: 'Cash',
    services: 'Consultation',
    insuranceClaim: 'N/A',
    dueDate: '2024-02-08'
  }
];

// Utility Functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const getBadgeClass = (status) => {
  const statusMap = {
    'Active': 'badge-success',
    'Inactive': 'badge-danger',
    'Confirmed': 'badge-success',
    'Pending': 'badge-warning',
    'Cancelled': 'badge-danger',
    'Paid': 'badge-success',
    'Overdue': 'badge-danger',
    'Available': 'badge-success',
    'Busy': 'badge-warning',
    'On Leave': 'badge-danger'
  };
  return statusMap[status] || 'badge-default';
};

// Icon Components
const Icons = {
  Dashboard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"/>
      <rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="12" width="7" height="7"/>
      <rect x="3" y="12" width="7" height="7"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Stethoscope: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
      <circle cx="20" cy="10" r="2"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  CreditCard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="20" x2="12" y2="10"/>
      <line x1="18" y1="20" x2="18" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="16"/>
    </svg>
  ),
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Edit: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  Filter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
    </svg>
  ),
  Menu: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Bell: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  )
};

// Navigation Component
const Navigation = ({ currentPage, onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Icons.Dashboard },
    { id: 'patients', name: 'Patients', icon: Icons.Users },
    { id: 'doctors', name: 'Doctors', icon: Icons.Stethoscope },
    { id: 'appointments', name: 'Appointments', icon: Icons.Calendar },
    { id: 'billing', name: 'Billing', icon: Icons.CreditCard },
    { id: 'reports', name: 'Reports', icon: Icons.BarChart }
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="sidebar-brand">
            <div className="brand-icon">
              <Icons.Stethoscope />
            </div>
            <div className="brand-info">
              <h2>HMS Pro</h2>
              <p>Hospital Management</p>
            </div>
          </div>
        )}
        <button 
          className="sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Icons.Menu /> : <Icons.X />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onPageChange(item.id)}
          >
            <item.icon />
            {!isCollapsed && <span>{item.name}</span>}
          </button>
        ))}
      </nav>

      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">DR</div>
            <div className="user-info">
              <div className="user-name">Dr. Sarah Johnson</div>
              <div className="user-role">Chief Medical Officer</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Button Component
const Button = ({ children, variant = 'primary', size = 'medium', onClick, className = '', disabled = false }) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// Input Component
const Input = ({ type = 'text', placeholder, value, onChange, className = '' }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
    />
  );
};

// Select Component
const Select = ({ value, onChange, children, className = '' }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`select ${className}`}
    >
      {children}
    </select>
  );
};

// Card Component
const Card = ({ children, className = '' }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

// Badge Component
const Badge = ({ children, status }) => {
  return <span className={`badge ${getBadgeClass(status)}`}>{children}</span>;
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}>
            <Icons.X />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const statsData = [
    {
      title: 'Total Patients Today',
      value: '127',
      change: '+12.5%',
      color: 'primary',
      icon: Icons.Users
    },
    {
      title: 'Appointments Scheduled',
      value: '38',
      change: '+8.2%',
      color: 'success',
      icon: Icons.Calendar
    },
    {
      title: 'Revenue Today',
      value: '$24,580',
      change: '+15.3%',
      color: 'warning',
      icon: Icons.CreditCard
    },
    {
      title: 'Pending Bills',
      value: '23',
      change: '-5.1%',
      color: 'danger',
      icon: Icons.BarChart
    }
  ];

  const recentActivities = [
    {
      message: 'Sarah Williams checked in for cardiology appointment',
      time: '5 minutes ago',
      type: 'checkin'
    },
    {
      message: 'Lab results ready for John Smith - Blood Test Complete',
      time: '12 minutes ago',
      type: 'lab'
    },
    {
      message: 'New appointment scheduled with Dr. Johnson for tomorrow',
      time: '25 minutes ago',
      type: 'appointment'
    },
    {
      message: 'Payment received from Robert Davis - $250',
      time: '1 hour ago',
      type: 'payment'
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back, Dr. Sarah Johnson</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <Icons.Search />
            <Input
              placeholder="Search patients, appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button>
            <Icons.Bell />
            Notifications
          </Button>
        </div>
      </div>

      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <Card key={index} className={`stats-card stats-${stat.color}`}>
            <div className="stats-header">
              <h3>{stat.title}</h3>
              <stat.icon />
            </div>
            <div className="stats-body">
              <div className="stats-value">{stat.value}</div>
              <div className="stats-change">{stat.change} from last week</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="dashboard-grid">
        <Card className="quick-actions">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="card-body">
            <div className="action-item">
              <div className="action-icon bg-blue">
                <Icons.Plus />
              </div>
              <div className="action-content">
                <h4>Add New Patient</h4>
                <p>Register a new patient in the system</p>
              </div>
            </div>
            <div className="action-item">
              <div className="action-icon bg-green">
                <Icons.Calendar />
              </div>
              <div className="action-content">
                <h4>Schedule Appointment</h4>
                <p>Book an appointment for patient</p>
              </div>
            </div>
            <div className="action-item">
              <div className="action-icon bg-purple">
                <Icons.CreditCard />
              </div>
              <div className="action-content">
                <h4>Create Invoice</h4>
                <p>Generate billing invoice for services</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="recent-activities">
          <div className="card-header">
            <h3>Recent Activities</h3>
          </div>
          <div className="card-body">
            {recentActivities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <Icons.Bell />
                </div>
                <div className="activity-content">
                  <p>{activity.message}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="appointments-table">
        <div className="card-header">
          <h3>Today's Appointments</h3>
          <Button variant="outline" size="small">View All</Button>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockAppointments.slice(0, 3).map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.time}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{appointment.type}</td>
                    <td>
                      <Badge status={appointment.status}>{appointment.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Patients Component
const Patients = () => {
  const [patients, setPatients] = useState(mockPatients);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || patient.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddPatient = (patientData) => {
    const newPatient = {
      ...patientData,
      id: `P${String(patients.length + 1).padStart(3, '0')}`,
      status: 'Active',
      lastVisit: new Date().toISOString().split('T')[0]
    };
    setPatients([...patients, newPatient]);
    setIsAddModalOpen(false);
  };

  const handleEditPatient = (patientData) => {
    setPatients(patients.map(p => p.id === editingPatient.id ? { ...p, ...patientData } : p));
    setEditingPatient(null);
    setIsAddModalOpen(false);
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== patientId));
    }
  };

  const PatientForm = ({ patient = null, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: patient?.name || '',
      age: patient?.age || '',
      gender: patient?.gender || '',
      phone: patient?.phone || '',
      email: patient?.email || '',
      bloodGroup: patient?.bloodGroup || '',
      condition: patient?.condition || '',
      address: patient?.address || '',
      emergencyContact: patient?.emergencyContact || '',
      insurance: patient?.insurance || '',
      allergies: patient?.allergies || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <Input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Enter age"
              required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <Select
              value={formData.gender}
              onChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>
          </div>
          <div className="form-group">
            <label>Blood Group</label>
            <Select
              value={formData.bloodGroup}
              onChange={(value) => setFormData({ ...formData, bloodGroup: value })}
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </Select>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter email address"
              required
            />
          </div>
          <div className="form-group form-group-full">
            <label>Address</label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter full address"
            />
          </div>
          <div className="form-group">
            <label>Emergency Contact</label>
            <Input
              value={formData.emergencyContact}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              placeholder="Name - Relationship"
            />
          </div>
          <div className="form-group">
            <label>Insurance</label>
            <Input
              value={formData.insurance}
              onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
              placeholder="Insurance provider"
            />
          </div>
          <div className="form-group form-group-full">
            <label>Medical Condition</label>
            <Input
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              placeholder="Current medical condition"
            />
          </div>
          <div className="form-group form-group-full">
            <label>Allergies</label>
            <Input
              value={formData.allergies}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              placeholder="Known allergies"
            />
          </div>
        </div>
        <div className="form-actions">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {patient ? 'Update' : 'Add'} Patient
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient Management</h1>
          <p className="page-subtitle">Manage patient records and information</p>
        </div>
        <div className="header-actions">
          <Button variant="outline">
            <Icons.Download />
            Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Icons.Plus />
            Add Patient
          </Button>
        </div>
      </div>

      <Card className="filters-card">
        <div className="card-body">
          <div className="filters-container">
            <div className="search-box">
              <Icons.Search />
              <Input
                placeholder="Search by name or patient ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Icons.Filter />
              <Select value={filterStatus} onChange={setFilterStatus}>
                <option value="all">All Patients</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="card-header">
          <h3>Patients ({filteredPatients.length})</h3>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Phone</th>
                  <th>Last Visit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td className="font-medium">{patient.id}</td>
                    <td>{patient.name}</td>
                    <td>{patient.age}</td>
                    <td>{patient.gender}</td>
                    <td>{patient.phone}</td>
                    <td>{formatDate(patient.lastVisit)}</td>
                    <td>
                      <Badge status={patient.status}>{patient.status}</Badge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <Icons.Eye />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => {
                            setEditingPatient(patient);
                            setIsAddModalOpen(true);
                          }}
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeletePatient(patient.id)}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingPatient(null);
        }}
        title={editingPatient ? 'Edit Patient' : 'Add New Patient'}
      >
        <PatientForm
          patient={editingPatient}
          onSubmit={editingPatient ? handleEditPatient : handleAddPatient}
          onCancel={() => {
            setIsAddModalOpen(false);
            setEditingPatient(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={!!selectedPatient}
        onClose={() => setSelectedPatient(null)}
        title="Patient Details"
      >
        {selectedPatient && (
          <div className="patient-details">
            <div className="details-grid">
              <div className="details-section">
                <h4>Personal Information</h4>
                <div className="detail-item">
                  <strong>Patient ID:</strong> {selectedPatient.id}
                </div>
                <div className="detail-item">
                  <strong>Name:</strong> {selectedPatient.name}
                </div>
                <div className="detail-item">
                  <strong>Age:</strong> {selectedPatient.age} years
                </div>
                <div className="detail-item">
                  <strong>Gender:</strong> {selectedPatient.gender}
                </div>
                <div className="detail-item">
                  <strong>Blood Group:</strong> {selectedPatient.bloodGroup}
                </div>
                <div className="detail-item">
                  <strong>Phone:</strong> {selectedPatient.phone}
                </div>
                <div className="detail-item">
                  <strong>Email:</strong> {selectedPatient.email}
                </div>
                <div className="detail-item">
                  <strong>Address:</strong> {selectedPatient.address}
                </div>
              </div>
              <div className="details-section">
                <h4>Medical Information</h4>
                <div className="detail-item">
                  <strong>Assigned Doctor:</strong> {selectedPatient.doctor}
                </div>
                <div className="detail-item">
                  <strong>Last Visit:</strong> {formatDate(selectedPatient.lastVisit)}
                </div>
                <div className="detail-item">
                  <strong>Condition:</strong> {selectedPatient.condition}
                </div>
                <div className="detail-item">
                  <strong>Allergies:</strong> {selectedPatient.allergies}
                </div>
                <div className="detail-item">
                  <strong>Insurance:</strong> {selectedPatient.insurance}
                </div>
                <div className="detail-item">
                  <strong>Emergency Contact:</strong> {selectedPatient.emergencyContact}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> 
                  <Badge status={selectedPatient.status}>{selectedPatient.status}</Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Doctors Component
const Doctors = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doctor.status.toLowerCase().includes(filterStatus.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const handleAddDoctor = (doctorData) => {
    const newDoctor = {
      ...doctorData,
      id: `D${String(doctors.length + 1).padStart(3, '0')}`,
      status: 'Available',
      patients: 0
    };
    setDoctors([...doctors, newDoctor]);
    setIsAddModalOpen(false);
  };

  const handleEditDoctor = (doctorData) => {
    setDoctors(doctors.map(d => d.id === editingDoctor.id ? { ...d, ...doctorData } : d));
    setEditingDoctor(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteDoctor = (doctorId) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(d => d.id !== doctorId));
    }
  };

  const DoctorForm = ({ doctor = null, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      name: doctor?.name || '',
      specialization: doctor?.specialization || '',
      phone: doctor?.phone || '',
      email: doctor?.email || '',
      experience: doctor?.experience || '',
      shift: doctor?.shift || '',
      department: doctor?.department || '',
      license: doctor?.license || '',
      education: doctor?.education || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="doctor-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Full Name</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Dr. John Smith"
              required
            />
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <Select
              value={formData.specialization}
              onChange={(value) => setFormData({ ...formData, specialization: value })}
            >
              <option value="">Select Specialization</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
              <option value="General Medicine">General Medicine</option>
              <option value="Surgery">Surgery</option>
              <option value="Emergency Medicine">Emergency Medicine</option>
            </Select>
          </div>
          <div className="form-group">
            <label>Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1-555-0123"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="doctor@hospital.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Experience</label>
            <Input
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="10 years"
            />
          </div>
          <div className="form-group">
            <label>Shift</label>
            <Select
              value={formData.shift}
              onChange={(value) => setFormData({ ...formData, shift: value })}
            >
              <option value="">Select Shift</option>
              <option value="Morning">Morning (6 AM - 2 PM)</option>
              <option value="Evening">Evening (2 PM - 10 PM)</option>
              <option value="Night">Night (10 PM - 6 AM)</option>
              <option value="Full Day">Full Day (24 hours)</option>
            </Select>
          </div>
          <div className="form-group">
            <label>Department</label>
            <Input
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              placeholder="Department name"
            />
          </div>
          <div className="form-group">
            <label>License Number</label>
            <Input
              value={formData.license}
              onChange={(e) => setFormData({ ...formData, license: e.target.value })}
              placeholder="MD12345"
            />
          </div>
          <div className="form-group form-group-full">
            <label>Education</label>
            <Input
              value={formData.education}
              onChange={(e) => setFormData({ ...formData, education: e.target.value })}
              placeholder="Medical school and qualifications"
            />
          </div>
        </div>
        <div className="form-actions">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {doctor ? 'Update' : 'Add'} Doctor
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctor Management</h1>
          <p className="page-subtitle">Manage medical staff and schedules</p>
        </div>
        <div className="header-actions">
          <Button variant="outline">
            <Icons.Download />
            Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Icons.Plus />
            Add Doctor
          </Button>
        </div>
      </div>

      <Card className="filters-card">
        <div className="card-body">
          <div className="filters-container">
            <div className="search-box">
              <Icons.Search />
              <Input
                placeholder="Search by name or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Icons.Filter />
              <Select value={filterStatus} onChange={setFilterStatus}>
                <option value="all">All Doctors</option>
                <option value="available">Available</option>
                <option value="busy">Busy</option>
                <option value="leave">On Leave</option>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="card-header">
          <h3>Doctors ({filteredDoctors.length})</h3>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doctor ID</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Patients</th>
                  <th>Shift</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td className="font-medium">{doctor.id}</td>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.experience}</td>
                    <td>{doctor.patients}</td>
                    <td>{doctor.shift}</td>
                    <td>
                      <Badge status={doctor.status}>{doctor.status}</Badge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => setSelectedDoctor(doctor)}
                        >
                          <Icons.Eye />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => {
                            setEditingDoctor(doctor);
                            setIsAddModalOpen(true);
                          }}
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteDoctor(doctor.id)}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingDoctor(null);
        }}
        title={editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
      >
        <DoctorForm
          doctor={editingDoctor}
          onSubmit={editingDoctor ? handleEditDoctor : handleAddDoctor}
          onCancel={() => {
            setIsAddModalOpen(false);
            setEditingDoctor(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        title="Doctor Details"
      >
        {selectedDoctor && (
          <div className="doctor-details">
            <div className="details-grid">
              <div className="details-section">
                <h4>Personal Information</h4>
                <div className="detail-item">
                  <strong>Doctor ID:</strong> {selectedDoctor.id}
                </div>
                <div className="detail-item">
                  <strong>Name:</strong> {selectedDoctor.name}
                </div>
                <div className="detail-item">
                  <strong>Specialization:</strong> {selectedDoctor.specialization}
                </div>
                <div className="detail-item">
                  <strong>Department:</strong> {selectedDoctor.department}
                </div>
                <div className="detail-item">
                  <strong>Phone:</strong> {selectedDoctor.phone}
                </div>
                <div className="detail-item">
                  <strong>Email:</strong> {selectedDoctor.email}
                </div>
                <div className="detail-item">
                  <strong>License:</strong> {selectedDoctor.license}
                </div>
                <div className="detail-item">
                  <strong>Education:</strong> {selectedDoctor.education}
                </div>
              </div>
              <div className="details-section">
                <h4>Professional Information</h4>
                <div className="detail-item">
                  <strong>Experience:</strong> {selectedDoctor.experience}
                </div>
                <div className="detail-item">
                  <strong>Current Patients:</strong> {selectedDoctor.patients}
                </div>
                <div className="detail-item">
                  <strong>Shift:</strong> {selectedDoctor.shift}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> 
                  <Badge status={selectedDoctor.status}>{selectedDoctor.status}</Badge>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Appointments Component
const Appointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || appointment.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAddAppointment = (appointmentData) => {
    const newAppointment = {
      ...appointmentData,
      id: `A${String(appointments.length + 1).padStart(3, '0')}`,
      status: 'Scheduled'
    };
    setAppointments([...appointments, newAppointment]);
    setIsAddModalOpen(false);
  };

  const handleEditAppointment = (appointmentData) => {
    setAppointments(appointments.map(a => 
      a.id === editingAppointment.id ? { ...a, ...appointmentData } : a
    ));
    setEditingAppointment(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(a => a.id !== appointmentId));
    }
  };

  const AppointmentForm = ({ appointment = null, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      patientName: appointment?.patientName || '',
      doctorName: appointment?.doctorName || '',
      date: appointment?.date || '',
      time: appointment?.time || '',
      type: appointment?.type || '',
      duration: appointment?.duration || '',
      reason: appointment?.reason || '',
      notes: appointment?.notes || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Patient</label>
            <Select
              value={formData.patientName}
              onChange={(value) => setFormData({ ...formData, patientName: value })}
            >
              <option value="">Select Patient</option>
              {mockPatients.map(patient => (
                <option key={patient.id} value={patient.name}>{patient.name}</option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <label>Doctor</label>
            <Select
              value={formData.doctorName}
              onChange={(value) => setFormData({ ...formData, doctorName: value })}
            >
              <option value="">Select Doctor</option>
              {mockDoctors.map(doctor => (
                <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <label>Date</label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Type</label>
            <Select
              value={formData.type}
              onChange={(value) => setFormData({ ...formData, type: value })}
            >
              <option value="">Select Type</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Treatment">Treatment</option>
              <option value="Surgery">Surgery</option>
              <option value="Emergency">Emergency</option>
              <option value="Routine Checkup">Routine Checkup</option>
            </Select>
          </div>
          <div className="form-group">
            <label>Duration</label>
            <Select
              value={formData.duration}
              onChange={(value) => setFormData({ ...formData, duration: value })}
            >
              <option value="">Select Duration</option>
              <option value="15 minutes">15 minutes</option>
              <option value="30 minutes">30 minutes</option>
              <option value="45 minutes">45 minutes</option>
              <option value="60 minutes">1 hour</option>
              <option value="90 minutes">1.5 hours</option>
              <option value="120 minutes">2 hours</option>
            </Select>
          </div>
          <div className="form-group form-group-full">
            <label>Reason for Visit</label>
            <Input
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              placeholder="Reason for appointment"
            />
          </div>
          <div className="form-group form-group-full">
            <label>Notes</label>
            <Input
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes"
            />
          </div>
        </div>
        <div className="form-actions">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {appointment ? 'Update' : 'Schedule'} Appointment
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Appointment Management</h1>
          <p className="page-subtitle">Schedule and manage patient appointments</p>
        </div>
        <div className="header-actions">
          <Button variant="outline">
            <Icons.Download />
            Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Icons.Plus />
            Schedule Appointment
          </Button>
        </div>
      </div>

      <Card className="filters-card">
        <div className="card-body">
          <div className="filters-container">
            <div className="search-box">
              <Icons.Search />
              <Input
                placeholder="Search by patient or doctor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Icons.Filter />
              <Select value={filterStatus} onChange={setFilterStatus}>
                <option value="all">All Appointments</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="scheduled">Scheduled</option>
                <option value="cancelled">Cancelled</option>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="card-header">
          <h3>Appointments ({filteredAppointments.length})</h3>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td className="font-medium">{appointment.id}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.doctorName}</td>
                    <td>{formatDate(appointment.date)}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.type}</td>
                    <td>{appointment.duration}</td>
                    <td>
                      <Badge status={appointment.status}>{appointment.status}</Badge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <Icons.Eye />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => {
                            setEditingAppointment(appointment);
                            setIsAddModalOpen(true);
                          }}
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteAppointment(appointment.id)}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingAppointment(null);
        }}
        title={editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
      >
        <AppointmentForm
          appointment={editingAppointment}
          onSubmit={editingAppointment ? handleEditAppointment : handleAddAppointment}
          onCancel={() => {
            setIsAddModalOpen(false);
            setEditingAppointment(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={!!selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        title="Appointment Details"
      >
        {selectedAppointment && (
          <div className="appointment-details">
            <div className="details-grid">
              <div className="details-section">
                <h4>Appointment Information</h4>
                <div className="detail-item">
                  <strong>Appointment ID:</strong> {selectedAppointment.id}
                </div>
                <div className="detail-item">
                  <strong>Patient:</strong> {selectedAppointment.patientName}
                </div>
                <div className="detail-item">
                  <strong>Doctor:</strong> {selectedAppointment.doctorName}
                </div>
                <div className="detail-item">
                  <strong>Type:</strong> {selectedAppointment.type}
                </div>
                <div className="detail-item">
                  <strong>Reason:</strong> {selectedAppointment.reason}
                </div>
              </div>
              <div className="details-section">
                <h4>Schedule Details</h4>
                <div className="detail-item">
                  <strong>Date:</strong> {formatDate(selectedAppointment.date)}
                </div>
                <div className="detail-item">
                  <strong>Time:</strong> {selectedAppointment.time}
                </div>
                <div className="detail-item">
                  <strong>Duration:</strong> {selectedAppointment.duration}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> 
                  <Badge status={selectedAppointment.status}>{selectedAppointment.status}</Badge>
                </div>
                <div className="detail-item">
                  <strong>Notes:</strong> {selectedAppointment.notes || 'No notes'}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Billing Component
const Billing = () => {
  const [bills, setBills] = useState(mockBilling);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBill, setSelectedBill] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBill, setEditingBill] = useState(null);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bill.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || bill.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = bills.filter(b => b.status === 'Paid').reduce((sum, b) => sum + b.amount, 0);
  const pendingAmount = bills.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.amount, 0);
  const overdueAmount = bills.filter(b => b.status === 'Overdue').reduce((sum, b) => sum + b.amount, 0);

  const handleAddBill = (billData) => {
    const newBill = {
      ...billData,
      id: `B${String(bills.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0]
    };
    setBills([...bills, newBill]);
    setIsAddModalOpen(false);
  };

  const handleEditBill = (billData) => {
    setBills(bills.map(b => b.id === editingBill.id ? { ...b, ...billData } : b));
    setEditingBill(null);
    setIsAddModalOpen(false);
  };

  const handleDeleteBill = (billId) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      setBills(bills.filter(b => b.id !== billId));
    }
  };

  const BillForm = ({ bill = null, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      patientName: bill?.patientName || '',
      amount: bill?.amount || '',
      services: bill?.services || '',
      paymentMethod: bill?.paymentMethod || '',
      status: bill?.status || 'Pending',
      insuranceClaim: bill?.insuranceClaim || '',
      dueDate: bill?.dueDate || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="bill-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Patient</label>
            <Select
              value={formData.patientName}
              onChange={(value) => setFormData({ ...formData, patientName: value })}
            >
              <option value="">Select Patient</option>
              {mockPatients.map(patient => (
                <option key={patient.id} value={patient.name}>{patient.name}</option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <label>Amount ($)</label>
            <Input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              placeholder="0.00"
              required
            />
          </div>
          <div className="form-group form-group-full">
            <label>Services</label>
            <Input
              value={formData.services}
              onChange={(e) => setFormData({ ...formData, services: e.target.value })}
              placeholder="e.g., Consultation + Lab Tests"
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <Select
              value={formData.paymentMethod}
              onChange={(value) => setFormData({ ...formData, paymentMethod: value })}
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Insurance">Insurance</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Check">Check</option>
            </Select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <Select
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value })}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
              <option value="Cancelled">Cancelled</option>
            </Select>
          </div>
          <div className="form-group">
            <label>Insurance Claim</label>
            <Select
              value={formData.insuranceClaim}
              onChange={(value) => setFormData({ ...formData, insuranceClaim: value })}
            >
              <option value="">Select Status</option>
              <option value="Approved">Approved</option>
              <option value="Processing">Processing</option>
              <option value="Denied">Denied</option>
              <option value="N/A">N/A</option>
            </Select>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="form-actions">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {bill ? 'Update' : 'Create'} Invoice
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Billing & Payments</h1>
          <p className="page-subtitle">Manage invoices and payment records</p>
        </div>
        <div className="header-actions">
          <Button variant="outline">
            <Icons.Download />
            Export
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Icons.Plus />
            Create Invoice
          </Button>
        </div>
      </div>

      <div className="stats-grid">
        <Card className="stats-card stats-success">
          <div className="stats-header">
            <h3>Total Revenue</h3>
            <Icons.CreditCard />
          </div>
          <div className="stats-body">
            <div className="stats-value">{formatCurrency(totalRevenue)}</div>
            <div className="stats-change">Paid invoices</div>
          </div>
        </Card>
        <Card className="stats-card stats-warning">
          <div className="stats-header">
            <h3>Pending Payments</h3>
            <Icons.CreditCard />
          </div>
          <div className="stats-body">
            <div className="stats-value">{formatCurrency(pendingAmount)}</div>
            <div className="stats-change">Awaiting payment</div>
          </div>
        </Card>
        <Card className="stats-card stats-danger">
          <div className="stats-header">
            <h3>Overdue Amount</h3>
            <Icons.CreditCard />
          </div>
          <div className="stats-body">
            <div className="stats-value">{formatCurrency(overdueAmount)}</div>
            <div className="stats-change">Past due date</div>
          </div>
        </Card>
      </div>

      <Card className="filters-card">
        <div className="card-body">
          <div className="filters-container">
            <div className="search-box">
              <Icons.Search />
              <Input
                placeholder="Search by patient name or invoice ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Icons.Filter />
              <Select value={filterStatus} onChange={setFilterStatus}>
                <option value="all">All Invoices</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="card-header">
          <h3>Invoices ({filteredBills.length})</h3>
        </div>
        <div className="card-body">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice ID</th>
                  <th>Patient</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Due Date</th>
                  <th>Services</th>
                  <th>Payment Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBills.map((bill) => (
                  <tr key={bill.id}>
                    <td className="font-medium">{bill.id}</td>
                    <td>{bill.patientName}</td>
                    <td>{formatCurrency(bill.amount)}</td>
                    <td>{formatDate(bill.date)}</td>
                    <td>{formatDate(bill.dueDate)}</td>
                    <td>{bill.services}</td>
                    <td>{bill.paymentMethod}</td>
                    <td>
                      <Badge status={bill.status}>{bill.status}</Badge>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="action-btn view-btn"
                          onClick={() => setSelectedBill(bill)}
                        >
                          <Icons.Eye />
                        </button>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => {
                            setEditingBill(bill);
                            setIsAddModalOpen(true);
                          }}
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteBill(bill.id)}
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingBill(null);
        }}
        title={editingBill ? 'Edit Invoice' : 'Create New Invoice'}
      >
        <BillForm
          bill={editingBill}
          onSubmit={editingBill ? handleEditBill : handleAddBill}
          onCancel={() => {
            setIsAddModalOpen(false);
            setEditingBill(null);
          }}
        />
      </Modal>

      <Modal
        isOpen={!!selectedBill}
        onClose={() => setSelectedBill(null)}
        title="Invoice Details"
      >
        {selectedBill && (
          <div className="invoice-details">
            <div className="invoice-header">
              <h2>HMS Pro Hospital</h2>
              <p>123 Medical Center Drive, City, State 12345</p>
            </div>
            <div className="details-grid">
              <div className="details-section">
                <h4>Bill To:</h4>
                <div className="detail-item">
                  <strong>{selectedBill.patientName}</strong>
                </div>
              </div>
              <div className="details-section">
                <div className="detail-item">
                  <strong>Invoice #:</strong> {selectedBill.id}
                </div>
                <div className="detail-item">
                  <strong>Date:</strong> {formatDate(selectedBill.date)}
                </div>
                <div className="detail-item">
                  <strong>Due Date:</strong> {formatDate(selectedBill.dueDate)}
                </div>
                <div className="detail-item">
                  <strong>Status:</strong> 
                  <Badge status={selectedBill.status}>{selectedBill.status}</Badge>
                </div>
              </div>
            </div>
            <div className="invoice-services">
              <h4>Services:</h4>
              <p>{selectedBill.services}</p>
            </div>
            <div className="invoice-total">
              <div className="total-row">
                <span>Total Amount:</span>
                <span className="total-amount">{formatCurrency(selectedBill.amount)}</span>
              </div>
              <div className="payment-info">
                <span>Payment Method: {selectedBill.paymentMethod}</span>
                <span>Insurance Claim: {selectedBill.insuranceClaim}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

// Reports Component
const Reports = () => {
  const [reportType, setReportType] = useState('financial');
  const [dateRange, setDateRange] = useState('month');

  const reportData = {
    financial: {
      totalRevenue: 145680,
      totalExpenses: 73450,
      netProfit: 72230,
      growthRate: 12.5
    },
    patients: {
      totalPatients: 2347,
      newPatients: 189,
      activePatients: 2158,
      patientGrowth: 8.3
    },
    appointments: {
      totalAppointments: 856,
      completed: 798,
      cancelled: 34,
      noShow: 24,
      completionRate: 93.2
    },
    doctors: {
      totalDoctors: 24,
      availableDoctors: 18,
      busyDoctors: 4,
      onLeave: 2,
      utilizationRate: 87.5
    }
  };

  const ReportCard = ({ title, data }) => (
    <Card>
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <div className="report-metrics">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="metric-item">
              <div className="metric-value">
                {typeof value === 'number' ? 
                  (key.includes('Rate') || key.includes('Growth') ? `${value}%` : 
                   key.includes('Revenue') || key.includes('Profit') || key.includes('Expenses') ? formatCurrency(value) : 
                   value.toLocaleString()) : value}
              </div>
              <div className="metric-label">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Analytics</h1>
          <p className="page-subtitle">Generate comprehensive reports and insights</p>
        </div>
        <div className="header-actions">
          <Select value={dateRange} onChange={setDateRange}>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </Select>
          <Button variant="outline">
            <Icons.Download />
            Export Report
          </Button>
        </div>
      </div>

      <Card className="report-tabs">
        <div className="card-body">
          <div className="tab-buttons">
            <Button 
              variant={reportType === 'financial' ? 'primary' : 'outline'}
              onClick={() => setReportType('financial')}
            >
              Financial Reports
            </Button>
            <Button 
              variant={reportType === 'patients' ? 'primary' : 'outline'}
              onClick={() => setReportType('patients')}
            >
              Patient Reports
            </Button>
            <Button 
              variant={reportType === 'appointments' ? 'primary' : 'outline'}
              onClick={() => setReportType('appointments')}
            >
              Appointment Reports
            </Button>
            <Button 
              variant={reportType === 'doctors' ? 'primary' : 'outline'}
              onClick={() => setReportType('doctors')}
            >
              Doctor Reports
            </Button>
          </div>
        </div>
      </Card>

      <div className="reports-grid">
        {reportType === 'financial' && (
          <>
            <ReportCard title="Financial Overview" data={reportData.financial} />
            <Card>
              <div className="card-header">
                <h3>Revenue Trend</h3>
              </div>
              <div className="card-body">
                <div className="chart-placeholder">
                  <p>Revenue chart visualization would go here</p>
                  <p>Monthly revenue: {formatCurrency(reportData.financial.totalRevenue / 12)}</p>
                </div>
              </div>
            </Card>
          </>
        )}

        {reportType === 'patients' && (
          <>
            <ReportCard title="Patient Analytics" data={reportData.patients} />
            <Card>
              <div className="card-header">
                <h3>Patient Demographics</h3>
              </div>
              <div className="card-body">
                <div className="chart-placeholder">
                  <p>Patient demographics chart would go here</p>
                  <p>Active patients: {reportData.patients.activePatients}</p>
                </div>
              </div>
            </Card>
          </>
        )}

        {reportType === 'appointments' && (
          <>
            <ReportCard title="Appointment Statistics" data={reportData.appointments} />
            <Card>
              <div className="card-header">
                <h3>Appointment Trends</h3>
              </div>
              <div className="card-body">
                <div className="chart-placeholder">
                  <p>Appointment trends chart would go here</p>
                  <p>Success rate: {reportData.appointments.completionRate}%</p>
                </div>
              </div>
            </Card>
          </>
        )}

        {reportType === 'doctors' && (
          <>
            <ReportCard title="Doctor Performance" data={reportData.doctors} />
            <Card>
              <div className="card-header">
                <h3>Doctor Availability</h3>
              </div>
              <div className="card-body">
                <div className="chart-placeholder">
                  <p>Doctor availability chart would go here</p>
                  <p>Utilization rate: {reportData.doctors.utilizationRate}%</p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>

      <Card>
        <div className="card-header">
          <h3>Quick Reports</h3>
        </div>
        <div className="card-body">
          <div className="quick-reports">
            <div className="report-item">
              <h4>Daily Summary</h4>
              <p>Today's activities overview</p>
              <Button size="small">Generate</Button>
            </div>
            <div className="report-item">
              <h4>Monthly Report</h4>
              <p>Comprehensive monthly data</p>
              <Button size="small">Generate</Button>
            </div>
            <div className="report-item">
              <h4>Custom Report</h4>
              <p>Build your own report</p>
              <Button size="small">Generate</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <Patients />;
      case 'doctors':
        return <Doctors />;
      case 'appointments':
        return <Appointments />;
      case 'billing':
        return <Billing />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="hms-app">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  );
};

// Initialize the app
const root = createRoot(document.getElementById('root'));
root.render(<App />);

export default App;