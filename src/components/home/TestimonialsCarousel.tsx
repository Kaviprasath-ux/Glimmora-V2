import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'San Francisco, CA',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'The AI-powered pre-check-in was a game-changer! I walked straight to my room and it was exactly what I wanted. The attention to detail and personalized service exceeded all expectations.',
    date: 'November 2024',
  },
  {
    id: 2,
    name: 'Michael Chen',
    location: 'Los Angeles, CA',
    avatar: 'https://i.pravatar.cc/150?img=7',
    rating: 5,
    text: 'TERRA Suites combines cutting-edge technology with genuine hospitality. The AI concierge helped us plan our entire trip, and the sustainable practices made us feel good about our stay.',
    date: 'October 2024',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    location: 'Miami, FL',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    text: 'Absolutely stunning property! The modern design, eco-friendly approach, and smart room features made this the best hotel experience we\'ve ever had. Will definitely return!',
    date: 'November 2024',
  },
  {
    id: 4,
    name: 'David Park',
    location: 'Seattle, WA',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'The perfect blend of luxury and technology. From the seamless booking to the personalized room settings, every detail was thoughtfully designed. The staff went above and beyond!',
    date: 'October 2024',
  },
];

export function TestimonialsCarousel() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-play
  useEffect(() => {
    if (!inView) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [inView, currentIndex]);

  return (
    <section ref={ref} className="py-28 sm:py-36 bg-gradient-to-b from-neutral-50/50 via-white to-neutral-50/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px] opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-block px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-50 to-primary-100/80 text-primary-700 font-semibold text-sm uppercase tracking-wider mb-8 shadow-sm"
          >
            Guest Reviews
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-7 leading-[1.1]">
            What Our Guests
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed font-light">
            Real experiences from guests who've discovered the TERRA difference
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto relative">
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="bg-white rounded-[2rem] shadow-[0_24px_80px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_96px_rgba(0,0,0,0.12)] transition-shadow duration-500 p-12 md:p-16 border border-neutral-200/50">
                  {/* Quote Icon */}
                  <div className="w-20 h-20 rounded-[1.25rem] bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-10 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                    <Quote className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-2 mb-10">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-7 h-7 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-12 font-light">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-6">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-primary-100/80 shadow-lg"
                    />
                    <div>
                      <h4 className="text-xl font-bold text-neutral-900 mb-1.5">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-neutral-600 font-medium mb-1">
                        {testimonials[currentIndex].location}
                      </p>
                      <p className="text-sm text-neutral-500 font-light">
                        {testimonials[currentIndex].date}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-6 mt-14">
            <motion.button
              onClick={() => paginate(-1)}
              className="w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl border border-neutral-200 hover:border-primary-300 flex items-center justify-center text-neutral-700 hover:text-primary-600 transition-all duration-300"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
            >
              <ChevronLeft className="w-6 h-6" strokeWidth={2} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-12 bg-gradient-to-r from-primary-500 to-primary-600 shadow-md'
                      : 'w-3 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="w-16 h-16 rounded-full bg-white shadow-lg hover:shadow-xl border border-neutral-200 hover:border-primary-300 flex items-center justify-center text-neutral-700 hover:text-primary-600 transition-all duration-300"
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
            >
              <ChevronRight className="w-6 h-6" strokeWidth={2} />
            </motion.button>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto"
        >
          {[
            { number: '4.9/5', label: 'Average Rating' },
            { number: '2,400+', label: 'Happy Guests' },
            { number: '98%', label: 'Would Recommend' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              className="text-center p-6 rounded-[1.25rem] hover:bg-gradient-to-b hover:from-primary-50/50 hover:to-transparent transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-3">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
