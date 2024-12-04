import bcrypt from 'bcrypt';
import clientPromise from '../src/lib/mongo.js'; // Adjust the path to your MongoDB connection

async function hashPasswords() {
  try {
    // Connect to the database
    const client = await clientPromise;
    const db = client.db('app'); // Replace 'app' with your database name

    // Fetch all users
    const users = await db.collection('login').find({}).toArray();

    for (const user of users) {
      // Skip if the password is already hashed (assuming hashed passwords are longer than 10 characters)
      if (user.pass && user.pass.length > 10) {
        console.log(`Skipping already hashed password for user: ${user.username}`);
        continue;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(user.pass, 10);

      // Update the user in the database
      await db.collection('login').updateOne(
        { _id: user._id },
        { $set: { pass: hashedPassword } }
      );

      console.log(`Password hashed for user: ${user.username}`);
    }

    console.log('Password hashing completed successfully!');
    process.exit(0); // Exit the script
  } catch (error) {
    console.error('Error hashing passwords:', error);
    process.exit(1); // Exit with error
  }
}

hashPasswords();
