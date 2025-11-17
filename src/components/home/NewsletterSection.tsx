import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export function NewsletterSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section ref={ref} className="py-28 sm:py-36 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTE2IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDIwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 120, damping: 22, duration: 0.8 }}
          >
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.1 }}
              className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-white/15 backdrop-blur-md mb-12 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/20"
            >
              <Mail className="w-14 h-14 text-white" strokeWidth={1.5} />
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-9 leading-[1.1]">
              Get Exclusive Offers
              <br />
              Delivered to Your Inbox
            </h2>

            <p className="text-xl text-white/95 mb-14 leading-relaxed font-light max-w-2xl mx-auto">
              Join our newsletter for insider access to special rates, new suite launches,
              and curated travel tips from TERRA
            </p>

            {/* Form */}
            {!isSubscribed ? (
              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-5 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 120, damping: 22, delay: 0.3 }}
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-7 top-1/2 -translate-y-1/2 w-6 h-6 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-16 pr-7 py-6 rounded-[1.25rem] bg-white border-2 border-white/40 hover:border-white/60 focus:border-white focus:ring-4 focus:ring-white/30 outline-none transition-all duration-300 text-lg shadow-[0_16px_48px_rgba(0,0,0,0.2)] font-light"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="px-14 py-6 bg-white hover:bg-neutral-50 text-primary-600 font-bold text-lg rounded-[1.25rem] transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_16px_48px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_56px_rgba(0,0,0,0.3)] border border-white/20"
                  whileHover={{ scale: 1.06, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                >
                  Subscribe
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" strokeWidth={2} />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 25 }}
                className="flex items-center justify-center gap-5 bg-white/15 backdrop-blur-md border-2 border-white/40 rounded-[1.25rem] px-12 py-8 max-w-lg mx-auto shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              >
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={2} />
                <div className="text-left">
                  <p className="text-white font-bold text-xl mb-1.5">Welcome aboard!</p>
                  <p className="text-white/90 font-light">Check your inbox for a special offer</p>
                </div>
              </motion.div>
            )}

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-8 mt-16 text-white/95"
            >
              {[
                '✨ Exclusive Discounts',
                '🎁 Birthday Offers',
                '📰 Travel Guides',
                '🔔 Early Access',
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300"
                >
                  <span className="text-lg font-medium">{benefit}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Privacy Note */}
            <p className="text-white/70 text-sm mt-10 font-light">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
