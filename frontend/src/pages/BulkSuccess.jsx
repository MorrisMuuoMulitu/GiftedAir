import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function BulkSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [bulkOrder, setBulkOrder] = useState(null);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const bulkOrderId = searchParams.get('bulk_order_id');
  
  useEffect(() => {
    const fetchBulkOrder = async () => {
      try {
        // First, process the bulk order (creates gifts if not done)
        console.log('Processing bulk order:', bulkOrderId);
        await fetch(`${API_URL}/api/bulk-helper/process/${bulkOrderId}`, {
          method: 'POST'
        });
        
        // Wait a moment for gifts to be created
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Then fetch the order details
        const response = await fetch(`${API_URL}/api/payments/bulk-order/${bulkOrderId}`);
        const data = await response.json();
        
        console.log('Bulk order response:', data);
        
        if (data.bulkOrder) {
          setBulkOrder(data.bulkOrder);
          setGifts(data.gifts || []);
        } else {
          console.error('No bulk order found:', data);
        }
      } catch (err) {
        console.error('Error fetching bulk order:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (bulkOrderId) {
      console.log('Fetching bulk order:', bulkOrderId);
      fetchBulkOrder();
    } else {
      console.error('No bulk_order_id in URL');
      setLoading(false);
    }
  }, [bulkOrderId]);
  
  const downloadCSV = () => {
    if (!gifts.length) return;
    
    const csvContent = 'Recipient Name,Gift Link\n' + 
      gifts.map(g => `${g.recipientName},"${window.location.origin}/gift/${g._id}"`).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bulk-gifts-${bulkOrderId}.csv`;
    link.click();
  };
  
  const copyAllLinks = () => {
    const links = gifts.map(g => `${window.location.origin}/gift/${g._id}`).join('\n');
    navigator.clipboard.writeText(links);
    alert('All gift links copied to clipboard!');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎁</div>
          <p className="text-2xl text-gray-600">Processing your bulk order...</p>
        </div>
      </div>
    );
  }
  
  if (!bulkOrder) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <p className="text-2xl text-gray-600">Order not found</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* Success Header */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center mb-8">
          <div className="text-8xl mb-6 animate-bounce">🎉</div>
          <h1 className="text-5xl font-black text-forest mb-4">
            Bulk Order Success!
          </h1>
          <p className="text-2xl text-gray-600 mb-6">
            Your {bulkOrder.quantity} gifts are ready!
          </p>
          <div className="inline-block bg-green-100 px-8 py-4 rounded-full border-2 border-green-500">
            <p className="text-2xl font-bold text-forest">
              Order Total: ${bulkOrder.totalPrice.toFixed(2)}
            </p>
            <p className="text-sm text-green-700 mt-1">
              You saved ${(bulkOrder.basePrice - bulkOrder.totalPrice).toFixed(2)} ({bulkOrder.discount}% discount!)
            </p>
          </div>
        </div>
        
        {/* Download Options */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-forest mb-6">📥 Download Your Gifts</h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <button
              onClick={downloadCSV}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
            >
              📄 Download CSV
            </button>
            
            <button
              onClick={copyAllLinks}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-purple-700 transition-all shadow-lg"
            >
              📋 Copy All Links
            </button>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">💡 What's Next?</h3>
            <ul className="text-blue-800 space-y-2">
              <li>✅ Download the CSV with all gift links</li>
              <li>✅ Share links via email, print on cards, or QR codes</li>
              <li>✅ Each recipient gets their personalized gift page</li>
              <li>✅ Track thank you notes as they come in!</li>
            </ul>
          </div>
        </div>
        
        {/* Gift List */}
        {gifts.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-forest mb-6">🎁 Your Gifts ({gifts.length})</h2>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {gifts.map((gift, index) => (
                <div key={gift._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                  <div>
                    <span className="font-bold text-gray-700">
                      {index + 1}. {gift.recipientName || `Gift #${index + 1}`}
                    </span>
                    {gift.recipientEmail && (
                      <span className="text-sm text-gray-500 ml-2">({gift.recipientEmail})</span>
                    )}
                  </div>
                  <a
                    href={`/gift/${gift._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-forest hover:underline font-semibold"
                  >
                    View →
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center mb-8">
          <h2 className="text-3xl font-bold text-forest mb-4">🌍 Your Climate Impact</h2>
          <p className="text-xl text-gray-700 mb-4">
            You just sent <span className="font-black text-forest">{bulkOrder.quantity} gifts</span> of climate love!
          </p>
          <p className="text-gray-600">
            Each recipient can view their gift, send you a thank you note, and get their impact certificate.
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-300 transition-all"
          >
            ← Back to Home
          </button>
          <button
            onClick={() => navigate('/bulk')}
            className="bg-forest text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-800 transition-all shadow-lg"
          >
            Send More Gifts 🎁
          </button>
        </div>
        
      </div>
    </div>
  );
}

export default BulkSuccess;
