import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAdvancedSettings } from '@/contexts/AdvancedSettingsContext';
import { Save, Mail, Eye, Code } from 'lucide-react';

export function EmailTemplatesTab() {
  const { emailTemplates, updateEmailTemplate } = useAdvancedSettings();
  const [selectedTemplate, setSelectedTemplate] = useState(emailTemplates[0]);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = async () => {
    if (!editingTemplate) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updateEmailTemplate(editingTemplate.id, {
      subject: editingTemplate.subject,
      body: editingTemplate.body,
    });
    setIsSaving(false);
    setEditingTemplate(null);
    setSelectedTemplate(editingTemplate);
  };

  const getTemplateIcon = (type: string) => {
    return Mail;
  };

  const mockPreviewData = {
    guestName: 'John Smith',
    hotelName: 'Glimmora Hotel & Suites',
    bookingNumber: 'BK-2024-12345',
    checkInDate: 'Dec 15, 2024',
    checkOutDate: 'Dec 18, 2024',
    roomType: 'Ocean View Suite',
    totalAmount: '1,250',
    refundAmount: '1,250',
    refundMessage: 'Your refund will be processed within 5-7 business days.',
    preCheckInLink: 'https://hotel.com/pre-checkin/BK-2024-12345',
    reviewLink: 'https://hotel.com/review/BK-2024-12345',
  };

  const renderPreview = (template: any) => {
    let preview = template.body;
    Object.entries(mockPreviewData).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return preview;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Email Templates</h1>
          <p className="text-neutral-600">Customize automated email communications</p>
        </div>
        {editingTemplate && (
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
                Save Template
              </>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="font-bold text-neutral-900 mb-3">Templates</h2>
          {emailTemplates.map((template, index) => {
            const Icon = getTemplateIcon(template.type);
            return (
              <motion.button
                key={template.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  setSelectedTemplate(template);
                  setEditingTemplate(null);
                  setShowPreview(false);
                }}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  selectedTemplate.id === template.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${
                    selectedTemplate.id === template.id ? 'text-white' : 'text-primary-600'
                  }`} />
                  <div>
                    <h3 className={`font-semibold ${
                      selectedTemplate.id === template.id ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {template.name}
                    </h3>
                    <p className={`text-xs capitalize ${
                      selectedTemplate.id === template.id ? 'text-white/80' : 'text-neutral-600'
                    }`}>
                      {template.type.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Template Editor */}
        <div className="lg:col-span-2 space-y-4">
          {/* View/Edit Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                setEditingTemplate(null);
                setShowPreview(false);
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                !editingTemplate && !showPreview
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <Code className="w-4 h-4" />
              Edit
            </button>
            <button
              onClick={() => {
                setEditingTemplate(null);
                setShowPreview(true);
              }}
              className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                showPreview
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
          </div>

          {/* Edit Mode */}
          {!showPreview && (
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="font-bold text-neutral-900 mb-3">{selectedTemplate.name}</h3>
                <p className="text-sm text-neutral-600 mb-4">
                  This template is sent when: {selectedTemplate.type.replace('-', ' ')}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Subject Line</label>
                <input
                  type="text"
                  value={editingTemplate ? editingTemplate.subject : selectedTemplate.subject}
                  onChange={(e) => {
                    if (!editingTemplate) {
                      setEditingTemplate({ ...selectedTemplate, subject: e.target.value });
                    } else {
                      setEditingTemplate({ ...editingTemplate, subject: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
                  placeholder="Email subject line"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">Email Body</label>
                <textarea
                  value={editingTemplate ? editingTemplate.body : selectedTemplate.body}
                  onChange={(e) => {
                    if (!editingTemplate) {
                      setEditingTemplate({ ...selectedTemplate, body: e.target.value });
                    } else {
                      setEditingTemplate({ ...editingTemplate, body: e.target.value });
                    }
                  }}
                  rows={15}
                  className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 font-mono text-sm resize-none"
                  placeholder="Email body content"
                />
              </div>

              {/* Available Variables */}
              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Available Variables</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.variables.map((variable) => (
                    <code
                      key={variable}
                      className="px-2 py-1 bg-white border border-blue-300 text-blue-700 text-xs rounded cursor-pointer hover:bg-blue-100"
                      onClick={() => {
                        const textarea = document.querySelector('textarea');
                        if (textarea) {
                          const cursorPos = textarea.selectionStart;
                          const textBefore = textarea.value.substring(0, cursorPos);
                          const textAfter = textarea.value.substring(cursorPos);
                          const newValue = textBefore + `{{${variable}}}` + textAfter;

                          if (!editingTemplate) {
                            setEditingTemplate({ ...selectedTemplate, body: newValue });
                          } else {
                            setEditingTemplate({ ...editingTemplate, body: newValue });
                          }
                        }
                      }}
                    >
                      {`{{${variable}}}`}
                    </code>
                  ))}
                </div>
                <p className="text-xs text-blue-700 mt-2">Click to insert variable at cursor position</p>
              </div>
            </div>
          )}

          {/* Preview Mode */}
          {showPreview && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="border-2 border-neutral-200 rounded-xl overflow-hidden">
                {/* Email Header */}
                <div className="bg-neutral-50 border-b-2 border-neutral-200 px-6 py-4">
                  <div className="text-sm mb-2">
                    <span className="text-neutral-600">From:</span>{' '}
                    <span className="font-semibold">noreply@glimmorahotel.com</span>
                  </div>
                  <div className="text-sm mb-2">
                    <span className="text-neutral-600">To:</span>{' '}
                    <span className="font-semibold">john.smith@example.com</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-neutral-600">Subject:</span>{' '}
                    <span className="font-semibold">
                      {selectedTemplate.subject.replace(/{{(\w+)}}/g, (_, key) => mockPreviewData[key as keyof typeof mockPreviewData] || `{{${key}}}`)}
                    </span>
                  </div>
                </div>

                {/* Email Body */}
                <div className="p-6">
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-neutral-700">
                      {renderPreview(selectedTemplate)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
