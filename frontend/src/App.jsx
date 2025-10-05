import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Compose from './pages/Compose';
import GiftView from './pages/GiftView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/gift/:giftId" element={<GiftView />} />
      </Routes>
    </Router>
  );
}

export default App;
