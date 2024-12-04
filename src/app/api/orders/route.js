import clientPromise from '../../../../lib/mongo';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db('app'); // Use your MongoDB database name

    const orders = await db.collection('orders').find({}).sort({ createdAt: -1 }).toArray();

    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return new Response(JSON.stringify({ message: 'Error fetching orders' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { customer, items, totalPrice } = body;

    if (
      !customer?.name || 
      !customer?.email || 
      !customer?.address || 
      !Array.isArray(items) || 
      items.length === 0 || 
      typeof totalPrice !== 'number'
    ) {
      return new Response(JSON.stringify({ message: 'Invalid order data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await clientPromise;
    const db = client.db('app'); // Ensure this matches your MongoDB database name

    const result = await db.collection('orders').insertOne({
      customer,
      items,
      totalPrice,
      status: 'Pending', // Default status
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: 'Order placed successfully', orderId: result.insertedId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error placing order:', error);
    return new Response(JSON.stringify({ message: 'Error placing order' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { orderId, status } = body;

    if (!orderId || !status) {
      return new Response(JSON.stringify({ message: 'Invalid data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const client = await clientPromise;
    const db = client.db('app');

    await db.collection('orders').updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status } }
    );

    return new Response(JSON.stringify({ message: 'Order status updated successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    return new Response(JSON.stringify({ message: 'Error updating order status' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}