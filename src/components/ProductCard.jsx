import React from 'react';
import { Heart, MapPin, Star, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

// Tambahkan prop 'onClick' di sini
const ProductCard = ({ product, addToCart, onClick }) => {
    return (
        // Tambahkan onClick pada div utama dan cursor-pointer
        <div 
            onClick={() => onClick(product)} 
            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col h-full overflow-hidden relative cursor-pointer"
        >
            <div className="relative h-60 overflow-hidden bg-slate-100">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-red-50 hover:text-red-500 text-slate-400 transition z-10">
                    <Heart size={20} />
                </div>
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <MapPin size={10} className="text-[#14e9ff]" /> {product.location}
                </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                    <span className="text-[10px] font-bold tracking-wider text-[#00c0d4] uppercase bg-[#14e9ff]/10 px-2 py-1 rounded-md">
                        {product.category}
                    </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-[#00b5c8] transition line-clamp-2">
                    {product.name}
                </h3>
                
                <div className="flex items-center gap-1 text-slate-500 text-xs mb-6">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" /> 
                    <span className="font-bold text-slate-700">{product.rating}</span> 
                    <span className="text-slate-400">({product.reviews} review)</span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                    <div>
                        <p className="text-xs text-slate-400 font-medium mb-0.5">Mulai dari</p>
                        <p className="text-xl font-black text-slate-900">{formatCurrency(product.pricePerDay)}</p>
                    </div>
                    {/* Stop Propagation agar klik tombol keranjang tidak membuka detail */}
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                        }}
                        className="bg-slate-100 text-slate-900 hover:bg-[#14e9ff] p-3.5 rounded-2xl transition-all duration-300 hover:rotate-12 hover:shadow-lg"
                    >
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;