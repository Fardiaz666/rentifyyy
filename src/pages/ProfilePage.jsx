import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, MapPin, Edit2, Camera, Save } from 'lucide-react';

const ProfilePage = ({ onBack }) => {
    // Simulasi data user
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "0812-3456-7890",
        address: "Jl. Jendral Sudirman No. Kav 52-53, Senayan, Kebayoran Baru, Jakarta Selatan 12190",
        // Avatar default: Ilustrasi 2D simpel (Ganti URL ini jika punya gambar sendiri di assets)
        avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=John" 
    });

    const [isEditing, setIsEditing] = useState(false);

    // Handle perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    // Handle tombol Simpan
    const handleSave = () => {
        setIsEditing(false);
        alert("Profil berhasil diperbarui!");
    };

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-screen bg-slate-50 pt-24 pb-20 font-sans text-slate-800"
        >
            <div className="container mx-auto px-6 max-w-3xl">
                {/* Header & Back Button */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={onBack} 
                        className="p-2 hover:bg-white rounded-full transition shadow-sm bg-white/50 border border-slate-200 text-slate-500 hover:text-[#00c0d4]"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-black text-slate-900">Profil Saya</h1>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden relative">
                    
                    {/* Cover Area (Background Hiasan) */}
                    <div className="h-40 bg-slate-900 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#14e9ff] rounded-full mix-blend-overlay filter blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-x-1/2 translate-y-1/2"></div>
                    </div>

                    <div className="px-8 pb-10 relative">
                        {/* Avatar Section */}
                        <div className="flex justify-between items-end -mt-16 mb-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full border-4 border-white bg-slate-100 overflow-hidden shadow-lg flex items-center justify-center">
                                    {/* Gambar Profil 2D */}
                                    <img 
                                        src={user.avatar} 
                                        alt="Avatar" 
                                        className="w-full h-full object-cover bg-slate-100"
                                    />
                                </div>
                                {/* Tombol Ganti Foto (Hanya Tampil saat Edit) */}
                                {isEditing && (
                                    <button className="absolute bottom-1 right-1 p-2 bg-[#14e9ff] text-slate-900 rounded-full shadow-md hover:bg-white transition animate-bounce-short">
                                        <Camera size={16} />
                                    </button>
                                )}
                            </div>
                            
                            {/* Tombol Edit/Simpan */}
                            <button 
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition shadow-lg ${isEditing ? 'bg-green-500 text-white hover:bg-green-600 shadow-green-500/30' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20'}`}
                            >
                                {isEditing ? (
                                    <> <Save size={16} /> Simpan </>
                                ) : (
                                    <> <Edit2 size={16} /> Edit Profil </>
                                )}
                            </button>
                        </div>

                        {/* Form Data Diri */}
                        <div className="space-y-6">
                            
                            {/* Nama Lengkap */}
                            <div className="group">
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Nama Lengkap</label>
                                <div className={`flex items-center gap-3 p-4 rounded-2xl border transition ${isEditing ? 'bg-white border-[#14e9ff] ring-4 ring-[#14e9ff]/10' : 'bg-slate-50 border-slate-200'}`}>
                                    <User className="text-slate-400" size={20} />
                                    <input 
                                        type="text" 
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="w-full bg-transparent outline-none font-bold text-slate-700 disabled:text-slate-600 text-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Email (Read Only) */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Email (Terverifikasi)</label>
                                    <div className="flex items-center gap-3 p-4 rounded-2xl border border-slate-200 bg-slate-50/50 cursor-not-allowed">
                                        <Mail className="text-slate-400" size={20} />
                                        <input 
                                            type="email" 
                                            value={user.email}
                                            disabled
                                            className="w-full bg-transparent outline-none font-medium text-slate-500"
                                        />
                                    </div>
                                </div>

                                {/* Nomor Telepon */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Nomor WhatsApp</label>
                                    <div className={`flex items-center gap-3 p-4 rounded-2xl border transition ${isEditing ? 'bg-white border-[#14e9ff] ring-4 ring-[#14e9ff]/10' : 'bg-slate-50 border-slate-200'}`}>
                                        <Phone className="text-slate-400" size={20} />
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={user.phone}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className="w-full bg-transparent outline-none font-medium text-slate-700 disabled:text-slate-600"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Alamat */}
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">Alamat Lengkap</label>
                                <div className={`flex items-start gap-3 p-4 rounded-2xl border transition ${isEditing ? 'bg-white border-[#14e9ff] ring-4 ring-[#14e9ff]/10' : 'bg-slate-50 border-slate-200'}`}>
                                    <MapPin className="text-slate-400 mt-1" size={20} />
                                    <textarea 
                                        name="address"
                                        value={user.address}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        rows="3"
                                        className="w-full bg-transparent outline-none font-medium text-slate-700 disabled:text-slate-600 resize-none leading-relaxed"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProfilePage;