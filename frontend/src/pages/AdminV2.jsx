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
  const [activeTab, setActiveTab] = useState('overview'); // overview, gifts, analytics, financials, partners
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [partnerApplications, setPartnerApplications] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(false);

  const ADMIN_PASSWORD = '12April@Muuo';

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

  const fetchPartnerApplications = async () => {
    setLoadingPartners(true);
    try {
      const res = await fetch(`${API_URL}/api/partner-applications`);
      const data = await res.json();
      if (data.success) {
        setPartnerApplications(data.applications || []);
      }
    } catch (error) {
      console.error('Error fetching partner applications:', error);
      setPartnerApplications([]);
    } finally {
      setLoadingPartners(false);
    }
  };

  const updateApplicationStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/api/partner-applications/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        alert(`✅ Application ${status} successfully!`);
        fetchPartnerApplications();
      } else {
        alert('❌ Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application:', error);
      alert('❌ Error updating application');
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
    fetchPartnerApplications();
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
          <button
            onClick={() => setActiveTab('financials')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'financials'
                ? 'bg-forest text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            💰 Financials
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'partners'
                ? 'bg-forest text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            🤝 Partners
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

        {/* Financials Tab */}
        {activeTab === 'financials' && (
          <>
            {/* Financial Breakdown by Gift Type */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-forest mb-6">💰 Financial Breakdown by Gift Type</h2>
              <div className="space-y-4">
                {Object.entries(giftTypeInfo).map(([type, info]) => {
                  const typeGifts = gifts.filter(g => g.type === type);
                  if (typeGifts.length === 0) return null;

                  const revenue = typeGifts.reduce((sum, g) => sum + g.totalCost, 0);
                  const count = typeGifts.length;
                  const quantity = typeGifts.reduce((sum, g) => sum + g.quantity, 0);
                  const stripeFee = (revenue * 0.029) + (count * 0.30);
                  const owedToPartner = revenue * 0.50;
                  const platformCut = revenue - stripeFee - owedToPartner;

                  const partnerNames = {
                    tree: 'One Tree Planted',
                    ocean: 'The Ocean Cleanup',
                    water: 'Charity: Water',
                    cookstove: 'Carbon offset partners',
                    solar: 'Solar Aid',
                    coral: 'Coral Restoration Foundation',
                    wildlife: 'World Wildlife Fund',
                    rainforest: 'Rainforest Trust'
                  };

                  return (
                    <div key={type} className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-400 transition">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="text-5xl">{info.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-forest mb-1">{info.name}</h3>
                            <p className="text-sm text-gray-600 mb-3">Partner: {partnerNames[type]}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                              <div>
                                <div className="text-gray-500">Gifts Sent</div>
                                <div className="font-bold text-lg">{count}</div>
                              </div>
                              <div>
                                <div className="text-gray-500">Total Quantity</div>
                                <div className="font-bold text-lg">{quantity}</div>
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

                            <div className="pt-4 border-t border-gray-200">
                              <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                                <div>
                                  <span className="font-semibold">Stripe Fees (2.9% + $0.30):</span> ${stripeFee.toFixed(2)}
                                </div>
                                <div>
                                  <span className="font-semibold">To Partner (50%):</span> ${owedToPartner.toFixed(2)}
                                </div>
                                <div>
                                  <span className="font-semibold">Platform Revenue:</span> ${platformCut.toFixed(2)}
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
                <h3 className="text-xl font-bold text-forest mb-4">📊 Total Summary</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-green-50 p-6 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                    <div className="text-3xl font-bold text-green-600">
                      ${gifts.reduce((sum, g) => sum + g.totalCost, 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Stripe Fees</div>
                    <div className="text-3xl font-bold text-blue-600">
                      ${((gifts.reduce((sum, g) => sum + g.totalCost, 0) * 0.029) + (gifts.length * 0.30)).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2.9% + $0.30 per transaction</div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Owed to Partners</div>
                    <div className="text-3xl font-bold text-purple-600">
                      ${(gifts.reduce((sum, g) => sum + g.totalCost, 0) * 0.50).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">50% of revenue</div>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-xl">
                    <div className="text-sm text-gray-600 mb-1">Platform Revenue</div>
                    <div className="text-3xl font-bold text-amber-600">
                      ${(() => {
                        const totalRevenue = gifts.reduce((sum, g) => sum + g.totalCost, 0);
                        const stripeFees = (totalRevenue * 0.029) + (gifts.length * 0.30);
                        const partnerCut = totalRevenue * 0.50;
                        return (totalRevenue - stripeFees - partnerCut).toFixed(2);
                      })()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">After fees & partner cuts</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Action Items */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-8 mb-8 border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">⚡ Monthly Action Items</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💸</div>
                  <div>
                    <div className="font-bold text-gray-800">Make Partner Donations</div>
                    <div className="text-gray-600">
                      Total to donate this month: <span className="font-bold text-green-600">
                        ${(gifts.reduce((sum, g) => sum + g.totalCost, 0) * 0.50).toFixed(2)}
                      </span>
                    </div>
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

            {/* Profit Margin Breakdown */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-forest mb-6">📈 Revenue Distribution</h2>
              <div className="space-y-4">
                {(() => {
                  const totalRevenue = gifts.reduce((sum, g) => sum + g.totalCost, 0);
                  const stripeFees = (totalRevenue * 0.029) + (gifts.length * 0.30);
                  const partnerCut = totalRevenue * 0.50;
                  const platformRevenue = totalRevenue - stripeFees - partnerCut;

                  const stripePercent = (stripeFees / totalRevenue) * 100;
                  const partnerPercent = (partnerCut / totalRevenue) * 100;
                  const platformPercent = (platformRevenue / totalRevenue) * 100;

                  return (
                    <>
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-semibold">Partners (50%)</span>
                          <span className="text-purple-600 font-bold">${partnerCut.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div
                            className="bg-purple-600 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ width: `${partnerPercent}%` }}
                          >
                            {partnerPercent.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-semibold">Platform Revenue (~{platformPercent.toFixed(1)}%)</span>
                          <span className="text-amber-600 font-bold">${platformRevenue.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div
                            className="bg-amber-600 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ width: `${platformPercent}%` }}
                          >
                            {platformPercent.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-semibold">Stripe Fees (~{stripePercent.toFixed(1)}%)</span>
                          <span className="text-blue-600 font-bold">${stripeFees.toFixed(2)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-6">
                          <div
                            className="bg-blue-600 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                            style={{ width: `${stripePercent}%` }}
                          >
                            {stripePercent.toFixed(1)}%
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6 mt-6">
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Average Gift Value:</span>
                            <span className="font-bold text-forest ml-2">
                              ${(totalRevenue / gifts.length).toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Average Platform Revenue per Gift:</span>
                            <span className="font-bold text-amber-600 ml-2">
                              ${(platformRevenue / gifts.length).toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Transactions:</span>
                            <span className="font-bold text-forest ml-2">{gifts.length}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Quantity Delivered:</span>
                            <span className="font-bold text-forest ml-2">
                              {gifts.reduce((sum, g) => sum + g.quantity, 0)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </>
        )}

        {/* Partner Applications Tab */}
        {activeTab === 'partners' && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-forest">Partner Applications</h2>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Total: {partnerApplications.length}
                  </span>
                  <button
                    onClick={fetchPartnerApplications}
                    className="px-4 py-2 bg-forest text-white rounded-lg hover:bg-green-800 transition"
                  >
                    🔄 Refresh
                  </button>
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex gap-2 mb-6">
                {['all', 'pending', 'under_review', 'approved', 'rejected'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      filterStatus === status
                        ? 'bg-forest text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {status.replace('_', ' ').toUpperCase()}
                  </button>
                ))}
              </div>

              {loadingPartners ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">⏳</div>
                  <p className="text-gray-600">Loading applications...</p>
                </div>
              ) : partnerApplications.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-gray-600 text-lg">No partner applications yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {partnerApplications
                    .filter(app => filterStatus === 'all' || app.status === filterStatus)
                    .map(app => (
                    <div 
                      key={app._id} 
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-forest">{app.organizationName}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              app.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                              app.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {app.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-semibold">Contact:</span> {app.contactPerson} • {app.email}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-semibold">Type:</span> {app.organizationType} • {app.location}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-semibold">Focus Area:</span> {app.focusArea}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Submitted:</span> {new Date(app.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          {app.status !== 'approved' && (
                            <button
                              onClick={() => updateApplicationStatus(app._id, 'approved')}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                            >
                              ✅ Approve
                            </button>
                          )}
                          {app.status !== 'under_review' && (
                            <button
                              onClick={() => updateApplicationStatus(app._id, 'under_review')}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                            >
                              👀 Review
                            </button>
                          )}
                          {app.status !== 'rejected' && (
                            <button
                              onClick={() => updateApplicationStatus(app._id, 'rejected')}
                              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
                            >
                              ❌ Reject
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Expandable Details */}
                      <details className="mt-4">
                        <summary className="cursor-pointer text-sm font-semibold text-forest hover:text-green-800">
                          View Full Details
                        </summary>
                        <div className="mt-4 grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                          <div>
                            <p className="text-sm mb-2"><span className="font-semibold">Phone:</span> {app.phone}</p>
                            {app.website && <p className="text-sm mb-2"><span className="font-semibold">Website:</span> <a href={app.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{app.website}</a></p>}
                            {app.registrationNumber && <p className="text-sm mb-2"><span className="font-semibold">Reg Number:</span> {app.registrationNumber}</p>}
                            {app.yearsOfOperation && <p className="text-sm mb-2"><span className="font-semibold">Years Operating:</span> {app.yearsOfOperation}</p>}
                            {app.teamSize && <p className="text-sm mb-2"><span className="font-semibold">Team Size:</span> {app.teamSize}</p>}
                            {app.currentFunding && <p className="text-sm mb-2"><span className="font-semibold">Annual Budget:</span> {app.currentFunding}</p>}
                          </div>
                          <div>
                            <p className="text-sm mb-2"><span className="font-semibold">Description:</span></p>
                            <p className="text-sm text-gray-700 mb-3">{app.description}</p>
                            <p className="text-sm mb-2"><span className="font-semibold">Why Partner:</span></p>
                            <p className="text-sm text-gray-700">{app.whyPartner}</p>
                            {app.socialMediaLinks && (
                              <>
                                <p className="text-sm mt-3 mb-1"><span className="font-semibold">Social Media:</span></p>
                                <p className="text-xs text-gray-600">{app.socialMediaLinks}</p>
                              </>
                            )}
                          </div>
                        </div>
                      </details>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
