// Test script to verify inquiry integration with Brid AI
// Run this in the browser console to test the integration

const testInquiryIntegration = () => {
  console.log('🔍 Testing Inquiry Integration with Brid AI...\n');
  
  // Test 1: Check if the inquiry input exists
  const inquiryInput = document.querySelector('input[placeholder="Have any inquiries?"]');
  console.log('✅ Inquiry input found:', !!inquiryInput);
  
  // Test 2: Check if the submit button exists
  const submitButton = inquiryInput?.parentElement?.querySelector('button');
  console.log('✅ Submit button found:', !!submitButton);
  
  // Test 3: Check if AI component exists
  const aiComponent = document.querySelector('[data-panel]');
  console.log('✅ AI component found:', !!aiComponent);
  
  // Test 4: Check scroll functionality
  const firstSection = document.querySelector('[data-first-section]');
  console.log('✅ First section for scroll reference found:', !!firstSection);
  
  // Test 5: Simulate inquiry submission
  if (inquiryInput && submitButton) {
    console.log('\n🧪 Simulating inquiry submission...');
    
    // Fill in test inquiry
    const testInquiry = 'What internship opportunities do you have?';
    (inquiryInput as HTMLInputElement).value = testInquiry;
    inquiryInput.dispatchEvent(new Event('change', { bubbles: true }));
    
    // Simulate button click
    setTimeout(() => {
      submitButton.click();
      console.log('✅ Test inquiry submitted:', testInquiry);
      console.log('📝 Watch for auto-scroll and AI activation...');
    }, 1000);
  }
  
  console.log('\n📊 Integration Test Complete!');
  console.log('Expected behavior:');
  console.log('1. Input inquiry and click arrow button');
  console.log('2. Page auto-scrolls to AI section');
  console.log('3. Brid AI automatically opens and processes inquiry');
  console.log('4. Response appears after thinking animation');
};

// Export for manual testing
window.testInquiryIntegration = testInquiryIntegration;

console.log('🚀 Inquiry Integration Test Loaded!');
console.log('📝 Run window.testInquiryIntegration() to test the functionality');
console.log('💡 Or manually type an inquiry in the hero section and click the arrow!');