import { motion } from 'framer-motion';
import { CreditCard, Plus, Trash2, Receipt, Download } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

interface BillingHistory {
  id: string;
  date: Date;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  invoiceUrl: string;
}

export function PaymentsTab() {
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: 6,
      expiryYear: 2026,
      isDefault: false,
    },
  ];

  const billingHistory: BillingHistory[] = [
    {
      id: '1',
      date: new Date('2025-01-10'),
      description: 'Ocean View Suite - Jan 15-18, 2025',
      amount: 1200,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '2',
      date: new Date('2024-12-20'),
      description: 'Deluxe Room - Dec 20-23, 2024',
      amount: 900,
      status: 'paid',
      invoiceUrl: '#',
    },
    {
      id: '3',
      date: new Date('2024-11-10'),
      description: 'Premium Suite - Nov 10-13, 2024',
      amount: 1500,
      status: 'paid',
      invoiceUrl: '#',
    },
  ];

  const cardIcons = {
    visa: '💳',
    mastercard: '💳',
    amex: '💳',
  };

  const statusColors = {
    paid: 'bg-green-100 text-green-700',
    pending: 'bg-yellow-100 text-yellow-700',
    failed: 'bg-red-100 text-red-700',
  };

  const handleAddCard = () => {
    toast.success('Add payment method feature coming soon!');
  };

  const handleRemoveCard = () => {
    toast.success('Payment method removed successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <h2 className="text-3xl font-bold text-neutral-900 mb-2">Payment Methods</h2>
        <p className="text-neutral-600">Manage your saved payment methods and billing history</p>
      </motion.div>

      {/* Saved Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary-600" />
            <h3 className="text-xl font-bold text-neutral-900">Saved Cards</h3>
          </div>
          <button
            onClick={handleAddCard}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Card
          </button>
        </div>

        <div className="space-y-4">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="relative p-6 border-2 border-neutral-200 rounded-xl hover:border-primary-300 transition-all"
            >
              {method.isDefault && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">
                  DEFAULT
                </span>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl">
                    {cardIcons[method.type]}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 capitalize mb-1">
                      {method.type} •••• {method.last4}
                    </div>
                    <div className="text-sm text-neutral-600">
                      Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRemoveCard}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  disabled={method.isDefault}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {!method.isDefault && (
                <button className="mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Set as default
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-blue-900">
            <strong>🔒 Secure:</strong> All payment information is encrypted and stored securely. We never store your full card number.
          </p>
        </div>
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <Receipt className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold text-neutral-900">Billing History</h3>
        </div>

        <div className="space-y-4">
          {billingHistory.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className="p-6 border-2 border-neutral-200 rounded-xl hover:border-primary-300 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-neutral-900">{transaction.description}</h4>
                    <span className={`px-3 py-1 ${statusColors[transaction.status]} text-xs font-bold rounded-full uppercase`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="text-sm text-neutral-600">
                    {format(transaction.date, 'MMM dd, yyyy')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-neutral-900">
                    ${transaction.amount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all text-sm">
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-neutral-300 hover:border-primary-500 text-neutral-900 font-semibold rounded-lg transition-all text-sm">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Total Spent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl p-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white/70 mb-2">Total Spent (All Time)</div>
            <div className="text-4xl font-bold">
              ${billingHistory.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Receipt className="w-8 h-8 text-white" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
