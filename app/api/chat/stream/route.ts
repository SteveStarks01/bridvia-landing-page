import { NextRequest } from 'next/server';
import { bridviaAI } from '@/lib/bridvia-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, conversationHistory = [], userLocation = 'main', sessionId } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required and must be a string' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Log session for monitoring (optional)
    if (sessionId) {
      console.log(`Brid AI streaming session: ${sessionId} - ${userLocation}`);
    }

    // Create a ReadableStream for streaming response
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        
        try {
          // Generate streaming response
          for await (const chunk of bridviaAI.generateStreamResponse(
            message,
            conversationHistory,
            userLocation as 'main' | 'bridvia-connect'
          )) {
            // Send each chunk as SSE (Server-Sent Events)
            const data = `data: ${JSON.stringify({ 
              content: chunk, 
              timestamp: new Date().toISOString() 
            })}\n\n`;
            
            controller.enqueue(encoder.encode(data));
          }
          
          // Send completion signal
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ 
            content: '[DONE]', 
            timestamp: new Date().toISOString() 
          })}\n\n`));
          
          controller.close();
          
        } catch (error) {
          console.error('Streaming Error:', error);
          
          // Send error and fallback response
          const errorData = `data: ${JSON.stringify({ 
            error: 'Streaming failed',
            content: 'I apologize, but I encountered an issue processing your request. Please try again or contact us at info@bridvia.com for assistance.',
            timestamp: new Date().toISOString()
          })}\n\n`;
          
          controller.enqueue(encoder.encode(errorData));
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (error) {
    console.error('Stream API Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        fallbackResponse: 'I apologize, but I encountered an issue processing your request. Please try again or contact us at info@bridvia.com for assistance.'
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Handle CORS for development
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}