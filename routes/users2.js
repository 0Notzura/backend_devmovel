const express = require('express');
const User = require('../models/user2');

const router = express.Router();

// Route to get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to get user by ID
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Middleware to get user by ID
async function getUser(req, res, next) {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;