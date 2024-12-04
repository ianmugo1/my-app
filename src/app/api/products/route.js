export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db('app'); // Use 'app' database

    const body = await req.json(); // Get the request body
    const result = await db.collection('products').insertOne(body); // Insert the new product

    return new Response(
      JSON.stringify({ message: 'Product added successfully', result }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding product:', error);
    return new Response(
      JSON.stringify({ message: 'Error adding product', error }),
      { status: 500 }
    );
  }
}
