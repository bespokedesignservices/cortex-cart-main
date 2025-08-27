// app/blog/[slug]/page.js
import BlogPostLayout from "@/app/components/BlogPostLayout"; // Assuming this is the correct path
import { db } from "@/lib/db";

// This async function now correctly gets the slug from params
async function getPost(slug) { // No change needed here, slug is already a direct parameter
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
        
        if (mainPostRows.length === 0) return null;

        const sidebarPostsQuery = `
            SELECT id, title, slug, published_at, featured_image_url, author_name FROM blog_posts
            WHERE status = 'published' AND published_at <= NOW() AND slug != ?
            ORDER BY published_at DESC LIMIT 5
        `;
        const [sidebarPosts] = await connection.query(sidebarPostsQuery, [slug]);

        return { mainPost: mainPostRows[0], sidebarPosts };
    } catch (error) {
        console.error("Error fetching post data:", error);
        return null;
    } finally {
        if (connection) connection.release();
    }
}

// This function now correctly receives params
export async function generateMetadata({ params }) {
    const { slug } = params;
    const data = await getPost(slug);
    
    if (!data?.mainPost) {
        return { title: 'Post Not Found' };
    }
    
    return {
        title: data.mainPost.meta_title || data.mainPost.title,
        description: data.mainPost.meta_description,
    };
}

// This is the main page component
export default async function BlogPostPage({ params }) {
    const { slug } = params;
    const data = await getPost(slug);

    if (!data) {
        // You should handle the case where the post is not found
        // For example, by showing a "not found" component
        return <div>Post not found.</div>;
    }

    return <BlogPostLayout post={data.mainPost} sidebarPosts={data.sidebarPosts} key={data.mainPost.slug} />;
}