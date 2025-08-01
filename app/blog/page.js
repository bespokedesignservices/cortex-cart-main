'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/cortexcartai',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.77-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/cortexcartai/',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.25-9.75a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com/Cortexcart',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.682 10.623 20.239 3h-1.64l-5.705 6.44L7.65 3H3l6.836 9.753L3 21h1.64l6.082-6.885L16.351 21H21l-7.318-10.377zM14.78 13.968l-.87-1.242L6.155 4.16h2.443l4.733 6.742.87 1.242 7.03 9.98h-2.443l-5.045-7.143z" />
        </svg>
      ),
    },
    {
      name: 'Pinterest',
      href: 'https://uk.pinterest.com/Cortexcart/',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M12.017 0C5.396 0 .029 5.367.029 12c0 4.137 2.678 7.653 6.333 8.943.02-.19.029-.398.05-.61l.329-1.4a.123.123 0 0 1 .099-.1c.36-.18 1.15-.56 1.15-.56s-.299-.909-.249-1.79c.06-.9.649-2.12 1.459-2.12.68 0 1.2.51 1.2 1.12 0 .68-.43 1.7-.65 2.64-.179.78.379 1.42.919 1.42 1.58 0 2.63-2.1 2.63-4.22 0-1.8-1.12-3.44-3.03-3.44-2.28 0-3.52 1.68-3.52 3.32 0 .61.22 1.25.5 1.62.03.04.04.05.02.13l-.15.65c-.05.2-.14.24-.32.08-1.05-.9-1.5-2.3-1.5-3.82C6.18 5.76 8.35 3 12.33 3c3.22 0 5.59 2.38 5.59 4.91 0 3.22-1.95 5.61-4.79 5.61-.9 0-1.75-.47-2.05-1.02l-.52 2.1c-.24 1.01-1.04 2.45-1.04 2.45s-.28.1-.32.08c-.46-.38-.68-1.2-.55-1.88l.38-1.68c.12-.55-.03-1.2-.5-1.52-1.32-.9-1.9-2.6-1.9-4.22 0-2.28 1.6-4.3 4.6-4.3 2.5 0 4.2 1.8 4.2 4.15 0 2.5-1.55 4.5-3.8 4.5-.75 0-1.45-.38-1.7-.82l-.28-.9c-.1-.4-.2-.8-.2-1.22 0-.9.42-1.68 1.12-1.68.9 0 1.5.8 1.5 1.88 0 .8-.25 1.88-.58 2.8-.25.7-.5 1.4-.5 1.4s-.3.12-.35.1c-.2-.1-.3-.2-.3-.4l.02-1.12z" />
        </svg>
      ),
    }
];

const PublicLayout = ({ children }) => (
    <div className="bg-gray-50">
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
                    <li><Link href="pages/integrations"><span className="hover:text-blue-600 cursor-pointer">Integrations</span></Link></li>
                    <li><Link href="/#features"><span className="hover:text-blue-600 cursor-pointer">Features</span></Link></li>
                    <li><Link href="/#pricing"><span className="hover:text-blue-600 cursor-pointer">Pricing</span></Link></li>
                    <li><Link href="/blog"><span className="text-blue-600 font-semibold cursor-pointer">Blog</span></Link></li>
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
        <main>{children}</main>
        <footer className="bg-gray-800 text-white py-8"> {/* This is the start of the footer */}
                <div className="container mx-auto px-6 text-center">
                    <div className="mt-4">
                        {/* Removed trackerUrl as it's not defined in this component */}
                        <Link href="pages/about"><span className="px-3 hover:underline cursor-pointer">About</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="pages/contact"><span className="px-3 hover:underline cursor-pointer">Contact</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="pages/terms"><span className="px-3 hover:underline cursor-pointer">Terms of Service</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="pages/privacy"><span className="px-3 hover:underline cursor-pointer">Privacy Policy</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="pages/data-protection"><span className="px-3 hover:underline cursor-pointer">Data Protection</span></Link>
                        <span className="text-gray-500">|</span>
                        <Link href="pages/icense"><span className="px-3 hover:underline cursor-pointer">EULA License</span></Link>
                    </div>

                        {/* NEW: Social Icons Section */}
                    <div className="flex justify-center space-x-6 mt-4">
                        {socialLinks.map((item) => (
                            <a key={item.name} href={item.href} className="text-gray-400 hover:text-white">
                            <span className="sr-only">{item.name}</span>
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                            </a>
                        ))}
                    </div>
                    
                    <p className="mt-4">&copy; {new Date().getFullYear()} CortexCart. All rights reserved.</p>

                </div>

            </footer>
    </div>
);

const BlogCategoryNav = ({ activeCategory }) => {
    const params = useParams();
    const toSlug = (name) => name.toLowerCase().replace(/ & /g, '-and-').replace(/ /g, '-');
    const currentSlug = params.categorySlug || (activeCategory ? toSlug(activeCategory) : null);

    const categories = [
        'E-commerce Strategy', 'Data & Analytics', 'AI for E-commerce', 
        'Generative AI', 'Conversion Optimization', 'Product Updates'
    ];

    return (
        <div className="border-b border-gray-200 bg-white">
            <div className="container mx-auto">
                <nav className="flex" aria-label="Categories">
                    {categories.map((category, index) => {
                        const slug = toSlug(category);
                        const isActive = currentSlug === slug;
                        return (
                            <div key={category} className="flex items-center">
                                <Link href={`/blog/category/${slug}`} passHref>
                                    <div className={`whitespace-nowrap py-4 px-5 text-sm font-medium transition-colors duration-200 ease-in-out cursor-pointer ${isActive ? 'bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'}`}>
                                        {category}
                                    </div>
                                </Link>
                                {index < categories.length - 1 && (<span className="h-6 w-px bg-gray-300" aria-hidden="true" />)}
                            </div>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

const PostCard = ({ post }) => (
    <article className="flex flex-col items-start justify-between">
        <div className="relative w-full">
            <Image src={post.featured_image_url || 'https://placehold.co/600x400/E2E8F0/4A5568?text=CortexCart'} alt={post.title} width={600} height={400} className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>
        </div>
        <div className="max-w-xl">
            <div className="mt-8 flex items-center gap-x-4 text-xs">
                <time dateTime={post.published_at} className="text-gray-500">
                    {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                 {post.category && (
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                        {post.category}
                    </span>
                 )}
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${post.slug}`}>
                        <span className="absolute inset-0"></span>
                        {post.title}
                    </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.meta_description}</p>
            </div>
        </div>
    </article>
);

export default function BlogIndexPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch('/api/blog');
                if (!res.ok) throw new Error('Failed to load posts');
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, []);
  
const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.meta_description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <PublicLayout>
            <BlogCategoryNav />

            {/* --- THIS IS THE RESTORED HERO SECTION --- */}
            <div className="relative bg-slate-900 h-[400px] flex items-center justify-center">
                <Image
                    src="https://cortexcart.com/images/cortexcart-blog-homepage-hero-AI-ecommerce-technology-image.png" // The AI-generated image URL
                    alt="Blog hero background"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 z-0 opacity-40"
                />
                <div className="relative z-10 text-center px-6">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">From the Blog</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-200">
                       Insights, tutorials, and updates from the CortexCart team.
                    </p>
                </div>
            </div>

            {/* --- This is the blog post list --- */}
            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
			   {/* --- Search Box --- */}
                    <div className="mb-12 max-w-lg mx-auto">
                        <div className="relative">
                            <input
                                type="search"
                                placeholder="Search articles..."
                                className="w-full px-4 py-3 pr-12 text-base text-gray-900 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-gray-500 bg-transparent rounded-full hover:text-blue-600 focus:outline-none">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div> 
			{isLoading ? (
                        <p className="text-center mt-8">Loading posts...</p>
                    ) : filteredPosts.length > 0 ? (
                        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                           {filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center mt-8">No posts found.</p>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
