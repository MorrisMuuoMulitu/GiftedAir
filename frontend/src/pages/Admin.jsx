import { useEffect, useState } from 'react';
import { API_URL } from '../config';

export default function Admin() {
  const [stats, setStats] = useState(null);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Simple password protection (use proper auth in production!)
  const ADMIN_PASSWORD = 'giftedair2025'; // Change this!

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchData = async () => {
      try {
        console.log('Fetching admin data from:', `${API_URL}/api/gifts`);
        
        const giftsRes = await fetch(`${API_URL}/api/gifts`);
        console.log('Response status:', giftsRes.status);
        
        if (!giftsRes.ok) {
          throw new Error(`Failed to fetch: ${giftsRes.status}`);
        }

        const giftsData = await giftsRes.json();
        console.log('Fetched gifts data:', giftsData);
        console.log('Is array?', Array.isArray(giftsData));
        console.log('Length:', giftsData?.length);

        // Ensure giftsData is an array
        const giftsArray = Array.isArray(giftsData) ? giftsData : [];
        setGifts(giftsArray);
        console.log('Set gifts state to:', giftsArray.length, 'gifts');
        
        // Try to fetch stats too
        try {
          const statsRes = await fetch(`${API_URL}/api/gifts/stats/summary`);
          if (statsRes.ok) {
            const statsData = await statsRes.json();
            setStats(statsData);
            console.log('Stats loaded:', statsData);
          }
        } catch (err) {
          console.log('Stats not available:', err);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        alert(`❌ Failed to load gifts: ${error.message}`);
        setGifts([]); // Set empty array on error
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  // Export to CSV
  const exportToCSV = () => {
    try {
      setExporting(true);
      
      console.log('Exporting gifts:', gifts);

      if (!gifts || gifts.length === 0) {
        alert('⚠️ No gifts to export yet!');
        setExporting(false);
        return;
      }

      const headers = ['Date', 'From', 'To', 'Type', 'Quantity', 'Amount', 'Message'];
      const rows = gifts.map(gift => [
        gift.createdAt ? new Date(gift.createdAt).toLocaleDateString() : 'N/A',
        gift.senderName || gift.from || 'Anonymous',
        gift.recipientName || gift.to || 'Not specified',
        gift.type || 'Unknown',
        gift.quantity || 1,
        `$${gift.totalCost || gift.amount || 0}`,
        gift.message ? gift.message.substring(0, 100) : 'No message'
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gifted-air-gifts-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert(`✅ Exported ${gifts.length} gifts to CSV!`);
      setExporting(false);
    } catch (error) {
      console.error('Export failed:', error);
      alert(`❌ Export failed: ${error.message}`);
      setExporting(false);
    }
  };

  const exportReport = () => {
    try {
      setExporting(true);
      
      console.log('Creating report from gifts:', gifts);

      if (!gifts || gifts.length === 0) {
        alert('⚠️ No gifts to report yet!');
        setExporting(false);
        return;
      }

      // Calculate totals from gifts
      const totalGifts = gifts.length;
      const totalRevenue = gifts.reduce((sum, g) => sum + (g.totalCost || g.amount || 0), 0);
      const giftsByType = gifts.reduce((acc, g) => {
        const type = g.type || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});

      const typeBreakdown = Object.entries(giftsByType)
        .map(([type, count]) => `  ${type}: ${count} gifts`)
        .join('\n') || '  No data';

      const recentGifts = gifts.slice(0, 10)
        .map((gift, i) => {
          const date = gift.createdAt ? new Date(gift.createdAt).toLocaleDateString() : 'N/A';
          const type = gift.type || 'Unknown';
          const amount = gift.totalCost || gift.amount || 0;
          const from = gift.senderName || gift.from || 'Anonymous';
          return `  ${i + 1}. ${date} - ${type} ($${amount}) - From: ${from}`;
        })
        .join('\n') || '  No gifts yet';

      const summary = `
==========================================
     GIFTED AIR ADMIN REPORT
==========================================

Generated: ${new Date().toLocaleString()}

OVERVIEW:
---------
Total Gifts Sent: ${totalGifts}
Total Revenue: $${totalRevenue.toFixed(2)}

GIFT TYPE BREAKDOWN:
-------------------
${typeBreakdown}

RECENT GIFTS (Last 10):
-----------------------
${recentGifts}

==========================================
Report End
==========================================
`.trim();

      const blob = new Blob([summary], { type: 'text/plain;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `gifted-air-report-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert(`✅ Report generated with ${totalGifts} gifts!`);
      setExporting(false);
    } catch (error) {
      console.error('Export failed:', error);
      alert(`❌ Export failed: ${error.message}`);
      setExporting(false);
    }
  };

  const copyStats = async () => {
    try {
      console.log('Copying stats from gifts:', gifts);

      if (!gifts || gifts.length === 0) {
        alert('⚠️ No data to copy yet!');
        return;
      }

      // Calculate from gifts
      const totalGifts = gifts.length;
      const totalRevenue = gifts.reduce((sum, g) => sum + (g.totalCost || g.amount || 0), 0);
      const giftsByType = gifts.reduce((acc, g) => {
        const type = g.type || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {});
      
      const topType = Object.entries(giftsByType).sort((a, b) => b[1] - a[1])[0];
      
      const text = `📊 Gifted Air Stats (${new Date().toLocaleDateString()})

Total Gifts: ${totalGifts}
Total Revenue: $${totalRevenue.toFixed(2)}
Most Popular: ${topType ? `${topType[0]} (${topType[1]} gifts)` : 'N/A'}

Generated from Admin Dashboard`;
      
      await navigator.clipboard.writeText(text);
      alert('✅ Stats copied to clipboard!');
    } catch (error) {
      console.error('Copy failed:', error);
      alert(`❌ Copy failed: ${error.message}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            🔒 Admin Access
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-forest focus:outline-none"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-forest text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading admin dashboard...</div>
      </div>
    );
  }

  // Calculate what we owe to partners
  const giftsByType = Array.isArray(gifts) ? gifts.reduce((acc, gift) => {
    if (!acc[gift.type]) {
      acc[gift.type] = { count: 0, quantity: 0, revenue: 0 };
    }
    acc[gift.type].count += 1;
    acc[gift.type].quantity += gift.quantity;
    acc[gift.type].revenue += gift.totalCost;
    return acc;
  }, {}) : {};

  const giftTypeInfo = {
    tree: { name: 'Trees', icon: '🌳', partnerCut: 0.50, partner: 'One Tree Planted' },
    ocean: { name: 'Ocean Cleanup', icon: '🌊', partnerCut: 0.50, partner: 'The Ocean Cleanup' },
    water: { name: 'Clean Water', icon: '💧', partnerCut: 0.50, partner: 'Charity: Water' },
    cookstove: { name: 'Cookstoves', icon: '🏡', partnerCut: 0.50, partner: 'Carbon offset partners' },
    solar: { name: 'Solar Panels', icon: '☀️', partnerCut: 0.50, partner: 'Solar Aid' },
    coral: { name: 'Coral Reefs', icon: '🪸', partnerCut: 0.50, partner: 'Coral Restoration Foundation' },
    wildlife: { name: 'Wildlife', icon: '🦁', partnerCut: 0.50, partner: 'World Wildlife Fund' },
    rainforest: { name: 'Rainforest', icon: '🌴', partnerCut: 0.50, partner: 'Rainforest Trust' }
  };

  let totalRevenue = 0;
  let totalOwed = 0;
  let totalStripeFees = 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-forest to-green-700 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">🔧 Admin Dashboard</h1>
              <p className="text-green-100 text-lg">Impact Tracking & Financial Overview</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={exportToCSV}
                disabled={exporting || gifts.length === 0}
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Export all gifts to CSV"
              >
                📊 CSV
              </button>
              <button
                onClick={exportReport}
                disabled={exporting || !stats}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Export summary report"
              >
                📄 Report
              </button>
              <button
                onClick={copyStats}
                disabled={!stats}
                className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                title="Copy stats"
              >
                📋 Copy
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('admin_auth');
                  setIsAuthenticated(false);
                }}
                className="px-4 py-2 bg-white text-forest font-semibold rounded-lg hover:bg-green-50 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-2">🎁</div>
            <div className="text-2xl font-bold text-forest">{stats.totalGifts}</div>
            <div className="text-gray-600">Total Gifts</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold text-green-600">
              ${stats.totalValue?.toFixed(2) || 0}
            </div>
            <div className="text-gray-600">Total Revenue</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-blue-600">
              {Array.isArray(gifts) ? new Set(gifts.map(g => g.senderName)).size : 0}
            </div>
            <div className="text-gray-600">Unique Senders</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-purple-600">
              ${(stats.totalValue * 0.50).toFixed(2)}
            </div>
            <div className="text-gray-600">Owed to Partners</div>
          </div>
        </div>

        {/* Impact Owed by Gift Type */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-forest mb-6">💚 Impact Owed to Partners</h2>
          <div className="space-y-4">
            {Object.entries(giftsByType).map(([type, data]) => {
              const info = giftTypeInfo[type];
              const revenue = data.revenue;
              const stripeFee = (revenue * 0.029) + (data.count * 0.30);
              const owedToPartner = revenue * info.partnerCut;
              const platformCut = revenue - stripeFee - owedToPartner;

              totalRevenue += revenue;
              totalOwed += owedToPartner;
              totalStripeFees += stripeFee;

              return (
                <div key={type} className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-400 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="text-5xl">{info.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-forest mb-1">{info.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">Partner: {info.partner}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Gifts Sent</div>
                            <div className="font-bold text-lg">{data.count}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Total Quantity</div>
                            <div className="font-bold text-lg">{data.quantity}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Revenue</div>
                            <div className="font-bold text-lg text-green-600">${revenue.toFixed(2)}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Owed to Partner</div>
                            <div className="font-bold text-lg text-blue-600">${owedToPartner.toFixed(2)}</div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                            <div>
                              <span className="font-semibold">Stripe Fees:</span> ${stripeFee.toFixed(2)}
                            </div>
                            <div>
                              <span className="font-semibold">To Partner:</span> ${owedToPartner.toFixed(2)}
                            </div>
                            <div>
                              <span className="font-semibold">Platform:</span> ${platformCut.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Total Summary */}
          <div className="mt-8 pt-8 border-t-4 border-green-200">
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-green-50 p-6 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                <div className="text-3xl font-bold text-green-600">${totalRevenue.toFixed(2)}</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Stripe Fees (33%)</div>
                <div className="text-3xl font-bold text-blue-600">${totalStripeFees.toFixed(2)}</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Owed to Partners (50%)</div>
                <div className="text-3xl font-bold text-purple-600">${totalOwed.toFixed(2)}</div>
              </div>
              <div className="bg-amber-50 p-6 rounded-xl">
                <div className="text-sm text-gray-600 mb-1">Platform Cut (17%)</div>
                <div className="text-3xl font-bold text-amber-600">
                  ${(totalRevenue - totalStripeFees - totalOwed).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8 border-2 border-amber-200">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">⚡ Monthly Action Items</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💸</div>
              <div>
                <div className="font-bold text-gray-800">Make Partner Donations</div>
                <div className="text-gray-600">Total to donate this month: <span className="font-bold text-green-600">${totalOwed.toFixed(2)}</span></div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">📧</div>
              <div>
                <div className="font-bold text-gray-800">Email Partner Organizations</div>
                <div className="text-gray-600">Notify partners of donation amounts and gift counts</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">📊</div>
              <div>
                <div className="font-bold text-gray-800">Update Public Report</div>
                <div className="text-gray-600">Publish monthly impact report with donation receipts</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="text-2xl">🧾</div>
              <div>
                <div className="font-bold text-gray-800">Save Receipts</div>
                <div className="text-gray-600">Keep all donation receipts for transparency and taxes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Gifts */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-forest mb-6">📋 Recent Gifts</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">From</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">To</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Array.isArray(gifts) && gifts.slice(0, 20).map((gift) => (
                  <tr key={gift._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {new Date(gift.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="font-semibold">{giftTypeInfo[gift.type]?.icon} {giftTypeInfo[gift.type]?.name}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{gift.senderName}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{gift.recipientName}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-green-600">${gift.totalCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
