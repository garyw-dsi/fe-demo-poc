/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole:
      process.env.NEXT_PUBLIC_LOG_DEBUG === "true"
        ? false
        : true
  },
  output: "standalone",

  webpack: (config) => {
    console.log("Environment Variables:", {
      UAM_SERVICES: process.env.UAM_SERVICES,
      CORE_SERVICES: process.env.CORE_SERVICES,
      INVENTORY_SERVICES: process.env.INVENTORY_SERVICES,
      CRM_SERVICES: process.env.CRM_SERVICES,
      ACCOUNTING_SERVICES: process.env.ACCOUNTING_SERVICES,
      SALES_SERVICES: process.env.SALES_SERVICES,
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
      NEXT_PUBLIC_LOG_DEBUG: process.env.NEXT_PUBLIC_LOG_DEBUG,
    });

    return config;
  },
  /**
   * TODO: Remove this once the issue is resolved
   */
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
