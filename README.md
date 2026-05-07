# Rafi Hermawan - Portfolio Website

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://rafi-hermawan.vercel.app/)
[![Built with Vite](https://img.shields.io/badge/Built%20with-Vite-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)

A modern, responsive portfolio website showcasing my skills, projects, and professional experience in cloud computing and backend development.

## 🌟 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Dark/Light Mode**: Theme toggle with system preference detection
- **Multi-language Support**: English and Bahasa Indonesia
- **Interactive Tech Stack**
- **Project Showcase**
- **Certificate Display**: Images are served from `public/Sertif/
- **Advanced Contact Form**: With validation and error handling
- **Scroll-to-Top Button**: With progress indicator
- **Loading States**: Skeleton loaders and progress indicators
- **SEO Optimized**
- **Performance Monitoring**: Vercel Analytics & Speed Insights
- **PWA Ready**: Offline capabilities (can be enabled)

## 🚀 Technologies Used

- **Frontend**: React 18, Vite 6, Tailwind CSS 3
- **UI**: Material UI, Framer Motion, Headless UI
- **Icons**: Lucide React, React Icons
- **AOS** for reveal animations
- **Theme**: Custom theme provider with localStorage persistence
- **Internationalization**: Custom i18n with React Context
- **Forms**: Advanced validation with real-time feedback
- **Deployment**: Vercel with Analytics
- **SEO**: React Helmet Async, JSON-LD

## 📋 Project Structure

```
Portofolio/
├── public/              # Static assets
│   └── Sertif/          # Certificate images
├── src/
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Typography.jsx
│   │   │   ├── Section.jsx
│   │   │   ├── ThemeToggle.jsx     # NEW: Theme switcher
│   │   │   ├── LanguageSwitcher.jsx # NEW: i18n support
│   │   │   ├── Loading.jsx         # NEW: Loading components
│   │   │   ├── ScrollToTop.jsx     # NEW: Scroll utilities
│   │   │   ├── ContactForm.jsx     # NEW: Advanced form
│   │   │   └── index.js            # Barrel export
│   │   ├── common/     # Shared components
│   │   ├── effects/    # Animation effects
│   │   └── pages/      # Page-specific components
│   ├── data/
│   │   └── localData.js # Projects & certificates
│   ├── lib/
│   │   └── theme.js    # Theme configuration
│   ├── utils/          # Helper functions
│   ├── Pages/          # Main page components
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🛠️ Setup and Development

### Prerequisites

- Node.js (v16 or higher)

### Installation

```bash
npm install
npm run dev
```

Open `http://localhost:5174`

## 🚢 Deployment

Vercel is pre-configured. Push to GitHub and connect the repo on Vercel.

```bash
npm run deploy        # prod
npm run deploy:preview
```

## 🎨 New Features Added

### 🌙 Dark/Light Mode Toggle
- System preference detection
- localStorage persistence
- Smooth theme transitions
- Available in navbar

### 🌍 Multi-language Support
- English & Bahasa Indonesia
- React Context for state management
- Automatic browser language detection
- Persistent language selection

### 📝 Advanced Contact Form
- Real-time validation
- Error handling with user feedback
- Loading states
- Success/error notifications
- Character counters

### ⬆️ Scroll-to-Top Button
- Progress ring indicator
- Smooth scrolling
- Responsive design
- Auto-hide/show based on scroll position

### 🔄 Loading States
- Skeleton loaders for content
- Progress bars
- Typing indicators
- Error boundaries

### ⚡ Performance Optimizations
- Code splitting by route and library
- Tree shaking for unused icons
- Optimized bundle chunks
- Console log removal in production
- CSS optimization

## 📄 License

MIT
