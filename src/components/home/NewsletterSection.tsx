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
    <section ref={ref} className="py-20 sm:py-28 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6bTAgMjBjMC0yLjIxIDEuNzktNCA0LTRzNCAxLjc5IDQgNC0xLjc5IDQtNCA0LTQtMS43OS00LTR6TTE2IDM0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDIwYzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8">
              <Mail className="w-10 h-10 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get Exclusive Offers
              <br />
              Delivered to Your Inbox
            </h2>

            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Join our newsletter for insider access to special rates, new suite launches,
              and curated travel tips from TERRA
            </p>

            {/* Form */}
            {!isSubscribed ? (
              <motion.form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-14 pr-6 py-5 rounded-xl bg-white border-2 border-white/20 focus:border-white focus:ring-4 focus:ring-white/20 outline-none transition-all text-lg"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="px-10 py-5 bg-white text-primary-600 font-semibold text-lg rounded-xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2 group shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl px-8 py-6 max-w-md mx-auto"
              >
                <CheckCircle className="w-8 h-8 text-white" />
                <div className="text-left">
                  <p className="text-white font-semibold text-lg">Welcome aboard!</p>
                  <p className="text-white/80">Check your inbox for a special offer</p>
                </div>
              </motion.div>
            )}

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6 mt-12 text-white/90"
            >
              {[
                '✨ Exclusive Discounts',
                '🎁 Birthday Offers',
                '📰 Travel Guides',
                '🔔 Early Access',
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </motion.div>

            {/* Privacy Note */}
            <p className="text-white/60 text-sm mt-8">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
