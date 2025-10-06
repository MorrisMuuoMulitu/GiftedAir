import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Compose from './pages/Compose';
import GiftView from './pages/GiftView';
import Gallery from './pages/Gallery';
import Leaderboard from './pages/Leaderboard';
import Impact from './pages/Impact';
import PaymentSuccess from './pages/PaymentSuccess';
import Transparency from './pages/Transparency';
import Admin from './pages/Admin';
import Certificate from './pages/Certificate';
import BulkGift from './pages/BulkGift';
import BulkSuccess from './pages/BulkSuccess';

function App() {
  return (
    <Router>
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
        <Route path="/certificate/:giftId" element={<Certificate />} />
        <Route path="/gift/:giftId" element={<GiftView />} />
      </Routes>
    </Router>
  );
}

export default App;
