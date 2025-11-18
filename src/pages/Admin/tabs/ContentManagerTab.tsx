import { motion } from 'framer-motion';
import { useState } from 'react';
import { useWebsiteContent } from '@/contexts/WebsiteContentContext';
import { Save, Plus, Edit, Trash2, FileText, HelpCircle } from 'lucide-react';

export function ContentManagerTab() {
  const { pageContent, faqs, updatePageContent, addFAQ, updateFAQ, deleteFAQ } = useWebsiteContent();
  const [activeSection, setActiveSection] = useState<'pages' | 'faqs'>('pages');
  const [editingContent, setEditingContent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // FAQ form state
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '', category: 'General', order: 0 });
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);

  const handleSaveContent = async () => {
    if (!editingContent) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updatePageContent(editingContent.id, {
      title: editingContent.title,
      content: editingContent.content,
    });
    setIsSaving(false);
    setIsEditing(false);
    setEditingContent(null);
  };

  const handleAddFAQ = () => {
    if (!newFAQ.question || !newFAQ.answer) return;
    addFAQ({
      question: newFAQ.question,
      answer: newFAQ.answer,
      category: newFAQ.category,
      order: faqs.length + 1,
    });
    setNewFAQ({ question: '', answer: '', category: 'General', order: 0 });
    setIsAddingFAQ(false);
  };

  const handleDeleteFAQ = (id: string) => {
    if (confirm('Delete this FAQ?')) {
      deleteFAQ(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Content Manager</h1>
        <p className="text-neutral-600">Manage website pages and FAQs</p>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveSection('pages')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeSection === 'pages'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          <FileText className="w-5 h-5 inline mr-2" />
          Page Content
        </button>
        <button
          onClick={() => setActiveSection('faqs')}
          className={`px-6 py-3 rounded-xl font-semibold transition-all ${
            activeSection === 'faqs'
              ? 'bg-primary-600 text-white'
              : 'bg-white text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          <HelpCircle className="w-5 h-5 inline mr-2" />
          FAQs ({faqs.length})
        </button>
      </div>

      {/* Page Content Section */}
      {activeSection === 'pages' && (
        <div className="space-y-6">
          {pageContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full capitalize">
                      {content.page}
                    </span>
                    <span className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs font-semibold rounded-full capitalize">
                      {content.section}
                    </span>
                  </div>
                  {isEditing && editingContent?.id === content.id ? (
                    <input
                      type="text"
                      value={editingContent.title}
                      onChange={(e) => setEditingContent({ ...editingContent, title: e.target.value })}
                      className="text-xl font-bold text-neutral-900 border-2 border-primary-500 rounded-lg px-3 py-2 w-full"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-neutral-900">{content.title}</h3>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (isEditing && editingContent?.id === content.id) {
                      handleSaveContent();
                    } else {
                      setEditingContent(content);
                      setIsEditing(true);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    isEditing && editingContent?.id === content.id
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : isEditing && editingContent?.id === content.id ? (
                    <>
                      <Save className="w-4 h-4" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4" />
                      Edit
                    </>
                  )}
                </button>
              </div>

              {isEditing && editingContent?.id === content.id ? (
                <textarea
                  value={editingContent.content}
                  onChange={(e) => setEditingContent({ ...editingContent, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-primary-500 rounded-xl focus:outline-none resize-none"
                />
              ) : (
                <p className="text-neutral-700">{content.content}</p>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* FAQs Section */}
      {activeSection === 'faqs' && (
        <div className="space-y-6">
          {/* Add FAQ Button */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {!isAddingFAQ ? (
              <button
                onClick={() => setIsAddingFAQ(true)}
                className="w-full py-4 border-2 border-dashed border-neutral-300 hover:border-primary-500 text-neutral-600 hover:text-primary-600 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add New FAQ
              </button>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-neutral-900">New FAQ</h3>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={newFAQ.category}
                    onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
                    placeholder="e.g., Check-in, Parking, Amenities"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Question</label>
                  <input
                    type="text"
                    value={newFAQ.question}
                    onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500"
                    placeholder="What is your question?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Answer</label>
                  <textarea
                    value={newFAQ.answer}
                    onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-neutral-300 rounded-xl focus:outline-none focus:border-primary-500 resize-none"
                    placeholder="Provide the answer..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsAddingFAQ(false)}
                    className="flex-1 px-6 py-3 border-2 border-neutral-300 hover:border-neutral-400 text-neutral-900 font-semibold rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddFAQ}
                    className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all"
                  >
                    Add FAQ
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* FAQs List */}
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-bold text-neutral-900 mt-2">{faq.question}</h3>
                </div>
                <button
                  onClick={() => handleDeleteFAQ(faq.id)}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-neutral-700">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
