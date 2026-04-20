"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-primary/10 blur-[120px] rounded-full -z-10" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gray-900">
              Create Stunning AI Images <br />
              <span className="text-primary text-glow">With Your Own Vision</span>
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg mb-10">
              The futuristic AI platform that turns your ideas into masterpieces using Gemini AI. 
              Personalized, powerful, and truly yours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold rounded-xl hover:scale-105 transition-transform glow-yellow shadow-xl"
              >
                Start Generating Now
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto px-8 py-4 glass border-gray-200 text-gray-900 font-bold rounded-xl hover:bg-gray-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>

          {/* Floating Element Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-20 relative max-w-4xl mx-auto"
          >
            <div className="aspect-video glass-yellow rounded-3xl p-4 border border-primary/20 relative overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center border border-gray-100 relative overflow-hidden">
                    <img src="/hero-ai.png" alt="AI Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent" />
                </div>
                {/* Decorative Dots */}
                <div className="absolute top-8 left-8 flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Styles for Every Imagination</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Indian Wedding', img: '/styles/wedding.png', slug: 'wedding' },
              { name: 'Birthday Celebration', img: '/styles/birthday.png', slug: 'birthday' },
              { name: 'Rajasthani Heritage', img: '/styles/rajasthani.png', slug: 'rajasthani' },
              { name: 'Tropical Garden', img: '/styles/tropical.png', slug: 'tropical' }
            ].map((style, i) => (
              <motion.div
                key={style.name}
                whileHover={{ y: -10 }}
                className="glass bg-white border-gray-200 rounded-2xl p-6 text-left group transition-all hover:shadow-xl"
              >
                <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden relative border border-gray-100">
                    <img 
                        src={style.img} 
                        alt={style.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{style.name}</h3>
                <p className="text-gray-600 text-sm">Hyper-realistic {style.name.toLowerCase()} generations.</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
