import { ReadableStream } from 'stream/web';

// Types for OpenRouter API
interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface StreamChunk {
  choices: Array<{
    delta: {
      content?: string;
    };
    finish_reason?: string;
  }>;
}

class BridviaAI {
  private apiKey: string;
  private baseURL = 'https://openrouter.ai/api/v1';
  private model = 'moonshotai/kimi-dev-72b:free'; // High-quality model for better responses
  private knowledgeBase: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenRouter API key not found. AI features will use mock responses.');
    }
    this.knowledgeBase = this.loadKnowledgeBase();
  }

  private loadKnowledgeBase(): string {
    // Comprehensive knowledge base from all landing page content
    return `
# Bridvia Platform Knowledge Base

## About Bridvia Ecosystem
Bridvia is building the infrastructure that connects talent with opportunity, addressing the critical gap between education and industry readiness. Our mission is to empower the next generation by creating pathways for sustainable career growth through hands-on experiences.

**Core Vision**: To reshape career development by bridging the gap between education and industry readiness, making graduates more employable through practical skills and real-world experience.

**Core Problem We Solve**: There's a significant disconnect between educational outcomes and industry requirements. Students graduate with theoretical knowledge but lack practical, hands-on experience that employers value.

**Our Solution**: Structured, meaningful programs that provide:
- Real-world project experience with industry-standard tools
- Mentorship from experienced industry professionals
- Skills development aligned with current market demands
- Direct pathways to employment opportunities
- Professional networking and career clarity

## BridviaConnect (Phase 1)
BridviaConnect is Phase 1 of our ecosystem, specifically focused on internship opportunities. It's designed to connect students, recent graduates, career switchers, certification completers, and professionals with companies offering structured internship programs.

**Target Audiences**:
- Recent graduates seeking practical experience to enhance employability
- Career switchers looking to transition industries with hands-on experience
- Certification completers wanting real-world application of their knowledge
- Professionals seeking experience in new areas or technologies
- Companies of all sizes looking for motivated future talent

**Key Features & Benefits**:
- Structured internship programs with clear learning objectives
- Quality partnerships with reputable companies committed to meaningful learning
- Mentorship and career development support throughout the journey
- Focus on future-ready skills (both technical and soft skills)
- Practical work experience with real projects and deliverables
- Professional network building and industry exposure
- Increased employability through portfolio building
- Career clarity through real-world application and feedback

**How It Works**:
1. Apply for opportunities that match your interests and career goals
2. Get matched with suitable companies and structured programs
3. Start your internship journey with full mentorship and learning support

## Platform Values & Differentiators
**What Makes Bridvia Different**:
- **Quality Focus**: Every internship is carefully curated for meaningful learning
- **Structured Approach**: Clear learning objectives and professional mentorship
- **Industry Alignment**: Programs designed around real market demands
- **Future-Ready**: Emphasis on skills that matter in tomorrow's workplace
- **Comprehensive Support**: End-to-end guidance from application to completion

**Core Values**:
- Enterprise partnerships that create mutual value
- Talent development through practical application
- Industry alignment with market-ready skills
- Hands-on experience over theoretical knowledge
- Professional growth through structured learning

## Future Vision (Phase 2)
Beyond BridviaConnect, we're developing the next evolution of our platform that will expand beyond internship connections. While details are still being finalized, our vision extends to creating a comprehensive ecosystem for career development and talent-opportunity matching.

## Current Development Status
We're actively developing partnerships with leading companies and curating high-quality opportunities. Our team is working diligently to ensure that when we launch each phase, it meets our high standards for meaningful career development experiences.

**Important Note**: Specific internship opportunities, company partnerships, and program details are currently being finalized. We're committed to quality over speed in our rollout.

## Contact & Support
**Primary Contact**: info@bridvia.com
**Purpose**: Questions about our platform, available opportunities, partnership inquiries, or career development guidance

## Brand Identity
**Primary Color**: #106861 (dark teal)
**Design Philosophy**: Professional, modern, accessible with clean aesthetics
**Tone**: Professional yet approachable, solution-focused, encouraging

## Technical Platform
**Technology Stack**: Next.js, TypeScript, Tailwind CSS, Framer Motion
**AI Assistant**: Brid AI - Bridvia's dedicated intelligent assistant
**User Experience**: Responsive design, smooth animations, accessible interface
`;
  }

  private createSystemPrompt(userLocation: 'main' | 'bridvia-connect'): string {
    const basePrompt = `You are Brid AI, Bridvia's intelligent and personable assistant. You embody the vision and values of the Bridvia platform with a warm, professional, and genuinely helpful personality.

Personality & Communication Style:
- Be conversational, warm, and genuinely enthusiastic about helping people bridge their career gaps
- Speak like a knowledgeable career advisor who truly cares about the person's success
- Use natural, flowing language that feels human and relatable
- Be encouraging and optimistic while remaining professional
- Share insights about the vision and impact of what Bridvia is building
- When you don't have specific details, be transparent but redirect positively

Key Behavioral Guidelines:
1. **Vision-Focused**: Emphasize the transformative potential of bridging education and industry
2. **Human-Centered**: Always consider the person's career journey and aspirations
3. **Solution-Oriented**: Focus on how Bridvia addresses real career development challenges
4. **Transparency**: Be honest about development status while maintaining enthusiasm
5. **Professional Development**: Offer valuable career insights even beyond platform specifics
6. **No Geographic References**: Keep all messaging geographically neutral
7. **Warm Referrals**: When directing to contact info, do so warmly and helpfully

Development Status Messaging:
When asked about specific opportunities, companies, or program details, respond professionally:
"We're currently in an exciting development phase, carefully curating partnerships and opportunities to ensure they meet our high standards for meaningful career development. Our team is working diligently to build something truly impactful. For the latest updates on available programs and partnerships, I'd love to connect you with our team at info@bridvia.com."

Email Contact Approach:
When providing the email, frame it as connecting with real people who care:
"I'd encourage you to reach out to our team at info@bridvia.com - they're passionate about helping people like you find the right opportunities and would love to discuss how Bridvia can support your career journey."

Knowledge Base:
${this.knowledgeBase}`;

    if (userLocation === 'bridvia-connect') {
      return basePrompt + `

Context-Specific Focus:
You're currently helping someone on the BridviaConnect page, so your responses should naturally center around:
- The vision and impact of internship-based career development
- How BridviaConnect represents Phase 1 of our larger mission
- The transformative potential of hands-on learning experiences
- Building bridges between education and industry readiness
- The value of structured mentorship and real-world projects
- Career development strategies and professional growth insights

Remember: Focus on the vision and benefits rather than specific program details that are still being finalized.`;
    }

    return basePrompt + `

Context-Specific Focus:
You're helping someone explore the main Bridvia platform, so you can discuss:
- The overall Bridvia ecosystem and our transformative vision
- How we're building infrastructure that connects talent with opportunity
- The comprehensive approach to career development we're creating
- BridviaConnect as Phase 1 and hints about future platform evolution
- General career development guidance and industry insights
- The broader impact we aim to have on workforce development

Feel free to paint the bigger picture of what we're building while being transparent about current development phases.`;
  }

  async generateResponse(
    message: string, 
    conversationHistory: OpenRouterMessage[] = [],
    userLocation: 'main' | 'bridvia-connect' = 'main'
  ): Promise<string> {
    // Mock response when API key is not available
    if (!this.apiKey) {
      return this.generateMockResponse(message, userLocation);
    }

    try {
      const messages: OpenRouterMessage[] = [
        {
          role: 'system',
          content: this.createSystemPrompt(userLocation)
        },
        ...conversationHistory.slice(-10), // Keep last 10 messages for context
        {
          role: 'user',
          content: message
        }
      ];

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://bridvia.com',
          'X-Title': 'Bridvia Platform'
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          max_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const data: OpenRouterResponse = await response.json();
      return data.choices[0]?.message?.content || 'I apologize, but I encountered an issue processing your request. Please try again or contact us at info@bridvia.com.';

    } catch (error) {
      console.error('OpenRouter API Error:', error);
      return this.generateMockResponse(message, userLocation);
    }
  }

  async *generateStreamResponse(
    message: string,
    conversationHistory: OpenRouterMessage[] = [],
    userLocation: 'main' | 'bridvia-connect' = 'main'
  ): AsyncGenerator<string, void, unknown> {
    // Mock streaming when API key is not available
    if (!this.apiKey) {
      const mockResponse = this.generateMockResponse(message, userLocation);
      const words = mockResponse.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        yield words[i] + (i < words.length - 1 ? ' ' : '');
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      return;
    }

    try {
      const messages: OpenRouterMessage[] = [
        {
          role: 'system',
          content: this.createSystemPrompt(userLocation)
        },
        ...conversationHistory.slice(-10),
        {
          role: 'user',
          content: message
        }
      ];

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://bridvia.com',
          'X-Title': 'Bridvia Platform'
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          max_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
          stream: true
        })
      });

      if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') return;

            try {
              const chunk: StreamChunk = JSON.parse(data);
              const content = chunk.choices[0]?.delta?.content;
              if (content) {
                yield content;
              }
            } catch (e) {
              // Skip invalid JSON chunks
              continue;
            }
          }
        }
      }
    } catch (error) {
      console.error('OpenRouter Streaming Error:', error);
      // Fallback to mock response
      const mockResponse = this.generateMockResponse(message, userLocation);
      const words = mockResponse.split(' ');
      
      for (let i = 0; i < words.length; i++) {
        yield words[i] + (i < words.length - 1 ? ' ' : '');
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }
  }

  private generateMockResponse(message: string, userLocation: 'main' | 'bridvia-connect'): string {
    const lowerMessage = message.toLowerCase();
    
    // Greeting and introduction responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.match(/^(hey|what's up|good morning|good afternoon)\b/)) {
      const welcomes = [
        "Hello! I'm Brid AI, and I'm thrilled you're here exploring Bridvia. We're building something really exciting - infrastructure that connects talented people like you with meaningful opportunities. What brings you here today?",
        "Hi there! I'm Brid AI, your guide to understanding how Bridvia is transforming career development. We're passionate about bridging the gap between education and industry readiness. How can I help you explore what we're building?",
        "Hey! Great to meet you. I'm Brid AI, and I love talking about Bridvia's mission to connect talent with opportunity through hands-on experiences. What would you like to know about our platform?"
      ];
      return welcomes[Math.floor(Math.random() * welcomes.length)];
    }

    // About Bridvia - Vision-focused responses
    if (lowerMessage.includes('what is bridvia') || lowerMessage.includes('about bridvia') || lowerMessage.includes('tell me about')) {
      return "Bridvia is on a mission to reshape how people develop their careers! We're building infrastructure that connects talent with opportunity, specifically addressing that frustrating gap between education and what the industry actually needs. Think of us as career development revolutionaries - we believe that hands-on, practical experience is the key to unlocking someone's potential. Our vision is to create pathways where learning happens through real work, mentorship comes from industry pros, and every experience builds toward sustainable career growth. It's about empowering the next generation with the tools and experiences they need to thrive in tomorrow's workplace.";
    }

    // BridviaConnect specific responses
    if (lowerMessage.includes('bridviaconnect') || lowerMessage.includes('phase 1') || lowerMessage.includes('internship')) {
      if (userLocation === 'bridvia-connect') {
        return "BridviaConnect is where our vision comes to life! It's Phase 1 of our ecosystem, and honestly, I'm excited about what we're building here. We're creating structured internship experiences that aren't just 'fetch coffee' roles - these are meaningful programs with clear learning objectives, real projects, and mentorship from professionals who genuinely want to see you succeed. The idea is to bridge that gap between classroom theory and workplace reality. Every internship is carefully curated to ensure you're gaining skills that actually matter in today's job market while building relationships that can shape your career. It's practical career development at its finest!";
      } else {
        return "BridviaConnect represents Phase 1 of our vision - and it's pretty exciting! We're focused on creating structured internship opportunities that go way beyond traditional programs. Think meaningful projects, dedicated mentorship, and real skill development with companies who are genuinely invested in your growth. It's designed for anyone looking to bridge the gap between education and industry readiness - whether you're a recent graduate, career switcher, or professional exploring new areas. The goal is to give you hands-on experience that actually prepares you for what employers are looking for.";
      }
    }

    // Target audience and who can benefit
    if (lowerMessage.includes('who') && (lowerMessage.includes('can use') || lowerMessage.includes('is this for') || lowerMessage.includes('target'))) {
      return "Bridvia is designed for anyone looking to bridge the gap between where they are and where they want to be in their career! This includes recent graduates who have the knowledge but need practical experience, career switchers who want to transition industries with confidence, professionals looking to gain experience in new areas or technologies, and certification completers who want to apply what they've learned in real-world settings. We also work with companies of all sizes who are committed to meaningful talent development. Really, if you're someone who believes in learning through doing and wants to build a career through hands-on experience, Bridvia is for you.";
    }

    // How it works
    if (lowerMessage.includes('how') && (lowerMessage.includes('work') || lowerMessage.includes('does it') || lowerMessage.includes('process'))) {
      return "Our approach is refreshingly straightforward! We focus on creating structured pathways where learning happens through real work. The process involves getting matched with opportunities that align with your goals and interests, engaging in structured programs with clear learning objectives, and receiving mentorship from industry professionals who are invested in your growth. Every experience is designed to build your skills, expand your network, and prepare you for what employers actually want. It's about practical career development - learning by doing, growing through real challenges, and building a portfolio of experiences that speak volumes about your capabilities.";
    }

    // Benefits and advantages
    if (lowerMessage.includes('benefit') || lowerMessage.includes('advantage') || lowerMessage.includes('why choose') || lowerMessage.includes('what makes')) {
      return "What makes Bridvia special is our focus on **meaningful** career development. You're not just gaining experience - you're building a foundation for long-term success. The benefits include practical work experience with real projects and industry-standard tools, professional mentorship from people who genuinely care about your growth, increased employability through portfolio building and skill development, career clarity through real-world application and feedback, and access to professional networks that can open doors throughout your career. But beyond the practical benefits, it's about confidence - knowing that you have the hands-on experience and skills that employers value in today's competitive market.";
    }

    // Companies and partnerships
    if (lowerMessage.includes('company') || lowerMessage.includes('companies') || lowerMessage.includes('partner') || lowerMessage.includes('employer')) {
      return "We're building partnerships with companies who share our vision for meaningful talent development! These aren't just any companies - we're looking for organizations that are genuinely committed to providing structured learning experiences with real mentorship and growth opportunities. We work with companies of all sizes, from innovative startups to established enterprises, all united by a common goal: creating opportunities where both talent and businesses can thrive. For companies, it's about accessing motivated talent while building their reputation as industry contributors and developing long-term talent pipelines. We're currently in an exciting development phase, carefully curating these partnerships to ensure quality and impact.";
    }

    // Specific opportunities and current status
    if (lowerMessage.includes('available') || lowerMessage.includes('opportunities') || lowerMessage.includes('current') || lowerMessage.includes('now') || lowerMessage.includes('apply') || lowerMessage.includes('start') || lowerMessage.includes('when')) {
      return "I love your enthusiasm to get started! We're currently in an exciting development phase, carefully curating partnerships and opportunities to ensure they meet our high standards for meaningful career development. Our team is working diligently to build something truly impactful - quality over speed is our motto. We're focused on creating experiences that will genuinely transform careers, not just fill positions. For the latest updates on available programs and to discuss how Bridvia can support your specific career goals, I'd encourage you to connect with our team at info@bridvia.com. They're passionate about helping people like you find the right opportunities and would love to hear about your aspirations!";
    }

    // Costs and pricing
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('fee') || lowerMessage.includes('pay') || lowerMessage.includes('money')) {
      return "Great question! We're currently in the development phase, and our focus is on creating programs that provide incredible value for career development. The investment structure will depend on the specific programs and partnerships we finalize. What I can tell you is that we're committed to making our programs accessible and ensuring that the value you receive far exceeds any investment. For detailed information about program structure and any associated costs, our team at info@bridvia.com would be the best people to discuss your specific situation and goals.";
    }

    // Contact and getting more information
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('email') || lowerMessage.includes('get in touch') || lowerMessage.includes('more information')) {
      return "I'd love to connect you with our team! You can reach out to info@bridvia.com - and honestly, these are people who are genuinely passionate about career development and helping people like you succeed. They're not just there to answer questions; they're there to understand your goals, discuss how Bridvia can support your career journey, and provide insights that can help regardless of where you are in your professional development. Don't hesitate to reach out - they love hearing from people who are excited about building their careers through practical experience!";
    }

    // Skills and experience development
    if (lowerMessage.includes('skill') || lowerMessage.includes('experience') || lowerMessage.includes('learn') || lowerMessage.includes('develop') || lowerMessage.includes('training')) {
      return "Skills development is at the heart of everything we do! Our approach focuses on building both technical and soft skills through real-world application. You'll work with industry-standard tools and technologies, tackle actual business challenges, and learn from professionals who are using these skills every day. But it's not just about technical abilities - we emphasize communication, problem-solving, project management, and all those crucial soft skills that make someone truly valuable in the workplace. The goal is to develop a well-rounded skill set that prepares you for the demands of tomorrow's workplace, not just today's job requirements.";
    }

    // Future plans and vision
    if (lowerMessage.includes('future') || lowerMessage.includes('next') || lowerMessage.includes('phase 2') || lowerMessage.includes('what\'s next') || lowerMessage.includes('roadmap')) {
      return "The future of Bridvia is incredibly exciting! While BridviaConnect represents our Phase 1 focus on internship opportunities, we're building toward a comprehensive ecosystem for career development. Think of it as evolving beyond just connecting people with opportunities to creating an entire infrastructure that supports lifelong professional growth. While I can't share all the details (some things are still being finalized!), I can tell you that our vision extends far beyond traditional career platforms. We're building something that will fundamentally change how people approach their professional development. The possibilities are really exciting!";
    }

    // Mentorship and support
    if (lowerMessage.includes('mentor') || lowerMessage.includes('support') || lowerMessage.includes('guidance') || lowerMessage.includes('help')) {
      return "Mentorship is one of the things I'm most excited about in our approach! We believe that having the right guidance can completely transform someone's career trajectory. Our mentorship isn't just occasional check-ins - it's structured, ongoing support from industry professionals who are genuinely invested in your success. These are people who remember what it's like to be where you are and want to help you navigate the challenges and opportunities ahead. The mentorship component ensures you're not just gaining experience, but you're gaining insights, making connections, and developing the professional judgment that comes from working alongside experienced practitioners.";
    }

    // Default response with personality
    const defaultResponses = [
      "That's a great question! Bridvia is all about connecting talented people with meaningful opportunities through hands-on experience. We're building infrastructure that bridges the gap between education and industry readiness, focusing on practical career development that actually prepares you for success. I'd love to dive deeper into any specific aspect that interests you, or if you'd like to explore how Bridvia might fit into your career journey, our team at info@bridvia.com would be thrilled to chat with you!",
      "I appreciate you asking! We're passionate about transforming how people develop their careers through practical, hands-on experiences. Bridvia focuses on creating structured opportunities where learning happens through real work, mentorship comes from industry professionals, and every experience builds toward your long-term career goals. What specific aspect of career development or our platform would you like to explore further?",
      "Thanks for your interest in Bridvia! We're building something really special - a platform that connects talent with opportunity in meaningful ways. Our focus is on practical career development through structured programs, professional mentorship, and real-world experience that actually prepares you for industry demands. Is there a particular area of our platform or approach you'd like to know more about?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }
}

// Export singleton instance
export const bridviaAI = new BridviaAI();
export default bridviaAI;