import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Check } from 'lucide-react';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';

interface DocumentUploadStepProps {
  onNext: () => void;
}

export function DocumentUploadStep({ onNext }: DocumentUploadStepProps) {
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [backUploaded, setBackUploaded] = useState(false);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Upload ID Document</h2>
        <p className="text-neutral-600">For security and verification purposes</p>
      </div>

      {/* ID Type Selection */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-neutral-700 mb-3">
          Document Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { value: 'passport', label: 'Passport', icon: '🛂' },
            { value: 'drivers-license', label: 'Driver\'s License', icon: '🪪' },
            { value: 'national-id', label: 'National ID', icon: '🆔' },
          ].map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => updatePreCheckInData({
                documents: { ...preCheckInData.documents, idType: type.value as any }
              })}
              className={`p-4 border-2 rounded-xl transition-all ${
                preCheckInData.documents.idType === type.value
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-neutral-300 hover:border-primary-300'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <div className="text-sm font-semibold">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Areas */}
      <div className="space-y-6 mb-8">
        {/* Front Side */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Front Side *
          </label>
          <div
            {...getFrontRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              frontUploaded
                ? 'border-green-500 bg-green-50'
                : 'border-neutral-300 hover:border-primary-500 hover:bg-primary-50'
            }`}
          >
            <input {...getFrontInputProps()} />
            {frontUploaded ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold text-green-900">Front side uploaded!</p>
                <p className="text-sm text-green-700 mt-1">Click to replace</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-neutral-400 mb-4" />
                <p className="font-semibold text-neutral-900 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-neutral-600">PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Back Side */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Back Side *
          </label>
          <div
            {...getBackRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              backUploaded
                ? 'border-green-500 bg-green-50'
                : 'border-neutral-300 hover:border-primary-500 hover:bg-primary-50'
            }`}
          >
            <input {...getBackInputProps()} />
            {backUploaded ? (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <p className="font-semibold text-green-900">Back side uploaded!</p>
                <p className="text-sm text-green-700 mt-1">Click to replace</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="w-12 h-12 text-neutral-400 mb-4" />
                <p className="font-semibold text-neutral-900 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-neutral-600">PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl mb-6">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900">
            <strong>Your privacy matters.</strong> Documents are encrypted, used only for verification, and automatically deleted after check-out.
          </div>
        </div>
      </div>

      <button
        onClick={handleContinue}
        disabled={!frontUploaded || !backUploaded}
        className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl transition-all"
      >
        Continue
      </button>
    </motion.div>
  );
}
