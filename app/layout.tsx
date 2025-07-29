// app/layout.tsx (Corrected)

import { Inter } from 'next/font/google';
import "./globals.css";
// We have removed AuthProvider, as it's not needed for the public homepage.

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CortexCart Insights",
  description: "E-commerce Analytics and Social Media Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
          <main>{children}</main>
        
          </body>
    </html>
  );
}