import { motion } from 'framer-motion';
import { MessageSquare, Clock } from 'lucide-react';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';

interface SpecialRequestsStepProps {
  onNext: () => void;
}

export function SpecialRequestsStep({ onNext }: SpecialRequestsStepProps) {
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Special Requests</h2>
        <p className="text-neutral-600">Let us know how we can make your stay perfect</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Special Requests Textarea */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-2">
            Additional Requests (Optional)
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-neutral-400" />
            <textarea
              value={preCheckInData.specialRequests.requests}
              onChange={(e) => updatePreCheckInData({
                specialRequests: { ...preCheckInData.specialRequests, requests: e.target.value }
              })}
              rows={6}
              placeholder="E.g., High floor, quiet location, extra towels, special occasion..."
              className="w-full pl-12 pr-4 py-4 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 transition-all resize-none"
            />
          </div>
          <p className="mt-2 text-sm text-neutral-500">
            We'll do our best to accommodate your requests (subject to availability)
          </p>
        </div>

        {/* Early Check-in */}
        <div>
          <label className="flex items-start gap-3 p-4 border-2 border-neutral-300 rounded-xl cursor-pointer hover:border-primary-300 transition-all">
            <input
              type="checkbox"
              checked={preCheckInData.specialRequests.earlyCheckIn}
              onChange={(e) => updatePreCheckInData({
                specialRequests: { ...preCheckInData.specialRequests, earlyCheckIn: e.target.checked }
              })}
              className="mt-1 w-5 h-5 text-primary-600 rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-neutral-900 mb-1">
                <Clock className="w-5 h-5" />
                Early Check-in Request
              </div>
              <p className="text-sm text-neutral-600">
                Standard check-in is 3:00 PM. Request early check-in (subject to availability, may incur additional fees)
              </p>
            </div>
          </label>
        </div>

        {/* Late Check-out */}
        <div>
          <label className="flex items-start gap-3 p-4 border-2 border-neutral-300 rounded-xl cursor-pointer hover:border-primary-300 transition-all">
            <input
              type="checkbox"
              checked={preCheckInData.specialRequests.lateCheckOut}
              onChange={(e) => updatePreCheckInData({
                specialRequests: { ...preCheckInData.specialRequests, lateCheckOut: e.target.checked }
              })}
              className="mt-1 w-5 h-5 text-primary-600 rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 font-semibold text-neutral-900 mb-1">
                <Clock className="w-5 h-5" />
                Late Check-out Request
              </div>
              <p className="text-sm text-neutral-600">
                Standard check-out is 11:00 AM. Request late check-out (subject to availability, may incur additional fees)
              </p>
            </div>
          </label>
        </div>

        {/* Info Box */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>💡 Good to know:</strong> Our concierge team reviews all requests and will contact you to confirm availability before your arrival.
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-xl transition-all"
        >
          Continue to Review
        </button>
      </form>
    </motion.div>
  );
}
