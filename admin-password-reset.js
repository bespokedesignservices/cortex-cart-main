// update-admin-password.js (Corrected)

// --- THIS IS THE FIX ---
// We must load the environment variables BEFORE importing any code that uses them.
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });
// --- END OF FIX ---

// Now we can safely import our other modules
const { db } = require('./lib/db');
const bcrypt = require('bcryptjs');
const readline = require('readline');

// Check if the required database variables are loaded
if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_DATABASE) {
    console.error("❌ Error: Database environment variables (MYSQL_HOST, MYSQL_USER, MYSQL_DATABASE) are not loaded.");
    console.error("Please ensure your '.env.local' file is in the root directory and contains the correct credentials.");
    process.exit(1); // Exit the script immediately
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const updatePassword = async () => {
    console.log("--- Superadmin Password Update Tool ---");
    
    rl.question('Enter the email of the superadmin to update: ', (email) => {
        rl.question('Enter the new password: ', async (newPassword) => {
            if (!email || !newPassword) {
                console.error("❌ Email and new password are required.");
                rl.close();
                process.exit(1);
            }

            let connection;
            try {
                console.log("🔄 Connecting to the database...");
                connection = await db.getConnection();
                
                console.log("🔄 Hashing new password...");
                const hashedPassword = await bcrypt.hash(newPassword, 10);

                console.log(`🔄 Attempting to update password for ${email}...`);
                const [result] = await connection.query(
                    'UPDATE admins SET password = ? WHERE email = ? AND role = "superadmin"',
                    [hashedPassword, email]
                );

                if (result.affectedRows === 0) {
                    console.log(`\n❌ Error: No superadmin found with the email "${email}". No changes were made.`);
                } else {
                    console.log(`\n✅ Success! The password for "${email}" has been updated.`);
                }

            } catch (error) {
                console.error("\n❌ An unexpected error occurred:", error.message);
            } finally {
                if (connection) {
                    connection.release();
                    console.log("✅ Database connection released.");
                }
                rl.close();
            }
        });
    });
};

updatePassword();