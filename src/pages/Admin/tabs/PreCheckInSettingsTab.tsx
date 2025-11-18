import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAdvancedSettings } from '@/contexts/AdvancedSettingsContext';
import { Save, CheckCircle, XCircle, GripVertical, Sparkles } from 'lucide-react';

export function PreCheckInSettingsTab() {
  const { preCheckInSettings, updatePreCheckInSettings } = useAdvancedSettings();
  const [settings, setSettings] = useState(preCheckInSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updatePreCheckInSettings(settings);
    setIsSaving(false);
  };

  const toggleStep = (stepId: string, field: 'enabled' | 'required') => {
    setSettings(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === stepId ? { ...step, [field]: !step[field] } : step
      ),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Pre-Check-In Settings</h1>
          <p className="text-neutral-600">Configure the pre-check-in experience for guests</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Main Settings */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">General Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
            <div>
              <h3 className="font-semibold text-neutral-900">Enable Pre-Check-In</h3>
              <p className="text-sm text-neutral-600">Allow guests to complete check-in online before arrival</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, enabled: !prev.enabled }))}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                settings.enabled ? 'bg-green-500' : 'bg-neutral-300'
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                  settings.enabled ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
            <div>
              <h3 className="font-semibold text-neutral-900">Require ID Verification</h3>
              <p className="text-sm text-neutral-600">Guests must upload government-issued ID</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, requireId: !prev.requireId }))}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                settings.requireId ? 'bg-green-500' : 'bg-neutral-300'
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                  settings.requireId ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
            <div>
              <h3 className="font-semibold text-neutral-900">Require Credit Card</h3>
              <p className="text-sm text-neutral-600">Guests must provide credit card for incidentals</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, requireCreditCard: !prev.requireCreditCard }))}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                settings.requireCreditCard ? 'bg-green-500' : 'bg-neutral-300'
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                  settings.requireCreditCard ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
            <div>
              <h3 className="font-semibold text-neutral-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Enable AI Room Selection
              </h3>
              <p className="text-sm text-neutral-600">Let AI suggest the perfect room based on preferences</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, enableAiRoomSelection: !prev.enableAiRoomSelection }))}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                settings.enableAiRoomSelection ? 'bg-blue-500' : 'bg-neutral-300'
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                  settings.enableAiRoomSelection ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
            <div>
              <h3 className="font-semibold text-neutral-900">Allow Room Upgrades</h3>
              <p className="text-sm text-neutral-600">Offer room upgrade options during pre-check-in</p>
            </div>
            <button
              onClick={() => setSettings(prev => ({ ...prev, allowRoomUpgrade: !prev.allowRoomUpgrade }))}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                settings.allowRoomUpgrade ? 'bg-green-500' : 'bg-neutral-300'
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                  settings.allowRoomUpgrade ? 'translate-x-8' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-neutral-900">Reminder Email</h3>
                <p className="text-sm text-neutral-600">Send pre-check-in reminder X days before arrival</p>
              </div>
              <input
                type="number"
                min="1"
                max="14"
                value={settings.reminderEmailDays}
                onChange={(e) => setSettings(prev => ({ ...prev, reminderEmailDays: parseInt(e.target.value) }))}
                className="w-20 px-3 py-2 border-2 border-neutral-300 rounded-lg text-center font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Check-In Steps */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">Pre-Check-In Steps</h2>
        <p className="text-sm text-neutral-600 mb-4">Configure which steps are shown in the pre-check-in flow</p>

        <div className="space-y-3">
          {settings.steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 bg-neutral-50 rounded-xl"
            >
              <GripVertical className="w-5 h-5 text-neutral-400 cursor-move" />

              <div className="flex-1">
                <h3 className="font-semibold text-neutral-900">
                  {step.order}. {step.name}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleStep(step.id, 'enabled')}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                    step.enabled
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                  }`}
                >
                  {step.enabled ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Enabled
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      Disabled
                    </>
                  )}
                </button>

                <button
                  onClick={() => toggleStep(step.id, 'required')}
                  disabled={!step.enabled}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    !step.enabled
                      ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                      : step.required
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                  }`}
                >
                  {step.required ? 'Required' : 'Optional'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-neutral-900 mb-2">Preview</h2>
        <p className="text-sm text-neutral-600 mb-4">
          Guests will complete {settings.steps.filter(s => s.enabled).length} steps, with {settings.steps.filter(s => s.enabled && s.required).length} required.
          {settings.enableAiRoomSelection && ' AI room selection is enabled for a personalized experience.'}
        </p>
      </div>
    </div>
  );
}
