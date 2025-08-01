import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { verifyAdminSession } from '@/lib/admin-auth';

// Handles creating a new roadmap feature
        const { name, description, status } = body;

    // This route can be public, so no session check is needed here.
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Use a direct SQL INSERT query
        await db.query(
            'INSERT INTO roadmap_features (name, description, status) VALUES (?, ?, ?)',
            [name, description, status]
        );

        return NextResponse.json({ message: 'Feature created successfully' }, { status: 201 });

    } catch (error) {
        console.error('[ROADMAP_POST_ERROR]', error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}

// Handles fetching all roadmap features
export async function GET() {
    try {
        // Use a direct SQL SELECT query
        const [features] = await db.query('SELECT * FROM roadmap_features ORDER BY sort_order ASC');
        return NextResponse.json(features);
    } catch (error) {
        console.error('[ROADMAP_GET_ERROR]', error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}