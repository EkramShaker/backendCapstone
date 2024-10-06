const MenuItem = require('../models/MenuItem');

// Add Menu Item (Admin only)
exports.addMenuItem = async (req, res) => {
  const { name, type, price, image } = req.body;

  // Ensure the user is an admin or authorized user
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const newItem = new MenuItem({ name, type, price, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add menu item' });
  }
};

// Get All Menu Items (Public access)
exports.getMenuItems = async (req, res) => {
  try {
    const menu = await MenuItem.find();
    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve menu' });
  }
};

// Update Menu Item (Admin only)
exports.updateMenuItem = async (req, res) => {
  const { name, type, price, image } = req.body;

  // Ensure the user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const menuItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { name, type, price, image },
      { new: true }
    );

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json(menuItem);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update menu item' });
  }
};

// Delete Menu Item (Admin only)
exports.deleteMenuItem = async (req, res) => {
  // Ensure the user is an admin
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete menu item' });
  }
};
