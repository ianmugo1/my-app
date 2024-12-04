import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongo';

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db('app');
  const existingUser = await db.collection('users').findOne({ email: body.email });

  if (existingUser) {
    return NextResponse.json({ success: false, message: 'User already exists' });
  }

  await db.collection('users').insertOne(body);
  return NextResponse.json({ success: true });
}
