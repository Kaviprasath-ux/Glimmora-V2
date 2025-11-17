import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Search, Filter, Mail, Phone, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

export function StaffTab() {
  const { staff, updateStaffStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || member.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-700',
      'on-leave': 'bg-yellow-100 text-yellow-700',
      inactive: 'bg-red-100 text-red-700',
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Staff</h1>
          <p className="text-neutral-600">Manage hotel staff and personnel</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name, role, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-neutral-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400 focus:bg-white transition-all"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-neutral-600">
                  {member.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-neutral-900 truncate mb-1">
                  {member.name}
                </h3>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                    member.status
                  )}`}
                >
                  {member.status}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="w-4 h-4 text-neutral-400" />
                <div>
                  <p className="font-semibold text-neutral-900">{member.role}</p>
                  <p className="text-xs text-neutral-500 capitalize">{member.shift} shift</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Mail className="w-4 h-4 text-neutral-400" />
                <span className="truncate">{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Phone className="w-4 h-4 text-neutral-400" />
                <span>{member.phone}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200">
              <p className="text-xs text-neutral-500 mb-1">Hired</p>
              <p className="text-sm font-semibold text-neutral-900">
                {new Date(member.hireDate).toLocaleDateString()}
              </p>
            </div>

            <select
              value={member.status}
              onChange={(e) =>
                updateStaffStatus(member.id, e.target.value as typeof member.status)
              }
              className="w-full mt-4 text-sm px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary-400"
            >
              <option value="active">Active</option>
              <option value="on-leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </motion.div>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-neutral-500">No staff members found</p>
        </div>
      )}
    </div>
  );
}
