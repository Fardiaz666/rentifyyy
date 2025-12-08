import React from 'react';
import { Zap, MapPin, ShieldCheck } from 'lucide-react';

const ValuePropSection = () => {
    const props = [
        { icon: Zap, title: "Hemat & Fleksibel", desc: "Cukup sewa saat butuh, tanpa komitmen beli mahal." },
        { icon: MapPin, title: "Praktis & Dekat", desc: "Temukan barang di sekitarmu (Jabodetabek) dalam hitungan menit." },
        { icon: ShieldCheck, title: "Aman & Terpercaya", desc: "Verifikasi pengguna dan sistem rating bikin transaksi tenang." },
    ];

    return (
        <section className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Kenapa Pakai Rentify?</h2>
                    <p className="text-slate-500">Solusi cerdas untuk gaya hidup urban yang dinamis dan efisien.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {props.map((item, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:border-[#14e9ff]/50 transition duration-300 text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#14e9ff]/5 rounded-bl-[100px] -mr-8 -mt-8 transition group-hover:bg-[#14e9ff]/10"></div>
                            <div className="w-14 h-14 bg-slate-900 text-[#14e9ff] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-900/10">
                                <item.icon size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ValuePropSection;