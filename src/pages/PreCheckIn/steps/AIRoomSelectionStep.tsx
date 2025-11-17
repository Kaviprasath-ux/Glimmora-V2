import { motion } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, ChevronRight, Check, Star, Eye, Bed, Volume2 } from 'lucide-react';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';

const mockRooms = [
  {
    number: '1205',
    floor: 12,
    view: 'Ocean View',
    bedType: 'King Bed',
    aiScore: 98,
    price: 350,
    aiReasoning: [
      'High floor matches your preference',
      'Ocean view as requested',
      'Quiet corner location',
      'King bed available',
      'Recently renovated',
    ],
    features: ['Corner unit', 'Extra spacious', 'Sunset views', 'Balcony'],
  },
  {
    number: '1108',
    floor: 11,
    view: 'Ocean View',
    bedType: 'King Bed',
    aiScore: 95,
    price: 350,
    aiReasoning: [
      'Ocean view as requested',
      'High floor preference',
      'King bed available',
      'Near elevator for convenience',
    ],
    features: ['Near amenities', 'Quick access', 'Ocean breeze'],
  },
  {
    number: '0815',
    floor: 8,
    view: 'City View',
    bedType: 'King Bed',
    aiScore: 87,
    price: 320,
    aiReasoning: [
      'Mid-level floor',
      'Quieter city side',
      'King bed available',
      'Lower price point',
    ],
    features: ['Value option', 'City lights', 'Quiet side'],
  },
];

interface AIRoomSelectionStepProps {
  onNext: () => void;
}

export function AIRoomSelectionStep({ onNext }: AIRoomSelectionStepProps) {
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();
  const [selectedRoomIndex, setSelectedRoomIndex] = useState<number | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handlePreferenceSubmit = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowRecommendations(true);
    }, 3000);
  };

  const handleRoomSelect = (index: number) => {
    setSelectedRoomIndex(index);
    const room = mockRooms[index];
    updatePreCheckInData({
      selectedRoom: {
        number: room.number,
        floor: room.floor,
        view: room.view,
        aiScore: room.aiScore,
        aiReasoning: room.aiReasoning,
      },
    });
  };

  const handleContinue = () => {
    if (selectedRoomIndex !== null) {
      onNext();
    }
  };

  if (!showRecommendations) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-neutral-900">AI Room Selection</h2>
              <p className="text-primary-600 font-medium">Powered by machine learning</p>
            </div>
          </div>
          <p className="text-neutral-600">Tell us your preferences and our AI will find your perfect room</p>
        </div>

        {isAnalyzing ? (
          <div className="py-16 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto mb-6"
            >
              <Sparkles className="w-full h-full text-primary-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">Analyzing Preferences...</h3>
            <p className="text-neutral-600 mb-6">Our AI is finding the perfect room for you</p>
            <div className="max-w-md mx-auto space-y-2">
              {[
                'Analyzing available rooms...',
                'Matching your preferences...',
                'Calculating compatibility scores...',
                'Ranking recommendations...',
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.7 }}
                  className="flex items-center gap-2 text-sm text-neutral-600"
                >
                  <Check className="w-4 h-4 text-green-600" />
                  {text}
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Floor Preference
              </label>
              <div className="grid grid-cols-4 gap-3">
                {(['low', 'mid', 'high', 'any'] as const).map((floor) => (
                  <button
                    key={floor}
                    type="button"
                    onClick={() => updatePreCheckInData({
                      roomPreferences: { ...preCheckInData.roomPreferences, floor }
                    })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      preCheckInData.roomPreferences.floor === floor
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-300 hover:border-primary-300'
                    }`}
                  >
                    <div className="font-semibold capitalize">{floor}</div>
                    <div className="text-xs text-neutral-600">
                      {floor === 'low' && '2-5'}
                      {floor === 'mid' && '6-10'}
                      {floor === 'high' && '11+'}
                      {floor === 'any' && 'No pref'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                View Preference
              </label>
              <div className="grid grid-cols-4 gap-3">
                {(['ocean', 'city', 'garden', 'any'] as const).map((view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() => updatePreCheckInData({
                      roomPreferences: { ...preCheckInData.roomPreferences, view }
                    })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      preCheckInData.roomPreferences.view === view
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-300 hover:border-primary-300'
                    }`}
                  >
                    <Eye className="w-5 h-5 mx-auto mb-1" />
                    <div className="font-semibold capitalize text-sm">{view}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Bed Type
              </label>
              <div className="grid grid-cols-4 gap-3">
                {(['king', 'queen', 'twin', 'any'] as const).map((bedType) => (
                  <button
                    key={bedType}
                    type="button"
                    onClick={() => updatePreCheckInData({
                      roomPreferences: { ...preCheckInData.roomPreferences, bedType }
                    })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      preCheckInData.roomPreferences.bedType === bedType
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-300 hover:border-primary-300'
                    }`}
                  >
                    <Bed className="w-5 h-5 mx-auto mb-1" />
                    <div className="font-semibold capitalize text-sm">{bedType}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-3">
                Quietness Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['quiet', 'moderate', 'any'] as const).map((quietness) => (
                  <button
                    key={quietness}
                    type="button"
                    onClick={() => updatePreCheckInData({
                      roomPreferences: { ...preCheckInData.roomPreferences, quietness }
                    })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      preCheckInData.roomPreferences.quietness === quietness
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-300 hover:border-primary-300'
                    }`}
                  >
                    <Volume2 className="w-5 h-5 mx-auto mb-1" />
                    <div className="font-semibold capitalize text-sm">{quietness}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePreferenceSubmit}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Find My Perfect Room
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="w-8 h-8" />
          <h2 className="text-3xl font-bold">Your Perfect Rooms</h2>
        </div>
        <p className="text-white/90">Our AI analyzed {mockRooms.length} available rooms and found these top matches</p>
      </div>

      {mockRooms.map((room, index) => (
        <motion.div
          key={room.number}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          onClick={() => handleRoomSelect(index)}
          className={`bg-white rounded-2xl p-6 cursor-pointer transition-all ${
            selectedRoomIndex === index
              ? 'ring-4 ring-primary-500 shadow-2xl'
              : 'shadow-sm hover:shadow-xl'
          }`}
        >
          {index === 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full mb-4">
              <Star className="w-4 h-4 fill-white" />
              <span className="font-semibold text-sm">Best Match</span>
            </div>
          )}

          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900">Room {room.number}</h3>
              <p className="text-neutral-600">Floor {room.floor} • {room.view} • {room.bedType}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">{room.aiScore}%</div>
              <div className="text-sm text-neutral-600">AI Match</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="text-sm font-semibold text-neutral-700 mb-2">Why this room?</div>
            <div className="space-y-2">
              {room.aiReasoning.map((reason, i) => (
                <div key={i} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-700">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {room.features.map((feature, i) => (
              <span key={i} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-full">
                {feature}
              </span>
            ))}
          </div>

          {selectedRoomIndex === index && (
            <div className="mt-4 flex items-center gap-2 text-primary-600 font-semibold">
              <Check className="w-5 h-5" />
              Selected
            </div>
          )}
        </motion.div>
      ))}

      <button
        onClick={handleContinue}
        disabled={selectedRoomIndex === null}
        className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-semibold text-lg rounded-xl transition-all flex items-center justify-center gap-2"
      >
        Continue with Selected Room
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
