import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { celebrate } from '../components/Confetti';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [giftData, setGiftData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Celebrate payment success! 🎉
    celebrate();
  }, []);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        if (sessionId) {
          // First, process the payment session to create/update gifts
          await fetch(`${API_URL}/api/payments/session/${sessionId}/process`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Wait a moment for processing
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Then fetch the gift details
          const response = await fetch(`${API_URL}/api/payments/session/${sessionId}/details`);
          const data = await response.json();

          if (data.gift) {
            setGiftData(data.gift);
          } else {
            console.error('No gift data found:', data);
          }
        }
      } catch (err) {
        console.error('Error fetching session details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSessionDetails();
    } else {
      console.error('No session_id in URL');
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎁</div>
          <p className="text-2xl text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (!giftData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <p className="text-2xl text-gray-600">Payment confirmation not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-forest text-white px-6 py-3 rounded-full font-bold hover:bg-green-800 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
        <div className="container mx-auto max-w-4xl">

          {/* Success Header */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center mb-8">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h1 className="text-5xl font-black text-forest mb-4">
              Payment Success!
            </h1>
            <p className="text-2xl text-gray-600 mb-6">
              Thank you for your purchase!
            </p>
            <div className="inline-block bg-green-100 px-8 py-4 rounded-full border-2 border-green-500">
              <p className="text-2xl font-bold text-forest">
                Gift Total: ${giftData.price ? parseFloat(giftData.price).toFixed(2) : '0.00'}
              </p>
              {giftData.type === 'bulk' && (
                <p className="text-sm text-green-700 mt-1">
                  You got a discount on bulk orders!
                </p>
              )}
            </div>
          </div>

          {/* Gift Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-forest mb-6">Your Gift Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-700 mb-2">Recipient</h3>
                <p className="text-lg">{giftData.recipientName || 'N/A'}</p>
                {giftData.recipientEmail && (
                  <p className="text-gray-600">{giftData.recipientEmail}</p>
                )}
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-gray-700 mb-2">Gift Message</h3>
                <p className="text-lg line-clamp-3">{giftData.message || 'No message provided'}</p>
              </div>
            </div>

            {giftData.imageUrl && (
              <div className="mt-6">
                <h3 className="font-bold text-gray-700 mb-2">Gift Image</h3>
                <img 
                  src={giftData.imageUrl} 
                  alt="Gift" 
                  className="max-w-xs h-48 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center mb-8">
            <h2 className="text-3xl font-bold text-forest mb-4">What's Next?</h2>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <div className="text-4xl mb-2">📧</div>
                <h3 className="font-bold text-forest">Share Link</h3>
                <p className="text-gray-700 text-sm">Send the gift link to your recipient</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-2">🎁</div>
                <h3 className="font-bold text-forest">Receive Joy</h3>
                <p className="text-gray-700 text-sm">Wait for their heartfelt response</p>
              </div>
              <div className="p-4">
                <div className="text-4xl mb-2">🌍</div>
                <h3 className="font-bold text-forest">Create Impact</h3>
                <p className="text-gray-700 text-sm">Track the climate positive impact</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                if (giftData._id) {
                  navigator.clipboard.writeText(`${window.location.origin}/gift/${giftData._id}`);
                  alert('Gift link copied to clipboard!');
                }
              }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-full font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
            >
              📋 Copy Gift Link
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="bg-gray-200 text-gray-700 px-6 py-4 rounded-full font-bold hover:bg-gray-300 transition-all"
            >
              ← Back to Home
            </button>
            
            <button
              onClick={() => navigate(`/gift/${giftData._id}`)}
              className="bg-forest text-white px-6 py-4 rounded-full font-bold hover:bg-green-800 transition-all shadow-lg"
            >
              View Gift →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default PaymentSuccess;