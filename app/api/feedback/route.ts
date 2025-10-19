import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/db';
import { feedbacks } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const newFeedback = await db.insert(feedbacks).values({
      userEmail: session.user.email || 'user@email.com',
      schoolName: data.schoolName,
      foodQualityRating: data.foodQualityRating,
      foodTasteRating: data.foodTasteRating,
      portionSizeRating: data.portionSizeRating,
      foodTemperatureRating: data.foodTemperatureRating,
      varietyRating: data.varietyRating,
      presentationRating: data.presentationRating,
      hygieneRating: data.hygieneRating,
      favoriteItem: data.favoriteItem,
      leastFavoriteItem: data.leastFavoriteItem,
      suggestions: data.suggestions,
    }).returning();

    return NextResponse.json({ success: true, feedback: newFeedback[0] }, { status: 201 });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const allFeedbacks = await db.select().from(feedbacks);

    return NextResponse.json({ feedbacks: allFeedbacks }, { status: 200 });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return NextResponse.json({ error: 'Failed to fetch feedbacks' }, { status: 500 });
  }
}
