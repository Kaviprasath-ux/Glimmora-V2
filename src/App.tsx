import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/Home';
import { Login } from './pages/Auth/Login';
import { SignUp } from './pages/Auth/SignUp';
import { BookingReview } from './pages/Booking/BookingReview';
import { BookingPayment } from './pages/Booking/BookingPayment';
import { BookingConfirmation } from './pages/Booking/BookingConfirmation';
import { BookingFailed } from './pages/Booking/BookingFailed';
import { NotFound } from './pages/NotFound/NotFound';
import { PublicLayout } from './components/layout/PublicLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { GuestRoute } from './routes/guards/GuestRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        {/* Public routes with navbar/footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />

          {/* Booking flow routes */}
          <Route path="/booking/review" element={<BookingReview />} />
          <Route path="/booking/payment" element={<BookingPayment />} />
          <Route path="/booking/confirmation" element={<BookingConfirmation />} />
          <Route path="/booking/failed" element={<BookingFailed />} />
        </Route>

        {/* Auth routes (guest only) */}
        <Route element={<AuthLayout />}>
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
