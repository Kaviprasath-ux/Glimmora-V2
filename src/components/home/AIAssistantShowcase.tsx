import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Send, Bot, User as UserIcon } from 'lucide-react';

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
    <section ref={ref} className="py-24 sm:py-32 bg-gradient-to-b from-white to-neutral-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-50 border border-primary-100 mb-8 shadow-sm">
              <Bot className="w-5 h-5 text-primary-600" />
              <span className="text-primary-700 text-sm font-semibold">AI Concierge</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-8 leading-tight">
              Your Personal
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">
                AI Assistant
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-neutral-600 mb-10 leading-relaxed">
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
                  transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 + index * 0.1 }}
                  className="flex gap-4 p-5 rounded-2xl hover:bg-primary-50/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-2xl shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{feature.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{feature.desc}</p>
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
              <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-neutral-100">
                {/* Header */}
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-5 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center shadow-lg">
                    <Bot className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">TERRA AI Concierge</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-sm" />
                      <span className="text-white/90 text-sm font-medium">Online</span>
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
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center shadow-md">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 bg-white rounded-2xl rounded-tl-none px-5 py-3.5 shadow-md">
                      <p className="text-neutral-700 leading-relaxed">
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
                      <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                        message.type === 'ai' ? 'bg-primary-500' : 'bg-neutral-400'
                      }`}>
                        {message.type === 'ai' ? (
                          <Bot className="w-5 h-5 text-white" />
                        ) : (
                          <UserIcon className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className={`flex-1 rounded-2xl px-5 py-3.5 shadow-md max-w-[85%] ${
                        message.type === 'ai'
                          ? 'bg-white rounded-tl-none'
                          : 'bg-primary-500 text-white rounded-tr-none'
                      }`}>
                        <p className={`leading-relaxed ${message.type === 'ai' ? 'text-neutral-700' : ''}`}>
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
                <div className="p-5 bg-white border-t border-neutral-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Ask me anything..."
                      className="flex-1 px-5 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:border-primary-400 focus:bg-white transition-all shadow-sm"
                      disabled
                    />
                    <button className="w-14 h-14 bg-primary-500 hover:bg-primary-600 rounded-2xl flex items-center justify-center text-white transition-all shadow-lg hover:shadow-xl">
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
