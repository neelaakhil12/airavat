const mongoose = require('mongoose');

const PromptSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    previewImage: {
        type: String, // Cloudinary URL
        required: true
    },
    promptTemplate: {
        type: String, // Hidden template with placeholders like {subject}, {style}
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Prompt', PromptSchema);
