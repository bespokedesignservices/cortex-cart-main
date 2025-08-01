import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';

// Handles fetching all blog posts
export async function GET() {
    try {
        const [posts] = await db.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
        return NextResponse.json(posts);
    } catch (error) {
        console.error('[BLOG_GET_ERROR]', error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

// Handles creating a new blog post
export async function POST(req) {
    const session = await verifyAdminSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), { status: 401 });
    }

    try {
        const body = await req.json();
        const { title, content, author, published, imageUrl } = body;

        if (!title || !content) {
            return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
        }

        const [result] = await db.query(
            'INSERT INTO blog_posts (title, content, author, published, imageUrl) VALUES (?, ?, ?, ?, ?)',
            [title, content, author || 'Admin', published || false, imageUrl || null]
        );

        return NextResponse.json({ message: 'Blog post created successfully', id: result.insertId }, { status: 201 });

    } catch (error) {
        console.error('[BLOG_POST_ERROR]', error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}