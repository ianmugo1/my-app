import { NextResponse } from 'next/server';
import clientPromise from 'lib/mongo.js'; 

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('app'); 
    const products = await db.collection('products').find({}).toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Error fetching products', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json(); 
    const client = await clientPromise;
    const db = client.db('app'); 
    const result = await db.collection('products').insertOne(body);

    return NextResponse.json(
      { message: 'Product added successfully', result },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { message: 'Error adding product', error: error.message },
      { status: 500 }
    );
  }
}