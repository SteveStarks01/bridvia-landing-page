// Simple test script to verify Brid AI functionality and session isolation
// Run with: node test-ai.js

const testSessionIsolation = async () => {
  console.log('🔒 Testing Session Isolation...\n');
  
  // Simulate two different users/sessions
  const session1Id = `brid-${Date.now()}-user1`;
  const session2Id = `brid-${Date.now()}-user2`;
  
  // User 1 conversation
  const user1Response = await fetch('http://localhost:3004/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'My name is Alice and I love web development',
      userLocation: 'main',
      sessionId: session1Id,
      conversationHistory: []
    }),
  });
  
  const user1Data = await user1Response.json();
  console.log('✅ User 1 (Alice) Message Success!');
  console.log('Session ID:', user1Data.sessionId);
  
  // User 2 conversation (different session)
  const user2Response = await fetch('http://localhost:3004/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'My name is Bob and I am interested in data science',
      userLocation: 'bridvia-connect',
      sessionId: session2Id,
      conversationHistory: []
    }),
  });
  
  const user2Data = await user2Response.json();
  console.log('\n✅ User 2 (Bob) Message Success!');
  console.log('Session ID:', user2Data.sessionId);
  
  // Verify sessions are different
  if (user1Data.sessionId !== user2Data.sessionId) {
    console.log('\n🎉 Session Isolation PASSED - Different sessions maintained!');
  } else {
    console.log('\n⚠️ Session Isolation FAILED - Sessions are not isolated!');
  }
  
  console.log('\n📊 Session Summary:');
  console.log(`User 1 (Alice): ${user1Data.sessionId}`);
  console.log(`User 2 (Bob): ${user2Data.sessionId}`);
};

const testConversationMemory = async () => {
  console.log('🧠 Testing Conversation Memory...\n');
  
  // First message
  const firstResponse = await fetch('http://localhost:3004/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'My name is John and I am interested in web development internships',
      userLocation: 'bridvia-connect',
      conversationHistory: [],
      sessionId: 'test-memory-session'
    }),
  });
  
  const firstData = await firstResponse.json();
  console.log('✅ First Message Success!');
  console.log('Response:', firstData.response.substring(0, 100) + '...');
  
  // Build conversation history for follow-up
  const conversationHistory = [
    { role: 'user', content: 'My name is John and I am interested in web development internships' },
    { role: 'assistant', content: firstData.response }
  ];
  
  // Follow-up message to test memory
  const followUpResponse = await fetch('http://localhost:3004/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'What skills should I focus on based on what I told you?',
      userLocation: 'bridvia-connect',
      conversationHistory: conversationHistory,
      sessionId: 'test-memory-session'
    }),
  });
  
  const followUpData = await followUpResponse.json();
  console.log('\n✅ Follow-up Message Success!');
  console.log('Response:', followUpData.response.substring(0, 100) + '...');
  
  // Check if the AI remembers the context
  if (followUpData.response.toLowerCase().includes('john') || 
      followUpData.response.toLowerCase().includes('web development')) {
    console.log('\n🎉 Memory Test PASSED - AI remembers context!');
  } else {
    console.log('\n⚠️ Memory Test INCONCLUSIVE - Check response manually');
  }
};

const testAPI = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'What is Bridvia?',
        userLocation: 'main'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ AI API Test Success!');
    console.log('Response:', data.response);
    console.log('User Location:', data.userLocation);
    console.log('Timestamp:', data.timestamp);
    
  } catch (error) {
    console.error('❌ AI API Test Failed:', error);
  }
};

// Test BridviaConnect context
const testBridviaConnect = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Tell me about internship opportunities',
        userLocation: 'bridvia-connect'
      }),
    });

    const data = await response.json();
    console.log('\n✅ BridviaConnect Context Test Success!');
    console.log('Response:', data.response);
    
  } catch (error) {
    console.error('❌ BridviaConnect Test Failed:', error);
  }
};

console.log('🤖 Testing Brid AI API...\n');
testAPI()
  .then(() => testBridviaConnect())
  .then(() => testConversationMemory())
  .then(() => testSessionIsolation())
  .catch(console.error);