# Frontend Web Application (Capstone Project)

Frontend aplikasi web modern yang dibangun menggunakan **React 19**, **TypeScript**, **Vite**, dan **Tailwind CSS**. Arsitektur proyek menggunakan kombinasi **Feature-Driven Architecture** (berbasis domain fitur) dan **Atomic Design** (untuk komponen UI reusable), dirancang agar mudah dimaintenance, rapi, dan skalabel untuk kolaborasi tim.

---

## 🛠️ Tech Stack & Ekosistem

* **Framework & Tooling**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vite.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Data Fetching & Cache**: [TanStack Query v5](https://tanstack.com/query)
* **HTTP Client**: [Axios](https://axios-http.com/) (terintegrasi dengan Bearer JWT interceptor)
* **Client State Management**: [Zustand v5](https://zustand.docs.pmnd.rs/) (dengan sessionStorage persist)
* **Routing**: [React Router v7](https://reactrouter.com/)
* **Form & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
* **Icons & Notifications**: [Lucide React](https://lucide.dev/) & [Sonner](https://sonner.emilkowal.ski/)
* **Accessible UI Primitives**: [Radix UI](https://www.radix-ui.com/)

---

## 📁 Struktur Folder (`src/`)

```text
src/
├── assets/                 # Asset statis lokal (logo, gambar, ilustrasi, font)
│
├── components/             # Komponen UI Reusable (Metodologi Atomic Design)
│   ├── atoms/              # Komponen paling dasar (Button, Input, Badge, Spinner)
│   ├── molecules/          # Gabungan atom (SearchBar, FormField, EmptyState, Pagination)
│   └── organisms/          # Komponen UI kompleks (ConfirmModal, Navbar, Sidebar)
│
├── features/               # Modul Fitur Aplikasi (Feature-Driven Architecture)
│   ├── landing/            # Halaman & komponen khusus Landing Page publik
│   ├── auth/               # Modul autentikasi (Login, Register)
│   └── admin/              # Modul Dashboard Admin (Overview, Manajemen Data, dll)
│
├── layouts/                # Kerangka Layout Template Halaman
│   ├── MainLayout.tsx      # Layout Landing Page (Navbar publik + Outlet + Footer)
│   ├── AdminLayout.tsx     # Layout Dashboard (Sidebar + Header Admin + Outlet)
│   └── AuthLayout.tsx      # Layout khusus Auth (Card terpusat di tengah layar)
│
├── lib/                    # Inisialisasi library & fungsi helper global
│   ├── axios.ts            # Instance Axios (BaseURL, interceptor auto-Bearer token, auto-kick 401)
│   └── utils.ts            # Helper function (clsx + tailwind-merge `cn()`, format rupiah/tanggal)
│
├── routes/                 # Konfigurasi routing aplikasi
│   ├── AppRoutes.tsx       # Definisi rute URL (Public & Protected routes)
│   └── ProtectedRoute.tsx  # Guard proteksi rute khusus admin/authenticated user
│
├── stores/                 # State management global (Zustand)
│   └── useAuthStore.ts     # Store autentikasi (token JWT, session user, validasi masa aktif token)
│
├── types/                  # Kontrak tipe data TypeScript global (Entitas & API)
│   ├── auth.types.ts       # Interface UserProfile, JwtPayload
│   └── api.types.ts        # Interface format response standar API NestJS
│
├── App.tsx                 # Root component (TanStack Query Provider, Toaster, Router)
├── main.tsx                # Entry point aplikasi
└── index.css               # Styling global & directive Tailwind CSS
```

---

## 📖 Penjelasan Rinci Setiap Direktori

### 1. `components/` (Atomic Design)
* **`atoms/`**: Komponen independen terkecil yang tidak bisa dipecah lagi. Contoh: `Button.tsx`, `Input.tsx`.
* **`molecules/`**: Gabungan beberapa atom yang membentuk satu fungsi kecil. Contoh: `SearchBar.tsx` (gabungan `Input` dan `Button`), `EmptyState.tsx`.
* **`organisms/`**: Gabungan molekul yang membentuk antarmuka utuh. Contoh: `ConfirmModal.tsx`, `Sidebar.tsx`.

### 2. `features/`
Folder ini memisahkan kode berdasarkan domain bisnis/halaman:
* Developer yang mengerjakan **Landing Page** hanya perlu fokus di `features/landing/`.
* Developer yang mengerjakan **Dashboard Admin** hanya perlu fokus di `features/admin/`.
* Setiap folder fitur dapat memiliki subfolder sendiri jika diperlukan (misal: `api/`, `components/`, `hooks/`).

### 3. `layouts/`
Menyediakan bingkai template halaman menggunakan `<Outlet />` dari React Router:
* **`MainLayout.tsx`**: Untuk halaman publik yang memiliki navigasi umum.
* **`AdminLayout.tsx`**: Untuk halaman dashboard dengan sidebar admin.
* **`AuthLayout.tsx`**: Untuk tampilan login/register yang bersih tanpa navigasi yang mengganggu.

### 4. `lib/`
* **`axios.ts`**: Mengatur `baseURL` dari environment variable (`VITE_API_BASE_URL`), otomatis menyematkan header `Authorization: Bearer <token>` dari Zustand ke setiap request, dan otomatis melakukan redirect ke `/login` jika menerima respon `401 Unauthorized`.
* **`utils.ts`**: Menyediakan helper reusable seperti fungsi `cn()` (gabungan `clsx` dan `tailwind-merge`) untuk menggabungkan class Tailwind secara dinamis.

### 5. `stores/`
Menyimpan state global client menggunakan Zustand. State auth disimpan di `sessionStorage` sehingga session admin terlindungi saat tab browser ditutup.

### 6. `types/`
Tempat terpusat untuk interface data model / DTO (seperti `UserProfile`, `ApiResponse<T>`) agar selaras dengan kontrak backend NestJS.

---

## 🚀 Panduan Memulai (Getting Started)

### 1. Salin Environment Variable
Pastikan file `.env` sudah dibuat di root folder `frontend/`:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Jalankan Server Development
```bash
npm run dev
```

### 3. Build untuk Produksi
```bash
npm run build
```

---

## 📌 Aturan & Konvensi Koding (Best Practices)
1. **Separation of Concerns**: Jangan letakkan request API mentah di dalam komponen `.tsx`. Gunakan TanStack Query atau fungsi API terpisah.
2. **Reusable UI**: Jika elemen tampilan digunakan di lebih dari 1 halaman, letakkan di `src/components/`.
3. **Type Safety**: Hindari penggunaan tipe `any`. Definisikan interface yang jelas di `src/types/`.
