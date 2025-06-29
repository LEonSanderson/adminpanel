import bcrypt from 'bcryptjs';

const usersToHash = [
    { badgeId: 'admin', password: 'ADMINONLY007', role: 'admin' }, // Admin user
    { badgeId: '1214', password: '1234', role: 'user' },
    { badgeId: '2541', password: '1234', role: 'user' },
    { badgeId: '4445', password: '1234', role: 'user' },
    { badgeId: '5423', password: '1234', role: 'user' },
    { badgeId: '3841', password: '1234', role: 'user' },
    { badgeId: '7205', password: '1234', role: 'user' },
    { badgeId: '1474', password: '1234', role: 'user' },
    { badgeId: '1123', password: '1234', role: 'user' },
    { badgeId: '5647', password: '1234', role: 'user' },
    { badgeId: '1447', password: '1234', role: 'user' },
    { badgeId: '8459', password: '1234', role: 'user' },
    { badgeId: '2604', password: '1234', role: 'user' },
    { badgeId: '8354', password: '1234', role: 'user' },
    { badgeId: '8352', password: '1234', role: 'user' },
    { badgeId: '7745', password: '1234', role: 'user' },
    { badgeId: '9145', password: '1234', role: 'user' },
    { badgeId: '1569', password: '1234', role: 'user' },
    // มี badgeId '9145' ซ้ำในรายการ ควรตรวจสอบก่อนนำเข้าฐานข้อมูล
    // { badgeId: '9145', password: '1234', role: 'user' }, 
    { badgeId: '4896', password: '1234', role: 'user' },
    { badgeId: '8526', password: '1234', role: 'user' },
    { badgeId: '8005', password: '1234', role: 'user' },
    { badgeId: '8447', password: '1234', role: 'user' },
    { badgeId: '4629', password: '1234', role: 'user' },
    { badgeId: '6458', password: '1234', role: 'user' },
    { badgeId: '7774', password: '1234', role: 'user' },
    { badgeId: '6565', password: '1234', role: 'user' },
    { badgeId: '4949', password: '1234', role: 'user' },
    { badgeId: '8998', password: '1234', role: 'user' },
    // **ข้อควรระวัง: badgeId ว่างเปล่า ('') ไม่แนะนำให้ใช้ใน Production**
    // { badgeId: '', password: '1234', role: 'user' }, 
];

async function generateSqlInserts() {
    console.log("Generating SQL INSERT statements with hashed passwords:");
    console.log("--- START SQL ---");
    console.log("INSERT INTO users (badge_id, password_hash, user_role) VALUES");

    const inserts = [];
    // ใช้ Set เพื่อติดตาม badgeId ที่ซ้ำกัน
    const uniqueBadgeIds = new Set(); 

    for (const user of usersToHash) {
        // ข้าม badgeId ที่ซ้ำกันหรือว่างเปล่า
        if (!user.badgeId || uniqueBadgeIds.has(user.badgeId)) {
            console.warn(`Skipping duplicate or empty badgeId: '${user.badgeId}'`);
            continue;
        }
        uniqueBadgeIds.add(user.badgeId);

        const hashedPassword = await bcrypt.hash(user.password, 10); // salt rounds = 10
        inserts.push(`('${user.badgeId}', '${hashedPassword}', '${user.role}')`);
    }

    console.log(inserts.join(',\n') + ';');
    console.log("--- END SQL ---");
    console.log("\nRemember to run these SQL statements in your Neon DB to populate the users table.");
    console.log("And ensure the 'users' table has a UNIQUE constraint on 'badge_id'.");
}

generateSqlInserts();