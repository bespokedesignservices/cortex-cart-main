// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from 'next/font/google'; // Your font import
import "./globals.css";
// ... other imports

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  // ... your metadata
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* --- THIS IS THE CORRECTED LINE --- */}
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
        {/* ... your providers and children ... */}
      </body>
    </html>
  );
}