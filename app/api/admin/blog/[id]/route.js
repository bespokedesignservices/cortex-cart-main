import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';

// Handles fetching a single blog post by its ID
export async function GET(req, { params }) {
    try {
        const { id } = params;
        // This query fetches all columns for the post, including 'featured_image_url'.
        const [posts] = await db.query('SELECT * FROM blog_posts WHERE id = ?', [id]);

        if (posts.length === 0) {
            return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        // The full post object, with the image URL, is returned here.
        return NextResponse.json(posts[0]);
    } catch (error) {
        console.error('[BLOG_GET_SINGLE_ERROR]', error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

// Handles updating a specific blog post
export async function PUT(req, { params }) {
    const session = await verifyAdminSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), { status: 401 });
    }

    try {
        const { id } = params;
        const body = await req.json();
        const { title, content, published, featured_image_url, author } = body;

        if (!title || !content) {
            return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
        }

        const fieldsToUpdate = {};
        if (title !== undefined) fieldsToUpdate.title = title;
        if (content !== undefined) fieldsToUpdate.content = content;
        if (published !== undefined) fieldsToUpdate.published = published;
        if (featured_image_url !== undefined) fieldsToUpdate.featured_image_url = featured_image_url;
        if (author !== undefined) fieldsToUpdate.author = author;

        const [result] = await db.query(
            'UPDATE blog_posts SET ? WHERE id = ?',
            [fieldsToUpdate, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog post updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('[BLOG_PUT_ERROR]', error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

// Handles deleting a specific blog post
export async function DELETE(req, { params }) {
    const session = await verifyAdminSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), { status: 401 });
    }

    try {
        const { id } = params;
        const [result] = await db.query('DELETE FROM blog_posts WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Blog post not found' }, { status: 404 });
        }

        return new NextResponse(null, { status: 204 });

    } catch (error) {
        console.error('[BLOG_DELETE_ERROR]', error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}