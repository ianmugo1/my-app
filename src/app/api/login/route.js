import clientPromise from '/Users/ianmugo/Desktop/rwaproject/my-app/lib/mongo.js';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('app'); // Use 'app' database
    const users = await db.collection('login').find({}).toArray(); // Fetch all login documents

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching login data:', error);
    return new Response(
      JSON.stringify({ message: 'Error fetching login data', error }),
      { status: 500 }
    );
  }
}
