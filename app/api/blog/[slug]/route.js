// app/api/blog/[slug]/route.js
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    // The slug is correctly destructured from params here
    const { slug } = params; 

    if (!slug) {
        return NextResponse.json({ message: 'Slug is required' }, { status: 400 });
    }

    let connection;
    try {
        connection = await db.getConnection();
        const mainPostQuery = `
            SELECT p.*, c.name AS category_name, c.slug AS category_slug
            FROM blog_posts p
            LEFT JOIN blog_categories c ON p.category_id = c.id
            WHERE p.slug = ? AND p.status = 'published' AND p.published_at <= NOW()
        `;
        const [mainPostRows] = await connection.query(mainPostQuery, [slug]);
        
        if (mainPostRows.length === 0) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 });
        }

        const sidebarPostsQuery = `
            SELECT title, slug, published_at FROM blog_posts
            WHERE status = 'published' AND published_at <= NOW() AND slug != ?
            ORDER BY published_at DESC LIMIT 5
        `;
        const [sidebarPosts] = await connection.query(sidebarPostsQuery, [slug]);

        return NextResponse.json({ mainPost: mainPostRows[0], sidebarPosts });

    } catch (error) {
        console.error('Error fetching blog post:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}