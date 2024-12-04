import clientPromise from 'lib/mongo.js';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('app');
    const body = await req.json();

    const result = await db.collection('orders').insertOne(body);

    return new Response(JSON.stringify({ message: 'Order placed', id: result.insertedId }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error placing order', error: error.message }), {
      status: 500,
    });
  }
}
