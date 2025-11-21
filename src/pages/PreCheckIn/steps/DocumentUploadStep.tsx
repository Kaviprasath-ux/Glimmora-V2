import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Check, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';
import logo from '@/assets/logo.png';

interface DocumentUploadStepProps {
  onNext: () => void;
  onPrevious?: () => void;
}

export function DocumentUploadStep({ onNext, onPrevious }: DocumentUploadStepProps) {
  const navigate = useNavigate();
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);

  const handleLogoClick = () => {
    const confirmed = window.confirm('Are you sure you want to cancel the pre-check-in? Your progress will be lost.');
    if (confirmed) {
      navigate('/');
    }
  };

  const onDropFront = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      const url = URL.createObjectURL(acceptedFiles[0]);
      updatePreCheckInData({
        documents: { ...preCheckInData.documents, idFrontUrl: url }
      });
      setFrontUploaded(true);
    }
  }, [preCheckInData.documents, updatePreCheckInData]);

  const onDropBack = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      const url = URL.createObjectURL(acceptedFiles[0]);
      updatePreCheckInData({
        documents: { ...preCheckInData.documents, idBackUrl: url }
      });
      setBackUploaded(true);
    }
  }, [preCheckInData.documents, updatePreCheckInData]);

  const { getRootProps: getFrontRootProps, getInputProps: getFrontInputProps } = useDropzone({
    onDrop: onDropFront,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: 1,
  });

  const { getRootProps: getBackRootProps, getInputProps: getBackInputProps } = useDropzone({
    onDrop: onDropBack,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: 1,
  });

  const handleContinue = () => {
    if (frontUploaded && backUploaded) {
      onNext();
    }
  };

  const steps = [
    { number: 1, label: 'Welcome', active: false },
    { number: 2, label: 'Guest Details', active: false },
    { number: 3, label: 'Room Preferences', active: false },
    { number: 4, label: 'Verification', active: false },
    { number: 5, label: 'Documents', active: true },
    { number: 6, label: 'Payment Info', active: false },
    { number: 7, label: 'Review', active: false },
    { number: 8, label: 'Confirmation', active: false },
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
                      Upload your ID document
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
                Upload ID Document
              </h1>
              <p className="text-sm text-neutral-500">
                For security and verification purposes
              </p>
            </div>

            <div className="space-y-5">
              {/* Front Side Upload */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Front Side
                </label>
                <div
                  {...getFrontRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                    frontUploaded
                      ? 'border-green-500 bg-green-50'
                      : 'border-neutral-300 hover:border-[#A57865] hover:bg-neutral-50'
                  }`}
                >
                  <input {...getFrontInputProps()} />
                  {frontUploaded ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
                        <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                      <p className="text-sm font-medium text-green-900 mb-1">Front side uploaded!</p>
                      <p className="text-xs text-green-700">Click to replace</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6 text-neutral-500" strokeWidth={2} />
                      </div>
                      <p className="text-sm font-medium text-neutral-900 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-neutral-600">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Back Side Upload */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Back Side
                </label>
                <div
                  {...getBackRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                    backUploaded
                      ? 'border-green-500 bg-green-50'
                      : 'border-neutral-300 hover:border-[#A57865] hover:bg-neutral-50'
                  }`}
                >
                  <input {...getBackInputProps()} />
                  {backUploaded ? (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
                        <Check className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                      <p className="text-sm font-medium text-green-900 mb-1">Back side uploaded!</p>
                      <p className="text-xs text-green-700">Click to replace</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6 text-neutral-500" strokeWidth={2} />
                      </div>
                      <p className="text-sm font-medium text-neutral-900 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-neutral-600">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Notice */}
              <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Shield className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900">
                  <p className="font-semibold mb-1">Your Privacy & Security</p>
                  <p>Documents are encrypted and used only for verification.</p>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleContinue}
                disabled={!frontUploaded || !backUploaded}
                className={`w-full py-2.5 text-white font-medium rounded-lg transition-all text-sm mt-6 ${
                  frontUploaded && backUploaded
                    ? 'bg-[#A57865] hover:bg-[#8E6554]'
                    : 'bg-neutral-300 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
