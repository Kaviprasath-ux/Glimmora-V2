import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAdvancedSettings } from '@/contexts/AdvancedSettingsContext';
import { Plus, Edit, Trash2, Tag, TrendingUp, Gift, Eye, EyeOff } from 'lucide-react';
import { format } from 'date-fns';

export function PricingRulesTab() {
  const { pricingRules, addPricingRule, updatePricingRule, deletePricingRule } = useAdvancedSettings();
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const types = ['all', 'seasonal', 'discount', 'offer'];

  const filteredRules = pricingRules.filter(rule =>
    typeFilter === 'all' || rule.type === typeFilter
  );

  const handleDelete = (id: string) => {
    if (confirm('Delete this pricing rule?')) {
      deletePricingRule(id);
    }
  };

  const toggleActive = (id: string, currentStatus: boolean) => {
    updatePricingRule(id, { isActive: !currentStatus });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'seasonal': return TrendingUp;
      case 'discount': return Tag;
      case 'offer': return Gift;
      default: return Tag;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'seasonal': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'discount': return 'bg-green-100 text-green-700 border-green-200';
      case 'offer': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Pricing Rules</h1>
          <p className="text-neutral-600">Manage discounts, promotions, and seasonal pricing ({filteredRules.length} rules)</p>
        </div>
        <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Pricing Rule
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex gap-2">
          {types.map(type => (
            <button
              key={type}
              onClick={() => setTypeFilter(type)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                typeFilter === type
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRules.map((rule, index) => {
          const Icon = getTypeIcon(rule.type);

          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
                !rule.isActive ? 'opacity-60' : ''
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getTypeColor(rule.type)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-900">{rule.name}</h3>
                    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full border capitalize ${getTypeColor(rule.type)}`}>
                      {rule.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 mb-4">{rule.description}</p>

              {/* Discount Value */}
              <div className="mb-4 p-4 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {rule.discountType === 'percentage' ? `${rule.discountValue}%` : `$${rule.discountValue}`}
                  </div>
                  <div className="text-xs text-neutral-600">
                    {rule.discountType === 'percentage' ? 'Percentage Off' : 'Fixed Discount'}
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4 text-sm">
                {rule.startDate && rule.endDate && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Period:</span>
                    <span className="font-semibold text-neutral-900">
                      {format(new Date(rule.startDate), 'MMM dd')} - {format(new Date(rule.endDate), 'MMM dd, yyyy')}
                    </span>
                  </div>
                )}
                {rule.code && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Code:</span>
                    <code className="px-2 py-1 bg-neutral-100 text-neutral-900 rounded font-semibold">
                      {rule.code}
                    </code>
                  </div>
                )}
                {rule.minNights && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Min Nights:</span>
                    <span className="font-semibold text-neutral-900">{rule.minNights}</span>
                  </div>
                )}
                {rule.maxUses && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Usage:</span>
                    <span className="font-semibold text-neutral-900">
                      {rule.currentUses} / {rule.maxUses}
                    </span>
                  </div>
                )}
              </div>

              {/* Usage Bar */}
              {rule.maxUses && (
                <div className="mb-4">
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(rule.currentUses / rule.maxUses) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => toggleActive(rule.id, rule.isActive)}
                  className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-all ${
                    rule.isActive
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {rule.isActive ? (
                    <span className="flex items-center justify-center gap-1">
                      <Eye className="w-4 h-4" />
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <EyeOff className="w-4 h-4" />
                      Inactive
                    </span>
                  )}
                </button>
                <button className="p-2 hover:bg-yellow-50 text-yellow-600 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(rule.id)}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-neutral-900 mb-4">Pricing Rules Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900">{pricingRules.length}</div>
            <div className="text-sm text-neutral-600">Total Rules</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {pricingRules.filter(r => r.isActive).length}
            </div>
            <div className="text-sm text-neutral-600">Active</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {pricingRules.reduce((sum, r) => sum + r.currentUses, 0)}
            </div>
            <div className="text-sm text-neutral-600">Total Uses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              ${pricingRules.filter(r => r.discountType === 'fixed').reduce((sum, r) => sum + r.discountValue, 0)}
            </div>
            <div className="text-sm text-neutral-600">Fixed Discounts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
