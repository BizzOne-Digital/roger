import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import CustomCursor from '../components/animations/CustomCursor';
import ScrollTriggerRefresh from '../components/animations/ScrollTriggerRefresh';
import { LocalBusinessSchema } from '../components/ui/Shared';
import WriteReviewFloatingCTA from '../components/reviews/WriteReviewFloatingCTA';

export default function PublicLayout() {
  return (
    <div className="min-w-0 w-full overflow-x-hidden">
      <LocalBusinessSchema />
      <ScrollTriggerRefresh />
      <CustomCursor />
      <Header />
      <main className="min-w-0 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
      <WriteReviewFloatingCTA />
    </div>
  );
}
