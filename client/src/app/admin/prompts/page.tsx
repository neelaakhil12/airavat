"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, Image as ImageIcon, Sparkles, Loader2, X } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManagePrompts = () => {
    const [categories, setCategories] = useState([]);
    const [prompts, setPrompts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [categoryForm, setCategoryForm] = useState({ name: '', description: '', previewImage: '' });

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data: cats } = await axios.get(`${API_URL}/images/categories`);
            setCategories(cats);
        } catch (error) {
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${API_URL}/admin/categories`, categoryForm, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Category created!');
            setShowCategoryModal(false);
            setCategoryForm({ name: '', description: '', previewImage: '' });
            fetchData();
        } catch (error) {
            toast.error('Failed to create category');
        }
    };

    return (
        <div className="space-y-10 bg-white min-h-screen pb-20">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Prompts & Categories</h1>
                    <p className="text-gray-600 font-medium">Manage style configurations and hidden templates</p>
                </div>
                <button 
                    onClick={() => setShowCategoryModal(true)}
                    className="px-6 py-3 bg-primary text-black font-bold rounded-xl flex items-center gap-2 glow-yellow hover:scale-105 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    Add New Category
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((cat: any) => (
                    <div key={cat._id} className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all">
                        <div className="relative h-48">
                            <img src={cat.previewImage} alt={cat.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-4 backdrop-blur-[2px]">
                                <button className="p-3 bg-white/20 text-white rounded-xl hover:bg-white/40 transition-all shadow-lg"><Edit3 size={20} /></button>
                                <button className="p-3 bg-red-500/40 text-white rounded-xl hover:bg-red-500/60 transition-all shadow-lg"><Trash2 size={20} /></button>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900">{cat.name}</h3>
                                <span className="text-[10px] bg-primary/10 text-primary font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-primary/20">Category</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">{cat.description}</p>
                            <button className="w-full py-4 border-2 border-gray-100 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500 hover:bg-gray-50 hover:text-black transition-all flex items-center justify-center gap-2">
                                <Sparkles size={16} />
                                View Configured Prompts
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Category Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg bg-white border border-gray-100 rounded-[3rem] p-10 relative shadow-2xl"
                    >
                        <button 
                            onClick={() => setShowCategoryModal(false)}
                            className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold mb-8 text-gray-900">Add New Category</h2>
                        <form onSubmit={handleCreateCategory} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Category Name</label>
                                <input 
                                    type="text"
                                    required
                                    value={categoryForm.name}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all shadow-sm"
                                    placeholder="e.g. Cyberpunk"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                                <textarea 
                                    required
                                    value={categoryForm.description}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all h-24 resize-none shadow-sm"
                                    placeholder="Short description..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Preview Image URL</label>
                                <input 
                                    type="text"
                                    required
                                    value={categoryForm.previewImage}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, previewImage: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-all shadow-sm"
                                    placeholder="https://images..."
                                />
                            </div>
                            <button 
                                type="submit"
                                className="w-full py-4 bg-primary text-black font-bold rounded-2xl glow-yellow transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                            >
                                <Plus size={20} />
                                Create New Category
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ManagePrompts;
