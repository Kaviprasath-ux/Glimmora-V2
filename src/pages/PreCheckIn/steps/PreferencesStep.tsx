import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';
import { usePreCheckIn } from '@/contexts/PreCheckInContext';

interface PreferencesStepProps {
  onNext: () => void;
}

export function PreferencesStep({ onNext }: PreferencesStepProps) {
  const { preCheckInData, updatePreCheckInData } = usePreCheckIn();

  const pillowOptions = ['Soft', 'Medium', 'Firm', 'Memory Foam'];
  const minibarOptions = ['Still Water', 'Sparkling Water', 'Soft Drinks', 'Snacks', 'Wine'];
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Halal', 'Kosher'];

  const toggleOption = (category: 'pillowType' | 'minibarPreferences' | 'dietaryRestrictions', option: string) => {
    const current = preCheckInData.preferences[category];
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];

    updatePreCheckInData({
      preferences: { ...preCheckInData.preferences, [category]: updated }
    });
  };

  const updateTemperature = (change: number) => {
    const newTemp = Math.max(60, Math.min(80, preCheckInData.preferences.temperature + change));
    updatePreCheckInData({
      preferences: { ...preCheckInData.preferences, temperature: newTemp }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Room Preferences</h2>
        <p className="text-neutral-600">Customize your stay experience</p>
      </div>

      <div className="space-y-8">
        {/* Temperature */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-4">
            Preferred Room Temperature
          </label>
          <div className="flex items-center justify-center gap-6 p-6 bg-neutral-50 rounded-xl">
            <button
              onClick={() => updateTemperature(-1)}
              className="w-12 h-12 rounded-full bg-white border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 transition-all"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-600">
                {preCheckInData.preferences.temperature}°
              </div>
              <div className="text-sm text-neutral-600 mt-1">Fahrenheit</div>
            </div>
            <button
              onClick={() => updateTemperature(1)}
              className="w-12 h-12 rounded-full bg-white border-2 border-neutral-300 flex items-center justify-center hover:border-primary-500 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Pillow Type */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Pillow Preferences (Select all that apply)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {pillowOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption('pillowType', option)}
                className={`p-4 border-2 rounded-xl transition-all text-left ${
                  preCheckInData.preferences.pillowType.includes(option)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-300 hover:border-primary-300'
                }`}
              >
                <span className="font-semibold">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Minibar */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Minibar Preferences (Optional)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {minibarOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption('minibarPreferences', option)}
                className={`p-4 border-2 rounded-xl transition-all text-left ${
                  preCheckInData.preferences.minibarPreferences.includes(option)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-300 hover:border-primary-300'
                }`}
              >
                <span className="font-semibold">{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div>
          <label className="block text-sm font-semibold text-neutral-700 mb-3">
            Dietary Restrictions (Optional)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {dietaryOptions.map((option) => (
              <button
                key={option}
                onClick={() => toggleOption('dietaryRestrictions', option)}
                className={`p-4 border-2 rounded-xl transition-all text-left ${
                  preCheckInData.preferences.dietaryRestrictions.includes(option)
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-neutral-300 hover:border-primary-300'
                }`}
              >
                <span className="font-semibold">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        className="w-full mt-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-xl transition-all"
      >
        Continue
      </button>
    </motion.div>
  );
}
