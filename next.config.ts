import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    // Local next/image: /public/img/*, /public/guide/img/* (optional ?v= cache-bust)
    localPatterns: [{ pathname: "/img/**" }, { pathname: "/guide/img/**" }],
    formats: ["image/avif", "image/webp"],
    // Mobile-first srcset: include common phone widths so smaller files are selected on small screens
    deviceSizes: [360, 390, 414, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
  },
  // Smaller, tree-shaken imports for icon-heavy and Mantine usage (less dev memory / compile work).
  experimental: {
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/hooks",
      "react-icons",
    ],
  },
  turbopack: {
    root: __dirname,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Reduce file-watcher work (fewer inotify/FS events on big trees).
      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          ".next",
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
