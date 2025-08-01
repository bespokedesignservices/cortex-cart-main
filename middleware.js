import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// This function now correctly gets the ADMIN secret key.
const getSecret = () => {
    // This now matches the rest of the application.
    const secret = process.env.JWT_ADMIN_SECRET;
    if (!secret) {
        throw new Error('The JWT_ADMIN_SECRET environment variable is not set.');
    }
    return new TextEncoder().encode(secret);
};

export async function middleware(req) {
    const { pathname } = req.nextUrl;
    
    // This middleware only protects routes starting with /admin
    if (pathname.startsWith('/admin')) {
        // Allow requests to the login page to pass through
        if (pathname.startsWith('/admin/login')) {
            return NextResponse.next();
        }

        const adminToken = req.cookies.get('admin-session-token')?.value;

        // If there is no token, redirect to the login page.
        if (!adminToken) {
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }

        try {
            const secret = getSecret();
            // Verify the token is valid and signed with the correct secret.
            const { payload } = await jwtVerify(adminToken, secret);
            
            // Ensure the user has the correct role.
            if (payload.role !== 'superadmin') {
                throw new Error('Forbidden');
            }
            
            // If verification is successful, allow the request to proceed.
            return NextResponse.next();
        } catch (error) {
            console.error('Admin authentication failed:', error.message);
            // If verification fails for any reason, redirect to the login page.
            return NextResponse.redirect(new URL('/admin/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    // This specifies that the middleware should run on all admin routes.
    matcher: ['/admin/:path*'],
};