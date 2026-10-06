import Service from '../models/Service.js';

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
};

// @desc    Get service by ID
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving service', error: error.message });
  }
};

// @desc    Create service
// @route   POST /api/services
// @access  Private/Admin
export const createService = async (req, res) => {
  try {
    const { title, description, shortDescription, icon, features } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    const service = new Service({
      title,
      description,
      shortDescription: shortDescription || description.slice(0, 100),
      icon: icon || 'Briefcase',
      features: Array.isArray(features) ? features : (features ? features.split(',').map(f => f.trim()) : []),
    });

    const saved = await service.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const { title, description, shortDescription, icon, features } = req.body;

    if (title) service.title = title;
    if (description) service.description = description;
    if (shortDescription !== undefined) service.shortDescription = shortDescription;
    if (icon) service.icon = icon;
    if (features !== undefined) {
      service.features = Array.isArray(features) ? features : features.split(',').map(f => f.trim());
    }

    const updated = await service.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private/Admin
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
};
