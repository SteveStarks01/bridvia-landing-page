# Brid AI Integration Documentation

## Overview

The Bridvia platform now includes "Brid AI," an intelligent assistant powered by OpenRouter API. Brid AI provides contextual, knowledgeable responses about Bridvia services, internship opportunities, and career development guidance.

## Features

### 🤖 **Brid AI Assistant**
- **Context-Aware**: Different responses based on page location (main vs BridviaConnect)
- **Knowledge Base**: Comprehensive understanding of Bridvia ecosystem and services
- **Conversation Memory**: Maintains conversation history for contextual responses
- **Session Isolation**: Each user gets their own isolated conversation session
- **Fallback System**: Graceful degradation when API is unavailable

### 🎯 **Contextual Responses**
- **Main Page**: General Bridvia information, ecosystem overview, services
- **BridviaConnect Page**: Focused on internships, career development, Phase 1 programs
- **Dynamic Placeholders**: Input hints change based on current page context

### 🚀 **Modern Implementation**
- **Real-time API**: Direct integration with OpenRouter
- **Streaming Support**: Ready for real-time response streaming
- **Error Handling**: Robust fallback mechanisms
- **TypeScript**: Fully typed for reliability

## Setup Instructions

### 1. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env.local
```

Add your OpenRouter API key:
```env
OPENROUTER_API_KEY=your_api_key_here
```

### 2. Get OpenRouter API Key

1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up for an account
3. Navigate to [API Keys](https://openrouter.ai/keys)
4. Generate a new API key
5. Add credits to your account for usage

### 3. Model Configuration

The system uses `anthropic/claude-3.5-sonnet` by default for high-quality responses. You can customize this in `lib/bridvia-ai.ts`:

```typescript
private model = 'anthropic/claude-3.5-sonnet'; // Change as needed
```

Popular alternatives:
- `openai/gpt-4o` - Latest GPT-4 model
- `anthropic/claude-3-haiku` - Faster, more cost-effective
- `meta-llama/llama-3.1-8b-instruct` - Open source option

## Architecture

### Core Components

#### 1. **BridviaAI Service** (`lib/bridvia-ai.ts`)
- Handles OpenRouter API communication
- Manages knowledge base integration
- Provides context-aware system prompts
- Implements fallback responses

#### 2. **API Routes**
- **`/api/chat`** - Standard chat completions
- **`/api/chat/stream`** - Streaming responses (ready for future use)

#### 3. **AI Input Component** (`components/ai-input.tsx`)
- Enhanced with real API integration
- Context detection and conversation history
- Smooth error handling and user feedback

#### 4. **Knowledge Base** (`lib/knowledge-base.md`)
- Comprehensive platform information
- Service descriptions and use cases
- Common questions and answers
- Brand guidelines and messaging

### Data Flow

```
User Input → AI Component → API Route → BridviaAI Service → OpenRouter → Response
                ↓
        Context Detection (main/bridvia-connect)
                ↓
        Knowledge Base Integration
                ↓
        Conversation History Management
```

## Usage Examples

### Basic Integration

The AI component automatically detects context:

```tsx
// Main page - automatically detects 'main' context
<ScrollAIPanel />

// BridviaConnect page - explicitly set context
<ScrollAIPanel userLocation="bridvia-connect" />
```

### API Direct Usage

```typescript
import { bridviaAI } from '@/lib/bridvia-ai';

// Generate response
const response = await bridviaAI.generateResponse(
  "What internship opportunities are available?",
  [], // conversation history
  'bridvia-connect' // context
);

// Streaming response
for await (const chunk of bridviaAI.generateStreamResponse(
  "Tell me about Bridvia",
  [],
  'main'
)) {
  console.log(chunk); // Each word/phrase as it's generated
}
```

## Customization

### 1. **Knowledge Base Updates**

Edit `lib/knowledge-base.md` to update AI knowledge:

```markdown
## New Section
Add new information about platform features, services, or policies.
```

The AI service automatically incorporates this information into responses.

### 2. **Context-Specific Responses**

Modify system prompts in `lib/bridvia-ai.ts`:

```typescript
private createSystemPrompt(userLocation: 'main' | 'bridvia-connect'): string {
  // Customize based on needs
  if (userLocation === 'bridvia-connect') {
    return basePrompt + `
    FOCUS: Internship-specific guidance and support
    `;
  }
  // ...
}
```

### 3. **Response Customization**

Update fallback responses in the `generateMockResponse` method for better offline experience.

## Performance & Cost

### API Usage
- **Model**: Claude 3.5 Sonnet (~$15/1M tokens)
- **Optimization**: 500 token limit per response
- **History**: Last 10 messages kept for context
- **Caching**: Conversation history maintained client-side

### Fallback System
- **No API Key**: Intelligent mock responses based on input patterns
- **API Errors**: Graceful degradation with helpful error messages
- **Offline**: Context-aware static responses

## Monitoring & Analytics

### Response Quality
- Track user interactions and satisfaction
- Monitor API response times and success rates
- Analyze conversation patterns for improvements

### Cost Management
- Monitor OpenRouter usage dashboard
- Set up billing alerts
- Optimize token usage with response limits

## Security & Privacy

### Data Handling
- **No Storage**: Conversations not persisted server-side
- **Client-Side**: History maintained in component state only
- **API Security**: Requests include proper headers and validation

### API Key Protection
- Environment variables only
- Never exposed to client-side code
- Proper CORS configuration

## Troubleshooting

### Common Issues

#### 1. **AI Not Responding**
```typescript
// Check environment variable
console.log('API Key configured:', !!process.env.OPENROUTER_API_KEY);
```

#### 2. **Context Detection Issues**
```typescript
// Verify location detection
import { getUserLocation } from '@/lib/user-location';
console.log('Detected location:', getUserLocation());
```

#### 3. **API Errors**
- Verify API key validity on OpenRouter dashboard
- Check account credits and usage limits
- Review network connectivity and CORS settings

### Development Testing

```bash
# Test API endpoint directly
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is Bridvia?", "userLocation": "main"}'
```

## Future Enhancements

### Planned Features
1. **Streaming Responses**: Real-time word-by-word display
2. **Conversation Persistence**: Optional chat history storage
3. **Multi-language**: Support for additional languages
4. **Voice Integration**: Speech-to-text and text-to-speech
5. **Advanced Analytics**: Detailed usage and satisfaction metrics

### Integration Opportunities
- **CRM Integration**: Connect with customer management systems
- **Knowledge Base Expansion**: Dynamic content from CMS
- **Personalization**: User-specific recommendations and guidance
- **Automated Support**: Escalation to human agents when needed

## Contributing

When adding new features or content:

1. Update knowledge base documentation
2. Test with both API and fallback modes
3. Verify context-aware responses
4. Check mobile and desktop experiences
5. Update this documentation

---

For technical support or questions about the AI integration, contact the development team or refer to the OpenRouter documentation.