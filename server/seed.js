const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Prompt = require('./models/Prompt');

dotenv.config();

const categories = [
    {
        name: 'Indian Wedding',
        description: 'Luxurious silk sherwanis, turbans, and festive gold decor',
        previewImage: '/styles/wedding.png'
    },
    {
        name: 'Birthday Celebration',
        description: 'Pastel outfits, balloons, cakes, and family warmth',
        previewImage: '/styles/birthday.png'
    },
    {
        name: 'Rajasthani Heritage',
        description: 'Embroidered jackets, dhoti, and rustic marigold strings',
        previewImage: '/styles/rajasthani.png'
    },
    {
        name: 'Tropical Garden',
        description: 'Vibrant orchids, hibiscus, and dreamy sunlight dappling',
        previewImage: '/styles/tropical.png'
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB for seeding...');

        await Category.deleteMany({});
        await Prompt.deleteMany({});

        const createdCategories = await Category.insertMany(categories);
        console.log('Categories seeded!');

        const prompts = [
            {
                category: createdCategories[0]._id,
                title: 'Royal Indian Wedding',
                previewImage: '/styles/wedding.png',
                promptTemplate: 'Using the uploaded image of {subject}, generate a hyper-realistic portrait of them during an Indian wedding ceremony. Subject wears a tiny silk sherwani with gold embroidery and a matching turban. Surround the subject with decorative flowers, miniature wedding props, and soft candlelight. Capture gentle light reflections on silk fabric and skin with a 50mm lens, f/1.4 aperture for creamy bokeh. Colors are rich golds, reds, and ivory tones with soft highlights.'
            },
            {
                category: createdCategories[1]._id,
                title: 'Classic Birthday',
                previewImage: '/styles/birthday.png',
                promptTemplate: 'Using the uploaded image of {subject}, generate a hyper-realistic portrait during a family birthday celebration at home. Subject is seated on a decorative soft mat wearing a pastel-colored outfit with tiny embroidered stars. Surround the subject with balloons, a small birthday cake, and colorful confetti. Capture soft ambient light using an 85mm lens, f/1.8 aperture for shallow depth of field. Colors should be pastel blues, pinks, yellows, and creams.'
            },
            {
                category: createdCategories[2]._id,
                title: 'Traditional Rajasthani',
                previewImage: '/styles/rajasthani.png',
                promptTemplate: 'Using the uploaded image of {subject}, generate a hyper-realistic portrait with the subject wearing a tiny Rajasthani-style embroidered jacket and dhoti, seated on a colorful hand-painted wooden floor mat. Surround the subject with small pots, miniature camels, and marigold strings. Capture warm late afternoon sunlight with soft shadows using a 50mm lens, f/1.8 aperture. Background should include soft-focus traditional Rajasthani motifs and rustic walls.'
            },
            {
                category: createdCategories[3]._id,
                title: 'The Tropical Garden',
                previewImage: '/styles/tropical.png',
                promptTemplate: 'Using the uploaded image of {subject}, generate a hyper-realistic portrait of the subject in a tropical garden with exotic flowers like orchids and hibiscus. Subject sits on a soft pastel blanket with small decorative props: mini butterflies, small clay pots, and fresh petals. Sunlight filters through dense leaves, creating dappled lighting on face. Use a 85mm lens with f/1.8 aperture for shallow depth of field, softening the dense greenery in the background.'
            }
        ];

        await Prompt.insertMany(prompts);
        console.log('Hyper-realistic Prompts seeded!');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedDB();
