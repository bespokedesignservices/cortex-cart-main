// In cortex-cart-main/src/middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const getSecret = () => {
    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) {
        throw new Error('Missing NEXTAUTH_SECRET environment variable');
    }
    return new TextEncoder().encode(secret);
};

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    const secret = getSecret();
    const appUrl = process.env.NEXTAUTH_URL; // This should be https://cortexcart.com

    // This middleware ONLY protects the /admin routes
    if (pathname.startsWith('/admin')) {
        if (pathname.startsWith('/admin/login')) {
            return NextResponse.next();
        }

        const adminCookie = req.cookies.get('admin-session-token');
        const adminToken = adminCookie?.value;

        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', appUrl));
        }

        try {
            const { payload } = await jwtVerify(adminToken, secret);
            if (payload.role !== 'superadmin') {
                return NextResponse.redirect(new URL('/admin/login?error=Forbidden', appUrl));
            }
            return NextResponse.next();
        } catch (error) {
            console.error('Admin token verification failed:', error);
            return NextResponse.redirect(new URL('/admin/login', appUrl));
        }
    }

    // For all other routes, do nothing.
    return NextResponse.next();
}

export const config = {
    // Only run this middleware on admin routes
    matcher: ['/admin/:path*'],
};