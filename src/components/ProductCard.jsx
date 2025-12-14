import React from 'react';
import { Heart, MapPin, Star, ShoppingCart, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

// Menerima prop 'onClick' untuk navigasi ke detail
const ProductCard = ({ product, addToCart, onClick }) => {
    return (
        <div 
            onClick={() => onClick(product)} 
            className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-[0_10px_40px_rgba(1,111,248,0.15)] transition-all duration-300 group flex flex-col h-full overflow-hidden relative cursor-pointer"
        >
            <div className="relative h-60 overflow-hidden bg-slate-100">
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                        e.target.onerror = null;
                        // Fallback image jika gagal load
                        e.target.src = 'https://placehold.co/600x400/eeeeee/cccccc?text=Gambar+Tidak+Tersedia'; 
                    }}
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-red-50 hover:text-red-500 text-slate-400 transition z-10 shadow-sm">
                    <Heart size={20} />
                </div>
                {/* Badge Lokasi */}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm">
                    <MapPin size={10} className="text-[#016ff8]" /> {product.location}
                </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                    <span className="text-[10px] font-bold tracking-wider text-[#016ff8] uppercase bg-[#016ff8]/10 px-2 py-1 rounded-md inline-block">
                        {product.category}
                    </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg leading-snug mb-2 group-hover:text-[#016ff8] transition line-clamp-2">
                    {product.name}
                </h3>
                
                <div className="flex items-center gap-1 text-slate-500 text-xs mb-6">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" /> 
                    <span className="font-bold text-slate-700">{product.rating || 'N/A'}</span> 
                    <span className="text-slate-400">({product.reviews || 0} review)</span>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-50">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-xs text-slate-400 font-medium mb-0.5">Mulai dari</p>
                            <p className="text-xl font-black text-slate-900">{formatCurrency(product.pricePerDay)}</p>
                        </div>
                        {/* Tombol Keranjang Kecil */}
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                            }}
                            className="bg-slate-100 text-slate-900 hover:bg-[#016ff8] hover:text-white p-3 rounded-xl transition-all duration-300"
                        >
                            <ShoppingCart size={20} />
                        </button>
                    </div>
                    
                    {/* UPDATE CTA: Teks Lebih Persuasif */}
                    <button 
                        onClick={(e) => {
                            e.stopPropagation(); // Mencegah klik detail
                            // Logic bisa diarahkan ke search lokasi atau langsung sewa
                            addToCart(product); 
                        }}
                        disabled={!product.availability}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 ${
                            product.availability 
                            ? 'bg-[#016ff8]/10 text-[#016ff8] hover:bg-[#016ff8] hover:text-white' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                        {product.availability ? "Butuh hari ini? Cari yang terdekat." : "Tidak Tersedia"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
