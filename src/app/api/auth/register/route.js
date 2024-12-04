import { hash } from 'bcrypt';
import clientPromise from '../../../../../lib/mongo';

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({ message: 'Username and password are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const client = await clientPromise;
    const db = client.db('app'); // Your database name

    const existingUser = await db.collection('login').findOne({ username });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'Username already exists.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const hashedPassword = await hash(password, 10);

    await db.collection('login').insertOne({
      username,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ message: 'User registered successfully.' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return new Response(
      JSON.stringify({ message: 'Error registering user.', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}