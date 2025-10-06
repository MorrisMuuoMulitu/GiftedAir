import { useEffect, useState } from 'react';
import { API_URL } from '../config';

export default function AdminV2() {
  const [stats, setStats] = useState(null);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [selectedGifts, setSelectedGifts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview'); // overview, gifts, analytics
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const ADMIN_PASSWORD = 'giftedair2025';

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
    if (localStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const fetchData = async () => {
    try {
      const giftsRes = await fetch(`${API_URL}/api/gifts`);
      const giftsData = await giftsRes.json();
      const giftsArray = giftsData.gifts || [];
      setGifts(giftsArray);

      try {
        const statsRes = await fetch(`${API_URL}/api/gifts/stats/summary`);
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
      } catch (err) {
        console.log('Stats not available:', err);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      setGifts([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
  }, [isAuthenticated]);

  // Delete gift
  const deleteGift = async (id) => {
    if (!confirm('Are you sure you want to delete this gift? This cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/gifts/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('✅ Gift deleted successfully!');
        fetchData(); // Refresh
      } else {
        alert('❌ Failed to delete gift');
      }
    } catch (error) {
      console.error('Error deleting gift:', error);
      alert('❌ Error deleting gift');
    }
  };

  // Toggle gallery visibility
  const toggleGallery = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/gifts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showInGallery: !currentStatus })
      });

      if (res.ok) {
        alert(`✅ Gift ${!currentStatus ? 'pinned to' : 'unpinned from'} gallery!`);
        fetchData(); // Refresh
      } else {
        alert('❌ Failed to update gift');
      }
    } catch (error) {
      console.error('Error updating gift:', error);
      alert('❌ Error updating gift');
    }
  };

  // Bulk delete
  const bulkDelete = async () => {
    if (selectedGifts.length === 0) {
      alert('⚠️ No gifts selected');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedGifts.length} gifts? This cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/gifts/bulk/delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedGifts })
      });

      const data = await res.json();
      if (data.success) {
        alert(`✅ Deleted ${data.deletedCount} gifts!`);
        setSelectedGifts([]);
        fetchData();
      } else {
        alert('❌ Failed to delete gifts');
      }
    } catch (error) {
      console.error('Error bulk deleting:', error);
      alert('❌ Error deleting gifts');
    }
  };

  // Bulk toggle gallery
  const bulkToggleGallery = async (show) => {
    if (selectedGifts.length === 0) {
      alert('⚠️ No gifts selected');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/gifts/bulk/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ids: selectedGifts,
          updates: { showInGallery: show }
        })
      });

      const data = await res.json();
      if (data.success) {
        alert(`✅ ${show ? 'Pinned' : 'Unpinned'} ${data.modifiedCount} gifts!`);
        setSelectedGifts([]);
        fetchData();
      } else {
        alert('❌ Failed to update gifts');
      }
    } catch (error) {
      console.error('Error bulk updating:', error);
      alert('❌ Error updating gifts');
    }
  };

  // Export functions
  const exportToCSV = () => {
    try {
      setExporting(true);
      if (!gifts || gifts.length === 0) {
        alert('⚠️ No gifts to export yet!');
        setExporting(false);
        return;
      }

      const headers = ['Date', 'From', 'To', 'Type', 'Quantity', 'Amount', 'Status', 'Gallery', 'Message'];
      const rows = gifts.map(gift => [
        gift.createdAt ? new Date(gift.createdAt).toLocaleDateString() : 'N/A',
        gift.senderName || 'Anonymous',
        gift.recipientName || 'Not specified',
        gift.type || 'Unknown',
        gift.quantity || 1,
        `$${gift.totalCost || 0}`,
        gift.status || 'sent',
        gift.showInGallery ? 'Yes' : 'No',
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

  // Filter gifts
  const filteredGifts = gifts.filter(gift => {
    if (filterType !== 'all' && gift.type !== filterType) return false;
    if (filterStatus !== 'all') {
      if (filterStatus === 'gallery' && !gift.showInGallery) return false;
      if (filterStatus === 'hidden' && gift.showInGallery) return false;
    }
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      return (
        gift.senderName?.toLowerCase().includes(search) ||
        gift.recipientName?.toLowerCase().includes(search) ||
        gift.message?.toLowerCase().includes(search)
      );
    }
    return true;
  });

  // Calculate analytics
  const analytics = {
    totalRevenue: gifts.reduce((sum, g) => sum + (g.totalCost || 0), 0),
    byType: gifts.reduce((acc, g) => {
      acc[g.type] = (acc[g.type] || 0) + 1;
      return acc;
    }, {}),
    byMonth: gifts.reduce((acc, g) => {
      const month = new Date(g.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {}),
    galleryCount: gifts.filter(g => g.showInGallery).length,
    averageGiftValue: gifts.length > 0 ? gifts.reduce((sum, g) => sum + g.totalCost, 0) / gifts.length : 0
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

  const giftTypeInfo = {
    tree: { name: 'Trees', icon: '🌳', color: 'green' },
    ocean: { name: 'Ocean', icon: '🌊', color: 'blue' },
    water: { name: 'Water', icon: '💧', color: 'cyan' },
    cookstove: { name: 'Cookstove', icon: '🏡', color: 'orange' },
    solar: { name: 'Solar', icon: '☀️', color: 'yellow' },
    coral: { name: 'Coral', icon: '🪸', color: 'pink' },
    wildlife: { name: 'Wildlife', icon: '🦁', color: 'amber' },
    rainforest: { name: 'Rainforest', icon: '🌴', color: 'emerald' }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-forest to-green-700 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">🚀 Admin Dashboard V2</h1>
              <p className="text-green-100 text-lg">Analytics & Gift Management</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={exportToCSV}
                disabled={exporting || gifts.length === 0}
                className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50"
              >
                📊 Export CSV
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('admin_auth');
                  setIsAuthenticated(false);
                }}
                className="px-4 py-2 bg-white text-forest font-semibold rounded-lg hover:bg-green-50 transition"
              >
                🔐 Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-8 flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'overview'
                ? 'bg-forest text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('gifts')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'gifts'
                ? 'bg-forest text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🎁 Gift Management
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'analytics'
                ? 'bg-forest text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            📈 Analytics
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-3xl mb-2">🎁</div>
                <div className="text-2xl font-bold text-forest">{gifts.length}</div>
                <div className="text-gray-600">Total Gifts</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-green-600">
                  ${analytics.totalRevenue.toFixed(2)}
                </div>
                <div className="text-gray-600">Total Revenue</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-3xl mb-2">📌</div>
                <div className="text-2xl font-bold text-blue-600">{analytics.galleryCount}</div>
                <div className="text-gray-600">In Gallery</div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="text-3xl mb-2">💵</div>
                <div className="text-2xl font-bold text-purple-600">
                  ${analytics.averageGiftValue.toFixed(2)}
                </div>
                <div className="text-gray-600">Avg Gift Value</div>
              </div>
            </div>

            {/* Gift Type Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-forest mb-6">🎯 Gift Type Distribution</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analytics.byType).map(([type, count]) => {
                  const info = giftTypeInfo[type];
                  const percentage = ((count / gifts.length) * 100).toFixed(1);
                  return (
                    <div key={type} className="border-2 border-gray-200 rounded-xl p-4 hover:border-green-400 transition">
                      <div className="text-4xl mb-2 text-center">{info.icon}</div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-forest">{count}</div>
                        <div className="text-sm text-gray-600">{info.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Gift Management Tab */}
        {activeTab === 'gifts' && (
          <>
            {/* Filters & Bulk Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Search gifts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest focus:outline-none"
                />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest focus:outline-none"
                >
                  <option value="all">All Types</option>
                  {Object.keys(giftTypeInfo).map(type => (
                    <option key={type} value={type}>{giftTypeInfo[type].name}</option>
                  ))}
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-forest focus:outline-none"
                >
                  <option value="all">All Status</option>
                  <option value="gallery">In Gallery</option>
                  <option value="hidden">Hidden</option>
                </select>
                <div className="text-sm text-gray-600 flex items-center">
                  Showing {filteredGifts.length} of {gifts.length} gifts
                </div>
              </div>

              {/* Bulk Actions */}
              {selectedGifts.length > 0 && (
                <div className="flex gap-2 flex-wrap bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <span className="font-semibold text-blue-800">{selectedGifts.length} selected:</span>
                  <button
                    onClick={() => bulkToggleGallery(true)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
                  >
                    📌 Pin to Gallery
                  </button>
                  <button
                    onClick={() => bulkToggleGallery(false)}
                    className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                  >
                    📍 Unpin from Gallery
                  </button>
                  <button
                    onClick={bulkDelete}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                  >
                    🗑️ Delete Selected
                  </button>
                  <button
                    onClick={() => setSelectedGifts([])}
                    className="px-3 py-1 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition text-sm"
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </div>

            {/* Gifts Table */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-forest mb-6">📋 All Gifts</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedGifts.length === filteredGifts.length && filteredGifts.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedGifts(filteredGifts.map(g => g._id));
                            } else {
                              setSelectedGifts([]);
                            }
                          }}
                          className="w-4 h-4"
                        />
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">From</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">To</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredGifts.map((gift) => (
                      <tr key={gift._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedGifts.includes(gift._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedGifts([...selectedGifts, gift._id]);
                              } else {
                                setSelectedGifts(selectedGifts.filter(id => id !== gift._id));
                              }
                            }}
                            className="w-4 h-4"
                          />
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(gift.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className="font-semibold">
                            {giftTypeInfo[gift.type]?.icon} {giftTypeInfo[gift.type]?.name}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700">{gift.senderName}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{gift.recipientName}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-green-600">${gift.totalCost}</td>
                        <td className="px-4 py-3 text-sm">
                          {gift.showInGallery ? (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                              📌 Gallery
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                              🔒 Hidden
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleGallery(gift._id, gift.showInGallery)}
                              className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xs"
                              title={gift.showInGallery ? 'Unpin from gallery' : 'Pin to gallery'}
                            >
                              {gift.showInGallery ? '📍' : '📌'}
                            </button>
                            <button
                              onClick={() => deleteGift(gift._id)}
                              className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition text-xs"
                              title="Delete gift"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Monthly Trend */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-forest mb-6">📅 Gifts Over Time</h2>
                <div className="space-y-3">
                  {Object.entries(analytics.byMonth)
                    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
                    .slice(-12)
                    .map(([month, count]) => {
                      const maxCount = Math.max(...Object.values(analytics.byMonth));
                      const percentage = (count / maxCount) * 100;
                      return (
                        <div key={month}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-semibold">{month}</span>
                            <span className="text-gray-600">{count} gifts</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-forest mb-6">💰 Revenue by Type</h2>
                <div className="space-y-4">
                  {Object.entries(analytics.byType)
                    .sort((a, b) => b[1] - a[1])
                    .map(([type, count]) => {
                      const info = giftTypeInfo[type];
                      const giftTypeRevenue = gifts
                        .filter(g => g.type === type)
                        .reduce((sum, g) => sum + g.totalCost, 0);
                      return (
                        <div key={type} className="border-2 border-gray-200 rounded-xl p-4 hover:border-green-400 transition">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{info.icon}</span>
                              <div>
                                <div className="font-bold text-gray-800">{info.name}</div>
                                <div className="text-sm text-gray-600">{count} gifts</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                ${giftTypeRevenue.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500">
                                Avg: ${(giftTypeRevenue / count).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Additional Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-forest mb-6">📊 Additional Insights</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <div className="text-4xl mb-2">👥</div>
                  <div className="text-3xl font-bold text-forest">
                    {new Set(gifts.map(g => g.senderName)).size}
                  </div>
                  <div className="text-gray-600">Unique Senders</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <div className="text-4xl mb-2">🎯</div>
                  <div className="text-3xl font-bold text-blue-600">
                    {new Set(gifts.map(g => g.recipientName)).size}
                  </div>
                  <div className="text-gray-600">Unique Recipients</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <div className="text-4xl mb-2">🌍</div>
                  <div className="text-3xl font-bold text-purple-600">
                    {new Set(gifts.map(g => g.location).filter(Boolean)).size}
                  </div>
                  <div className="text-gray-600">Locations</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
