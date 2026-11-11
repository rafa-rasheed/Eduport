'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  School,
  Megaphone,
  UserCog,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Pencil,
  CalendarDays,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';

type Announcement = {
  id: number;
  title: string;
  message: string;
  date: string;
};

export default function DashboardPage() {
  const [activePage, setActivePage] = useState('Dashboard');
  const [mobileMenu, setMobileMenu] = useState(false);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'Welcome Back!',
      message:
        'Welcome to the new academic year. We wish everyone a successful year ahead.',
      date: 'August 10, 2026',
    },
    {
      id: 2,
      title: 'Parent Meeting',
      message: 'A parent-teacher meeting will be held this Friday at 10:00 AM.',
      date: 'July 15, 2026',
    },
  ]);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Students', icon: GraduationCap },
    { name: 'Teachers', icon: Users },
    { name: 'Classes', icon: School },
    { name: 'Create Announcement', icon: Megaphone },
    { name: 'User Management', icon: UserCog },
    { name: 'Settings', icon: Settings },
  ];

  function handlePublish() {
    if (!title.trim() || !message.trim()) {
      alert('Please enter both the announcement title and message.');
      return;
    }

    if (editingId !== null) {
      setAnnouncements((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? {
                ...item,
                title,
                message,
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now(),
        title,
        message,
        date: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      };

      setAnnouncements((previous) => [newAnnouncement, ...previous]);
    }

    setTitle('');
    setMessage('');
  }

  function handleEdit(item: Announcement) {
    setTitle(item.title);
    setMessage(item.message);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleDelete(id: number) {
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements((previous) => previous.filter((item) => item.id !== id));
    }
  }

  function handleLogout() {
    window.location.href = '/';
  }

  function changePage(page: string) {
    setActivePage(page);
    setMobileMenu(false);
  }

  return (
    <div className="app-container">
      <aside className={`sidebar ${mobileMenu ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-icon">
            <GraduationCap size={25} />
          </div>
          <span>EduPort</span>
          <button className="close-menu" onClick={() => setMobileMenu(false)}>
            <X size={21} />
          </button>
        </div>

        <div className="admin-profile">
          <div className="profile-avatar">A</div>
          <div>
            <h3>Administrator</h3>
            <p>Admin Account</p>
          </div>
        </div>

        <p className="menu-label">MENU</p>

        <nav className="navigation">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                className={`nav-item ${
                  activePage === item.name ? 'active' : ''
                }`}
                onClick={() => changePage(item.name)}
              >
                <Icon size={19} strokeWidth={1.8} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={19} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {mobileMenu && (
        <div className="mobile-overlay" onClick={() => setMobileMenu(false)} />
      )}

      <main className="main-content">
        <header className="topbar">
          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenu(true)}
          >
            <Menu size={23} />
          </button>

          <div>
            <h2>{activePage}</h2>
            <p>Welcome back, Administrator</p>
          </div>

          <div className="topbar-right">
            <div className="topbar-avatar">A</div>
          </div>
        </header>

        {activePage === 'Dashboard' && (
          <section className="page-content">
            <div className="welcome-section">
              <div>
                <h1>Dashboard Overview</h1>
                <p>Here's what's happening in your institution.</p>
              </div>
              <div className="date-display">
                <CalendarDays size={17} />
                {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon students-icon">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p>Total Students</p>
                  <h2>1,248</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon teachers-icon">
                  <Users size={23} />
                </div>
                <div>
                  <p>Total Teachers</p>
                  <h2>86</h2>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon announcements-icon">
                  <Megaphone size={23} />
                </div>
                <div>
                  <p>New Announcements</p>
                  <h2>{announcements.length}</h2>
                </div>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="content-card announcements-card">
                <div className="card-heading">
                  <div>
                    <h3>New Announcements</h3>
                    <p>Recently published announcements</p>
                  </div>
                  <Megaphone size={21} className="heading-icon" />
                </div>

                {announcements.length === 0 ? (
                  <div className="empty-state">
                    No announcements published yet.
                  </div>
                ) : (
                  <div className="announcement-list">
                    {announcements.slice(0, 4).map((item) => (
                      <div className="announcement-item" key={item.id}>
                        <div className="announcement-dot" />
                        <div className="announcement-info">
                          <h4>{item.title}</h4>
                          <p>{item.message}</p>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="content-card quick-actions-card">
                <div className="card-heading">
                  <div>
                    <h3>Quick Actions</h3>
                    <p>Manage your institution</p>
                  </div>
                </div>

                <button
                  className="action-button"
                  onClick={() => changePage('Students')}
                >
                  <span className="action-icon">
                    <Plus size={19} />
                  </span>
                  <span>Add Student</span>
                </button>

                <button
                  className="action-button"
                  onClick={() => changePage('Teachers')}
                >
                  <span className="action-icon teacher-action-icon">
                    <Plus size={19} />
                  </span>
                  <span>Add Teacher</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {activePage === 'Create Announcement' && (
          <section className="page-content">
            <div className="welcome-section">
              <div>
                <h1>Announcements</h1>
                <p>Create and manage institution announcements.</p>
              </div>
            </div>

            <div className="content-card form-card">
              <div className="card-heading">
                <div>
                  <h3>
                    {editingId ? 'Edit Announcement' : 'Create Announcement'}
                  </h3>
                  <p>Enter the details below to publish an announcement.</p>
                </div>
                <Megaphone size={22} className="heading-icon" />
              </div>

              <div className="form-group">
                <label>Announcement Title</label>
                <input
                  type="text"
                  placeholder="Enter announcement title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Announcement Message</label>
                <textarea
                  placeholder="Write your announcement message..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="form-buttons">
                <button className="publish-button" onClick={handlePublish}>
                  {editingId ? 'Update Announcement' : 'Publish Announcement'}
                </button>

                {editingId !== null && (
                  <button
                    className="cancel-button"
                    onClick={() => {
                      setEditingId(null);
                      setTitle('');
                      setMessage('');
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="content-card published-card">
              <div className="card-heading">
                <div>
                  <h3>Published Announcements</h3>
                  <p>View and manage your announcements.</p>
                </div>
              </div>

              {announcements.length === 0 ? (
                <div className="empty-state">
                  No announcements published yet.
                </div>
              ) : (
                <div className="published-list">
                  {announcements.map((item) => (
                    <div className="published-item" key={item.id}>
                      <div className="published-details">
                        <h4>{item.title}</h4>
                        <p>{item.message}</p>
                        <span>{item.date}</span>
                      </div>

                      <div className="announcement-actions">
                        <button
                          className="edit-button"
                          onClick={() => handleEdit(item)}
                          aria-label="Edit announcement"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          className="delete-button"
                          onClick={() => handleDelete(item.id)}
                          aria-label="Delete announcement"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {activePage === 'Students' && (
          <section className="page-content">
            <div className="welcome-section">
              <div>
                <h1>Students</h1>
                <p>Manage student information and records.</p>
              </div>
            </div>
            <div className="content-card placeholder-card">
              <GraduationCap size={35} />
              <h3>Student Management</h3>
              <p>
                Student registration and information management will be
                available here.
              </p>
            </div>
          </section>
        )}

        {activePage === 'Teachers' && (
          <section className="page-content">
            <div className="welcome-section">
              <div>
                <h1>Teachers</h1>
                <p>Manage teacher information and records.</p>
              </div>
            </div>
            <div className="content-card placeholder-card">
              <Users size={35} />
              <h3>Teacher Management</h3>
              <p>
                Teacher registration and information management will be
                available here.
              </p>
            </div>
          </section>
        )}

        {activePage === 'Classes' && (
          <section className="page-content">
            <div className="welcome-section">
              <div>
                <h1>Classes</h1>
                <p>Manage institution classes.</p>
              </div>
            </div>
            <div className="content-card placeholder-card">
              <School size={35} />
              <h3>Class Management</h3>
              <p>Class information and management will be available here.</p>
            </div>
          </section>
        )}

        {activePage === 'User Management' && (
          <section className="page-content">
            <div className="welcome-section">
              <div>
                <h1>User Management</h1>
                <p>Manage accounts and access permissions.</p>
              </div>
            </div>

            <div className="management-grid">
              <div className="content-card management-card">
                <GraduationCap size={27} />
                <h3>Student Accounts</h3>
                <p>Manage student login accounts and access.</p>
              </div>

              <div className="content-card management-card">
                <Users size={27} />
                <h3>Teacher Accounts</h3>
                <p>Manage teacher login accounts and access.</p>
              </div>

              <div className="content-card management-card">
                <ShieldCheck size={27} />
                <h3>Password Reset</h3>
                <p>Manage password reset requests securely.</p>
              </div>
            </div>
          </section>
        )}

        {activePage === 'Settings' && (
          <section className="page-content">
            <div className="welcome-section">
              <div>
                <h1>Settings</h1>
                <p>Manage your institution settings.</p>
              </div>
            </div>
            <div className="content-card placeholder-card">
              <Settings size={35} />
              <h3>General Settings</h3>
              <p>
                Institution preferences and configuration options will be
                available here.
              </p>
            </div>
          </section>
        )}
      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .app-container {
          min-height: 100vh;
          background: #f6f7fb;
          color: #25283b;
          display: flex;
          font-family: Arial, Helvetica, sans-serif;
        }

        .sidebar {
          width: 250px;
          min-height: 100vh;
          background: #ffffff;
          border-right: 1px solid #e9eaf0;
          padding: 25px 17px;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 10px;
          font-size: 23px;
          font-weight: 700;
          color: #282c49;
        }

        .brand-icon {
          width: 39px;
          height: 39px;
          background: #e9eaff;
          color: #6265d8;
          border-radius: 11px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-menu {
          display: none;
          margin-left: auto;
          border: none;
          background: transparent;
          cursor: pointer;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 37px 4px 32px;
          padding: 14px 10px;
          background: #f7f7fc;
          border-radius: 12px;
        }

        .profile-avatar,
        .topbar-avatar {
          width: 39px;
          height: 39px;
          border-radius: 50%;
          background: #e5e6ff;
          color: #6265d8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .admin-profile h3 {
          font-size: 13px;
          margin: 0 0 5px;
        }

        .admin-profile p {
          font-size: 11px;
          color: #888b9d;
          margin: 0;
        }

        .menu-label {
          color: #a1a3b2;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
          padding-left: 12px;
          margin-bottom: 13px;
        }

        .navigation {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 13px;
          width: 100%;
          border: none;
          background: transparent;
          padding: 13px 12px;
          border-radius: 9px;
          color: #777b8e;
          font-size: 13px;
          text-align: left;
          cursor: pointer;
          transition: 0.2s;
        }

        .nav-item:hover {
          background: #f4f4ff;
          color: #6265d8;
        }

        .nav-item.active {
          background: #eeeeff;
          color: #6265d8;
          font-weight: 600;
        }

        .sidebar-bottom {
          margin-top: auto;
          padding-top: 25px;
        }

        .logout {
          color: #dc626b;
        }

        .main-content {
          flex: 1;
          min-width: 0;
        }

        .topbar {
          height: 85px;
          background: #ffffff;
          border-bottom: 1px solid #e9eaf0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 38px;
        }

        .topbar h2 {
          font-size: 18px;
          margin: 0 0 5px;
          color: #292c43;
        }

        .topbar p {
          font-size: 12px;
          color: #999bab;
          margin: 0;
        }

        .topbar-right {
          display: flex;
          align-items: center;
        }

        .page-content {
          padding: 35px 38px;
          max-width: 1450px;
          margin: auto;
        }

        .welcome-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 27px;
        }

        .welcome-section h1 {
          font-size: 23px;
          margin: 0 0 8px;
          color: #292c43;
        }

        .welcome-section p {
          font-size: 13px;
          color: #9295a5;
          margin: 0;
        }

        .date-display {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #777b8e;
          font-size: 12px;
          background: white;
          border: 1px solid #ebecf2;
          padding: 11px 14px;
          border-radius: 9px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 25px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #ebecf2;
          border-radius: 13px;
          padding: 23px;
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .students-icon {
          background: #eeeeff;
          color: #6265d8;
        }

        .teachers-icon {
          background: #e6f6f1;
          color: #36a88b;
        }

        .announcements-icon {
          background: #fff1e6;
          color: #e99a50;
        }

        .stat-card p {
          color: #85899b;
          font-size: 12px;
          margin: 0 0 8px;
        }

        .stat-card h2 {
          color: #292c43;
          font-size: 24px;
          margin: 0;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.7fr 1fr;
          gap: 20px;
        }

        .content-card {
          background: #ffffff;
          border: 1px solid #ebecf2;
          border-radius: 13px;
          padding: 23px;
        }

        .card-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 22px;
        }

        .card-heading h3 {
          font-size: 15px;
          color: #292c43;
          margin: 0 0 6px;
        }

        .card-heading p {
          font-size: 11px;
          color: #999bab;
          margin: 0;
        }

        .heading-icon {
          color: #7779d9;
        }

        .announcement-list {
          display: flex;
          flex-direction: column;
        }

        .announcement-item {
          display: flex;
          gap: 13px;
          padding: 14px 0;
          border-bottom: 1px solid #f0f0f4;
        }

        .announcement-item:last-child {
          border-bottom: none;
        }

        .announcement-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #7779d9;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .announcement-info h4,
        .published-details h4 {
          margin: 0 0 6px;
          font-size: 13px;
          color: #33364c;
        }

        .announcement-info p,
        .published-details p {
          font-size: 12px;
          line-height: 1.6;
          color: #85899b;
          margin: 0 0 7px;
        }

        .announcement-info span,
        .published-details span {
          font-size: 10px;
          color: #a2a4b2;
        }

        .quick-actions-card {
          height: fit-content;
        }

        .action-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 13px;
          background: #fafaff;
          border: 1px solid #ededf8;
          border-radius: 10px;
          padding: 14px;
          margin-bottom: 12px;
          color: #484b62;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          text-align: left;
          transition: 0.2s;
        }

        .action-button:hover {
          background: #eeeeff;
          border-color: #dadaff;
        }

        .action-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e9eaff;
          color: #6265d8;
        }

        .teacher-action-icon {
          background: #e6f6f1;
          color: #36a88b;
        }

        .form-card {
          max-width: 850px;
          margin-bottom: 25px;
        }

        .form-group {
          margin-bottom: 19px;
        }

        .form-group label {
          display: block;
          color: #45485e;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 9px;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 13px 14px;
          border: 1px solid #e4e5ed;
          border-radius: 8px;
          background: #fcfcfe;
          color: #33364c;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          resize: vertical;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #7779d9;
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #b0b1bd;
        }

        .form-buttons {
          display: flex;
          gap: 10px;
        }

        .publish-button {
          background: #6265d8;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .publish-button:hover {
          background: #5053c3;
        }

        .cancel-button {
          background: #f0f0f5;
          color: #55586d;
          border: none;
          padding: 12px 18px;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
        }

        .published-list {
          display: flex;
          flex-direction: column;
        }

        .published-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding: 17px 0;
          border-bottom: 1px solid #f0f0f4;
        }

        .published-item:last-child {
          border-bottom: none;
        }

        .published-details {
          min-width: 0;
        }

        .announcement-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .edit-button,
        .delete-button {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 8px;
          cursor: pointer;
        }

        .edit-button {
          background: #eeeeff;
          color: #6265d8;
        }

        .delete-button {
          background: #fff0f0;
          color: #dc626b;
        }

        .empty-state {
          padding: 25px 0;
          text-align: center;
          color: #999bab;
          font-size: 12px;
        }

        .placeholder-card {
          min-height: 230px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #7779d9;
        }

        .placeholder-card h3 {
          color: #33364c;
          font-size: 16px;
          margin: 15px 0 7px;
        }

        .placeholder-card p {
          color: #9295a5;
          font-size: 12px;
          line-height: 1.6;
        }

        .management-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .management-card {
          min-height: 180px;
        }

        .management-card > :global(svg) {
          color: #7779d9;
          margin-bottom: 12px;
        }

        .management-card h3 {
          font-size: 14px;
          margin: 0 0 8px;
          color: #33364c;
        }

        .management-card p {
          font-size: 12px;
          line-height: 1.6;
          color: #9295a5;
          margin: 0;
        }

        .mobile-menu-button {
          display: none;
          background: transparent;
          border: none;
          color: #55586d;
          cursor: pointer;
        }

        .mobile-overlay {
          display: none;
        }

        @media (max-width: 1000px) {
          .stats-grid {
            grid-template-columns: 1fr 1fr;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .management-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 700px) {
          .sidebar {
            position: fixed;
            z-index: 20;
            left: -260px;
            top: 0;
            height: 100vh;
            transition: left 0.25s ease;
          }

          .sidebar-open {
            left: 0;
          }

          .close-menu {
            display: flex;
          }

          .mobile-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(20, 20, 40, 0.35);
            z-index: 15;
          }

          .mobile-menu-button {
            display: flex;
            margin-right: 13px;
          }

          .topbar {
            height: 75px;
            padding: 0 18px;
            justify-content: flex-start;
          }

          .topbar-right {
            margin-left: auto;
          }

          .page-content {
            padding: 25px 17px;
          }

          .welcome-section {
            align-items: flex-start;
            flex-direction: column;
          }

          .welcome-section h1 {
            font-size: 20px;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .stat-card {
            padding: 18px;
          }

          .management-grid {
            grid-template-columns: 1fr;
          }

          .content-card {
            padding: 18px;
          }

          .published-item {
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
