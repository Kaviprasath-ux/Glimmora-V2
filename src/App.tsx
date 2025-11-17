import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { BookingProvider } from './contexts/BookingContext';
import { PreCheckInProvider } from './contexts/PreCheckInContext';
import { ChatWidget } from './components/chatbot/ChatWidget';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Auth/LoginPage';
import { SignupPage } from './pages/Auth/SignupPage';
import { ForgotPasswordPage } from './pages/Auth/ForgotPasswordPage';
import { RoomsPage } from './pages/Rooms/RoomsPage';
import { RoomDetailPage } from './pages/Rooms/RoomDetailPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { BookingPage } from './pages/Booking/BookingPage';
import { BookingReview } from './pages/Booking/BookingReview';
import { BookingPayment } from './pages/Booking/BookingPayment';
import { BookingConfirmation } from './pages/Booking/BookingConfirmation';
import { BookingFailed } from './pages/Booking/BookingFailed';
import { PreCheckInPage } from './pages/PreCheckIn/PreCheckInPage';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { NotFound } from './pages/NotFound/NotFound';
import { PublicLayout } from './components/layout/PublicLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <PreCheckInProvider>
            <BookingProvider>
              <Toaster position="top-right" />
              <ChatWidget />
              <Routes>
              {/* Public routes with navbar/footer */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />

                {/* Rooms routes */}
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/rooms/:slug" element={<RoomDetailPage />} />

                {/* Contact route */}
                <Route path="/contact" element={<ContactPage />} />

                {/* Booking flow routes */}
                <Route path="/booking" element={<BookingPage />} />
                <Route path="/booking/review" element={<BookingReview />} />
                <Route path="/booking/payment" element={<BookingPayment />} />
                <Route path="/booking/confirmation" element={<BookingConfirmation />} />
                <Route path="/booking/failed" element={<BookingFailed />} />
              </Route>

              {/* Protected routes */}
              <Route element={<PublicLayout />}>
                <Route
                  path="/pre-checkin"
                  element={
                    <ProtectedRoute>
                      <PreCheckInPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* Admin routes (protected, full page without public layout) */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Auth routes (full page) */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BookingProvider>
        </PreCheckInProvider>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
