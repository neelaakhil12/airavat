const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { encrypt } = require('../middleware/encryption');
const { validateApiKey } = require('../services/aiService');

// @route POST /api/user/save-api-key
router.post('/save-api-key', protect, async (req, res) => {
    const { apiKey } = req.body;
    if (!apiKey) return res.status(400).json({ message: 'API key is required' });

    try {
        // Validate key before saving
        const isValid = await validateApiKey(apiKey);
        if (!isValid) return res.status(400).json({ message: 'Invalid Gemini API Key' });

        const encryptedKey = encrypt(apiKey);
        const user = await User.findById(req.user.id);
        user.geminiApiKey = encryptedKey;
        await user.save();

        res.status(200).json({ message: 'API Key saved securely' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/user/profile
router.get('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-otp');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
