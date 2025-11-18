import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'recreation' | 'dining' | 'services' | 'wellness';
  hours?: string;
  location?: string;
  features: string[];
  isActive: boolean;
  image?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

interface PageContent {
  id: string;
  page: 'home' | 'about' | 'rooms' | 'amenities';
  section: string;
  title: string;
  content: string;
}

interface Policy {
  id: string;
  type: 'cancellation' | 'house-rules' | 'terms' | 'privacy';
  title: string;
  content: string;
  lastUpdated: string;
}

interface WebsiteContentContextType {
  amenities: Amenity[];
  faqs: FAQ[];
  pageContent: PageContent[];
  policies: Policy[];
  addAmenity: (amenity: Omit<Amenity, 'id'>) => void;
  updateAmenity: (id: string, data: Partial<Amenity>) => void;
  deleteAmenity: (id: string) => void;
  addFAQ: (faq: Omit<FAQ, 'id'>) => void;
  updateFAQ: (id: string, data: Partial<FAQ>) => void;
  deleteFAQ: (id: string) => void;
  updatePageContent: (id: string, data: Partial<PageContent>) => void;
  updatePolicy: (id: string, data: Partial<Policy>) => void;
}

const WebsiteContentContext = createContext<WebsiteContentContextType | undefined>(undefined);

export function WebsiteContentProvider({ children }: { children: ReactNode }) {
  // Amenities
  const [amenities, setAmenities] = useState<Amenity[]>([
    {
      id: '1',
      name: 'Olympic Swimming Pool',
      description: 'Our 50-meter Olympic-sized pool features panoramic ocean views, heated water, and dedicated lanes for lap swimming.',
      icon: 'Waves',
      category: 'recreation',
      hours: '6:00 AM - 10:00 PM',
      location: '5th Floor',
      features: ['Heated', 'Ocean View', 'Lap Lanes', 'Shallow End'],
      isActive: true,
      image: '/amenities/pool.jpg',
    },
    {
      id: '2',
      name: 'Luxury Spa',
      description: 'Indulge in our full-service spa offering massages, facials, body treatments, and aromatherapy.',
      icon: 'Sparkles',
      category: 'wellness',
      hours: '9:00 AM - 9:00 PM',
      location: '3rd Floor',
      features: ['Massage', 'Facials', 'Body Treatments', 'Aromatherapy'],
      isActive: true,
      image: '/amenities/spa.jpg',
    },
    {
      id: '3',
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness center with cardio equipment, weights, and ocean views.',
      icon: 'Dumbbell',
      category: 'wellness',
      hours: '24/7',
      location: '6th Floor',
      features: ['Cardio Equipment', 'Free Weights', 'Yoga Studio', 'Ocean View'],
      isActive: true,
      image: '/amenities/gym.jpg',
    },
    {
      id: '4',
      name: 'La Bella Restaurant',
      description: 'Fine Italian dining featuring authentic pasta, fresh seafood, and an extensive wine selection.',
      icon: 'UtensilsCrossed',
      category: 'dining',
      hours: '5:00 PM - 11:00 PM',
      location: 'Ground Floor',
      features: ['Italian Cuisine', 'Wine Bar', 'Ocean View', 'Private Dining'],
      isActive: true,
      image: '/amenities/restaurant.jpg',
    },
    {
      id: '5',
      name: '24/7 Concierge',
      description: 'Our dedicated concierge team is available around the clock to assist with reservations, tours, and special requests.',
      icon: 'User',
      category: 'services',
      hours: '24/7',
      location: 'Lobby',
      features: ['Tour Booking', 'Restaurant Reservations', 'Transportation', 'Local Tips'],
      isActive: true,
    },
  ]);

  // FAQs
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: '1',
      question: 'What time is check-in and check-out?',
      answer: 'Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in and late check-out are available for an additional fee.',
      category: 'Check-in',
      order: 1,
    },
    {
      id: '2',
      question: 'Do you offer airport transportation?',
      answer: 'Yes, we provide complimentary airport shuttle service. Please contact our concierge 24 hours in advance to arrange pickup.',
      category: 'Transportation',
      order: 2,
    },
    {
      id: '3',
      question: 'Is parking available?',
      answer: 'Yes, we offer valet parking for $35 per day and self-parking for $25 per day.',
      category: 'Parking',
      order: 3,
    },
  ]);

  // Page Content
  const [pageContent, setPageContent] = useState<PageContent[]>([
    {
      id: '1',
      page: 'home',
      section: 'hero',
      title: 'Welcome to Glimmora Hotel & Suites',
      content: 'Experience luxury hospitality with AI-powered services',
    },
    {
      id: '2',
      page: 'about',
      section: 'main',
      title: 'About Us',
      content: 'Glimmora Hotel & Suites is a luxury oceanfront hotel offering world-class amenities and personalized service.',
    },
  ]);

  // Policies
  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: '1',
      type: 'cancellation',
      title: 'Cancellation Policy',
      content: 'Free cancellation up to 48 hours before check-in. Cancellations within 48 hours will be charged one night stay.',
      lastUpdated: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'house-rules',
      title: 'House Rules',
      content: 'Check-in: 3:00 PM | Check-out: 11:00 AM | No smoking | No pets (except service animals) | Quiet hours: 10:00 PM - 7:00 AM',
      lastUpdated: new Date().toISOString(),
    },
  ]);

  // Amenity Functions
  const addAmenity = (amenityData: Omit<Amenity, 'id'>) => {
    const newAmenity: Amenity = {
      ...amenityData,
      id: Date.now().toString(),
    };
    setAmenities([...amenities, newAmenity]);
  };

  const updateAmenity = (id: string, data: Partial<Amenity>) => {
    setAmenities(amenities.map(a => a.id === id ? { ...a, ...data } : a));
  };

  const deleteAmenity = (id: string) => {
    setAmenities(amenities.filter(a => a.id !== id));
  };

  // FAQ Functions
  const addFAQ = (faqData: Omit<FAQ, 'id'>) => {
    const newFAQ: FAQ = {
      ...faqData,
      id: Date.now().toString(),
    };
    setFaqs([...faqs, newFAQ]);
  };

  const updateFAQ = (id: string, data: Partial<FAQ>) => {
    setFaqs(faqs.map(f => f.id === id ? { ...f, ...data } : f));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(faqs.filter(f => f.id !== id));
  };

  // Page Content Functions
  const updatePageContent = (id: string, data: Partial<PageContent>) => {
    setPageContent(pageContent.map(p => p.id === id ? { ...p, ...data } : p));
  };

  // Policy Functions
  const updatePolicy = (id: string, data: Partial<Policy>) => {
    setPolicies(policies.map(p => p.id === id ? { ...p, ...data, lastUpdated: new Date().toISOString() } : p));
  };

  return (
    <WebsiteContentContext.Provider
      value={{
        amenities,
        faqs,
        pageContent,
        policies,
        addAmenity,
        updateAmenity,
        deleteAmenity,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        updatePageContent,
        updatePolicy,
      }}
    >
      {children}
    </WebsiteContentContext.Provider>
  );
}

export function useWebsiteContent() {
  const context = useContext(WebsiteContentContext);
  if (!context) {
    throw new Error('useWebsiteContent must be used within WebsiteContentProvider');
  }
  return context;
}
