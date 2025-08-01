// app/api/auth/admin-login/route.js
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// This function gets the secret key from your environment variables.
// It's crucial for securely signing the session token.
const getSecret = () => {
    const secret = process.env.JWT_ADMIN_SECRET;
    if (!secret) {
        throw new Error('The JWT_ADMIN_SECRET environment variable is not set.');
    }
    return new TextEncoder().encode(secret);
};

// This is the main function that handles POST requests to this endpoint.
export async function POST(req) {
    try {
        // 1. Get the email and password from the login form.
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
        }

        // 2. Find the admin in the database.
        const [admins] = await db.query('SELECT * FROM admins WHERE email = ? AND role = "superadmin"', [email]);

        if (admins.length === 0) {
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }
        const admin = admins[0];

        // 3. Compare the provided password with the secure hash in the database.
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
        }

        // 4. If the password is valid, create a secure JSON Web Token (JWT).
        const payload = { userId: admin.id, email: admin.email, role: admin.role };
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1d') // The session will expire in 1 day.
            .sign(getSecret());

        // 5. Set the token in a secure, httpOnly cookie.
        cookies().set('admin-session-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day in seconds.
        });

        return NextResponse.json({ message: 'Login successful' }, { status: 200 });

    } catch (error) {
        console.error('Admin login error:', error);
        return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
    }
}