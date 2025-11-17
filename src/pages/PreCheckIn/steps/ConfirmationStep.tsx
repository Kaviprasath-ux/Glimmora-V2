import { motion } from 'framer-motion';
import { CheckCircle, Download, Smartphone, Key, Calendar, MapPin } from 'lucide-react';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';
import { format } from 'date-fns';
import { QRCodeSVG as QRCode } from 'qrcode.react';

interface ConfirmationStepProps {
  onNext: () => void;
}

export function ConfirmationStep({ }: ConfirmationStepProps) {
  const { preCheckInData } = usePreCheckIn();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      {/* Success Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-3xl p-12 text-center overflow-hidden relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-14 h-14 text-white" />
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">Pre-Check-In Complete!</h1>
        <p className="text-xl text-white/90">
          You're all set, {preCheckInData.guestName}!
        </p>

        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
      </div>

      {/* Digital Key */}
      <div className="bg-white rounded-3xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Smartphone className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-neutral-900">Your Digital Key</h2>
          </div>
          <p className="text-neutral-600">Use this QR code to access your room</p>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-white border-4 border-neutral-200 rounded-2xl">
            <QRCode
              value={preCheckInData.digitalKey?.qrCode || ''}
              size={200}
              level="H"
              includeMargin
            />
          </div>
        </div>

        {/* Key ID */}
        <div className="bg-neutral-50 rounded-xl p-4 mb-6 text-center">
          <div className="text-sm text-neutral-600 mb-1">Key ID</div>
          <div className="text-lg font-mono font-bold text-neutral-900">
            {preCheckInData.digitalKey?.keyId}
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
              1
            </div>
            <p className="text-sm text-neutral-700">
              <strong>Save this QR code</strong> to your phone's wallet or take a screenshot
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
              2
            </div>
            <p className="text-sm text-neutral-700">
              <strong>Scan at the entrance</strong> or your room door upon arrival
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
              3
            </div>
            <p className="text-sm text-neutral-700">
              <strong>Skip the front desk</strong> and go straight to your room!
            </p>
          </div>
        </div>

        <button className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
          <Download className="w-5 h-5" />
          Download Digital Key
        </button>
      </div>

      {/* Booking Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-xl font-bold text-neutral-900 mb-4">Booking Summary</h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Key className="w-5 h-5 text-primary-600 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-neutral-600">Room</div>
              <div className="font-semibold text-neutral-900">
                Room {preCheckInData.selectedRoom?.number} • {preCheckInData.selectedRoom?.view}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-neutral-600">Stay Dates</div>
              <div className="font-semibold text-neutral-900">
                {format(new Date(preCheckInData.checkInDate), 'MMM dd')} - {format(new Date(preCheckInData.checkOutDate), 'MMM dd, yyyy')}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-neutral-600">Arrival Time</div>
              <div className="font-semibold text-neutral-900">
                {preCheckInData.travelDetails.arrivalTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Email */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-900 text-center">
          <strong>Confirmation sent!</strong> Check your email at <strong>{preCheckInData.personalInfo.email}</strong> for full details and digital key backup.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => window.print()}
          className="py-3 bg-white border-2 border-neutral-300 hover:border-primary-500 text-neutral-900 font-semibold rounded-xl transition-all"
        >
          Print Summary
        </button>
        <button
          onClick={() => window.location.href = '/'}
          className="py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
}
