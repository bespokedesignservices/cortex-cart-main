// app/layout.tsx (Corrected)
import "./globals.css";
// We have removed AuthProvider, as it's not needed for the public homepage.

export const metadata = {
  title: "CortexCart Insights",
  description: "E-commerce Analytics and Social Media Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; // Add the type annotation here
}) {
  return (
    <html lang="en">
      <body>
       {children}
      </body>
    </html>
  );
}