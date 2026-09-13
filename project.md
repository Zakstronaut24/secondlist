# Project Progress Tracker: Seconda Marketplace

Website marketplace barang bekas (secondhand marketplace) modern berbasis lokasi untuk komunitas lokal Indonesia.

---

## 🎯 Value Proposition & Core Concept
- **Motto:** *"Temukan barang bekas yang kamu butuhkan dengan lebih gampang, lebih dekat, lebih cepat, dan lebih murah."*
- **Model:** Local Community Marketplace (C2C)
- **Key Flow:** SEARCH → DISCOVERY → LOCATION → CHAT → MEET → TRANSACT (COD/In-Person)

---

## 📅 Roadmap & Tahapan Development

### Fase 1: Perencanaan, Arsitektur & Fondasi Data
- [x] Analisis kebutuhan & arsitektur proyek
- [x] Instalasi dependensi ikon (`lucide-react`)
- [x] Definisi TypeScript interfaces (`types.ts`)
- [x] Penyusunan dummy data realistis Indonesia (25+ produk, kategori, penjual, ulasan, percakapan)
- [x] Marketplace Context State Management (LocalStorage persistence untuk produk baru, saved items, chat, penawaran harga)

### Fase 2: Komponen Inti & Desain Sistem (Design System & Reusable Components)
- [x] Navbar modern (search bar terintegrasi, location selector dropdown, sell button, notifikasi, chat badge, avatar)
- [x] Bottom Navigation untuk mobile (Home, Search, Sell, Chat, Profile)
- [x] Reusable Product Card (Badge "Good Deal", "Nearby", "Price Drop", formatted Rupiah, jarak relatif, avatar penjual, tombol simpan)
- [x] Category Pill/Card Grid
- [x] Safety Notice Banner & Trust Badge Components
- [x] Modal-modal interaktif (Location Selector, Make Offer, Report Listing)
- [x] Global styling polish di `app/globals.css` dan `app/layout.tsx`

### Fase 3: Halaman Homepage & Discovery Engine
- [x] Hero Section dengan Headline tajam, dynamic search input, dan quick location badge
- [x] Category browse section
- [x] Section "Items Near You" (berdasarkan filter jarak dinamis)
- [x] Section "Freshly Listed" (barang terbaru)
- [x] Section "Good Deals" & "Price Drops"
- [x] Section "Recently Viewed" & Community Safety Callout

### Fase 4: Search & Filter Engine (`/search`)
- [x] Multi-filter sidebar & mobile drawer (Kategori, Rentang Harga Min-Max, Kondisi Like New/Good/Fair, Jarak <1km, <5km, <10km, Anywhere)
- [x] Multi-sorting (Paling Relevan, Terbaru, Termurah, Termahal, Terdekat)
- [x] Instant search query highlight & result counter
- [x] Empty state ramah pengguna dengan rekomendasi reset filter

### Fase 5: Halaman Product Detail (`/product/[id]`)
- [ ] Image Gallery (foto utama besar + thumbnail carousel interaktif)
- [ ] Informasi harga menonjol, kondisi barang, status ketersediaan
- [ ] Kartu profil penjual (rating bintang, jumlah barang terjual, respon rate, response time, waktu bergabung)
- [ ] Tombol aksi cepat: "Chat Seller", "Make Offer", "Save Item", "Share"
- [ ] Safety Reminder ("Bertemu di tempat umum dan periksa barang sebelum membayar")
- [ ] Section "More like this" (barang serupa dalam kategori)

### Fase 6: Halaman Chat & Negosiasi (`/chat`)
- [ ] Layout dua kolom responsif (Daftar Percakapan di kiri, Active Chat di kanan)
- [ ] Mini Product Header di atas chat dengan link langsung ke barang & status penawaran
- [ ] Quick message chips ("Apakah barang masih ada?", "Bisa nego Rp...", "Bisa COD besok?")
- [ ] Fitur kirim pesan interaktif secara real-time di browser
- [ ] Fitur "Make Offer" (Tawar Harga) dengan notifikasi penawaran di ruang obrolan

### Fase 7: Halaman Jual Barang (`/sell`)
- [ ] Multi-step / Simple direct listing form
- [ ] Upload foto dengan preview interaktif
- [ ] Input judul, kategori, harga, kondisi (Like New, Good, Fair), deskripsi
- [ ] Pilihan lokasi kecamatan & preferensi tempat COD/ketemuan
- [ ] Live Preview Card sebelum posting
- [ ] CTA "Post Item" langsung masuk ke state marketplace & dapat langsung dicari!

### Fase 8: Saved Items (`/saved`) & User Profile (`/profile`)
- [ ] Halaman Saved Items dengan indikator "Price Dropped"
- [ ] Halaman Profil Pengguna dengan tab: "Barang Dijual", "Barang Terjual", "Ulasan Pembeli"
- [ ] Indikator reputasi penjual (Badge Verified, Level Respon Cepat)

### Fase 9: QA, Responsiveness & Final Polish
- [ ] Verifikasi seluruh alur navigasi di Desktop, Tablet, dan Mobile
- [ ] Build test (`npm run build`) untuk memastikan tidak ada TypeScript error
- [ ] Walkthrough dokumentasi dan panduan presentasi
