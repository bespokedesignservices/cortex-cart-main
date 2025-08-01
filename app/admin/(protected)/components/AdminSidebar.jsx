'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    HomeIcon, UsersIcon, DocumentTextIcon, PencilSquareIcon, ChartBarIcon,
    CreditCardIcon, ArrowRightEndOnRectangleIcon, WrenchScrewdriverIcon,
    MapIcon, MegaphoneIcon, LifebuoyIcon, QuestionMarkCircleIcon, ChevronDownIcon, FolderIcon
} from '@heroicons/react/24/outline';

// New, reorganized navigation structure
const adminNavLinks = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'User Management', href: '/admin/users', icon: UsersIcon },
    // --- New Content Dropdown ---
    { 
        name: 'Content', 
        icon: FolderIcon,
        children: [
            { name: 'CMS', href: '/admin/cms', icon: DocumentTextIcon },
            { name: 'Blog', href: '/admin/blog', icon: PencilSquareIcon },
            { name: 'SEO', href: '/admin/seo', icon: WrenchScrewdriverIcon },
            { name: 'Roadmap', href: '/admin/roadmap', icon: MapIcon },
            { name: 'Alert Banners', href: '/admin/alerts', icon: MegaphoneIcon },
            { name: 'FAQs', href: '/admin/faqs', icon: QuestionMarkCircleIcon },
        ]
    },
    // --- End of New Content Dropdown ---
    { name: 'User Stats', href: '/admin/stats', icon: ChartBarIcon },
    { name: 'Subscription Plans', href: '/admin/plans', icon: CreditCardIcon },
    { name: 'Support Tickets', href: '/admin/support', icon: LifebuoyIcon },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState('');

    const handleDropdownToggle = (name) => {
        setOpenDropdown(openDropdown === name ? '' : name);
    };

    return (
        <aside className="w-64 flex-shrink-0 bg-gray-800 p-4 flex flex-col text-white">
            <div className="mb-8">
                <h1 className="text-2xl font-bold">CortexCart</h1>
                <span className="text-sm text-gray-400">Super Admin Panel</span>
            </div>
            <nav className="flex-grow overflow-y-auto min-h-0">
                <ul className="space-y-2">
                    {adminNavLinks.map((link) => (
                        <li key={link.name}>
                            {link.children ? (
                                // Render a dropdown button if the link has children
                                <div>
                                    <button
                                        onClick={() => handleDropdownToggle(link.name)}
                                        className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <div className="flex items-center">
                                            <link.icon className="h-6 w-6 mr-3" />
                                            <span>{link.name}</span>
                                        </div>
                                        <ChevronDownIcon className={`h-5 w-5 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                    </button>
                                    {openDropdown === link.name && (
                                        <ul className="pl-6 pt-2 space-y-2">
                                            {link.children.map((child) => (
                                                <li key={child.name}>
                                                    <Link href={child.href}>
                                                        <div className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${pathname === child.href ? 'bg-gray-900' : ''}`}>
                                                            <child.icon className="h-5 w-5 mr-3 text-gray-400" />
                                                            <span>{child.name}</span>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                // Render a simple link if there are no children
                                <Link href={link.href}>
                                    <div className={`flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors ${pathname === link.href ? 'bg-gray-900' : ''}`}>
                                        <link.icon className="h-6 w-6 mr-3" />
                                        <span>{link.name}</span>
                                    </div>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="mt-auto">
                <Link href="/api/auth/admin-logout">
                    <div className="w-full flex items-center justify-center p-2 bg-gray-700 rounded-lg hover:bg-red-600 transition-colors">
                        <ArrowRightEndOnRectangleIcon className="h-6 w-6 mr-3" />
                        <span>Sign Out</span>
                    </div>
                </Link>
            </div>
        </aside>
    );
}