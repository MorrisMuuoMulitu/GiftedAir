import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy, useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import LoadingScreen from './components/LoadingScreen';
import ThemeToggle from './components/ThemeToggle';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Lazy load pages for better performance
const Landing = lazy(() => import('./pages/Landing'));
const Compose = lazy(() => import('./pages/Compose'));
const GiftView = lazy(() => import('./pages/GiftView'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Impact = lazy(() => import('./pages/Impact'));
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'));
const Transparency = lazy(() => import('./pages/Transparency'));
const Admin = lazy(() => import('./pages/AdminV2'));
const Certificate = lazy(() => import('./pages/Certificate'));
const BulkGift = lazy(() => import('./pages/BulkGift'));
const BulkSuccess = lazy(() => import('./pages/BulkSuccess'));
const Referral = lazy(() => import('./pages/Referral'));
const Venture = lazy(() => import('./pages/Venture'));
const About = lazy(() => import('./pages/About'));
const PartnerApplication = lazy(() => import('./pages/PartnerApplication'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppContent() {
  useKeyboardShortcuts();
  
  return (
    <>
      <ThemeToggle />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/bulk-success" element={<BulkSuccess />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/bulk" element={<BulkGift />} />
        <Route path="/referral" element={<Referral />} />
        <Route path="/venture" element={<Venture />} />
        <Route path="/about" element={<About />} />
        <Route path="/partner-application" element={<PartnerApplication />} />
        <Route path="/certificate/:giftId" element={<Certificate />} />
        <Route path="/gift/:giftId" element={<GiftView />} />
        {/* 404 catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </>
  );
}

function App() {
  const [showInitialLoader, setShowInitialLoader] = useState(true);

  useEffect(() => {
    // Show initial loading screen for first visit
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (hasVisited) {
      setShowInitialLoader(false);
    } else {
      setTimeout(() => {
        setShowInitialLoader(false);
        sessionStorage.setItem('hasVisited', 'true');
      }, 2000);
    }
  }, []);

  if (showInitialLoader) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <AppContent />
      <Analytics />
    </Router>
  );
}

export default App;
