const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Category = require('../models/Category');
const Prompt = require('../models/Prompt');
const Image = require('../models/Image');
const { protect, admin } = require('../middleware/auth');

// @route GET /api/admin/users
router.get('/users', protect, admin, async (req, res) => {
    try {
        const users = await User.find({}).select('-otp');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route POST /api/admin/categories
router.post('/categories', protect, admin, async (req, res) => {
    const { name, description, previewImage } = req.body;
    try {
        const category = new Category({ name, description, previewImage });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route POST /api/admin/prompts
router.post('/prompts', protect, admin, async (req, res) => {
    const { categoryId, title, previewImage, promptTemplate } = req.body;
    try {
        const prompt = new Prompt({ category: categoryId, title, previewImage, promptTemplate });
        await prompt.save();
        res.status(201).json(prompt);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route GET /api/admin/analytics
router.get('/analytics', protect, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalImages = await Image.countDocuments();
        const totalSubscribed = await User.countDocuments({ isSubscribed: true });
        
        // Basic analytics
        res.status(200).json({
            totalUsers,
            totalImages,
            totalSubscribed,
            revenue: totalSubscribed * 129
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
