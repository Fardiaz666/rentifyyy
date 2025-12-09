import { PartyPopper, Home, Armchair, Car, Baby, Camera } from 'lucide-react';

// --- BAGIAN IMPORT GAMBAR LOKAL ---
// Pastikan nama file ini SAMA PERSIS dengan yang ada di folder src/assets/
import purifierImg from '../assets/air.jpeg'; 
import kursiImg from '../assets/kursi.jpg';
import vespaImg from '../assets/vespa.jpg';
import ps5Img from '../assets/ps5.jpg';
import jblImg from '../assets/jbl.jpg';
import robotImg from '../assets/robot.jpg';
import strollerImg from '../assets/stroller.jpg';
import perosotanImg from '../assets/perosotan.jpg';
import gendonganImg from '../assets/gendongan.jpg';
// Pastikan file-file placeholder ini ada atau hapus importnya jika tidak dipakai
// import nmaxImg from '../assets/Nmax.jpg'; 
// import kameraImg from '../assets/Kamera.jpg'; 
// import kosanImg from '../assets/Kosan.jpg';
// import proyektorImg from '../assets/Proyektor.jpg';
// import kebayaImg from '../assets/Kebaya.jpeg';
// import koperImg from '../assets/Koper.jpeg';
// import droneImg from '../assets/Drone.jpg';
// import sepedaImg from '../assets/Sepeda.jpg';


// --- DATA KATEGORI ---
// PENTING: Hanya boleh ada SATU deklarasi 'categories'
export const categories = [
    { name: 'Momen & Perayaan', icon: PartyPopper, slug: 'momen' },
    { name: 'Rumah & Hunian', icon: Home, slug: 'rumah' },
    { name: 'Acara & Keluarga', icon: Armchair, slug: 'acara' },
    { name: 'Perjalanan & Kendaraan', icon: Car, slug: 'perjalanan' },
    { name: 'Bayi & Si Kecil', icon: Baby, slug: 'bayi' },
    { name: 'Studio Kreator', icon: Camera, slug: 'kreator' },
];

// --- DATA PRODUK MENTAH AWAL (INITIAL_PRODUCTS) ---
export const INITIAL_PRODUCTS = [
  // --- KATEGORI 1: BAYI & SI KECIL ---
  { 
    id: '1', 
    name: 'Stroller Doona+ (Car Seat & Stroller)', 
    category: 'Bayi & Si Kecil', 
    description: 'Stroller revolusioner yang bisa jadi car seat dalam hitungan detik. Sangat praktis untuk traveling atau jalan-jalan di mall. Steril UV sebelum sewa.', 
    pricePerDay: 150000, 
    imageUrl: strollerImg, // Menggunakan variabel import
    location: 'Jakarta Selatan', 
    availability: true, 
    rating: 5.0, 
    reviews: 12,
    specs: { "Berat Maks": "13 kg", "Fitur": "2-in-1", "Kondisi": "Steril" },
    stock: 2
  },
  { 
    id: '15', 
    name: 'Mainan Perosotan Anak (Labeille)', 
    category: 'Bayi & Si Kecil', 
    description: 'Perosotan anak dengan bahan plastik aman dan kokoh. Cocok untuk playdate di rumah atau acara ulang tahun balita. Mudah dirakit.', 
    pricePerDay: 75000, 
    imageUrl: perosotanImg, 
    location: 'Depok', 
    availability: true, 
    rating: 4.8, 
    reviews: 8,
    specs: { "Usia": "1-4 Tahun", "Beban Maks": "25 kg", "Material": "Plastik HDPE" },
    stock: 3
  },
  { 
    id: '16', 
    name: 'Gendongan Hipseat Ergobaby Omni 360', 
    category: 'Bayi & Si Kecil', 
    description: 'Gendongan bayi ergonomis, nyaman untuk orang tua dan bayi. Bisa 4 posisi gendong. Cocok untuk traveling jauh agar tidak pegal.', 
    pricePerDay: 50000, 
    imageUrl: gendonganImg, 
    location: 'Bekasi', 
    availability: true, 
    rating: 4.9, 
    reviews: 15,
    specs: { "Posisi": "4 Mode", "Berat Bayi": "3-20 kg", "Bahan": "Mesh Breathable" },
    stock: 5
  },

  // --- KATEGORI 2: STUDIO KREATOR ---
  { 
    id: '2', 
    name: 'Paket Sony A7III + Lensa G-Master', 
    category: 'Studio Kreator', 
    description: 'Kamera mirrorless full-frame profesional. Low light performance juara. Termasuk lensa 24-70mm GM.', 
    pricePerDay: 350000, 
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800', 
    location: 'Tangerang Selatan', 
    availability: true, 
    rating: 4.9, 
    reviews: 45,
    specs: { "Sensor": "Full-Frame", "Resolusi": "24MP", "Video": "4K" },
    stock: 1
  },
  { 
    id: '17', 
    name: 'Lighting Godox SL60W + Softbox', 
    category: 'Studio Kreator', 
    description: 'Lampu studio continuous light yang terang dan stabil. Wajib punya buat bikin konten YouTube atau TikTok di dalam ruangan agar video jernih.', 
    pricePerDay: 120000, 
    imageUrl: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&q=80&w=800', 
    location: 'Jakarta Barat', 
    availability: true, 
    rating: 4.7, 
    reviews: 20,
    specs: { "Power": "60 Watt", "Color Temp": "5600K", "Mount": "Bowens" },
    stock: 4
  },
  { 
    id: '18', 
    name: 'Gimbal Stabilizer DJI Ronin SC', 
    category: 'Studio Kreator', 
    description: 'Stabilizer kamera 3-axis yang ringan namun kuat. Bikin footage video kamu cinematic tanpa guncangan. Kompatibel dengan banyak kamera mirrorless.', 
    pricePerDay: 150000, 
    imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&q=80&w=800', 
    location: 'Jakarta Pusat', 
    availability: false, 
    rating: 4.8, 
    reviews: 32,
    specs: { "Payload": "2 kg", "Battery": "11 Jam", "Berat Gimbal": "1.1 kg" },
    stock: 0
  },

  // --- KATEGORI 3: PERJALANAN & KENDARAAN ---
  { 
    id: '3', 
    name: 'Toyota Raize Turbo (Lepas Kunci)', 
    category: 'Perjalanan & Kendaraan', 
    description: 'Compact SUV lincah dan irit. Mesin turbo responsif. Unit tahun 2023, bersih dan wangi.', 
    pricePerDay: 450000, 
    imageUrl: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=800', 
    location: 'Jakarta Pusat', 
    availability: true, 
    rating: 4.8, 
    reviews: 28,
    specs: { "Transmisi": "CVT", "Kursi": "5 Seater", "Mesin": "1.0 Turbo" },
    stock: 1
  },
  { 
    id: '7', 
    name: 'Vespa Matic Sprint S 150', 
    category: 'Perjalanan & Kendaraan', 
    description: 'Motor hits buat sunmori atau keliling kota. Warna grey matte. Mesin halus i-get.', 
    pricePerDay: 175000, 
    imageUrl: vespaImg, 
    location: 'Jakarta Selatan', 
    availability: true, 
    rating: 4.9, 
    reviews: 22,
    specs: { "Mesin": "150cc", "Helm": "2 Pcs", "Tahun": "2022" },
    stock: 2
  },
  { 
    id: '14', 
    name: 'Koper Samsonite Hardcase 24 Inch', 
    category: 'Perjalanan & Kendaraan', 
    description: 'Koper medium untuk liburan 5-7 hari. Roda 360 derajat sangat lancar. Bahan polycarbonate kuat dan ringan. Kunci TSA Lock aman.', 
    pricePerDay: 75000, 
    imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&q=80&w=800', 
    location: 'Tangerang', 
    availability: true, 
    rating: 4.6, 
    reviews: 14,
    specs: { "Ukuran": "24 Inch (Bagasi)", "Warna": "Navy", "Fitur": "TSA Lock" },
    stock: 6
  },
  // Tambahan NMAX
  { 
    id: '19', 
    name: 'Sewa NMAX Harian', 
    category: 'Perjalanan & Kendaraan', 
    description: 'Butuh motor gesit buat selap-selip di kemacetan Jakarta? NMAX ini jawabannya! Irit, nyaman, bagasi luas.', 
    pricePerDay: 90000, 
    imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=800', 
    location: 'Jakarta Selatan', 
    availability: true, 
    rating: 4.9, 
    reviews: 58, 
    specs: { Brand: 'Yamaha', Model: 'NMAX Connected', Tahun: '2023', Kelengkapan: '2 Helm, 1 Jas Hujan' },
    stock: 2
  },
  // Tambahan Sepeda
   { 
    id: '20', 
    name: 'Sepeda Lipat Element', 
    category: 'Perjalanan & Kendaraan', 
    description: 'Weekend enaknya gowes! Sewa sepeda lipat ini, praktis dibawa masuk MRT atau mobil.', 
    pricePerDay: 60000, 
    imageUrl: 'https://images.unsplash.com/photo-1534063625405-bd872d82946c?auto=format&fit=crop&q=80&w=800', 
    location: 'Jakarta Pusat', 
    availability: true, 
    rating: 4.7, 
    reviews: 51, 
    specs: { Brand: 'Element', Tipe: 'Sepeda Lipat', Kecepatan: '8 Speed', 'Ukuran Roda': '20 inch' },
    stock: 4
  },


  // --- KATEGORI 4: MOMEN & PERAYAAN ---
  { 
    id: '4', 
    name: 'Dekorasi Lamaran Rustic (Backdrop)', 
    category: 'Momen & Perayaan', 
    description: 'Backdrop kayu aesthetic + bunga artificial premium. Pasang sendiri mudah (sistem knock-down).', 
    pricePerDay: 250000, 
    imageUrl: 'https://images.unsplash.com/photo-1478146059778-26028b07395a?auto=format&fit=crop&q=80&w=800', 
    location: 'Depok', 
    availability: true, 
    rating: 4.7, 
    reviews: 15,
    specs: { "Ukuran": "2x2 Meter", "Tema": "Rustic", "Pasang": "Mudah" },
    stock: 3
  },
  { 
    id: '9', 
    name: 'Buket Bunga Artificial Premium (Sewa)', 
    category: 'Momen & Perayaan', 
    description: 'Buket bunga besar untuk properti foto prewedding atau wisuda. Terlihat sangat asli di kamera.', 
    pricePerDay: 40000, 
    imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?auto=format&fit=crop&q=80&w=800', 
    location: 'Jakarta Timur', 
    availability: true, 
    rating: 4.5, 
    reviews: 9,
    specs: { "Jenis Bunga": "Rose & Peony", "Warna": "Pastel Pink", "Tinggi": "40cm" },
    stock: 10
  },
  { 
    id: '10', 
    name: 'Lampu Gantung Hias Kristal (Chandelier)', 
    category: 'Momen & Perayaan', 
    description: 'Lampu gantung mewah untuk menambah kesan elegan di acara makan malam atau pesta kecil di rumah.', 
    pricePerDay: 150000, 
    imageUrl: 'https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05?auto=format&fit=crop&q=80&w=800', 
    location: 'Jakarta Selatan', 
    availability: true, 
    rating: 4.8, 
    reviews: 5,
    specs: { "Bahan": "Akrilik Kristal", "Daya": "LED 12W", "Diameter": "50cm" },
    stock: 2
  },
  // Tambahan Kebaya
  { 
    id: '21', 
    name: 'Sewa Kebaya Modern', 
    category: 'Momen & Perayaan', 
    description: 'Tampil anggun di hari spesialmu! Kebaya modern dengan desain kekinian, bahan adem dan nyaman.', 
    pricePerDay: 175000, 
    imageUrl: 'https://images.unsplash.com/photo-1588665519782-b7e802766029?auto=format&fit=crop&q=80&w=800', 
    location: 'Depok', 
    availability: false, 
    rating: 4.9, 
    reviews: 63, 
    specs: { Ukuran: 'All size (M-L)', Warna: 'Rose Gold', Bahan: 'Brokat & Tulle' },
    stock: 0
  },

  // --- KATEGORI 5: RUMAH & HUNIAN ---
  { 
    id: '5', 
    name: 'Air Purifier Coway (Hepa Filter)', 
    category: 'Rumah & Hunian', 
    description: 'Solusi udara bersih di kamar kos atau apartemen. HEPA Filter menyaring debu halus dan bakteri.', 
    pricePerDay: 50000, 
    imageUrl: purifierImg, 
    location: 'Jakarta Barat', 
    availability: true, 
    rating: 4.9, 
    reviews: 8,
    specs: { "Area": "33 m2", "Filter": "HEPA H13", "Daya": "38 Watt" },
    stock: 1
  },
  { 
    id: '11', 
    name: 'Vacuum Cleaner Robot Xiaomi', 
    category: 'Rumah & Hunian', 
    description: 'Malas nyapu? Sewa robot vacuum ini. Bisa nyapu dan ngepel otomatis. Sensor pintar anti nabrak. Lantai bersih kinclong tanpa capek.', 
    pricePerDay: 60000, 
    imageUrl: robotImg, 
    location: 'Jakarta Utara', 
    availability: true, 
    rating: 4.6, 
    reviews: 18,
    specs: { "Fitur": "Sweep & Mop", "Baterai": "120 Menit", "App": "Mi Home" },
    stock: 2
  },
  { 
    id: '12', 
    name: 'Kasur Lipat Inoac (Single)', 
    category: 'Rumah & Hunian', 
    description: 'Ada teman atau saudara menginap dadakan? Kasur lipat busa tebal ini solusinya. Empuk, bersih, dan cover selalu dicuci setelah sewa.', 
    pricePerDay: 35000, 
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800', 
    location: 'Bogor', 
    availability: true, 
    rating: 4.7, 
    reviews: 25,
    specs: { "Ukuran": "90x200cm", "Tebal": "10cm", "Cover": "Katun" },
    stock: 4
  },
  // Tambahan Kosan
  { 
    id: '22', 
    name: 'Kosan Eksklusif Deket MRT', 
    category: 'Rumah & Hunian', 
    description: 'Cari kosan nyaman dan strategis? Di sini tempatnya! Kamar fully furnished.', 
    pricePerDay: 150000, 
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000', 
    location: 'Jakarta Selatan', 
    availability: true, 
    rating: 4.6, 
    reviews: 25, 
    specs: { Tipe: 'Kamar Kos', AC: 'Ya', WiFi: 'Ya', 'Kamar Mandi': 'Dalam', Perabot: 'Lengkap' },
    stock: 1
  },

  // --- KATEGORI 6: ACARA & KELUARGA ---
  { 
    id: '6', 
    name: 'Kursi Futura + Cover (20 Pcs)', 
    category: 'Acara & Keluarga', 
    description: 'Paket 20 kursi futura lengkap dengan cover kain ketat. Cocok untuk pengajian atau arisan.', 
    pricePerDay: 100000, 
    imageUrl: kursiImg, 
    location: 'Bekasi', 
    availability: true, 
    rating: 4.6, 
    reviews: 30,
    specs: { "Qty": "20 Unit", "Cover": "Putih", "Kondisi": "Bersih" },
    stock: 1
  },
  { 
    id: '8', 
    name: 'PlayStation 5 (2 Controller + FIFA 24)', 
    category: 'Acara & Keluarga', 
    description: 'Paket komplit buat mabar weekend. Game digital sudah terinstall: FIFA, GTA V, Spiderman.', 
    pricePerDay: 200000, 
    imageUrl: ps5Img, 
    location: 'Jakarta Timur', 
    availability: true, 
    rating: 4.8, 
    reviews: 50,
    specs: { "Console": "PS5 Disk", "Stik": "2 DualSense", "Game": "5+ Games" },
    stock: 2
  },
  { 
    id: '13', 
    name: 'Speaker Portable JBL PartyBox', 
    category: 'Acara & Keluarga', 
    description: 'Speaker bluetooth dengan bass nendang dan lampu RGB. Cocok buat karaokean di rumah atau acara outdoor kecil.', 
    pricePerDay: 125000, 
    imageUrl: jblImg, 
    location: 'Jakarta Selatan', 
    availability: true, 
    rating: 4.9, 
    reviews: 40,
    specs: { "Power": "100 Watt", "Fitur": "Bass Boost", "Mic": "Input Ada" },
    stock: 3
  },
  // Tambahan Proyektor
  { 
    id: '23', 
    name: 'Paket Nobar Proyektor', 
    category: 'Acara & Keluarga', 
    description: 'Bikin acara di rumah jadi seru! Paket sewa proyektor jernih Full HD plus layar gede 70 inch.', 
    pricePerDay: 180000, 
    imageUrl: 'https://images.unsplash.com/photo-1517604931442-71053e3e2e3c?auto=format&fit=crop&q=80&w=800', 
    location: 'Bekasi', 
    availability: true, 
    rating: 4.7, 
    reviews: 41, 
    specs: { Item: 'Proyektor & Layar', Kecerahan: '3500 Lumens', Konektivitas: 'HDMI, USB', Ukuran_Layar: '70 inch' },
    stock: 3
  }
];

// --- DATA ULASAN (REVIEWS) ---
export let mockReviews = {
    '1': [
        { id: 'r1-1', author: 'Budi', rating: 5, comment: 'Motornya mulus banget, tarikannya enteng. Penjualnya ramah, prosesnya cepet. Recommended!', type: 'positive' },
        { id: 'r1-2', author: 'Rina', rating: 4, comment: 'Overall oke, cuma jas hujannya agak kecil aja hehe. Tapi motornya mantap!', type: 'neutral' },
    ],
    // ... Ulasan lainnya (seperti sebelumnya)
};

// Fungsi untuk menambahkan ulasan baru secara dinamis
export const addMockReview = (productId, newReview) => {
    if (!mockReviews[productId]) {
        mockReviews[productId] = [];
    }
    // Tambahkan ulasan baru ke awal array agar muncul paling atas
    mockReviews[productId].unshift(newReview);
};
