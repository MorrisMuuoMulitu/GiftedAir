import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { API_URL } from '../config';

export default function Referral() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [referralCode, setReferralCode] = useState(null);
  const [stats, setStats] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${API_URL}/api/referrals/leaderboard`);
      const data = await res.json();
      if (data.success) {
        setLeaderboard(data.leaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleGenerateCode = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/referrals/create-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userEmail,
          userName: userName
        })
      });

      const data = await res.json();
      if (data.success) {
        setReferralCode(data.code);
        
        // Fetch stats
        const statsRes = await fetch(`${API_URL}/api/referrals/stats/${userEmail}`);
        const statsData = await statsRes.json();
        if (statsData.success) {
          setStats(statsData.stats);
        }
      }
    } catch (error) {
      console.error('Error generating code:', error);
      alert('Failed to generate code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyReferralLink = () => {
    const link = `https://giftedair.com?ref=${referralCode.code}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(referralCode.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">🎁💰</div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 mb-4">
              Referral Program
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Share climate love, earn rewards! Get $1 credit for every friend who sends a gift using your code.
            </p>
          </div>

          {!referralCode ? (
            /* Generate Code Form */
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Get Your Referral Code
              </h2>
              
              <form onSubmit={handleGenerateCode} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:border-purple-500 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 shadow-lg"
                >
                  {loading ? 'Generating...' : 'Generate My Code 🚀'}
                </button>
              </form>

              <div className="mt-6 bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
                <p className="text-sm text-purple-900 dark:text-purple-200 text-center">
                  💡 Your friends get <strong>10% off</strong> their first gift!<br/>
                  You get <strong>$1 credit</strong> for each referral!
                </p>
              </div>
            </div>
          ) : (
            /* Show Code & Stats */
            <div className="grid md:grid-cols-2 gap-8">
              {/* Your Code */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Your Referral Code
                </h2>

                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center mb-6">
                  <div className="text-5xl font-black text-white tracking-wider">
                    {referralCode.code}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={copyCode}
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy Code'}
                  </button>

                  <button
                    onClick={copyReferralLink}
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-all"
                  >
                    🔗 Copy Referral Link
                  </button>
                </div>

                <div className="mt-6 bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4">
                  <p className="text-sm text-purple-900 dark:text-purple-200">
                    <strong>Share with friends:</strong><br/>
                    Send them your code or link. When they use it, you both win!
                  </p>
                </div>
              </div>

              {/* Stats */}
              {stats && (
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Your Stats
                  </h2>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-6 text-white text-center">
                      <div className="text-4xl font-black mb-2">
                        {stats.totalReferrals}
                      </div>
                      <div className="text-sm font-bold opacity-90">
                        Total Referrals
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white text-center">
                      <div className="text-4xl font-black mb-2">
                        ${stats.totalRewards}
                      </div>
                      <div className="text-sm font-bold opacity-90">
                        Credits Earned
                      </div>
                    </div>
                  </div>

                  {stats.recentReferrals && stats.recentReferrals.length > 0 && (
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                        Recent Referrals
                      </h3>
                      <div className="space-y-2">
                        {stats.recentReferrals.map((ref, i) => (
                          <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white text-sm">
                                {ref.refereeName || ref.refereeEmail}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {new Date(ref.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="text-green-600 dark:text-green-400 font-bold">
                              +${ref.referrerRewardGiven}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Leaderboard */}
          {leaderboard.length > 0 && (
            <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
                🏆 Top Referrers
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaderboard.map((user, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-4 ${
                      i === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                      i === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' :
                      i === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white' :
                      'bg-gray-100 dark:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-black">
                          {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                        </div>
                        <div className={`font-bold ${i > 2 ? 'text-gray-900 dark:text-white' : ''}`}>
                          {user.userName}
                        </div>
                        <div className={`text-sm ${i > 2 ? 'text-gray-600 dark:text-gray-400' : 'opacity-90'}`}>
                          {user.code}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-black ${i > 2 ? 'text-purple-600 dark:text-purple-400' : ''}`}>
                          {user.timesUsed}
                        </div>
                        <div className={`text-xs ${i > 2 ? 'text-gray-600 dark:text-gray-400' : 'opacity-90'}`}>
                          referrals
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/compose')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎁 Send Your First Gift
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
