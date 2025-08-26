// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from 'next/font/google'; // Your font import
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  other: {
    'facebook-domain-verification': '5jg6zgmfosj3k53rwsnzq13d3cvj4n',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
    
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200`}>
     {children}
      </body>
    </html>
  );
}