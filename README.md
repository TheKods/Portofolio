# Rafi Hermawan - Portfolio Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://rafi-hermawan.vercel.app/)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A modern, responsive portfolio website showcasing my skills, projects, and professional experience in cloud computing and backend development.

## 🌟 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations and transitions
- **Interactive Tech Stack**: Visual representation of technical skills and expertise
- **Project Showcase**: Gallery of completed projects with detailed information
- **Certificate Display**: Organized display of professional certifications and achievements
- **Contact Form**: Easy way for potential employers and collaborators to reach out
- **Background Music**: Local ambient music for an enhanced browsing experience
- **Animated Background**: Dynamic visual elements using Three.js and custom shaders
- **SEO Optimized**: Structured data, meta tags, and performance optimizations
- **Responsive Design**: Fully responsive across all device sizes

## 🚀 Technologies Used

- **Frontend**: React 18, Vite 6, Tailwind CSS 3
- **UI Components**: Material UI, Framer Motion, Headless UI
- **3D & Animations**: Three.js, React Three Fiber, GSAP, AOS (Animate on Scroll)
- **Icons & Graphics**: Lucide React, React Icons, LottieFiles
- **Audio**: HTML5 Audio API for local background music
- **Type Safety**: TypeScript integration
- **Performance**: Optimized with React best practices
- **Deployment**: Vercel with Analytics
- **SEO**: React Helmet Async, JSON-LD structured data

## 📋 Project Structure

```
Portofolio/
├── public/              # Static assets, icons, and media
│   ├── music/           # Local background music files
├── src/
│   ├── assets/          # Local assets
│   ├── components/      # Reusable UI components
│   │   ├── 3D elements  # Three.js components
│   │   ├── UI elements  # Interface components
│   │   ├── AudioPlayer  # Local music player component
│   ├── data/            # Local data files
│   ├── Pages/           # Main page components
│   ├── App.jsx          # Main application component
│   └── main.jsx         # Application entry point
├── .gitignore           # Git ignore file
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.js       # Vite configuration
```

## 🛠️ Setup and Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TheKods/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🚢 Deployment

This project is configured for seamless deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect the repository to Vercel
3. Vercel will automatically build and deploy your site

### Manual Deployment

```bash
# Deploy to production
npm run deploy

# Deploy preview
npm run deploy:preview
```

## ⚡ Optimization

This project includes several optimizations to improve performance and development experience:

### Cleaning Up

```bash
# Remove node_modules, dist folders and other build artifacts
npm run clean
```

### Build Optimization

The build process includes:
- Image optimization for reduced file sizes
- Code splitting for faster loading
- Tree shaking to remove unused code
- Minification and compression

### Development Optimization

- Fast refresh for quick development iterations
- Optimized dependencies to reduce bundle size
- Efficient asset loading

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

Rafi Hermawan - [LinkedIn Profile](https://www.linkedin.com/in/rafi-hermawan/) | [GitHub](https://github.com/TheKods) | [Email](mailto:rafihermawan06@gmail.com)

## 🎵 Background Music

The portfolio includes background music for an enhanced user experience:

- Music player uses Spotify Web Playback SDK for high-quality streaming
- Fallback to local files or CDN if Spotify is not available
- Tracks are properly credited with artist information
- User controls include play/pause, next/previous track, and volume adjustment
- Secure token handling through serverless API endpoints

### Spotify API Configuration

To enable Spotify playback:

1. Create a Spotify Developer account at [developer.spotify.com](https://developer.spotify.com/)
2. Create a new application and get your Client ID and Client Secret
3. Add these credentials to your environment variables:
   ```
   SPOTIFY_CLIENT_ID=your_client_id
   SPOTIFY_CLIENT_SECRET=your_client_secret
   ```
4. Deploy the serverless function in `src/api/spotify-token.js` to handle authentication

### Using Your Own Spotify Playlist

The audio player is configured to use a specific Spotify playlist. To use your own:

1. Create a playlist on Spotify with your preferred tracks
2. Get the playlist ID from the URL (e.g., `2DplXBDNnbjfvXphw6hH71` from `https://open.spotify.com/playlist/2DplXBDNnbjfvXphw6hH71`)
3. Update the `PLAYLIST_ID` constant in `src/components/AudioPlayer.jsx`

The current playlist includes:
- Memories of Spring - Tokyo Music Walker
- Colorful Flowers - Tokyo Music Walker
- Transcendence - CHAOS
- Echoes in Blue - Tokyo Music Walker

### Fallback Options

The audio player includes multiple fallback mechanisms:

1. **Spotify Web Playback**: Primary method using Spotify's official SDK
2. **Local Files**: Uses music files from `/public/music/` folder if available
3. **CDN Fallback**: Uses CDN-hosted files if local files are not available

To exclude large music files from your Git repository, uncomment the relevant line in `.gitignore`:
```
# public/music/*.mp3
```