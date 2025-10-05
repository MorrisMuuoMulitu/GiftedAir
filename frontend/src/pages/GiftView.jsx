import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const giftTypeDetails = {
  tree: {
    icon: '🌳',
    name: 'Tree Planting',
    color: 'from-green-400 to-green-600',
    impact: 'Trees planted',
    bgGradient: 'from-green-50 to-emerald-100'
  },
  cookstove: {
    icon: '🏡',
    name: 'Clean Cookstove',
    color: 'from-amber-500 to-orange-600',
    impact: 'Stoves provided',
    bgGradient: 'from-orange-50 to-amber-100'
  },
  solar: {
    icon: '☀️',
    name: 'Solar Panel',
    color: 'from-yellow-400 to-orange-500',
    impact: 'Panels installed',
    bgGradient: 'from-yellow-50 to-orange-100'
  },
  ocean: {
    icon: '🌊',
    name: 'Ocean Cleanup',
    color: 'from-blue-400 to-cyan-600',
    impact: 'Kg of plastic removed',
    bgGradient: 'from-blue-50 to-cyan-100'
  }
};

export default function GiftView() {
  const { giftId } = useParams();
  const navigate = useNavigate();
  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gifts/${giftId}`);
        const data = await response.json();
        
        if (response.ok && data.gift) {
          setGift(data.gift);
          setEditedMessage(data.gift.message);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error fetching gift:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGift();
  }, [giftId]);

  const handleEditClick = () => {
    setEditedMessage(gift.message);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditedMessage(gift.message);
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    if (!editedMessage.trim()) {
      alert('Message cannot be empty');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${API_URL}/api/gifts/${giftId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: editedMessage })
      });

      const data = await response.json();

      if (data.success) {
        setGift(data.gift);
        setIsEditing(false);
      } else {
        alert('Failed to update message');
      }
    } catch (err) {
      console.error('Error updating gift:', err);
      alert('Failed to update message. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">🌿</div>
          <p className="text-2xl text-gray-600">Loading your gift...</p>
        </div>
      </div>
    );
  }

  if (error || !gift) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">Gift not found</p>
          <button
            onClick={() => navigate('/')}
            className="text-forest hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const giftDetails = giftTypeDetails[gift.type];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${giftDetails.bgGradient} py-12`}>
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Gift Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with animated icon */}
          <div className={`bg-gradient-to-r ${giftDetails.color} p-12 text-center`}>
            <div className="text-9xl mb-4 animate-grow">{giftDetails.icon}</div>
            <h1 className="text-4xl font-bold text-white mb-2">
              A Gift of Climate Love
            </h1>
            <p className="text-xl text-white opacity-90">
              {giftDetails.name}
            </p>
          </div>

          {/* Content */}
          <div className="p-12">
            {/* Recipient Greeting */}
            <div className="text-center mb-8">
              <p className="text-3xl text-gray-800 mb-2">
                Dear <span className="font-bold text-forest">{gift.recipientName}</span>,
              </p>
              <p className="text-lg text-gray-600">
                <span className="font-semibold">{gift.senderName}</span> has gifted you something special
              </p>
            </div>

            {/* Impact Display */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-8 text-center">
              <div className="text-6xl font-bold text-forest mb-2">
                {gift.quantity}
              </div>
              <div className="text-xl text-gray-700">
                {giftDetails.impact}
              </div>
              <div className="mt-4 text-sm text-gray-500">
                Carbon offset value: ${gift.totalCost}
              </div>
            </div>

            {/* Personal Message */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-10 mb-8 border-2 border-amber-200 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="text-6xl">💌</div>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="text-sm bg-white text-forest px-4 py-2 rounded-lg border-2 border-forest hover:bg-green-50 transition-all"
                  >
                    ✏️ Edit Message
                  </button>
                )}
              </div>
              
              <div className="max-w-2xl mx-auto">
                {isEditing ? (
                  <>
                    <textarea
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      rows={8}
                      className="w-full p-4 border-2 border-amber-300 rounded-lg focus:border-forest focus:outline-none resize-none font-poetic text-xl leading-relaxed"
                      placeholder="Write your heartfelt message..."
                    />
                    <div className="flex gap-4 mt-6 justify-end">
                      <button
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                        className="px-6 py-2 rounded-lg border-2 border-gray-400 text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        disabled={isSaving}
                        className="px-6 py-2 rounded-lg bg-forest text-white hover:bg-green-800 transition-all disabled:opacity-50"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-left mb-6">
                      <p className="text-xl text-gray-800 font-poetic leading-relaxed whitespace-pre-wrap">
                        {gift.message}
                      </p>
                    </div>
                    <div className="text-right mt-8 pt-4 border-t border-amber-300">
                      <p className="text-lg text-gray-600 font-poetic italic">
                        With love,
                      </p>
                      <p className="text-xl text-forest font-bold mt-1">
                        {gift.senderName}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Impact Details */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-forest mb-4 text-center">
                Real-World Impact
              </h3>
              <div className="space-y-3 text-gray-700">
                {gift.type === 'tree' && (
                  <>
                    <ImpactItem icon="🌍" text={`${gift.quantity * 48} lbs of CO₂ absorbed annually`} />
                    <ImpactItem icon="🦋" text="Creates habitat for wildlife" />
                    <ImpactItem icon="💧" text="Prevents soil erosion and purifies water" />
                  </>
                )}
                {gift.type === 'cookstove' && (
                  <>
                    <ImpactItem icon="🏠" text={`${gift.quantity} families with cleaner air`} />
                    <ImpactItem icon="🌳" text="Reduces deforestation for firewood" />
                    <ImpactItem icon="💚" text="Improves health and saves lives" />
                  </>
                )}
                {gift.type === 'solar' && (
                  <>
                    <ImpactItem icon="⚡" text={`${gift.quantity * 300} watts of clean energy`} />
                    <ImpactItem icon="🏘️" text="Powers homes without fossil fuels" />
                    <ImpactItem icon="📚" text="Enables education and economic opportunity" />
                  </>
                )}
                {gift.type === 'ocean' && (
                  <>
                    <ImpactItem icon="🐠" text={`${gift.quantity} kg of plastic removed`} />
                    <ImpactItem icon="🌊" text="Protects marine ecosystems" />
                    <ImpactItem icon="🐢" text="Saves sea life from pollution" />
                  </>
                )}
              </div>
            </div>

            {/* Footer Quote */}
            <div className="mt-8 text-center">
              <blockquote className="text-lg text-gray-600 italic">
                "Every gift plants a seed of hope for our planet"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/compose')}
            className="bg-forest text-white px-8 py-3 rounded-full font-semibold 
                     hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                     shadow-lg"
          >
            Send Your Own Gift
          </button>
          <button
            onClick={() => navigate('/gallery')}
            className="bg-white text-forest border-2 border-forest px-8 py-3 rounded-full font-semibold 
                     hover:bg-green-50 transition-all duration-300"
          >
            View Gallery 🎁
          </button>
          <button
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert('Gift link copied to clipboard!');
            }}
            className="bg-white text-forest border-2 border-forest px-8 py-3 rounded-full font-semibold 
                     hover:bg-green-50 transition-all duration-300"
          >
            Share This Gift
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-forest hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

function ImpactItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
