import { motion } from 'framer-motion';
import { useState } from 'react';
import { useWebsiteContent } from '@/contexts/WebsiteContentContext';
import { Save, FileText, Shield, Scale, Lock } from 'lucide-react';
import { format } from 'date-fns';

export function PoliciesEditorTab() {
  const { policies, updatePolicy } = useWebsiteContent();
  const [editingPolicy, setEditingPolicy] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (policy: any) => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    updatePolicy(policy.id, {
      title: policy.title,
      content: policy.content,
    });
    setIsSaving(false);
    setEditingPolicy(null);
  };

  const getPolicyIcon = (type: string) => {
    switch (type) {
      case 'cancellation': return FileText;
      case 'house-rules': return Shield;
      case 'terms': return Scale;
      case 'privacy': return Lock;
      default: return FileText;
    }
  };

  const getPolicyColor = (type: string) => {
    switch (type) {
      case 'cancellation': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'house-rules': return 'bg-green-100 text-green-700 border-green-200';
      case 'terms': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'privacy': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Policies Editor</h1>
        <p className="text-neutral-600">Manage hotel policies and legal documents</p>
      </div>

      {/* Info Banner */}
      <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-1">Important Legal Notice</h3>
            <p className="text-sm text-yellow-800">
              These policies are displayed on your website. Please ensure all information is accurate and complies with local laws.
              Consider consulting with legal counsel before making changes.
            </p>
          </div>
        </div>
      </div>

      {/* Policies List */}
      <div className="space-y-6">
        {policies.map((policy, index) => {
          const Icon = getPolicyIcon(policy.type);
          const isEditing = editingPolicy?.id === policy.id;

          return (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getPolicyColor(policy.type)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingPolicy.title}
                        onChange={(e) => setEditingPolicy({ ...editingPolicy, title: e.target.value })}
                        className="text-xl font-bold text-neutral-900 border-2 border-primary-500 rounded-lg px-3 py-2"
                      />
                    ) : (
                      <h3 className="text-xl font-bold text-neutral-900">{policy.title}</h3>
                    )}
                    <p className="text-sm text-neutral-600 mt-1">
                      Last updated: {format(new Date(policy.lastUpdated), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (isEditing) {
                      handleSave(editingPolicy);
                    } else {
                      setEditingPolicy(policy);
                    }
                  }}
                  disabled={isSaving}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    isEditing
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-primary-600 hover:bg-primary-700 text-white'
                  }`}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : isEditing ? (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  ) : (
                    'Edit Policy'
                  )}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <textarea
                    value={editingPolicy.content}
                    onChange={(e) => setEditingPolicy({ ...editingPolicy, content: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-3 border-2 border-primary-500 rounded-xl focus:outline-none resize-none font-mono text-sm"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingPolicy(null)}
                      className="px-6 py-3 border-2 border-neutral-300 hover:border-neutral-400 text-neutral-900 font-semibold rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <p className="text-neutral-700 whitespace-pre-wrap">{policy.content}</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Add New Policy */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border-2 border-dashed border-neutral-300 hover:border-primary-500 transition-all cursor-pointer">
        <div className="text-center">
          <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-neutral-900 mb-2">Add New Policy</h3>
          <p className="text-neutral-600">Create additional policies or legal documents</p>
        </div>
      </div>
    </div>
  );
}
