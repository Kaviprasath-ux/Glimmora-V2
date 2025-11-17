import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useBooking } from '@/contexts/BookingContext';
import { rooms } from '@/data/roomsData';
import { DatesStep } from './steps/DatesStep';
import { GuestInfoStep } from './steps/GuestInfoStep';
import { PaymentStep } from './steps/PaymentStep';
import { ConfirmationStep } from './steps/ConfirmationStep';
import { BookingSummary } from './components/BookingSummary';

const steps = [
  { id: 1, name: 'Dates & Guests', component: DatesStep },
  { id: 2, name: 'Your Information', component: GuestInfoStep },
  { id: 3, name: 'Payment', component: PaymentStep },
  { id: 4, name: 'Confirmation', component: ConfirmationStep },
];

export function BookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { bookingData, updateBookingData } = useBooking();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Get room and search params from URL
  useEffect(() => {
    const roomSlug = searchParams.get('room');
    const checkIn = searchParams.get('checkIn') || '';
    const checkOut = searchParams.get('checkOut') || '';
    const adults = parseInt(searchParams.get('adults') || '1');
    const children = parseInt(searchParams.get('children') || '0');

    if (roomSlug) {
      const room = rooms.find(r => r.slug === roomSlug);
      if (room) {
        updateBookingData({
          room,
          checkIn,
          checkOut,
          guests: { adults, children }
        });
        setIsLoading(false);
      } else {
        navigate('/rooms');
      }
    } else {
      navigate('/rooms');
    }
  }, [searchParams, updateBookingData, navigate]);

  const CurrentStepComponent = steps.find(s => s.id === currentStep)?.component;

  if (isLoading || !bookingData.room) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading booking...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (currentStep === 1) {
                  const params = new URLSearchParams();
                  if (bookingData.checkIn) params.set('checkIn', bookingData.checkIn);
                  if (bookingData.checkOut) params.set('checkOut', bookingData.checkOut);
                  params.set('adults', bookingData.guests.adults.toString());
                  params.set('children', bookingData.guests.children.toString());
                  navigate(`/rooms/${bookingData.room!.slug}?${params.toString()}`);
                } else {
                  setCurrentStep(currentStep - 1);
                }
              }}
              className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{currentStep === 1 ? 'Back to Room' : 'Previous'}</span>
            </button>

            {/* Progress Steps */}
            <div className="hidden md:flex items-center gap-2">
              {steps.slice(0, 3).map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : currentStep === step.id
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                    </div>
                    <span className={`text-sm font-medium ${currentStep >= step.id ? 'text-neutral-900' : 'text-neutral-400'}`}>
                      {step.name}
                    </span>
                  </div>
                  {index < 2 && (
                    <div className={`w-12 h-0.5 ${currentStep > step.id ? 'bg-green-500' : 'bg-neutral-200'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="w-20" /> {/* Spacer for balance */}
          </div>

          {/* Pre-filled Info Banner */}
          {currentStep === 1 && bookingData.checkIn && bookingData.checkOut && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
            >
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700">
                <strong>Dates pre-filled!</strong> Your selected dates are ready. You can modify them below if needed.
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Steps Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {CurrentStepComponent && (
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CurrentStepComponent onNext={() => setCurrentStep(currentStep + 1)} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Booking Summary Sidebar */}
          {currentStep < 4 && (
            <div className="lg:col-span-1">
              <BookingSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
