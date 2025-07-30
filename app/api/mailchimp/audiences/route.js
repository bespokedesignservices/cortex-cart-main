// src/app/api/mailchimp/audiences/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db'; // Your mysql2 connection
import { decrypt } from '@/lib/crypto';
import axios from 'axios';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const connection = await db.getConnection();
    try {
        // 1. Get the user's encrypted Mailchimp credentials from your database
        const [rows] = await connection.query(
            'SELECT access_token_encrypted, server_prefix FROM mailchimp_connections WHERE user_id = ?',
            [session.user.id]
        );

        if (rows.length === 0) {
            return new NextResponse("Mailchimp connection not found.", { status: 404 });
        }

        const mailchimpConnection = rows[0];
        const accessToken = decrypt(mailchimpConnection.access_token_encrypted);
        const serverPrefix = mailchimpConnection.server_prefix;

        // 2. Use the credentials to call the official Mailchimp API
        const mailchimpApiUrl = `https://${serverPrefix}.api.mailchimp.com/3.0/lists`;
        const response = await axios.get(mailchimpApiUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        // 3. Return the list of audiences from Mailchimp to your frontend
        return NextResponse.json(response.data.lists, { status: 200 });

    } catch (error) {
        console.error("Error fetching Mailchimp audiences:", error.response?.data || error.message);
        return new NextResponse("Internal Server Error", { status: 500 });
    } finally {
        if (connection) connection.release();
    }
}