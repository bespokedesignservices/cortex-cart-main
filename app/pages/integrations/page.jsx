// app/integrations/page.jsx
'use client';

import { useEffect } from 'react';
import MainLayout from '@/app/components/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

const integrations = [
    {
        name: 'Google Analytics 4',
        logo: '/logos/googleanalyticslogo.png',
        description: 'Unlock deeper insights into your customer journey. Connect GA4 to see how your marketing channels contribute to sales, track complex conversion funnels, and understand user behavior across your site.',
        benefits: [
            'Comprehensive cross-platform analytics.',
            'Enhanced event-based tracking for more granular data.',
            'AI-powered insights and predictive audiences.',
            'Seamless integration with Google Ads for better ROI.'
        ]
    },
    {
        name: 'Shopify',
        logo: '/logos/shopifylogo.png',
        description: "Supercharge your Shopify store. CortexCart pulls your sales, product, and customer data directly from Shopify, giving you a unified view of your store's performance without any manual data entry.",
        benefits: [
            'Real-time sales and order tracking.',
            'In-depth product performance analysis.',
            'Customer segmentation and lifetime value metrics.',
            'Automated inventory and revenue reporting.'
        ]
    },
    {
        name: 'Mailchimp',
        logo: '/logos/mailchimplogo.png',
        description: 'Measure the true impact of your email marketing. Our Mailchimp integration links campaign performance directly to sales, so you can see which emails are driving revenue and engaging customers.',
        benefits: [
            'Track revenue generated from specific email campaigns.',
            'Analyze open rates, click rates, and conversion rates in one place.',
            'Understand how email marketing influences customer lifetime value.',
            'Optimize your campaigns for maximum profitability.'
        ]
    },
     {
        name: 'Quickbooks',
        logo: '/logos/quickbooklogo.png',
        description: 'Streamline your accounting. Our QuickBooks integration automatically syncs your sales and expense data, giving you an accurate, real-time financial overview without manual data entry.',
        benefits: [
            'Automate financial data sync from your e-commerce platforms.',
            'Gain real-time insights into revenue, expenses, and profitability.',
            'Simplify reconciliation and reduce manual data entry errors.',
            'Improve financial forecasting and budgeting accuracy.'
        ]
    }
];

const socialIntegrations = [
    {
        name: 'Facebook & Instagram Ads',
        logo: '/logos/facebooklogo.png', // Using facebook logo for Meta
        description: 'Connect your Meta Ads account to track campaign performance and attribute sales directly to your ad spend. Understand your ROAS and optimize campaigns for higher conversions across Facebook and Instagram.',
        benefits: [
            'Directly attribute revenue to specific ad campaigns.',
            'Analyze cost-per-acquisition (CPA) and return on ad spend (ROAS).',
            'Understand customer journeys that start from a social ad.',
            'Make data-driven decisions to optimize your ad budget.'
        ]
    },
    {
        name: 'X (Twitter) Ads',
        logo: '/logos/xlogo.png',
        description: 'Link your X Ads (formerly Twitter Ads) account to measure the effectiveness of your campaigns. See how your promotions on X drive traffic and sales on your e-commerce store.',
        benefits: [
            'Track conversions and revenue from your X Ad campaigns.',
            'Monitor engagement metrics alongside sales data.',
            'Calculate the ROI of your advertising efforts on X.',
            'Refine your ad strategy based on performance insights.'
        ]
    },
    {
        name: 'Pinterest Ads',
        logo: '/logos/pintrestlogo.png',
        description: 'Connect your Pinterest Ads account to understand how visual discovery on Pinterest leads to purchases. Track promoted pins and shopping ads to see what inspires your customers to buy.',
        benefits: [
            'Attribute sales to specific pins and ad campaigns.',
            'Analyze the conversion path from discovery to checkout.',
            'Understand which products perform best on Pinterest.',
            'Optimize your boards and ad spend for maximum e-commerce impact.'
        ]
    },
    {
        name: 'More Coming Soon',
        logo: '/images/be-ready-banner-board-illustration-md.jpeg', // Placeholder for upcoming integration
        description: "We're always expanding our ecosystem. Integrations with platforms like TikTok Ads are on our roadmap to give you a complete view of your marketing efforts.",
        benefits: ['Get ready for even more powerful analytics.', 'Consolidate more of your marketing data in one place.', "Suggest an integration you'd like to see!"]
    }
];

const screenshots = [
    '/images/screenshots/screenshot-2025-06-18-at-07.37.17.png',
    '/images/screenshots/screenshot-2025-06-18-at-07.38.36.png',
    '/images/screenshots/screenshot-2025-06-18-at-07.38.47.png',
    '/images/screenshots/screenshot-2025-07-21-at-10.54.11.png',
];

export default function IntegrationsPage() {


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentScreenshotIndex((prevIndex) => (prevIndex + 1) % screenshots.length);
        }, 3000); // Change image every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <MainLayout>
            <div className="bg-white">
                <div className="relative isolate pt-14">
                    <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className="py-24 sm:py-32">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Powerful Integrations</h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Connect CortexCart with the tools you already use and love. Get a complete picture of your e-commerce business by unifying data from all your key platforms.
                                </p>
                            </div>
                        </div>
                        <div className="mt-16 overflow-hidden">
                            <div className="flex animate-scroll-left-to-right">
                                {screenshots.concat(screenshots).map((src, index) => (
                                    <div key={index} className="flex-shrink-0 w-[calc(100vw/3)] sm:w-[calc(100vw/4)] md:w-[calc(100vw/5)] lg:w-[calc(100vw/6)] xl:w-[calc(100vw/7)] 2xl:w-[calc(100vw/8)] p-2">
                                        <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64">
                                            <Image
                                                src={src}
                                                alt={`CortexCart Dashboard Thumbnail ${index + 1}`}
                                                fill
                                                style={{ objectFit: 'contain' }}
                                                className="rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
                                                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
 <div className="mt-6 text-center">
                                            <Link href="https://tracker.cortexcart.com/dashboard">
                                                <div className="inline-block px-8 py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors cursor-pointer text-lg font-semibold">
                                                    Start Free Trial
                                                </div>
                                            </Link>
                                        </div>
                <div className="py-12 sm:py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-blue-600">Seamless Connections</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Everything you need, all in one place
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Stop switching between tabs. Our one-click integrations bring your most important e-commerce data together, providing you with actionable insights to grow your business faster.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                                {integrations.map((integration) => (
                                    <div key={integration.name} className="flex flex-col p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                                        <dt className="flex items-center gap-x-2 text-base font-semibold leading-7 text-gray-900">
                                            <Image src={integration.logo} alt={`${integration.name} logo`} width={100} height={60} className="h-30 w-60" />
                                            
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                            <p className="flex-auto">{integration.description}</p>
                                            <div className="mt-6">
                                                <h4 className="font-semibold text-gray-800">Key Benefits:</h4>
                                                <ul className="mt-2 space-y-2 list-disc list-inside">
                                                    {integration.benefits.map(benefit => (
                                                        <li key={benefit}>{benefit}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </dd>
                                       
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="py-12 sm:py-16 bg-gray-50">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-blue-600">Social Media Connections</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                Track Your Ad Spend ROI
                            </p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Connect your social media advertising accounts to see exactly how your campaigns are performing. Attribute sales directly to your ads and optimize for profitability.
                            </p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
                                {socialIntegrations.map((integration) => (
                                    <div key={integration.name} className="flex flex-col p-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow bg-white">
                                        <dt className="flex justify-center items-center h-24">
                                            <Image src={integration.logo} alt={`${integration.name} logo`} width={80} height={80} className="h-auto max-h-20 w-auto" />
                                        </dt>
                                        <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                            <h3 className="text-lg font-bold text-center text-gray-900">{integration.name}</h3>
                                            <p className="flex-auto mt-2 text-sm">{integration.description}</p>
                                            <div className="mt-6">
                                                <h4 className="font-semibold text-gray-800">Key Benefits:</h4>
                                                <ul className="mt-2 space-y-2 list-disc list-inside text-sm">
                                                    {integration.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                                                </ul>
                                            </div>
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}