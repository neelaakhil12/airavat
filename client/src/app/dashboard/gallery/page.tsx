"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Download, ExternalLink, Trash2, LayoutGrid, List } from 'lucide-react';
import { toast } from 'react-hot-toast';

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${API_URL}/images/gallery`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setImages(data);
        } catch (error) {
            toast.error('Failed to load gallery');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 bg-white">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Your Gallery</h1>
                    <p className="text-gray-600">All your AI-generated masterpieces in one place</p>
                </div>
                <div className="flex bg-gray-100 rounded-lg p-1 border border-gray-200">
                    <button className="p-2 text-primary bg-white shadow-sm rounded-md"><LayoutGrid size={20}/></button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><List size={20}/></button>
                </div>
            </header>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : images.length === 0 ? (
                <div className="text-center py-20 bg-gray-50/50 rounded-[2.5rem] border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-red-900">No images yet</h3>
                    <p className="text-gray-600 mb-6">Start generating to fill up your gallery!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {images.map((img: any, i) => (
                        <motion.div
                            key={img._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/50 transition-all shadow-sm hover:shadow-xl"
                        >
                            <img src={img.imageUrl} alt="Generated" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-4">
                                <p className="text-xs text-primary font-bold mb-1 uppercase tracking-widest">{img.category}</p>
                                <p className="text-white text-[10px] line-clamp-2 mb-4 italic font-medium">"{img.promptUsed}"</p>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => window.open(img.imageUrl, '_blank')}
                                        className="flex-1 bg-primary text-black py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1 hover:bg-accent transition-all shadow-lg shadow-primary/20"
                                    >
                                        <Download size={14} /> Download
                                    </button>
                                    <button className="p-2 bg-white/20 rounded-lg text-white backdrop-blur-md hover:bg-red-500/40 hover:text-white transition-all">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalleryPage;
