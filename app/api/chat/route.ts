import { NextRequest, NextResponse } from 'next/server';
import { bridviaAI } from '@/lib/bridvia-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [], userLocation = 'main', sessionId } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Validate user location
    if (!['main', 'bridvia-connect'].includes(userLocation)) {
      return NextResponse.json(
        { error: 'Invalid user location' },
        { status: 400 }
      );
    }

    // Log session for monitoring (optional)
    if (sessionId) {
      console.log(`Brid AI session: ${sessionId} - ${userLocation}`);
    }

    // Generate AI response
    const response = await bridviaAI.generateResponse(
      message,
      conversationHistory,
      userLocation as 'main' | 'bridvia-connect'
    );

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      userLocation,
      sessionId: sessionId || 'unknown'
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        fallbackResponse: 'I apologize, but I encountered an issue processing your request. Please try again or contact us at info@bridvia.com for assistance.'
      },
      { status: 500 }
    );
  }
}

// Handle CORS for development
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}