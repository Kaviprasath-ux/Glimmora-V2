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
    <div className="max-w-4xl space-y-6">
      {/* Saved Payment Methods */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-neutral-200 rounded-xl p-6 bg-white"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">Saved Cards</h3>
          <button
            onClick={handleAddCard}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            Add Card
          </button>
        </div>

        <div className="space-y-3">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.1 }}
              className="relative p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
            >
              {method.isDefault && (
                <span className="absolute top-4 right-4 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">
                  DEFAULT
                </span>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center text-xl">
                    {cardIcons[method.type]}
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900 capitalize text-sm">
                      {method.type} •••• {method.last4}
                    </div>
                    <div className="text-xs text-neutral-500">
                      Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleRemoveCard}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  disabled={method.isDefault}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {!method.isDefault && (
                <button className="mt-3 text-xs text-primary-600 hover:text-primary-700 font-medium">
                  Set as default
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-900">
            <strong>🔒 Secure:</strong> All payment information is encrypted and stored securely. We never store your full card number.
          </p>
        </div>
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="border border-neutral-200 rounded-xl p-6 bg-white"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Billing History</h3>

        <div className="space-y-3">
          {billingHistory.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.2 }}
              className="p-4 border border-neutral-200 rounded-lg hover:border-neutral-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-3 pb-3 border-b border-neutral-100">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-neutral-900 text-sm">{transaction.description}</h4>
                    <span className={`px-2 py-0.5 ${statusColors[transaction.status]} text-xs font-medium rounded capitalize`}>
                      {transaction.status}
                    </span>
                  </div>
                  <div className="text-xs text-neutral-500">
                    {format(transaction.date, 'MMM dd, yyyy')}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-neutral-900">
                    ${transaction.amount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors text-xs">
                  <Download className="w-3.5 h-3.5" />
                  Download Invoice
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-300 hover:border-neutral-400 text-neutral-900 font-medium rounded-lg transition-colors text-xs">
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
        transition={{ delay: 0.25 }}
        className="border border-neutral-200 rounded-xl p-6 bg-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-neutral-500 mb-1">Total Spent (All Time)</div>
            <div className="text-3xl font-bold text-neutral-900">
              ${billingHistory.reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
            </div>
          </div>
          <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center">
            <Receipt className="w-6 h-6 text-neutral-600" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
