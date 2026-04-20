const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    promptUsed: {
        type: String
    },
    referenceImageUrl: {
        type: String // If user uploaded an image for reference
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Image', ImageSchema);
