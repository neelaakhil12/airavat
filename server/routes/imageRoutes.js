const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { decrypt } = require('../middleware/encryption');
const { generateImageWithGemini } = require('../services/aiService');
const { uploadFromUrl } = require('../services/storageService');
const Category = require('../models/Category');
const Prompt = require('../models/Prompt');
const Image = require('../models/Image');
const User = require('../models/User');

// @route GET /api/images/categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route GET /api/images/prompts/:categoryId
router.get('/prompts/:categoryId', async (req, res) => {
    try {
        const prompts = await Prompt.find({ category: req.params.categoryId, isActive: true });
        res.status(200).json(prompts);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @route POST /api/images/generate
router.post('/generate', protect, async (req, res) => {
    const { promptId, subject, style, referenceImageUrl } = req.body;

    try {
        const user = await User.findById(req.user.id);
        
        // 1. Check Subscription
        if (!user.isSubscribed || (user.subscriptionExpiry && user.subscriptionExpiry < new Date())) {
            return res.status(403).json({ message: 'Active subscription required' });
        }

        // 2. Check API Key
        if (!user.geminiApiKey) {
            return res.status(400).json({ message: 'Gemini API Key missing' });
        }

        const apiKey = decrypt(user.geminiApiKey);

        // 3. Fetch Prompt Template
        const promptData = await Prompt.findById(promptId);
        if (!promptData) return res.status(404).json({ message: 'Prompt template not found' });

        // 4. Merge Logic
        let finalPrompt = promptData.promptTemplate
            .replace('{subject}', subject || 'a unique subject')
            .replace('{style}', style || 'cinematic');
        
        finalPrompt += ", high quality, ultra realistic, 4k, masterpiece";

        // 5. Generate with AI
        const aiResponse = await generateImageWithGemini(apiKey, finalPrompt, {
            // Include referenceImageUrl logic here if supported by SDK
        });

        // 6. Upload to Cloudinary
        const uploadResult = await uploadFromUrl(aiResponse.url); // Assuming AI returns a URL

        // 7. Save to Gallery
        const newImage = new Image({
            userId: user._id,
            imageUrl: uploadResult.secure_url,
            category: promptData.title,
            promptUsed: finalPrompt,
            referenceImageUrl: referenceImageUrl
        });

        await newImage.save();

        res.status(201).json(newImage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Generation failed' });
    }
});

// @route GET /api/images/gallery
router.get('/gallery', protect, async (req, res) => {
    try {
        const images = await Image.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
