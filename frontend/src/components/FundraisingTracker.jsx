import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const FundraisingTracker = ({ className = "" }) => {
  const [fundsRaised, setFundsRaised] = useState(0);
  const [fellowCount, setFellowCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goal = 50000; // $50,000 goal

  // Fetch actual fundraising data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/api/bevisioneers/progress`);

        if (!response.ok) {
          throw new Error('Failed to fetch fundraising data');
        }

        const data = await response.json();

        if (data.success) {
          setFundsRaised(data.progress.fundsRaised || 0);
          setFellowCount(data.progress.fellowsSupported || 0);
        } else {
          throw new Error(data.error || 'Unknown error occurred');
        }
      } catch (err) {
        console.error('Error fetching fundraising data:', err);
        setError(err.message);

        // Fallback to mock data in case of error
        setFundsRaised(12345);
        setFellowCount(87);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const percentage = Math.min(100, Math.round((fundsRaised / goal) * 100));

  return (
    <div className={`bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white ${className}`}>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">🎓 BeVisioneers Fundraising</h3>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">Live</span>
        </div>
        <p className="text-blue-100">Supporting changemakers in climate innovation</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      ) : error ? (
        <div className="bg-white/10 rounded-xl p-6 text-center">
          <p className="text-sm mb-2">⚠️ Unable to load live data</p>
          <p className="text-xs opacity-75">Using mock data temporarily</p>
        </div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>${fundsRaised.toLocaleString()} raised</span>
              <span>{percentage}% of goal</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="text-right text-sm mt-1 text-blue-100">
              Goal: ${goal.toLocaleString()}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">${fundsRaised.toLocaleString()}</div>
              <div className="text-sm text-blue-100">To BeVisioneers</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">{fellowCount}</div>
              <div className="text-sm text-blue-100">Fellows Supported</div>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="bg-white/10 rounded-xl p-4 mb-6">
            <p className="text-sm text-center">
              <span className="font-semibold">Impact:</span> Each gift contributes 30%
              to fund the next generation of climate innovators.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <a
              href="/fundraising"
              className="inline-block w-full bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-all transform hover:scale-105"
            >
              Support Fellows 💰
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default FundraisingTracker;