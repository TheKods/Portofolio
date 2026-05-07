import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  memo,
} from "react";
import { Globe, Check } from "lucide-react";

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Language data
const languages = {
  en: {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    direction: "ltr",
  },
  id: {
    code: "id",
    name: "Bahasa Indonesia",
    flag: "🇮🇩",
    direction: "ltr",
  },
  // Add more languages as needed
};

const translations = {
  en: {
    // Navigation
    home: "Home",
    about: "About",
    portfolio: "Portfolio",
    contact: "Contact",

    // Hero Section
    heroTitle: "Backend Developer",
    heroSubtitle:
      "Crafting robust backend solutions with modern technologies. Specialized in building scalable APIs, microservices, and cloud-native applications.",
    viewWork: "View My Work",
    learnMore: "Learn More",

    // About Section
    aboutTitle: "About Me",
    aboutSubtitle: "Transforming ideas into digital experiences",
    aboutDescription:
      "I'm a passionate Backend Developer and Information Systems student with over 3 years of experience in building robust, scalable web applications.",
    downloadCV: "Download CV",

    // Portfolio Section
    portfolioTitle: "Portfolio",
    portfolioSubtitle:
      "A showcase of my work, projects, and professional achievements",
    projects: "Projects",
    certificates: "Certificates",

    // Contact Section
    contactTitle: "Get In Touch",
    contactSubtitle:
      "Let's discuss your project ideas and how we can work together",
    sendMessage: "Send Message",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    sending: "Sending...",
    messageSent: "Message sent successfully! I'll get back to you soon.",
    messageError:
      "Failed to send message. Please try again or contact me directly.",

    // 404 Page
    pageNotFound: "Page Not Found",
    pageNotFoundDesc:
      "Oops! The page you're looking for seems to have wandered off into the digital void.",
    goHome: "Go Home",
    goBack: "Go Back",
  },
  id: {
    // Navigation
    home: "Beranda",
    about: "Tentang",
    portfolio: "Portofolio",
    contact: "Kontak",

    // Hero Section
    heroTitle: "Pengembang Backend",
    heroSubtitle:
      "Membuat solusi backend yang kuat dengan teknologi modern. Spesialis dalam membangun API yang skalabel, layanan mikro, dan aplikasi cloud-native.",
    viewWork: "Lihat Karya Saya",
    learnMore: "Pelajari Lebih Lanjut",

    // About Section
    aboutTitle: "Tentang Saya",
    aboutSubtitle: "Mengubah ide menjadi pengalaman digital",
    aboutDescription:
      "Saya adalah Pengembang Backend yang bersemangat dan mahasiswa Sistem Informasi dengan pengalaman lebih dari 3 tahun dalam membangun aplikasi web yang kuat dan skalabel.",
    downloadCV: "Unduh CV",

    // Portfolio Section
    portfolioTitle: "Portofolio",
    portfolioSubtitle: "Pameran karya, proyek, dan pencapaian profesional saya",
    projects: "Proyek",
    certificates: "Sertifikat",

    // Contact Section
    contactTitle: "Hubungi Saya",
    contactSubtitle:
      "Mari diskusikan ide proyek Anda dan bagaimana kita dapat bekerja sama",
    sendMessage: "Kirim Pesan",
    name: "Nama",
    email: "Email",
    subject: "Subjek",
    message: "Pesan",
    sending: "Mengirim...",
    messageSent: "Pesan berhasil dikirim! Saya akan segera menghubungi Anda.",
    messageError:
      "Gagal mengirim pesan. Silakan coba lagi atau hubungi saya langsung.",

    // 404 Page
    pageNotFound: "Halaman Tidak Ditemukan",
    pageNotFoundDesc:
      "Ups! Halaman yang Anda cari sepertinya telah pergi ke dunia digital.",
    goHome: "Kembali ke Beranda",
    goBack: "Kembali",
  },
};

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Check localStorage first, then browser language
    const saved = localStorage.getItem("language");
    if (saved && languages[saved]) return saved;

    // Detect browser language
    const browserLang = navigator.language.split("-")[0];
    return languages[browserLang] ? browserLang : "en";
  });

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);

    // Update document direction and language
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = languages[currentLanguage].direction;
  }, [currentLanguage]);

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setCurrentLanguage(langCode);
    }
  };

  const value = {
    currentLanguage,
    languages,
    changeLanguage,
    t,
    isRTL: languages[currentLanguage].direction === "rtl",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Language Switcher Component
export const LanguageSwitcher = memo(({ className = "" }) => {
  const { currentLanguage, languages, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative p-3 rounded-xl bg-gray-900/50 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
        aria-label="Language selector"
      >
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

        <div className="relative flex items-center justify-center gap-2">
          <Globe className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
          <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-200">
            {languages[currentLanguage].flag}
          </span>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-lg rounded-xl border border-white/10 shadow-2xl z-50">
            {Object.values(languages).map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl ${
                  currentLanguage === lang.code
                    ? "bg-green-500/20 text-green-400"
                    : "text-gray-300"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <Check className="ml-auto w-4 h-4 text-green-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
});

export default LanguageProvider;
