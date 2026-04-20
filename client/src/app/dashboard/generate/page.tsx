"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ChevronRight, Sparkles, Upload, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

const GeneratorPage = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState<any>(null);
    const [prompts, setPrompts] = useState([]);
    const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
    const [subject, setSubject] = useState('');
    const [style, setStyle] = useState('cinematic');
    const [generating, setGenerating] = useState(false);
    const [result, setResult] = useState<any>(null);

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/images/categories`);
            setCategories(data);
        } catch (error) {
            toast.error('Failed to load categories');
        }
    };

    const handleCategoryClick = async (category: any) => {
        setSelectedCategory(category);
        setSelectedPrompt(null);
        try {
            const { data } = await axios.get(`${API_URL}/images/prompts/${category._id}`);
            setPrompts(data);
        } catch (error) {
            toast.error('Failed to load prompts');
        }
    };

    const handleGenerate = async () => {
        if (!selectedPrompt) return toast.error('Please select a style reference');
        
        setGenerating(true);
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(
                `${API_URL}/images/generate`,
                {
                    promptId: selectedPrompt._id,
                    subject,
                    style
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setResult(data);
            toast.success('Image generated successfully!');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Generation failed');
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 bg-white pb-32">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Image Generator</h1>
                    <p className="text-gray-600">Bring your vision to life with Gemini AI</p>
                </div>
                {selectedCategory && (
                    <button 
                        onClick={() => {setSelectedCategory(null); setSelectedPrompt(null); setResult(null);}}
                        className="text-primary text-sm font-bold hover:underline"
                    >
                        Back to Categories
                    </button>
                )}
            </header>

            {!selectedCategory ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat: any) => (
                        <motion.div
                            key={cat._id}
                            whileHover={{ y: -5 }}
                            onClick={() => handleCategoryClick(cat)}
                            className="glass bg-white border-gray-100 rounded-2xl overflow-hidden cursor-pointer group hover:shadow-xl transition-all"
                        >
                            <img src={cat.previewImage} alt={cat.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="p-4">
                                <h3 className="font-bold text-lg text-gray-900">{cat.name}</h3>
                                <p className="text-gray-500 text-xs mt-1">{cat.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-gray-900">
                    {/* Style Selection */}
                    <div className="lg:col-span-1 space-y-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Sparkles size={18} className="text-primary" />
                            Step 1: Choose Style
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {prompts.map((p: any) => (
                                <div
                                    key={p._id}
                                    onClick={() => setSelectedPrompt(p)}
                                    className={`relative rounded-xl overflow-hidden cursor-pointer border-2 transition-all shadow-sm ${
                                        selectedPrompt?._id === p._id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-gray-200'
                                    }`}
                                >
                                    <img src={p.previewImage} alt={p.title} className="w-full h-32 object-cover" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2">
                                        <span className="text-white text-[10px] font-bold truncate">{p.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-6 bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <ChevronRight size={18} className="text-primary" />
                                Step 2: Customize
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subject (Who or what is in the image?)</label>
                                    <input 
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="e.g. A futuristic robot, A mystical queen"
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all shadow-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Style Details</label>
                                    <select 
                                        value={style}
                                        onChange={(e) => setStyle(e.target.value)}
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all shadow-sm"
                                    >
                                        <option value="cinematic">Cinematic</option>
                                        <option value="photorealistic">Photorealistic</option>
                                        <option value="concept art">Concept Art</option>
                                        <option value="digital painting">Digital Painting</option>
                                        <option value="anime style">Anime Style</option>
                                    </select>
                                </div>
                                <div className="p-6 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 bg-white hover:text-primary hover:border-primary/50 transition-all cursor-pointer">
                                    <Upload size={24} className="mb-2" />
                                    <span className="text-sm font-bold">Optional: Upload Reference Image</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleGenerate}
                                disabled={generating || !selectedPrompt}
                                className="w-full py-4 bg-primary text-black font-bold rounded-xl flex items-center justify-center gap-2 glow-yellow disabled:opacity-50 transition-all shadow-lg shadow-primary/10"
                            >
                                {generating ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
                                {generating ? 'Generating your masterpiece...' : 'Generate AI Image'}
                            </button>
                        </div>

                        {/* Result Display */}
                        {result && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass bg-white p-4 rounded-3xl border border-primary/20 shadow-2xl"
                            >
                                <img src={result.imageUrl} alt="Generated" className="w-full h-auto rounded-2xl" />
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm text-gray-600 italic font-medium">" {result.promptUsed} "</span>
                                    <button 
                                        className="px-6 py-2 bg-gray-100 rounded-lg text-sm font-bold hover:bg-gray-200 transition-all"
                                        onClick={() => window.open(result.imageUrl, '_blank')}
                                    >
                                        Download
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeneratorPage;
