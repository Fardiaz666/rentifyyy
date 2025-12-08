import React from 'react';
import { MapPin } from 'lucide-react';

const Footer = () => (
    <footer className="bg-slate-50 text-slate-500 py-16 border-t border-slate-200">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-[#14e9ff] rounded-lg flex items-center justify-center text-slate-900">
                             <MapPin size={18} strokeWidth={3} />
                        </div>
                        <span className="text-2xl font-black text-slate-900">Rentify</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-6">
                        Marketplace sewa barang berbasis lokasi #1 di Jabodetabek. Sewa pintar, hidup lebih ringan.
                    </p>
                    <div className="flex gap-4">
                        <div className="w-8 h-8 bg-white border border-slate-200 rounded-full hover:bg-[#14e9ff] transition cursor-pointer"></div>
                        <div className="w-8 h-8 bg-white border border-slate-200 rounded-full hover:bg-[#14e9ff] transition cursor-pointer"></div>
                        <div className="w-8 h-8 bg-white border border-slate-200 rounded-full hover:bg-[#14e9ff] transition cursor-pointer"></div>
                    </div>
                </div>
                
                <div>
                    <h4 className="text-slate-900 font-bold mb-4">Rentify</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-[#00b5c8] transition">Tentang Kami</a></li>
                        <li><a href="#" className="hover:text-[#00b5c8] transition">Karir</a></li>
                        <li><a href="#" className="hover:text-[#00b5c8] transition">Blog</a></li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="text-slate-900 font-bold mb-4">Dukungan</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-[#00b5c8] transition">Pusat Bantuan</a></li>
                        <li><a href="#" className="hover:text-[#00b5c8] transition">Syarat & Ketentuan</a></li>
                        <li><a href="#" className="hover:text-[#00b5c8] transition">Kebijakan Privasi</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-slate-900 font-bold mb-4">Lokasi Populer</h4>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-[#00b5c8] transition">Jakarta Selatan</a></li>
                        <li><a href="#" className="hover:text-[#00b5c8] transition">Tangerang Selatan</a></li>
                        <li><a href="#" className="hover:text-[#00b5c8] transition">Depok</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
                {/* PERUBAHAN TAHUN DI SINI: dari 2024 menjadi 2025 */}
                <p>&copy; 2025 Rentify Indonesia. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <span>Sewa Pintar.</span>
                    <span>Hidup Lebih Ringan.</span>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;