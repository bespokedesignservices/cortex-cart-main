import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const TopNav = () => {
    return (
        <div className="bg-white text-gray-800 font-sans">
            <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
            {/* This is the new logo image, wrapped in a link to the homepage */}
                    <Link href="/" passHref>
                      <Image
                        src="/cortexcart-com-logo-home.png" // This points to /public/logo.png
                        alt="CortexCart Logo"
                        width={150} // Adjust this to your logo's width
                        height={40}  // Adjust this to your logo's height
                        priority // Helps load the logo faster on the homepage
                      />
                    </Link>                   
                    <ul className="flex items-center space-x-6">
                        <li><Link href="/#integrations"><span className="hover:text-blue-600 cursor-pointer">Integrations</span></Link></li>
                        <li><Link href="/#features"><span className="hover:text-blue-600 cursor-pointer">Features</span></Link></li>
                        <li><Link href="/#pricing"><span className="hover:text-blue-600 cursor-pointer">Pricing</span></Link></li>
                        <li>
                            <Link href="/blog">
                                <span className="hover:text-blue-600 cursor-pointer">Blog</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="https://tracker.cortexcart.com/dashboard">
                                <div className="px-6 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                                    Start Free Trial
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};
export default TopNav
