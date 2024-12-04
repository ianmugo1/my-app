import clientPromise from '/Users/ianmugo/Desktop/rwaproject/my-app/lib/mongo.js';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('app'); // Specify the database name
    const collections = await db.listCollections().toArray(); // List all collections in 'app'

    return new Response(JSON.stringify({ message: 'Connection successful', collections }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    return new Response(JSON.stringify({ message: 'Error connecting to database', error }), {
      status: 500,
    });
  }
}
