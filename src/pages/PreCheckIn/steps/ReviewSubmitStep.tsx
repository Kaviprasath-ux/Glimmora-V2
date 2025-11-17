import { motion } from 'framer-motion';
import { CheckCircle, Edit } from 'lucide-react';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';
import { format } from 'date-fns';

interface ReviewSubmitStepProps {
  onNext: () => void;
}

export function ReviewSubmitStep({ onNext }: ReviewSubmitStepProps) {
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();

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

  const sections = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Email', value: preCheckInData.personalInfo.email },
        { label: 'Phone', value: preCheckInData.personalInfo.phone },
        { label: 'Address', value: `${preCheckInData.personalInfo.address}, ${preCheckInData.personalInfo.city}` },
      ],
    },
    {
      title: 'Selected Room',
      items: [
        { label: 'Room Number', value: preCheckInData.selectedRoom?.number || 'Not selected' },
        { label: 'Floor', value: preCheckInData.selectedRoom?.floor.toString() || '-' },
        { label: 'View', value: preCheckInData.selectedRoom?.view || '-' },
        { label: 'AI Match Score', value: preCheckInData.selectedRoom ? `${preCheckInData.selectedRoom.aiScore}%` : '-' },
      ],
    },
    {
      title: 'Travel Details',
      items: [
        { label: 'Arrival Time', value: preCheckInData.travelDetails.arrivalTime },
        { label: 'Flight Number', value: preCheckInData.travelDetails.flightNumber || 'Not provided' },
        { label: 'Purpose', value: preCheckInData.travelDetails.purpose },
        { label: 'Transportation', value: preCheckInData.travelDetails.transportationNeeded ? 'Requested' : 'Not needed' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { label: 'Room Temperature', value: `${preCheckInData.preferences.temperature}°F` },
        { label: 'Pillow Type', value: preCheckInData.preferences.pillowType.join(', ') || 'Default' },
        { label: 'Minibar', value: preCheckInData.preferences.minibarPreferences.join(', ') || 'Default' },
        { label: 'Dietary', value: preCheckInData.preferences.dietaryRestrictions.join(', ') || 'None' },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Review Your Information</h2>
        <p className="text-neutral-600">Please review all details before submitting</p>
      </div>

      {/* Booking Info */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-white/70 text-sm mb-1">Booking Number</div>
            <div className="font-semibold text-lg">{preCheckInData.bookingNumber}</div>
          </div>
          <div>
            <div className="text-white/70 text-sm mb-1">Room Type</div>
            <div className="font-semibold text-lg">{preCheckInData.roomType}</div>
          </div>
          <div>
            <div className="text-white/70 text-sm mb-1">Check-in</div>
            <div className="font-semibold">
              {format(new Date(preCheckInData.checkInDate), 'MMM dd, yyyy')}
            </div>
          </div>
          <div>
            <div className="text-white/70 text-sm mb-1">Check-out</div>
            <div className="font-semibold">
              {format(new Date(preCheckInData.checkOutDate), 'MMM dd, yyyy')}
            </div>
          </div>
        </div>
      </div>

      {/* Review Sections */}
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-neutral-900">{section.title}</h3>
            <button className="text-primary-600 hover:text-primary-700 flex items-center gap-1 text-sm font-medium">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {section.items.map((item) => (
              <div key={item.label}>
                <div className="text-sm text-neutral-600 mb-1">{item.label}</div>
                <div className="font-medium text-neutral-900">{item.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Special Requests */}
      {(preCheckInData.specialRequests.requests ||
        preCheckInData.specialRequests.earlyCheckIn ||
        preCheckInData.specialRequests.lateCheckOut) && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-neutral-900 mb-4">Special Requests</h3>
          {preCheckInData.specialRequests.requests && (
            <div className="mb-4">
              <div className="text-sm text-neutral-600 mb-1">Additional Requests</div>
              <div className="text-neutral-900">{preCheckInData.specialRequests.requests}</div>
            </div>
          )}
          <div className="flex gap-3">
            {preCheckInData.specialRequests.earlyCheckIn && (
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                Early Check-in
              </span>
            )}
            {preCheckInData.specialRequests.lateCheckOut && (
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                Late Check-out
              </span>
            )}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold text-lg rounded-xl transition-all flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        Submit Pre-Check-In
      </button>
    </motion.div>
  );
}
