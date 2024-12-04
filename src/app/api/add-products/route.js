import clientPromise from '/Users/ianmugo/Desktop/rwaproject/my-app/lib/mongo.js';

export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Use the default database from the URI
    const collection = db.collection('products');

    // Sample product data
    const product = {
      title: "Original Glazed",
      description: "A true classic.",
      price: 1.5,
      image: "https://www.krispykreme.ie/media/catalog/product/s/i/singles_original_glazed_td_result_1.png"
    };

    const result = await collection.insertOne(product);

    return new Response(
      JSON.stringify({ message: 'Product added', result }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Error adding product', error }),
      { status: 500 }
    );
  }
}
