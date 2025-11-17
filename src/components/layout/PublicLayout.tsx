import { Outlet } from 'react-router-dom';
import { Navigation } from '../navigation/Navigation';
import { Footer } from './Footer';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
