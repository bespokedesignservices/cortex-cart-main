import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';

// This handles fetching all CMS content as key-value pairs.
export async function GET() {
    try {
        // This now uses the correct column names: content_key and content_value
        const [rows] = await db.query('SELECT `content_key`, `content_value` FROM cms_content');

        // Convert the array of {key, value} objects into a single object
        const contentObject = rows.reduce((acc, row) => {
            acc[row.content_key] = row.content_value;
            return acc;
        }, {});

        return NextResponse.json(contentObject);
    } catch (error) {
        console.error('[CMS_GET_ERROR]', error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

// This handles updating a single piece of content using its key.
export async function POST(req) {
    const session = await verifyAdminSession();
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), { status: 401 });
    }

    try {
        const { key, value } = await req.json();

        if (!key) {
            return NextResponse.json({ message: '"key" is a required field' }, { status: 400 });
        }

        // This SQL command now uses the correct column names and will update a row
        // if the key exists, or insert a new one if it doesn't.
        const query = 'INSERT INTO cms_content (`content_key`, `content_value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `content_value` = ?';
        await db.query(query, [key, value, value]);

        return NextResponse.json({ message: 'Content updated successfully' }, { status: 200 });

    } catch (error) {
        console.error('[CMS_POST_ERROR]', error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}