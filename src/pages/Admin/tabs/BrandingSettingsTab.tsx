import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAdvancedSettings } from '@/contexts/AdvancedSettingsContext';
import { Save, Upload, Palette, Type } from 'lucide-react';

export function BrandingSettingsTab() {
  const { brandingSettings, updateBrandingSettings } = useAdvancedSettings();
  const [settings, setSettings] = useState(brandingSettings);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateBrandingSettings(settings);
    setIsSaving(false);
  };

  const colorPresets = [
    { name: 'Ocean Blue', primary: '#0052CC', secondary: '#172B4D', accent: '#FF5630' },
    { name: 'Emerald', primary: '#10B981', secondary: '#065F46', accent: '#F59E0B' },
    { name: 'Royal Purple', primary: '#8B5CF6', secondary: '#4C1D95', accent: '#EC4899' },
    { name: 'Sunset Orange', primary: '#F97316', secondary: '#9A3412', accent: '#EAB308' },
  ];

  const fontOptions = [
    'Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Playfair Display',
    'Lato', 'Raleway', 'Poppins', 'Nunito', 'Work Sans'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Branding Settings</h1>
          <p className="text-neutral-600">Customize your hotel's visual identity</p>
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

      {/* Hotel Identity */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">Hotel Identity</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Hotel Name</label>
            <input
              type="text"
              value={settings.hotelName}
              onChange={(e) => setSettings({ ...settings, hotelName: e.target.value })}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
              placeholder="Enter hotel name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Footer Text</label>
            <input
              type="text"
              value={settings.footerText}
              onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
              placeholder="e.g., © 2024 Your Hotel. All rights reserved."
            />
          </div>
        </div>
      </div>

      {/* Logos & Icons */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Logos & Icons
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">Hotel Logo</label>
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary-500 transition-all cursor-pointer">
              <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-600 mb-1">Click to upload logo</p>
              <p className="text-xs text-neutral-500">PNG or SVG (max 2MB)</p>
            </div>
            <input
              type="text"
              value={settings.logo}
              onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg mt-3 text-sm"
              placeholder="Logo URL"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-3">Favicon</label>
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-primary-500 transition-all cursor-pointer">
              <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-600 mb-1">Click to upload favicon</p>
              <p className="text-xs text-neutral-500">ICO or PNG (32x32px)</p>
            </div>
            <input
              type="text"
              value={settings.favicon}
              onChange={(e) => setSettings({ ...settings, favicon: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg mt-3 text-sm"
              placeholder="Favicon URL"
            />
          </div>
        </div>
      </div>

      {/* Color Scheme */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Color Scheme
        </h2>

        {/* Color Presets */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-neutral-700 mb-3">Quick Presets</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setSettings({
                  ...settings,
                  primaryColor: preset.primary,
                  secondaryColor: preset.secondary,
                  accentColor: preset.accent,
                })}
                className="p-4 border-2 border-neutral-200 rounded-xl hover:border-primary-500 transition-all"
              >
                <div className="flex gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: preset.primary }} />
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: preset.secondary }} />
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: preset.accent }} />
                </div>
                <p className="text-sm font-semibold text-neutral-900">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Primary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 border-neutral-300"
              />
              <input
                type="text"
                value={settings.primaryColor}
                onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border-2 border-neutral-300 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Secondary Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 border-neutral-300"
              />
              <input
                type="text"
                value={settings.secondaryColor}
                onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                className="flex-1 px-4 py-2 border-2 border-neutral-300 rounded-lg font-mono text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Accent Color</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                className="w-16 h-12 rounded-lg cursor-pointer border-2 border-neutral-300"
              />
              <input
                type="text"
                value={settings.accentColor}
                onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })}
                className="flex-1 px-4 py-2 border-2 border-neutral-300 rounded-lg font-mono text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
          <Type className="w-5 h-5" />
          Typography
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Heading Font</label>
            <select
              value={settings.fontHeading}
              onChange={(e) => setSettings({ ...settings, fontHeading: e.target.value })}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
            >
              {fontOptions.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
            <p className="mt-3 text-2xl font-bold" style={{ fontFamily: settings.fontHeading }}>
              The Quick Brown Fox
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">Body Font</label>
            <select
              value={settings.fontBody}
              onChange={(e) => setSettings({ ...settings, fontBody: e.target.value })}
              className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
            >
              {fontOptions.map(font => (
                <option key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </option>
              ))}
            </select>
            <p className="mt-3 text-base" style={{ fontFamily: settings.fontBody }}>
              The quick brown fox jumps over the lazy dog.
            </p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-900 mb-4">Preview</h2>
        <div className="border-2 border-neutral-200 rounded-xl overflow-hidden">
          {/* Mock Website Header */}
          <div
            className="px-8 py-4 text-white"
            style={{ backgroundColor: settings.primaryColor }}
          >
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold" style={{ fontFamily: settings.fontHeading }}>
                {settings.hotelName}
              </h1>
              <div className="flex gap-4 text-sm" style={{ fontFamily: settings.fontBody }}>
                <span>Home</span>
                <span>Rooms</span>
                <span>Amenities</span>
              </div>
            </div>
          </div>

          {/* Mock Content */}
          <div className="p-8">
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: settings.fontHeading, color: settings.secondaryColor }}
            >
              Welcome to {settings.hotelName}
            </h2>
            <p
              className="text-neutral-700 mb-4"
              style={{ fontFamily: settings.fontBody }}
            >
              Experience luxury and comfort in our beautiful hotel. Book your perfect getaway today.
            </p>
            <button
              className="px-6 py-3 text-white font-semibold rounded-xl"
              style={{ backgroundColor: settings.accentColor }}
            >
              Book Now
            </button>
          </div>

          {/* Mock Footer */}
          <div
            className="px-8 py-4 text-white text-sm text-center"
            style={{ backgroundColor: settings.secondaryColor, fontFamily: settings.fontBody }}
          >
            {settings.footerText}
          </div>
        </div>
      </div>
    </div>
  );
}
