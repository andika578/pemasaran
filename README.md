# DHOLPIN — Creative Studio Landing Page
Jasa Pembuatan Undangan Web Digital & Jasa Fotografi Profesional (Wisuda, Pernikahan, Ulang Tahun).

---

## 🌟 Tentang Proyek
Landing page resmi untuk brand **DHOLPIN** yang dirancang dengan estetika mewah, modern, hangat (*editorial warm tones* bergaya Pinterest), interaktif, dan responsif di semua perangkat (Desktop, Tablet, & Smartphone).

### 🏷️ Pricelist & Layanan yang Ditawarkan:
1. **Undangan Web Digital (Siap Online)**
   - **Pilihan Template**: Rp 150.000 (Cocok untuk pernikahan & ulang tahun)
   - **Desain Full Custom**: Rp 200.000 (Desain eksklusif 100% custom sesuai tema & request)
2. **Paket Fotografi Profesional**
   - **Wedding / Pernikahan**: Rp 300.000 (Dokumentasi intimate, akad, resepsi, all files Google Drive)
   - **Graduation / Wisuda**:
     - 30 Menit: Rp 150.000 (Solo express, pose guide, high-res files)
     - 60 Menit: Rp 250.000 (Best deal, multiple spot kampus, foto keluarga & bestie)
   - **Birthday / Ulang Tahun**: Rp 250.000 (Dokumentasi keseruan acara pesta, candid kawan, tiup lilin)

> **Urgency Booking**: *"Slot terbatas setiap bulannya—yuk amankan tanggalmu sekarang! Klik link di bio untuk booking ya 💌"*

---

## 📱 Kontak & Channel Terintegrasi:
- **Instagram**: [@dolphin.dois](https://instagram.com/dolphin.dois)
- **WhatsApp**: [0857-0845-4528](https://wa.me/6285708454528) (Tersedia format auto-text dynamic per paket di setiap tombol)

---

## 🚀 Fitur Unggulan & Teknologi
- **Logo Resmi DOLPHIN Studio Presisi Tinggi**: Menggunakan lambang/emblem resmi studio yang telah di-center secara matematis dan diekstrak menjadi logo emblem resolusi tinggi (`assets/logo-emblem.png`), logo brandmark lengkap (`assets/logo-brand.png`), dan favicon browser (`assets/favicon.png`).
- **Aset Gambar Lokal 100% Stabil (Anti-Broken Image)**: Seluruh gambar untuk paket fotografi, mockup undangan, galeri karya, dan avatar disimpan secara lokal di dalam folder `assets/images/`. Bebas dari ketergantungan link luar (seperti Unsplash) yang rentan error 404 atau diblokir provider internet.
- **Efek Tactile 3D Pop ("Animasi Timbul Saat Diklik")**: Seluruh kartu paket, galeri foto, kartu alur kerja, fasilitas, dan kotak kontak dilengkapi kelas `.frame-box-interactive` dengan animasi timbul membal elastis (`@keyframes pop-timbul` & `.box-popped`) saat diklik, disertai elevasi halus saat disentuh/di-hover.
- **Ikon Vektor Modern & Resmi (Bebas Emoji Kasual)**: Seluruh ikon kartun/stiker kasual digantikan dengan ikon vektor modern minimalis dari Lucide Icons dan SVG inline otentik (WhatsApp & Instagram gradient), dibalut kapsul badge mewah bernuansa emas dan kaca halus (*glassmorphism*).
- **Interactive Animated Active Nav Indicator & ScrollSpy**: Menu navigasi dilengkapi penanda aktif berupa *floating sliding capsule indicator* (pil gelap dengan aksen emas) yang berpindah secara halus mengikuti posisi scroll halaman secara realtime (*ScrollSpy* terintegrasi dengan Lenis). Menu yang aktif tetap ditandai dengan jelas (tidak kembali ke warna semula) selama pengguna berada di bagian tersebut, baik di desktop maupun drawer mobile.
- **Smooth Scrolling (Lenis)**: Pengalaman scrolling yang halus dan elegan menggunakan Lenis Smooth Scroll.
- **GSAP & ScrollTrigger Animations**: Animasi judul muncul kata demi kata (*word-by-word reveal*) saat discroll ke layar (`split-words`), serta efek transisi stagger kartu yang halus.
- **Interactive Digital Invitation Simulator**: Pengunjung bisa melihat preview simulasi mobile screen undangan web digital langsung di landing page.
- **Layanan Fotografi Lengkap & Terintegrasi**: Bagian fotografi dilengkapi dengan alur pemotretan 4 langkah (Booking, Moodboard & Outfit, Sesi Foto & Pose Coaching, Serah Terima File), 6 fasilitas eksklusif yang didapatkan klien (All Original Files, Warm Pinterest Color Grading, Free Pose Coaching, Akses Google Drive Selamanya, Pengerjaan Cepat 1-3 Hari, Bebas Multiple Spot), panduan tips persiapan sesi foto, serta galeri contoh potret nyata terintegrasi langsung di dalamnya.
- **Galeri Portofolio Terpadu**: Galeri karya disatukan langsung ke dalam layanan terkait dengan tab filter kategori (*Wisuda, Wedding, Ulang Tahun*) dan lightbox modal detail.
- **Dynamic WhatsApp Form**: Formulir pemesanan langsung terhubung ke nomor WhatsApp `085708454528` dengan rincian nama, paket layanan, dan tanggal acara.
- **Floating Quick Contact Buttons**: Tombol mengambang WhatsApp dan Instagram di sudut bawah layar agar pengunjung dapat berkonsultasi kapan saja.

---

## 📂 Struktur File
```
landing_page/
├── index.html            # Halaman utama landing page
├── assets/
│   ├── logo-emblem.png   # Logo emblem bulat toko resmi (centered & high-res)
│   ├── logo-brand.png    # Logo visual lengkap dengan tipografi DOLPHIN
│   ├── favicon.png       # Favicon browser resmi
│   └── images/           # Koleksi foto lokal offline resolusi tinggi
│       ├── wedding-package.jpg
│       ├── graduation-package.jpg
│       ├── birthday-package.jpg
│       ├── hero-invite.jpg
│       ├── hero-wedding.jpg
│       ├── hero-grad.jpg
│       ├── invite-wedding.jpg
│       ├── invite-birthday.jpg
│       ├── portfolio-wisuda-1.jpg
│       ├── portfolio-wisuda-2.jpg
│       ├── portfolio-wedding-1.jpg
│       ├── portfolio-wedding-2.jpg
│       ├── portfolio-birthday-1.jpg
│       └── portfolio-birthday-2.jpg
├── css/
│   └── style.css         # Styling custom, tema warna Pinterest, animasi timbul, GSAP & Lenis
├── js/
│   └── main.js           # Logika Lenis, GSAP, filter galeri, simulator modal, frame box click pop, & WhatsApp form
└── README.md             # Dokumentasi proyek
```

---

## 💻 Cara Menjalankan
1. Buka folder `D:\KULIAH SEMSERTER 5\enterpreneship\landing_page`.
2. Klik ganda file `index.html` untuk langsung membukanya di browser favoritmu (Google Chrome, Edge, Safari, Firefox).
3. Atau jalankan menggunakan ekstensi **Live Server** di VS Code atau server lokal apapun.
