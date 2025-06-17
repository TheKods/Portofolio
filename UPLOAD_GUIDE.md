# Panduan Upload Musik ke GitHub

## Persiapan

1. Pastikan Git terinstal di komputer Anda. Jika belum, download dan instal dari [git-scm.com](https://git-scm.com/downloads)

2. Pastikan file musik sudah ada di folder `/public/music/`:
   - Colorful-Flowers(chosic.com).mp3
   - echoes-in-blue-by-tokyo-music-walker-chosic.com_.mp3
   - Memories-of-Spring(chosic.com).mp3
   - Transcendence-chosic.com_.mp3

3. Pastikan file `.gitignore` tidak mengecualikan file musik (baris `public/music/*.mp3` harus dikomentari)

## Langkah-langkah Upload

1. Buka terminal/command prompt dan navigasi ke folder proyek:
   ```
   cd path/to/Portofolio
   ```

2. Tambahkan semua file ke staging:
   ```
   git add .
   ```

3. Commit perubahan:
   ```
   git commit -m "Add music files for local playback"
   ```

4. Push ke GitHub:
   ```
   git push origin main
   ```
   (Ganti `main` dengan nama branch Anda jika berbeda, misalnya `master`)

## Verifikasi

1. Buka repositori GitHub Anda di browser
2. Navigasi ke folder `public/music/`
3. Pastikan semua file musik terlihat di repositori

## Catatan Penting

- File musik cukup besar (total sekitar 52MB), jadi proses upload mungkin memerlukan waktu lebih lama
- GitHub memiliki batas ukuran file 100MB, jadi semua file musik Anda masih di bawah batas ini
- Jika Anda mengalami masalah dengan ukuran repositori, pertimbangkan untuk menggunakan Git LFS (Large File Storage)

## Solusi Alternatif

Jika Anda memilih untuk tidak mengupload file musik ke GitHub:

1. Edit file `.gitignore` dan hapus tanda komentar pada baris:
   ```
   # public/music/*.mp3
   ```
   menjadi:
   ```
   public/music/*.mp3
   ```

2. Komponen AudioPlayer akan otomatis menggunakan versi CDN dari musik jika file lokal tidak tersedia 