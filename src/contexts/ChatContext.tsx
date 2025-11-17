import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  quickActions?: QuickAction[];
}

export interface QuickAction {
  label: string;
  action: () => void;
}

interface ChatContextType {
  messages: Message[];
  isOpen: boolean;
  isTyping: boolean;
  unreadCount: number;
  sendMessage: (content: string) => Promise<void>;
  toggleChat: () => void;
  clearHistory: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

const CHAT_STORAGE_KEY = 'glimmora_chat_history';
const WELCOME_MESSAGE_SHOWN_KEY = 'glimmora_welcome_shown';

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    const welcomeShown = localStorage.getItem(WELCOME_MESSAGE_SHOWN_KEY);

    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed.map((msg: Message) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      })));
    } else if (!welcomeShown) {
      // Show welcome message on first visit
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'ai',
        content: "Welcome to Glimmora Hotel & Suites! 👋 I'm your AI concierge. I can help you with room bookings, amenities, check-in, and answer any questions you have. How can I assist you today?",
        timestamp: new Date(),
        quickActions: [
          { label: 'Browse Rooms', action: () => window.location.href = '/rooms' },
          { label: 'View Amenities', action: () => window.location.href = '/amenities' },
        ],
      };
      setMessages([welcomeMessage]);
      localStorage.setItem(WELCOME_MESSAGE_SHOWN_KEY, 'true');
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Update unread count when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.type === 'ai') {
        setUnreadCount((prev) => prev + 1);
      }
    }
  }, [messages, isOpen]);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const generateQuickActions = (userMessage: string): QuickAction[] => {
    const lowerMsg = userMessage.toLowerCase();
    const actions: QuickAction[] = [];

    if (lowerMsg.includes('room') || lowerMsg.includes('book')) {
      actions.push(
        { label: 'Browse Rooms', action: () => window.location.href = '/rooms' },
        { label: 'Book Now', action: () => window.location.href = '/rooms' }
      );
    } else if (lowerMsg.includes('check in') || lowerMsg.includes('checkin')) {
      actions.push(
        { label: 'Start Pre-Check-In', action: () => window.location.href = '/pre-checkin' }
      );
    } else if (lowerMsg.includes('amenity') || lowerMsg.includes('amenities') || lowerMsg.includes('pool') || lowerMsg.includes('spa')) {
      actions.push(
        { label: 'View Amenities', action: () => window.location.href = '/amenities' }
      );
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('help')) {
      actions.push(
        { label: 'Contact Us', action: () => window.location.href = '/contact' }
      );
    }

    return actions;
  };

  const buildContextualPrompt = (userMessage: string): string => {
    const userName = user?.fullName || 'Guest';
    const currentPage = location.pathname;

    return `You are an AI assistant for Glimmora Hotel & Suites, a luxury hotel featuring modern design and AI-powered services.

Context:
- User name: ${userName}
- Current page: ${currentPage}
- Authenticated: ${isAuthenticated ? 'Yes' : 'No'}

Hotel Information:
- Room Types: Standard Room ($150/night), Deluxe Room ($250/night), Ocean View Suite ($350/night), Executive Suite ($500/night), Presidential Suite ($800/night)
- Amenities: Infinity pool, world-class spa, state-of-the-art fitness center, multiple restaurants, rooftop bar
- Check-in time: 3:00 PM
- Check-out time: 11:00 AM
- AI-powered pre-check-in available 24 hours before arrival
- Free WiFi, parking, and breakfast included
- Pet-friendly with additional fee
- 24/7 concierge service

Services:
- Room service available 24/7
- Laundry and dry cleaning
- Airport shuttle service
- Event and conference facilities
- Wedding planning services

User Question: ${userMessage}

Provide a helpful, friendly, and professional response in 2-3 sentences. If the user asks about booking or rooms, mention specific room types and prices. Be concise and actionable.`;
  };

  const callClaudeAPI = async (prompt: string): Promise<string> => {
    try {
      // In a production environment, you would call your backend API endpoint
      // that securely handles the Claude API key
      // For this demo, we'll simulate an AI response

      // This is where you would make the actual API call:
      /*
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'YOUR_API_KEY', // Never expose this in frontend!
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          messages: [{ role: 'user', content: prompt }]
        })
      });

      const data = await response.json();
      return data.content[0].text;
      */

      // Simulated AI response for demo
      await new Promise(resolve => setTimeout(resolve, 1500));

      const userMsg = prompt.split('User Question: ')[1] || '';
      const lowerMsg = userMsg.toLowerCase();

      if (lowerMsg.includes('room') && (lowerMsg.includes('ocean') || lowerMsg.includes('view'))) {
        return "Our Ocean View Suites offer breathtaking panoramic views of the coastline at $350/night. These spacious 600 sq ft suites feature floor-to-ceiling windows, a private balcony, king-size bed, and luxury bathroom with soaking tub. Would you like to check availability or learn about our other room options?";
      } else if (lowerMsg.includes('room') || lowerMsg.includes('book')) {
        return "We offer five distinctive room types: Standard Rooms ($150/night), Deluxe Rooms ($250/night), Ocean View Suites ($350/night), Executive Suites ($500/night), and Presidential Suites ($800/night). All rooms include free WiFi, breakfast, and access to our world-class amenities. Which type interests you most?";
      } else if (lowerMsg.includes('check in') || lowerMsg.includes('checkin')) {
        return "Our AI-powered pre-check-in system lets you complete check-in online 24 hours before arrival! Simply upload your ID, select your room preferences, and get your digital key. Standard check-in is at 3:00 PM, though early check-in may be available upon request. Would you like to start the pre-check-in process?";
      } else if (lowerMsg.includes('amenity') || lowerMsg.includes('amenities') || lowerMsg.includes('pool') || lowerMsg.includes('spa')) {
        return "Glimmora features an infinity pool overlooking the ocean, a world-class spa with 10 treatment rooms, a state-of-the-art fitness center, three gourmet restaurants, and a rooftop bar. All amenities are complimentary for hotel guests. Our spa offers massages, facials, and wellness treatments—would you like to book a spa session?";
      } else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('rate')) {
        return "Our room rates range from $150/night for Standard Rooms to $800/night for Presidential Suites. All rates include complimentary WiFi, breakfast, parking, and full access to our amenities. We also offer special packages for extended stays and seasonal promotions. What dates are you considering for your stay?";
      } else if (lowerMsg.includes('breakfast') || lowerMsg.includes('food') || lowerMsg.includes('restaurant')) {
        return "We offer complimentary gourmet breakfast daily from 6:30 AM to 11:00 AM featuring both international and local cuisine. Our three restaurants serve lunch and dinner: The Coastal Kitchen (seafood), Terra Fusion (international), and Sunset Lounge (rooftop bar with small plates). Room service is available 24/7. What culinary experience interests you?";
      } else if (lowerMsg.includes('cancel') || lowerMsg.includes('refund') || lowerMsg.includes('policy')) {
        return "We offer flexible cancellation up to 48 hours before check-in for a full refund. Cancellations within 48 hours incur a one-night charge. Our pre-check-in system makes modifications easy. For special circumstances, our team is happy to work with you—please contact our reservation desk directly.";
      } else if (lowerMsg.includes('pet') || lowerMsg.includes('dog') || lowerMsg.includes('cat')) {
        return "Yes, Glimmora is pet-friendly! We welcome dogs and cats under 40 lbs with a $50 per night pet fee. We provide pet beds, bowls, and treats. Our concierge can recommend nearby pet-friendly parks and beaches. Please mention your furry friend when booking so we can prepare the perfect room!";
      } else if (lowerMsg.includes('parking') || lowerMsg.includes('valet')) {
        return "Complimentary self-parking is included with all stays. Valet parking is available for $25/day. We also offer electric vehicle charging stations at no extra cost. Our secure parking facility has 24/7 surveillance for your peace of mind.";
      } else if (lowerMsg.includes('airport') || lowerMsg.includes('shuttle') || lowerMsg.includes('transport')) {
        return "We provide complimentary airport shuttle service running every hour from 6 AM to 11 PM. The airport is just 20 minutes away. For added convenience, we can arrange private car service or luxury transfers. Would you like to schedule a pickup for your arrival?";
      } else if (lowerMsg.includes('wedding') || lowerMsg.includes('event') || lowerMsg.includes('conference')) {
        return "Glimmora offers stunning event spaces perfect for weddings, conferences, and special occasions. Our dedicated event planning team handles everything from catering to AV equipment. We have beachfront ceremony locations and elegant ballrooms accommodating 20-500 guests. Let me connect you with our events coordinator!";
      } else {
        return `Hello! I'm here to help you with any questions about Glimmora Hotel & Suites. I can assist with room bookings, our amenities (pool, spa, restaurants), check-in procedures, pricing, and more. What would you like to know?`;
      }
    } catch (error) {
      console.error('Error calling Claude API:', error);
      return "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or contact our front desk at (555) 123-4567 for immediate assistance.";
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Build contextual prompt
      const prompt = buildContextualPrompt(content);

      // Call Claude API
      const aiResponse = await callClaudeAPI(prompt);

      // Generate quick actions
      const quickActions = generateQuickActions(content);

      // Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        quickActions: quickActions.length > 0 ? quickActions : undefined,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm experiencing technical difficulties. Please try again or contact our support team.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
    localStorage.removeItem(WELCOME_MESSAGE_SHOWN_KEY);

    // Show welcome message again
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: "Chat history cleared! How can I assist you today?",
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isTyping,
        unreadCount,
        sendMessage,
        toggleChat,
        clearHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
