import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';
import logo from '@/assets/logo.png';

interface ReviewSubmitStepProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export function ReviewSubmitStep({ onNext, onPrevious }: ReviewSubmitStepProps) {
  const navigate = useNavigate();
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();

  const handleLogoClick = () => {
    const confirmed = window.confirm('Are you sure you want to cancel the pre-check-in? Your progress will be lost.');
    if (confirmed) {
      navigate('/');
    }
  };

  const handleSubmit = () => {
    // Simulate generating digital key
    const keyId = `DK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    updatePreCheckInData({
      digitalKey: {
        keyId,
        activated: true,
        qrCode: `TERRA-HOTEL-${keyId}`,
      },
    });
    onNext();
  };

  const steps = [
    { number: 1, label: 'Welcome', active: false },
    { number: 2, label: 'Guest Details', active: false },
    { number: 3, label: 'Room Preferences', active: false },
    { number: 4, label: 'Verification', active: false },
    { number: 5, label: 'Documents', active: false },
    { number: 6, label: 'Payment Info', active: false },
    { number: 7, label: 'Review', active: false },
    { number: 8, label: 'Confirmation', active: true },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      {/* LEFT COLUMN - Vertical Stepper */}
      <div className="w-[410px] min-h-screen px-12 py-12 border-r border-neutral-200 bg-white">
        <div className="sticky top-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20"
          >
            <img
              src={logo}
              alt="Glimmora"
              className="h-10 w-auto cursor-pointer"
              onClick={handleLogoClick}
            />
          </motion.div>

          {/* Vertical Stepper */}
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start gap-4">
                {/* Step Indicator Column */}
                <div className="flex flex-col items-center">
                  {/* Circle */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                      step.active
                        ? 'bg-[#A57865] text-white'
                        : 'bg-transparent text-neutral-400 border border-neutral-300'
                    }`}
                  >
                    {step.active ? <div className="w-2 h-2 bg-white rounded-full" /> : step.number}
                  </motion.div>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="w-px h-10 bg-neutral-200 mt-1.5" />
                  )}
                </div>

                {/* Step Label */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="pt-1 pb-8"
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      step.active ? 'text-neutral-900' : 'text-neutral-500'
                    }`}
                  >
                    {step.label}
                  </div>
                  {step.active && (
                    <div className="text-xs text-neutral-500">
                      Review and submit your information
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - Content Card */}
      <div className="flex-1 flex items-start justify-center pt-16 px-16" style={{ backgroundColor: '#FAFAFA' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Content Card */}
          <div className="bg-white p-8 rounded-2xl border-2 border-neutral-200 shadow-lg">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
                Review & Submit
              </h1>
              <p className="text-sm text-neutral-500">
                Please review your information before submitting
              </p>
            </div>

            <div className="space-y-6">
              {/* Personal Information */}
              <div className="pb-6 border-b border-neutral-200">
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                  Personal Information
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Email</span>
                    <span className="text-neutral-900 font-medium">
                      {preCheckInData.personalInfo.email || 'Not provided'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Phone</span>
                    <span className="text-neutral-900 font-medium">
                      {preCheckInData.personalInfo.phone || 'Not provided'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Travel Details */}
              <div className="pb-6 border-b border-neutral-200">
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                  Travel Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Arrival Time</span>
                    <span className="text-neutral-900 font-medium">
                      {preCheckInData.travelDetails.arrivalTime || 'Not provided'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Transportation</span>
                    <span className="text-neutral-900 font-medium">
                      {preCheckInData.travelDetails.transportationNeeded ? 'Requested' : 'Not needed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Room Preferences */}
              <div className="pb-6 border-b border-neutral-200">
                <h3 className="text-sm font-semibold text-neutral-900 mb-3">
                  Room Preferences
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Temperature</span>
                    <span className="text-neutral-900 font-medium">
                      {preCheckInData.preferences.temperature}°F
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Pillow Type</span>
                    <span className="text-neutral-900 font-medium">
                      {preCheckInData.preferences.pillowType.join(', ') || 'None'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-2.5 text-white font-medium rounded-lg transition-all text-sm mt-6"
              style={{
                backgroundColor: '#A57865',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8E6554';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#A57865';
              }}
            >
              Complete Pre-Check-In
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
