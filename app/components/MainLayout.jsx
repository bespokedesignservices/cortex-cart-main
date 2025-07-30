// src/app/components/MainLayout.jsx
import TopNav from '@/app/components/TopNav';
import FooterBase from '@/app/components/FooterBase';

// This component takes the page's specific content as 'children'
// and wraps it with the common header and footer.


export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopNav />
      <main className="flex-grow">
        {children}
      </main>
        
      <FooterBase />
    </div>
  );
}