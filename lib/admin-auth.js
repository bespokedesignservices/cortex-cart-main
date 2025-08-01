// lib/admin-auth.js (Definitive Final Version)
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

function getSecret() {
    const secret = process.env.JWT_ADMIN_SECRET;
    if (!secret) {
        throw new Error("The JWT_ADMIN_SECRET environment variable is not set.");
    }
    return new TextEncoder().encode(secret);
}

export async function verifyAdminSession() {
    // This is the correct, asynchronous way to access cookies in Next.js
    const cookieStore = cookies();
    const token = cookieStore.get('admin-session-token')?.value;

    if (!token) {
        return null;
    }

    try {
        const secret = getSecret();
        const { payload } = await jwtVerify(token, secret);

        if (payload.role !== 'superadmin') {
            return null;
        }

        return payload;
    } catch (err) {
        console.error("Admin session verification failed:", err.code);
        return null;
    }
}