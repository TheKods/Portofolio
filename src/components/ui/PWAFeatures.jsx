import React, {
  useState,
  useEffect,
  memo,
  createContext,
  useContext,
} from "react";
import {
  Download,
  Smartphone,
  Wifi,
  WifiOff,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Settings,
} from "lucide-react";

// PWA Context
const PWAContext = createContext();

export const usePWA = () => {
  const context = useContext(PWAContext);
  if (!context) {
    throw new Error("usePWA must be used within a PWAProvider");
  }
  return context;
};

// PWA Provider Component
export const PWAProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [registration, setRegistration] = useState(null);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Check if app is installable
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Check if already installed
    if (
      window.matchMedia &&
      window.matchMedia("(display-mode: standalone)").matches
    ) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // Service Worker registration and updates
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          setRegistration(reg);

          // Check for updates
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener("statechange", () => {
                if (
                  newWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  setUpdateAvailable(true);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setIsInstalled(true);
      setIsInstallable(false);
    }

    setDeferredPrompt(null);
  };

  const updateApp = () => {
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: "SKIP_WAITING" });
      window.location.reload();
    }
  };

  const value = {
    isOnline,
    isInstallable,
    isInstalled,
    updateAvailable,
    installApp,
    updateApp,
  };

  return <PWAContext.Provider value={value}>{children}</PWAContext.Provider>;
};

// Install Prompt Component
const InstallPrompt = memo(() => {
  const { isInstallable, installApp } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (!isInstallable || dismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl p-4 border border-white/10 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Smartphone className="w-5 h-5 text-blue-400" />
          </div>

          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">
              Install Portfolio App
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Get the full experience with offline access and native app
              features.
            </p>

            <div className="flex gap-2">
              <button
                onClick={installApp}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Install
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Update Prompt Component
const UpdatePrompt = memo(() => {
  const { updateAvailable, updateApp } = usePWA();
  const [dismissed, setDismissed] = useState(false);

  if (!updateAvailable || dismissed) return null;

  return (
    <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50">
      <div className="bg-gray-900/95 backdrop-blur-lg rounded-2xl p-4 border border-white/10 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-green-600/20 rounded-lg">
            <RefreshCw className="w-5 h-5 text-green-400" />
          </div>

          <div className="flex-1">
            <h3 className="text-white font-semibold mb-1">Update Available</h3>
            <p className="text-gray-300 text-sm mb-3">
              A new version of the portfolio is available with improvements and
              new features.
            </p>

            <div className="flex gap-2">
              <button
                onClick={updateApp}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Update Now
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Offline Indicator Component
const OfflineIndicator = memo(() => {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-red-900/95 backdrop-blur-lg rounded-2xl px-4 py-2 border border-red-500/20 shadow-xl">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-red-400" />
          <span className="text-red-400 text-sm font-medium">
            You're offline
          </span>
        </div>
      </div>
    </div>
  );
});

// PWA Status Component
const PWAStatus = memo(() => {
  const { isOnline, isInstalled, updateAvailable } = usePWA();

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5" />
        App Status
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isOnline ? (
              <Wifi className="w-5 h-5 text-green-400" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-400" />
            )}
            <span className="text-white">Connection</span>
          </div>
          <div
            className={`flex items-center gap-2 ${
              isOnline ? "text-green-400" : "text-red-400"
            }`}
          >
            {isOnline ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-blue-400" />
            <span className="text-white">Installation</span>
          </div>
          <div
            className={`flex items-center gap-2 ${
              isInstalled ? "text-green-400" : "text-gray-400"
            }`}
          >
            {isInstalled ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="text-sm">
              {isInstalled ? "Installed" : "Web App"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-purple-400" />
            <span className="text-white">Updates</span>
          </div>
          <div
            className={`flex items-center gap-2 ${
              updateAvailable ? "text-orange-400" : "text-green-400"
            }`}
          >
            {updateAvailable ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            <span className="text-sm">
              {updateAvailable ? "Available" : "Up to date"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

// Cache Status Component
const CacheStatus = memo(() => {
  const [cacheStatus, setCacheStatus] = useState({
    size: "0 MB",
    items: 0,
    lastUpdate: null,
  });

  useEffect(() => {
    const checkCache = async () => {
      try {
        if ("caches" in window) {
          const cacheNames = await caches.keys();
          let totalSize = 0;
          let totalItems = 0;

          for (const cacheName of cacheNames) {
            const cache = await caches.open(cacheName);
            const keys = await cache.keys();
            totalItems += keys.length;

            // Estimate size (rough approximation)
            for (const request of keys) {
              const response = await cache.match(request);
              if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
              }
            }
          }

          setCacheStatus({
            size: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
            items: totalItems,
            lastUpdate: new Date(),
          });
        }
      } catch (error) {
        console.log("Cache check failed:", error);
      }
    };

    checkCache();
    const interval = setInterval(checkCache, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const clearCache = async () => {
    try {
      if ("caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName)),
        );
        setCacheStatus({
          size: "0 MB",
          items: 0,
          lastUpdate: new Date(),
        });
      }
    } catch (error) {
      console.log("Cache clear failed:", error);
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-white font-semibold mb-4">Cache Status</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {cacheStatus.size}
            </div>
            <div className="text-gray-400 text-sm">Cache Size</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {cacheStatus.items}
            </div>
            <div className="text-gray-400 text-sm">Cached Items</div>
          </div>
        </div>

        <div className="text-center text-gray-400 text-sm">
          Last updated:{" "}
          {cacheStatus.lastUpdate?.toLocaleTimeString() || "Never"}
        </div>

        <button
          onClick={clearCache}
          className="w-full px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
        >
          Clear Cache
        </button>
      </div>
    </div>
  );
});

// PWA Dashboard Component
export const PWADashboard = memo(() => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PWAStatus />
        <CacheStatus />
      </div>

      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <h3 className="text-white font-semibold mb-4">PWA Features</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Wifi className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-white font-medium">Offline Access</div>
              <div className="text-gray-400 text-sm">
                Browse cached content without internet
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <RefreshCw className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-white font-medium">Auto Updates</div>
              <div className="text-gray-400 text-sm">
                Get latest features automatically
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Smartphone className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-white font-medium">Native Experience</div>
              <div className="text-gray-400 text-sm">
                Install as mobile/desktop app
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-600/20 rounded-lg">
              <CheckCircle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <div className="text-white font-medium">Fast Loading</div>
              <div className="text-gray-400 text-sm">
                Instant loading from service worker cache
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default {
  PWAProvider,
  InstallPrompt,
  UpdatePrompt,
  OfflineIndicator,
  PWADashboard,
  usePWA,
};
