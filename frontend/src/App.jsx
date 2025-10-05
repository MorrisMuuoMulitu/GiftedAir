import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Compose from './pages/Compose';
import GiftView from './pages/GiftView';
import Gallery from './pages/Gallery';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/gift/:giftId" element={<GiftView />} />
      </Routes>
    </Router>
  );
}

export default App;
