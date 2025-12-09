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
// Import kameraImg jika ingin dipakai lagi, jika tidak hapus baris ini


// --- DATA KATEGORI ---
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
    imageUrl: strollerImg, 
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
    imageUrl: kameraImg, // Menggunakan import kameraImg yang benar
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
    description: 'Malas nyapu? Sewa robot vacuum ini. Bisa nyapu dan ngepel otomatis. Lantai bersih kinclong tanpa capek.', 
    pricePerDay: 60000, 
    imageUrl: robotImg, 
    location: 'Jakarta Utara', 
    availability: true, 
    rating: 4.6, 
    reviews: 18,
    specs: { "Fitur": "Sweep & Mop", "Baterai": "120 Menit", "App": "Mi Home" },
    stock: 2
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
  }
];

// --- DATA ULASAN (REVIEWS) ---
export let mockReviews = {
    '1': [
        { id: 'r1-1', author: 'Budi', rating: 5, comment: 'Motornya mulus banget, tarikannya enteng. Penjualnya ramah, prosesnya cepet. Recommended!', type: 'positive' },
        { id: 'r1-2', author: 'Rina', rating: 4, comment: 'Overall oke, cuma jas hujannya agak kecil aja hehe. Tapi motornya mantap!', type: 'neutral' },
    ],
    '2': [
        { id: 'r2-1', author: 'ContentCreatorHits', rating: 5, comment: 'Gila, autofokusnya beneran dewa. Bikin vlog jadi gampang banget. Barangnya juga bersih kaya baru.', type: 'positive' },
        { id: 'r2-2', author: 'Anak DKV', rating: 4, comment: 'Baterainya dapet satu, jadi harus pinter-pinter manage. Tapi buat kualitas gambar, ga ada lawan sih.', type: 'neutral' },
    ],
    '17': [
        { id: 'r17-1', author: 'Youtuber Pemula', rating: 5, comment: 'Cahayanya terang banget, video jadi jernih. Softbox-nya bikin cahaya halus.', type: 'positive' }
    ],
    '13': [
        { id: 'r13-1', author: 'Budi Karaoke', rating: 5, comment: 'Suaranya mantap! Bass-nya kerasa di dada. Baterai tahan lama buat party semalam.', type: 'positive' }
    ],
    '11': [
        { id: 'r11-1', author: 'Ibu Rumah Tangga', rating: 4, comment: 'Membantu banget. Lantai jadi bersih. Cuma agak bingung setting map awalnya.', type: 'positive' }
    ],
    '14': [
        { id: 'r14-1', author: 'Traveler', rating: 5, comment: 'Kopernya ringan tapi kuat. Roda lancar banget didorongnya.', type: 'positive' }
    ],
     '5': [
        { id: 'r5-1', author: 'Sehat Selalu', rating: 5, comment: 'Udara di kamar jadi seger banget. Suara mesinnya halus, ga ganggu tidur.', type: 'positive' }
    ]
};

// Fungsi untuk menambahkan ulasan baru secara dinamis
export const addMockReview = (productId, newReview) => {
    if (!mockReviews[productId]) {
        mockReviews[productId] = [];
    }
    // Tambahkan ulasan baru ke awal array agar muncul paling atas
    mockReviews[productId].unshift(newReview);
};
