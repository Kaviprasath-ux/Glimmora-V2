import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { WelcomeStep } from './steps/WelcomeStep';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { AIRoomSelectionStep } from './steps/AIRoomSelectionStep';
import { TravelDetailsStep } from './steps/TravelDetailsStep';
import { DocumentUploadStep } from './steps/DocumentUploadStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { SpecialRequestsStep } from './steps/SpecialRequestsStep';
import { ReviewSubmitStep } from './steps/ReviewSubmitStep';
import { ConfirmationStep } from './steps/ConfirmationStep';

const steps = [
  { id: 1, name: 'Welcome', component: WelcomeStep },
  { id: 2, name: 'Personal Info', component: PersonalInfoStep },
  { id: 3, name: 'Room Selection', component: AIRoomSelectionStep },
  { id: 4, name: 'Travel Details', component: TravelDetailsStep },
  { id: 5, name: 'Documents', component: DocumentUploadStep },
  { id: 6, name: 'Preferences', component: PreferencesStep },
  { id: 7, name: 'Special Requests', component: SpecialRequestsStep },
  { id: 8, name: 'Review', component: ReviewSubmitStep },
  { id: 9, name: 'Confirmation', component: ConfirmationStep },
];

export function PreCheckInPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const CurrentStepComponent = steps.find(s => s.id === currentStep)?.component;

  const handleBack = () => {
    if (currentStep === 1) {
      navigate('/');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            {currentStep < 9 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{currentStep === 1 ? 'Back to Home' : 'Previous'}</span>
              </button>
            )}

            {/* Progress Steps */}
            {currentStep < 9 && (
              <div className="hidden md:flex items-center gap-2">
                {steps.slice(0, 8).map((step, index) => (
                  <React.Fragment key={step.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs transition-all ${
                        currentStep > step.id
                          ? 'bg-green-500 text-white'
                          : currentStep === step.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-neutral-200 text-neutral-600'
                      }`}>
                        {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                      </div>
                      <span className={`text-xs font-medium hidden lg:inline ${currentStep >= step.id ? 'text-neutral-900' : 'text-neutral-400'}`}>
                        {step.name}
                      </span>
                    </div>
                    {index < 7 && (
                      <div className={`w-8 h-0.5 ${currentStep > step.id ? 'bg-green-500' : 'bg-neutral-200'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {currentStep < 9 && <div className="w-20" />}
          </div>

          {/* Mobile Progress */}
          {currentStep < 9 && (
            <div className="md:hidden mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-900">
                  Step {currentStep} of 8
                </span>
                <span className="text-sm text-neutral-600">
                  {steps[currentStep - 1]?.name}
                </span>
              </div>
              <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / 8) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-primary-600"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
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
      </div>
    </div>
  );
}
