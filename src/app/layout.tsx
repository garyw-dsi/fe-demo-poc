import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";

import ChakraUIProviders from "@/providers/chakra-ui";
import { NextAuthProvider } from "@/providers/next-auth";
import { authOptions } from "@/libs/next-auth";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false
});

export const metadata: Metadata = {
  title: "Symbolix",
  description: "Symbolix is a ERP system for small and medium enterprises.",
  icons: "/logo.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>
          <ChakraUIProviders>
            {children}
          </ChakraUIProviders>
        </NextAuthProvider>
      </body>
    </html>
  );
}
