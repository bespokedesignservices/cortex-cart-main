// src/app/components/Footer.js (Corrected)

import React from 'react';
import Image from 'next/image';

// We have removed the unused 'socialLinks' constant from this file.

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center flex-wrap">
                                       {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center justify-around flex-shrink-0 w-full md:w-auto px-8 space-x-12">
                 <Image src={"/logos/mailchimplogo.png"} width={100} height={100} alt={'Mailchimp Logo'}></Image>                    
                <Image src={"/logos/quickbooklogo.png"} width={100} height={100} alt={'Quickbooks Logo'}></Image>                    
                <Image src={"/logos/shopifylogo.png"} width={100} height={100} alt={'Shopify Logo'}></Image>                    
                <Image src={"/logos/facebooklogo.png"} width={100} height={100} alt={'Facebook Logo'}></Image>                    
                <Image src={"/logos/instagramlogo.png"} width={100} height={100} alt={'Instagram Logo'}></Image>                    
                <Image src={"/logos/xlogo.png"} width={100} height={100} alt={'X Logo'}></Image>                    
                <Image src={"/logos/pintrestlogo.png"} width={100} height={100} alt={'Pinterest Logo'}></Image>                    
               <Image src={"/logos/bigcommercelogo.png"} width={100} height={100} alt={'Pinterest Logo'}></Image>                    
               <Image src={"/logos/magentologo.png"} width={100} height={100} alt={'Pinterest Logo'}></Image>                    
               <Image src={"/logos/opencartlogo.png"} width={100} height={100} alt={'Pinterest Logo'}></Image>                    

                                            </div>
                    ))}

                </div>
                <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} CortexCart Insights. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;