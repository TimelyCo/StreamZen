import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '@/lib/mongodb';
import Content from '@/models/Content';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const genre = searchParams.get('genre');
    const year = searchParams.get('year');

    await connectDB();

    let query: any = {};

    if (type && type !== 'all') {
      query.type = type;
    }

    if (genre && genre !== 'all') {
      query.genre = genre;
    }

    if (year && year !== 'all') {
      query.releaseYear = parseInt(year);
    }

    const content = await Content.find(query)
      .sort({ createdAt: -1 })
      .limit(20);

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 