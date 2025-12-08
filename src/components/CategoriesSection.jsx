import React from 'react';
import { categories } from '../data/mockData';
import { motion } from 'framer-motion'; // Opsional: Tambah animasi dikit biar enak

// Menerima prop 'onCategoryClick' dari parent (HomePage)
const CategoriesSection = ({ onCategoryClick }) => {
    return (
        <section className="py-12 container mx-auto px-6 relative z-20 -mt-16">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                <h3 className="text-center text-slate-900 font-bold mb-8 uppercase tracking-widest text-xs">
                    Kategori Pilihan Rentify
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, idx) => (
                        <motion.button 
                            key={idx}
                            // PENTING: Saat diklik, panggil fungsi dari props
                            onClick={() => onCategoryClick(cat.slug)} 
                            
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-[#14e9ff]/10 transition duration-300 border border-transparent hover:border-[#14e9ff]/20 cursor-pointer"
                        >
                            <div className="w-12 h-12 mb-3 bg-slate-50 rounded-xl flex items-center justify-center text-slate-700 group-hover:bg-[#14e9ff] group-hover:text-slate-900 transition duration-300 shadow-sm">
                                <cat.icon size={24} />
                            </div>
                            <span className="text-xs font-bold text-slate-700 text-center leading-tight group-hover:text-slate-900">
                                {cat.name}
                            </span>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;