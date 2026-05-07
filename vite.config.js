import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          ui: ["@mui/material", "@mui/icons-material", "@headlessui/react"],
          animations: ["framer-motion", "aos", "@lottiefiles/dotlottie-react"],
          utils: ["clsx", "tailwind-merge", "react-helmet-async"],
        },
      },
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1600,
    cssCodeSplit: true,
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@mui/material", "aos", "framer-motion"],
    exclude: ["@mui/icons-material"], // Tree-shake icons
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: [".."],
    },
  },
});
