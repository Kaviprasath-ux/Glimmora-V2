import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bed, Thermometer, Coffee, UtensilsCrossed, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export function PreferencesTab() {
  const [preferences, setPreferences] = useState({
    floor: 'high',
    view: 'ocean',
    bedType: 'king',
    quietness: 'quiet',
    temperature: 72,
    pillowType: ['firm'],
    minibar: ['water', 'soft-drinks'],
    dietary: ['vegetarian'],
  });

  const handleSave = () => {
    console.log('Preferences saved:', preferences);
    toast.success('Preferences saved successfully!');
  };

  const toggleArrayItem = (key: 'pillowType' | 'minibar' | 'dietary', value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Room Preferences</h2>
        <p className="text-neutral-600">
          Set your preferences for a personalized stay experience
        </p>
      </motion.div>

      {/* Room Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Bed className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold text-neutral-900">Room Setup</h3>
        </div>

        <div className="space-y-6">
          {/* Floor Preference */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Floor Preference
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['low', 'mid', 'high'].map((floor) => (
                <button
                  key={floor}
                  onClick={() => setPreferences({ ...preferences, floor })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    preferences.floor === floor
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {floor.charAt(0).toUpperCase() + floor.slice(1)} Floor
                </button>
              ))}
            </div>
          </div>

          {/* View Preference */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              View Preference
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['ocean', 'city', 'garden'].map((view) => (
                <button
                  key={view}
                  onClick={() => setPreferences({ ...preferences, view })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    preferences.view === view
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)} View
                </button>
              ))}
            </div>
          </div>

          {/* Bed Type */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Bed Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['king', 'queen', 'twin'].map((bed) => (
                <button
                  key={bed}
                  onClick={() => setPreferences({ ...preferences, bedType: bed })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    preferences.bedType === bed
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {bed.charAt(0).toUpperCase() + bed.slice(1)} Bed
                </button>
              ))}
            </div>
          </div>

          {/* Quietness */}
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">
              Room Location
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['quiet', 'lively'].map((location) => (
                <button
                  key={location}
                  onClick={() => setPreferences({ ...preferences, quietness: location })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    preferences.quietness === location
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {location.charAt(0).toUpperCase() + location.slice(1)} Area
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Room Temperature */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Thermometer className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold text-neutral-900">Room Temperature</h3>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-neutral-700">Preferred Temperature</span>
            <span className="text-3xl font-bold text-primary-600">{preferences.temperature}°F</span>
          </div>
          <input
            type="range"
            min="65"
            max="78"
            value={preferences.temperature}
            onChange={(e) => setPreferences({ ...preferences, temperature: parseInt(e.target.value) })}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
          />
          <div className="flex justify-between text-sm text-neutral-600 mt-2">
            <span>Cool (65°F)</span>
            <span>Warm (78°F)</span>
          </div>
        </div>
      </motion.div>

      {/* Pillow Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Bed className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold text-neutral-900">Pillow Type</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {['firm', 'soft', 'memory-foam', 'feather'].map((pillow) => (
            <button
              key={pillow}
              onClick={() => toggleArrayItem('pillowType', pillow)}
              className={`py-3 px-4 rounded-xl font-medium transition-all ${
                preferences.pillowType.includes(pillow)
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {pillow.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Minibar Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Coffee className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold text-neutral-900">Minibar Preferences</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['water', 'soft-drinks', 'energy-drinks', 'snacks', 'beer', 'wine'].map((item) => (
            <button
              key={item}
              onClick={() => toggleArrayItem('minibar', item)}
              className={`py-3 px-4 rounded-xl font-medium transition-all ${
                preferences.minibar.includes(item)
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {item.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Dietary Restrictions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <UtensilsCrossed className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold text-neutral-900">Dietary Restrictions</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'halal'].map((diet) => (
            <button
              key={diet}
              onClick={() => toggleArrayItem('dietary', diet)}
              className={`py-3 px-4 rounded-xl font-medium transition-all ${
                preferences.dietary.includes(diet)
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {diet.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={handleSave}
          className="w-full md:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-xl transition-all flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Preferences
        </button>
      </motion.div>
    </div>
  );
}
