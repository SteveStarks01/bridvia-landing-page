// Test the new formatting with the exact example provided
const testFormattingExample = () => {
  console.log('🎨 Testing Response Formatting Components..\n');
  
  const exampleResponse = `Hello! I'm Brid AI, here to help you connect with opportunities that bridge education and industry. Whether you're a student, recent graduate, career switcher, or professional looking to enhance your skills, Bridvia can assist you.

Here's how I can help:

1. **Explore Internship Opportunities**: Learn about structured internships with clear learning objectives and real-world projects.
2. **Career Development Guidance**: Get tips on building your resume, interview skills, and professional networking.
3. **Mentorship Support**: Understand the mentorship programs available to guide your career growth.
4. **Industry Insights**: Gain exposure to various industries and future-ready skills in demand.

For specific inquiries or to get started, please contact info@bridvia.com.

Let's bridge the gap between where you are and where you want to be!`;
  
  console.log('📊 Formatting Analysis:');
  console.log('✅ Contains numbered lists:', /\d+\.\s/.test(exampleResponse));
  console.log('✅ Contains bold formatting:', /\*\*.*?\*\*/.test(exampleResponse));
  console.log('✅ Contains email:', /\S+@\S+\.\S+/.test(exampleResponse));
  console.log('✅ Contains paragraphs:', exampleResponse.includes('\n\n'));
  
  console.log('\n📄 Original vs Formatted:');
  console.log('- Lists will have styled numbers with circular backgrounds');
  console.log('- Bold text will be properly emphasized');
  console.log('- Email addresses will become clickable links');
  console.log('- Proper spacing between sections');
  
  return exampleResponse;
};

const testFormattedResponse = async () => {
  console.log('📝 Testing Formatted AI Response...\n');
  
  const testResponse = await fetch('http://localhost:3004/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Hi! Can you introduce yourself and tell me how you can help?',
      userLocation: 'main',
      sessionId: 'test-formatting-session',
      conversationHistory: []
    }),
  });
  
  const data = await testResponse.json();
  console.log('✅ Formatted Response Test Success!');
  console.log('Response Length:', data.response.length);
  console.log('Contains numbered lists:', /\d+\.\s/.test(data.response));
  console.log('Contains bold formatting:', /\*\*.*?\*\*/.test(data.response));
  console.log('Contains email:', /\S+@\S+\.\S+/.test(data.response));
  
  console.log('\n📄 Raw Response Preview:');
  console.log(data.response.substring(0, 200) + '...');
  
  console.log('\n🎨 Formatting will be applied in the UI component!');
};

console.log('🎨 Testing Brid AI Response Formatting...\n');
testFormattingExample();
testFormattedResponse().catch(console.error);