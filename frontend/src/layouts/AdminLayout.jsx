import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminNavbar from '../components/AdminNavbar';
import { statsAPI } from '../services/api';

const titleMap = {
  '/admin': 'Dashboard Overview',
  '/admin/products': 'Products & Solutions Management',
  '/admin/services': 'Services Catalog Management',
  '/admin/projects': 'Client Projects & Portfolio',
  '/admin/messages': 'Contact Inquiries & Submissions',
  '/admin/users': 'User Accounts & Roles',
};

export default function AdminLayout() {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await statsAPI.getStats();
        setUnreadCount(res.data.unreadMessages || 0);
      } catch (err) {
        console.warn('Could not refresh admin counter:', err.message);
      }
    };
    fetchStats();
  }, [location.pathname]);

  const currentTitle = titleMap[location.pathname] || 'Admin Console';

  return (
    <div className="admin-layout">
      <AdminSidebar unreadMessagesCount={unreadCount} />
      <div className="admin-main-content">
        <AdminNavbar title={currentTitle} />
        <main className="admin-body">
          <Outlet context={{ refreshStats: () => {} }} />
        </main>
      </div>
    </div>
  );
}
