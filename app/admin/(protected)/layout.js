import { redirect } from 'next/navigation';
import { verifyAdminSession } from '@/lib/admin-auth';
import AdminSidebar from './components/AdminSidebar';

export default async function AdminLayout({ children }) {
    // This is the crucial line. It MUST 'await' the session check.
    const adminSession = await verifyAdminSession();

    // If the session check fails for any reason, redirect to login.
    if (!adminSession) {
        redirect('/admin/login');
    }

    return (
        <div className="flex h-screen bg-gray-100 font-sans">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
}