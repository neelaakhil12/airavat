const { GoogleGenAI } = require('@google/genai');

const generateImageWithGemini = async (apiKey, prompt, options = {}) => {
    try {
        const genAI = new GoogleGenAI(apiKey);
        
        // Note: As per latest documentation, the model might be 'imagen-3.0-generate-001' 
        // or accessible via a specific generation method.
        // We'll use a standard approach for Gemini-Imagen integration.
        const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-001" });

        const result = await model.generateImages({
            prompt: prompt,
            numberOfImages: 1,
            aspectRatio: options.aspectRatio || "1:1",
            safetySettings: options.safetySettings || []
        });

        // The result usually contains base64 data or a URL
        return result.images[0];
    } catch (error) {
        console.error('AI Generation Error:', error);
        throw new Error('Failed to generate image with Gemini');
    }
};

const validateApiKey = async (apiKey) => {
    try {
        const genAI = new GoogleGenAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        await model.generateContent("Hello"); // Basic test call
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = { generateImageWithGemini, validateApiKey };
