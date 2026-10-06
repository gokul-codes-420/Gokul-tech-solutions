import User from '../models/User.js';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Contact from '../models/Contact.js';

// @desc    Get counts & statistics for admin dashboard
// @route   GET /api/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalServices, totalProjects, totalMessages, unreadMessages] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Service.countDocuments(),
      Project.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'unread' }),
    ]);

    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalUsers,
      totalProducts,
      totalServices,
      totalProjects,
      totalMessages,
      unreadMessages,
      recentContacts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve admin stats', error: error.message });
  }
};
