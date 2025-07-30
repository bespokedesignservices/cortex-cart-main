// src/app/components/Footer.js (Corrected)
'use client';
import Image from 'next/image';
import Link from 'next/link';

const FooterBase = () => {

    return (
    <footer className="bg-gray-800 text-white py-8"> {/* This is the start of the footer */}
                <div className="container mx-auto px-6 text-center">
                    <div className="mt-4">
                        {/* Removed trackerUrl as it's not defined in this component */}
                        <Link href="about"><span className="px-3 hover:underline cursor-pointer">About</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="contact"><span className="px-3 hover:underline cursor-pointer">Contact</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="terms"><span className="px-3 hover:underline cursor-pointer">Terms of Service</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="privacy"><span className="px-3 hover:underline cursor-pointer">Privacy Policy</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="data-protection"><span className="px-3 hover:underline cursor-pointer">Data Protection</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="license"><span className="px-3 hover:underline cursor-pointer">EULA License</span></Link>
                    </div>

                    <div className="flex justify-center space-x-6 mt-6">
                        <a href="https://www.facebook.com/cortexcartai" target="_blank" rel="noopener noreferrer"><Image src="/logos/facebooklogo.png" alt="Facebook" width={24} height={24} /></a>
                        <a href="https://twitter.com/Cortexcart" target="_blank" rel="noopener noreferrer"><Image src="/logos/xlogo.png" alt="X (formerly Twitter)" width={24} height={24} /></a>
                        <a href="https://www.instagram.com/cortexcartai" target="_blank" rel="noopener noreferrer"><Image src="/logos/instagramlogo.png" alt="Instagram" width={24} height={24} /></a>
                        <a href="https://www.pinterest.com/Cortexcart" target="_blank" rel="noopener noreferrer"><Image src="/logos/pintrestlogo.png" alt="Pinterest" width={24} height={24} /></a>
                    </div>
                    
                    <p className="mt-4">&copy; {new Date().getFullYear()} CortexCart. All rights reserved.</p>

                </div>

            </footer>
    );
};

export default FooterBase;