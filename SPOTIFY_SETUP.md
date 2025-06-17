# Panduan Pengaturan Spotify API

Panduan ini akan membantu Anda mengatur Spotify API untuk digunakan di portfolio website Anda.

## Kredensial Spotify API

Kredensial Spotify API sudah tersedia:

- **Client ID**: `6e3dc61f8f7c42319e16ba7164aeca2b`
- **Client Secret**: `606d2cb3448e443592a66ac83338f41b`

## Langkah 1: Konfigurasi Environment Variables

### Untuk Pengembangan Lokal

1. Buat file `.env.local` di root proyek dengan isi:
   ```
   SPOTIFY_CLIENT_ID=6e3dc61f8f7c42319e16ba7164aeca2b
   SPOTIFY_CLIENT_SECRET=606d2cb3448e443592a66ac83338f41b
   ```

2. File ini sudah ditambahkan ke `.gitignore` sehingga tidak akan tercommit ke repository.

### Untuk Deployment (Vercel)

1. Di dashboard Vercel, pilih proyek Anda
2. Buka tab "Settings" dan pilih "Environment Variables"
3. Tambahkan dua environment variables:
   - Nama: `SPOTIFY_CLIENT_ID`, Nilai: `6e3dc61f8f7c42319e16ba7164aeca2b`
   - Nama: `SPOTIFY_CLIENT_SECRET`, Nilai: `606d2cb3448e443592a66ac83338f41b`
4. Klik "Save" dan redeploy aplikasi Anda

## Langkah 2: Menggunakan Playlist Anda

Playlist Spotify yang digunakan saat ini adalah:
- ID: `2DplXBDNnbjfvXphw6hH71`
- URL: `https://open.spotify.com/playlist/2DplXBDNnbjfvXphw6hH71`
- Berisi: Memories of Spring, Colorful Flowers, Transcendence, Echoes in Blue

Jika Anda ingin menggunakan playlist Spotify lain:

1. Buka file `src/components/AudioPlayer.jsx`
2. Cari konstanta `PLAYLIST_ID`
3. Ganti dengan ID playlist Anda sendiri

## Catatan Penting

- **JANGAN PERNAH** menyimpan Client Secret di kode frontend atau di repository publik
- Spotify Web Playback SDK memerlukan akun Spotify Premium untuk digunakan
- Jika pengguna tidak memiliki akun Premium, player akan otomatis beralih ke file lokal atau CDN
- Token yang dihasilkan oleh API akan kedaluwarsa setelah beberapa waktu (biasanya 1 jam)
- Serverless function di `src/api/spotify-token.js` akan menghasilkan token baru saat diperlukan

## Troubleshooting

Jika Anda mengalami masalah:

1. Pastikan kredensial sudah benar diatur di environment variables
2. Periksa apakah aplikasi Spotify sudah dikonfigurasi dengan benar di dashboard Spotify Developer
3. Pastikan akun Spotify yang digunakan adalah akun Premium (untuk Web Playback SDK)
4. Periksa browser console untuk error messages

## Referensi

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- [Spotify Web Playback SDK](https://developer.spotify.com/documentation/web-playback-sdk/)
- [Spotify API Terms of Service](https://developer.spotify.com/terms/)
- [Playlist Portfolio](https://open.spotify.com/playlist/2DplXBDNnbjfvXphw6hH71) 