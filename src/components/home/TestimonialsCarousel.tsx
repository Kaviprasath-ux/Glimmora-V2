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
    <section ref={ref} className="py-24 sm:py-32 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-semibold text-sm uppercase tracking-wider mb-6">
            Guest Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            What Our Guests
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
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
                <div className="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] p-10 md:p-14 border border-neutral-100">
                  {/* Quote Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-8 shadow-lg">
                    <Quote className="w-8 h-8 text-white" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1.5 mb-8">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-xl md:text-2xl text-neutral-700 leading-relaxed mb-10 font-light">
                    "{testimonials[currentIndex].text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-5">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary-200 shadow-md"
                    />
                    <div>
                      <h4 className="text-lg font-bold text-neutral-900 mb-1">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-neutral-600 font-medium">
                        {testimonials[currentIndex].location}
                      </p>
                      <p className="text-sm text-neutral-500">
                        {testimonials[currentIndex].date}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-5 mt-10">
            <motion.button
              onClick={() => paginate(-1)}
              className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-2xl border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-primary-600 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-10 bg-primary-500'
                      : 'w-2.5 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              className="w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-2xl border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-primary-600 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '4.9/5', label: 'Average Rating' },
            { number: '2,400+', label: 'Happy Guests' },
            { number: '98%', label: 'Would Recommend' },
            { number: '24/7', label: 'Support Available' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
