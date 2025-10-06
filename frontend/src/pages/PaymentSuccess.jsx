import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL } from '../config';
import Navigation from '../components/Navigation';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [gift, setGift] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setError(true);
      setLoading(false);
      return;
    }

    const processPayment = async () => {
      try {
        // Get session details from Stripe
        const sessionResponse = await fetch(`${API_URL}/api/payments/session/${sessionId}`);
        const sessionData = await sessionResponse.json();

        if (!sessionData.success) {
          setError(true);
          setLoading(false);
          return;
        }

        // Create the gift now that payment is confirmed
        const giftData = {
          type: sessionData.metadata.giftType,
          quantity: parseInt(sessionData.metadata.quantity),
          message: sessionData.metadata.message,
          recipientName: sessionData.metadata.recipientName,
          recipientEmail: sessionData.metadata.recipientEmail || '',
          senderName: sessionData.metadata.senderName,
          totalCost: parseFloat(sessionData.metadata.totalCost),
          location: sessionData.metadata.location || ''
        };

        const giftResponse = await fetch(`${API_URL}/api/gifts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(giftData)
        });

        const giftResult = await giftResponse.json();

        if (giftResult.success) {
          setGift(giftResult.gift);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error processing payment:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">💚</div>
          <p className="text-2xl text-gray-700 font-bold mb-2">Processing your gift...</p>
          <p className="text-gray-600">Please wait a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">😕</div>
          <h1 className="text-4xl font-black text-red-600 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            We couldn't process your gift. Your payment may still have gone through.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-forest text-white px-8 py-3 rounded-full font-bold hover:bg-green-800 transition-all"
            >
              Go Home
            </button>
            <button
              onClick={() => navigate('/compose')}
              className="bg-white text-forest border-2 border-forest px-8 py-3 rounded-full font-bold hover:bg-green-50 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-block animate-grow">
            <div className="text-9xl mb-4">🎉</div>
          </div>
          <h1 className="text-5xl font-black text-forest mb-4">
            Payment Successful!
          </h1>
          <p className="text-2xl text-gray-700">
            Your climate gift has been created
          </p>
        </div>

        {/* Gift Summary */}
        {gift && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8">
            <div className="text-center mb-6">
              <div className="text-7xl mb-4">
                {gift.type === 'tree' && '🌳'}
                {gift.type === 'cookstove' && '🏡'}
                {gift.type === 'solar' && '☀️'}
                {gift.type === 'ocean' && '🌊'}
              </div>
              <h2 className="text-3xl font-bold text-forest mb-2">
                Gift Created Successfully!
              </h2>
              <p className="text-gray-600">
                From <strong>{gift.senderName}</strong> to <strong>{gift.recipientName}</strong>
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 mb-6 border-2 border-green-200">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-black text-forest">{gift.quantity}</div>
                  <div className="text-sm text-gray-600 font-bold">Quantity</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-forest">${gift.totalCost}</div>
                  <div className="text-sm text-gray-600 font-bold">Amount Paid</div>
                </div>
              </div>
            </div>

            {gift.recipientEmail && (
              <div className="bg-blue-50 rounded-xl p-4 mb-6 border-2 border-blue-200 text-center">
                <p className="text-blue-800 font-bold">
                  📧 Email notification sent to {gift.recipientEmail}
                </p>
              </div>
            )}

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Your gift is ready to view and share!
              </p>
              <button
                onClick={() => navigate(`/gift/${gift._id}`)}
                className="bg-forest text-white px-12 py-4 rounded-full text-xl font-bold 
                         hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                         shadow-xl"
              >
                View Your Gift 🎁
              </button>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-purple-900 mb-4">
            What's Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => gift && navigate(`/gift/${gift._id}`)}
              className="bg-white text-purple-700 px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              📱 Share on Social
            </button>
            <button
              onClick={() => navigate('/impact')}
              className="bg-white text-blue-700 px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              📊 See Your Impact
            </button>
            <button
              onClick={() => navigate('/compose')}
              className="bg-white text-green-700 px-6 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              🎁 Send Another Gift
            </button>
          </div>
        </div>

        {/* Receipt Note */}
        <div className="mt-8 text-center text-gray-600">
          <p className="text-sm">
            📧 A receipt has been sent to your email address
          </p>
          <p className="text-xs mt-2">
            Thank you for supporting climate action! 🌍💚
          </p>
        </div>
        </div>
      </div>
    </>
  );
}
