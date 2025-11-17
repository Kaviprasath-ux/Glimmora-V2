import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';

const demoMessages = [
  { type: 'user', text: 'I need a room with a great view for my anniversary' },
  { type: 'ai', text: "Congratulations on your anniversary! 🎉 I'd recommend our Ocean View Suite on the 12th floor. It features floor-to-ceiling windows with stunning sunset views, a private balcony, and complimentary champagne. Would you like me to check availability?" },
  { type: 'user', text: 'Perfect! What amenities are included?' },
  { type: 'ai', text: "The Ocean View Suite includes: ✨ King-size bed with luxury linens, 🛁 Spa-inspired bathroom with soaking tub, 🍾 Mini bar with premium selections, 📺 55\" Smart TV, 💼 Work desk with ergonomic chair, 🌡️ Climate control, and ☕ Nespresso machine. Plus, you'll get complimentary breakfast for two and late checkout!" },
];

export function AIAssistantShowcase() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [messages, setMessages] = useState<typeof demoMessages>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (inView && currentMessageIndex < demoMessages.length) {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, demoMessages[currentMessageIndex]]);
        setCurrentMessageIndex((prev) => prev + 1);
      }, currentMessageIndex === 0 ? 500 : 2000);

      return () => clearTimeout(timer);
    }
  }, [inView, currentMessageIndex]);

  return (
    <section ref={ref} className="py-20 sm:py-28 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-50 border border-primary-100 mb-6">
              <Bot className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700 text-sm font-medium">AI Concierge</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Your Personal
              <br />
              <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                AI Assistant
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-600 mb-8 leading-relaxed">
              Get instant, personalized recommendations 24/7. Our AI understands your preferences
              and helps you make the most of your stay.
            </p>

            <div className="space-y-6">
              {[
                { icon: '🎯', title: 'Personalized Suggestions', desc: 'Room recommendations based on your needs' },
                { icon: '⚡', title: 'Instant Responses', desc: 'Get answers in seconds, any time of day' },
                { icon: '🧠', title: 'Smart Learning', desc: 'Improves with every interaction' },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-2xl">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">{feature.title}</h3>
                    <p className="text-neutral-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chat Interface Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Chat Window */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-neutral-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">TERRA AI Concierge</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-white/80 text-sm">Online</span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-6 space-y-4 h-96 overflow-y-auto bg-neutral-50">
                  {/* Welcome Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <p className="text-neutral-700">
                        Hi! I'm your AI concierge. How can I help you today? ✨
                      </p>
                    </div>
                  </motion.div>

                  {/* Demo Messages */}
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'ai' ? 'bg-primary-500' : 'bg-neutral-300'
                      }`}>
                        {message.type === 'ai' ? (
                          <Bot className="w-4 h-4 text-white" />
                        ) : (
                          <UserIcon className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 rounded-2xl px-4 py-3 shadow-sm max-w-[85%] ${
                        message.type === 'ai'
                          ? 'bg-white rounded-tl-none'
                          : 'bg-primary-500 text-white rounded-tr-none'
                      }`}>
                        <p className={message.type === 'ai' ? 'text-neutral-700' : ''}>
                          {message.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {currentMessageIndex < demoMessages.length && messages.length > 0 && messages.length % 2 !== 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-neutral-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Ask me anything..."
                      className="flex-1 px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:border-primary-300 transition-colors"
                      disabled
                    />
                    <button className="w-12 h-12 bg-primary-500 hover:bg-primary-600 rounded-xl flex items-center justify-center text-white transition-colors">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-primary-400/30 to-primary-600/30 rounded-3xl blur-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
