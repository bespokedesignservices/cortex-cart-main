'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { SparklesIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function EditPostPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [published, setPublished] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    
    // --- New State for AI generation ---
    const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
    const [isGeneratingContent, setIsGeneratingContent] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        const fetchPost = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/admin/blog/${id}`);
                if (!res.ok) throw new Error('Failed to fetch post data.');
                const post = await res.json();
                setTitle(post.title);
                setContent(post.content);
                setPublished(post.published);
                setImageUrl(post.featured_image_url || '');
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [id]);
    
    // --- New AI Handler Functions ---
    const handleGenerateTitle = async () => {
        setIsGeneratingTitle(true);
        try {
            const res = await fetch('/api/admin/ai/generate-blog-ideas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: title || 'a new blog post' }), // Use current title as prompt
            });
            if (!res.ok) throw new Error('Failed to generate title ideas.');
            const data = await res.json();
            // Assuming the API returns an array of ideas, we'll take the first one.
            if (data.ideas && data.ideas.length > 0) {
                setTitle(data.ideas[0]);
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setIsGeneratingTitle(false);
        }
    };

    const handleGenerateContent = async () => {
        if (!title) {
            alert('Please provide a title before generating content.');
            return;
        }
        setIsGeneratingContent(true);
        try {
            const res = await fetch('/api/admin/ai/generate-blog-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: title }), // Use the title to generate content
            });
            if (!res.ok) throw new Error('Failed to generate content.');
            const data = await res.json();
            setContent(data.content);
        } catch (err) {
            alert(err.message);
        } finally {
            setIsGeneratingContent(false);
        }
    };
    // --- End of New AI Handlers ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch(`/api/admin/blog/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, published, featured_image_url: imageUrl }),
            });
            if (!res.ok) throw new Error('Failed to update post.');
            router.push('/admin/blog');
        } catch (err) {
            setError(err.message);
        }
    };

    if (isLoading) return <p>Loading post...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Blog Post</h1>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
                <div>
                    <label htmlFor="title" className="flex items-center justify-between text-sm font-medium text-gray-700">
                        <span>Post Title</span>
                        <button type="button" onClick={handleGenerateTitle} disabled={isGeneratingTitle} className="text-xs inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 disabled:opacity-50">
                            <SparklesIcon className="h-4 w-4"/>
                            {isGeneratingTitle ? 'Generating...' : 'Generate with AI'}
                        </button>
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                
                <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        id="imageUrl"
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        onBlur={() => setImageUrl(imageUrl.trim())} // Trim whitespace on blur
                    />
                    {/* --- This is the new Image Preview --- */}
                    {imageUrl && (
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-600 mb-2">Image Preview:</p>
                            <Image
                                src={imageUrl}
                                alt="Featured image preview" 
                                className="rounded-lg shadow-md max-h-60 w-auto border border-gray-200"
                                width={500} // Example width, adjust as needed
                                height={300} // Example height, adjust as needed
                            />
                        </div>
                    )}
                </div>

                <div>
                    <label htmlFor="content" className="flex items-center justify-between text-sm font-medium text-gray-700">
                        <span>Content</span>
                        <button type="button" onClick={handleGenerateContent} disabled={isGeneratingContent} className="text-xs inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 disabled:opacity-50">
                            <SparklesIcon className="h-4 w-4"/>
                            {isGeneratingContent ? 'Generating...' : 'Generate with AI'}
                        </button>
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={15}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                
                <div className="flex items-center">
                    <input
                        id="published"
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor="published" className="ml-2 block text-sm text-gray-900">Publish Post</label>
                </div>
                
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Update Post
                    </button>
                </div>
            </form>
        </div>
    );
}