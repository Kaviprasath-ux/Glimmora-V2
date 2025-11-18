import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminProvider } from '@/contexts/AdminContext';
import { AdminLayout } from './AdminLayout';
import { OverviewTab } from './tabs/OverviewTab';
import { BookingsTab } from './tabs/BookingsTab';
import { RoomsTab } from './tabs/RoomsTab';
import { GuestsTab } from './tabs/GuestsTab';
import { StaffTab } from './tabs/StaffTab';
import { AnalyticsTab } from './tabs/AnalyticsTab';
import { AmenitiesManagementTab } from './tabs/AmenitiesManagementTab';
import { ContentManagerTab } from './tabs/ContentManagerTab';
import { MediaManagerTab } from './tabs/MediaManagerTab';
import { PoliciesEditorTab } from './tabs/PoliciesEditorTab';
import { SettingsTab } from './tabs/SettingsTab';

export function AdminDashboard() {
  return (
    <AdminProvider>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<OverviewTab />} />
          <Route path="bookings" element={<BookingsTab />} />
          <Route path="rooms" element={<RoomsTab />} />
          <Route path="guests" element={<GuestsTab />} />
          <Route path="staff" element={<StaffTab />} />
          <Route path="analytics" element={<AnalyticsTab />} />
          <Route path="amenities" element={<AmenitiesManagementTab />} />
          <Route path="content" element={<ContentManagerTab />} />
          <Route path="media" element={<MediaManagerTab />} />
          <Route path="policies" element={<PoliciesEditorTab />} />
          <Route path="settings" element={<SettingsTab />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>
      </Routes>
    </AdminProvider>
  );
}
