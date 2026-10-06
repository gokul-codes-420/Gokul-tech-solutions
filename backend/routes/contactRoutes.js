import express from 'express';
import {
  createContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createContact)
  .get(protect, adminOnly, getContacts);

router.route('/:id')
  .put(protect, adminOnly, updateContactStatus)
  .delete(protect, adminOnly, deleteContact);

export default router;
