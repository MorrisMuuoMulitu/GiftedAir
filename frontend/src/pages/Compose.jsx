import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const giftTypes = [
  {
    id: 'tree',
    icon: '🌳',
    name: 'Plant a Tree',
    description: 'One tree absorbs ~48 lbs of CO₂ per year',
    color: 'forest',
    unitPrice: 5,
    unit: 'tree'
  },
  {
    id: 'cookstove',
    icon: '🏡',
    name: 'Clean Cookstove',
    description: 'Reduces indoor pollution and saves forests',
    color: 'earth',
    unitPrice: 25,
    unit: 'stove'
  },
  {
    id: 'solar',
    icon: '☀️',
    name: 'Solar Panel',
    description: 'Powers homes with clean energy',
    color: 'orange-500',
    unitPrice: 50,
    unit: 'panel'
  },
  {
    id: 'ocean',
    icon: '🌊',
    name: 'Ocean Cleanup',
    description: 'Removes plastic from our waters',
    color: 'ocean',
    unitPrice: 15,
    unit: 'kg'
  }
];

export default function Compose() {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [senderName, setSenderName] = useState('');
  const [location, setLocation] = useState('');

  const selectedGift = giftTypes.find(g => g.id === selectedType);
  const totalCost = selectedGift ? selectedGift.unitPrice * quantity : 0;

  const handleCreateGift = async () => {
    if (!selectedType || !recipientName || !senderName || !message) {
      alert('Please fill in all required fields');
      return;
    }

    const giftData = {
      type: selectedType,
      quantity,
      message,
      recipientName,
      recipientEmail: recipientEmail || '',
      senderName,
      totalCost,
      location: location || ''
    };

    try {
      // Create Stripe checkout session
      const response = await fetch(`${API_URL}/api/payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ giftData })
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert('Failed to start payment process. Please try again.');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start payment. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-forest mb-4">Compose Your Gift</h1>
          <p className="text-xl text-gray-600">Choose a climate action and add your personal touch</p>
        </div>

        {/* Step 1: Select Gift Type */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-forest mb-6">1. Choose Your Climate Action</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {giftTypes.map((gift) => (
              <button
                key={gift.id}
                onClick={() => setSelectedType(gift.id)}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-300 
                  ${selectedType === gift.id 
                    ? 'border-forest bg-green-50 shadow-lg' 
                    : 'border-gray-200 hover:border-forest hover:shadow-md'}`}
              >
                <div className="text-5xl mb-3">{gift.icon}</div>
                <h3 className="text-xl font-bold text-forest mb-2">{gift.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{gift.description}</p>
                <p className="text-forest font-semibold">${gift.unitPrice} per {gift.unit}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Quantity & Details */}
        {selectedType && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-grow">
            <h2 className="text-2xl font-bold text-forest mb-6">2. How Many?</h2>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-forest text-white w-12 h-12 rounded-full text-2xl hover:bg-green-800 transition"
              >
                −
              </button>
              <div className="text-4xl font-bold text-forest min-w-[80px] text-center">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-forest text-white w-12 h-12 rounded-full text-2xl hover:bg-green-800 transition"
              >
                +
              </button>
              <span className="text-xl text-gray-600 ml-4">
                {selectedGift?.unit}(s) • ${totalCost} total
              </span>
            </div>
          </div>
        )}

        {/* Step 3: Personal Message */}
        {selectedType && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-forest mb-6">3. Add Your Details</h2>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">From:</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your name"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">To:</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Recipient's name"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-forest focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  📧 Recipient's Email (Optional):
                </label>
                <input
                  type="email"
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-forest focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💌 We'll send them a beautiful email notification!
                </p>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  📍 Your Location (Optional):
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Nairobi, Kenya or New York, USA"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-forest focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Show where your climate love is coming from!
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-forest mb-6">4. Write Your Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Dear earth guardian, this gift is a symbol of my love for you and our planet..."
              rows={6}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-forest 
                       focus:outline-none resize-none font-poetic text-lg"
            />
          </div>
        )}

        {/* Payment Summary & Checkout Button */}
        {selectedType && recipientName && senderName && message && (
          <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-forest mb-4">Ready to Send Your Gift?</h3>
            
            {/* Price Summary */}
            <div className="bg-white rounded-xl p-6 mb-6 max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-semibold">Gift Type:</span>
                <span className="text-forest font-bold">{selectedGift.name}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-semibold">Quantity:</span>
                <span className="text-forest font-bold">{quantity}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-semibold">Price per unit:</span>
                <span className="text-forest font-bold">${selectedGift.unitPrice}</span>
              </div>
              <div className="border-t-2 border-gray-300 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">Total:</span>
                <span className="text-3xl font-black text-forest">${totalCost}</span>
              </div>
            </div>

            <button
              onClick={handleCreateGift}
              className="bg-forest text-white px-16 py-5 rounded-full text-xl font-bold 
                       hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                       shadow-2xl hover:shadow-3xl flex items-center gap-3 mx-auto"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Proceed to Payment
            </button>
            
            <p className="text-sm text-gray-600 mt-4">
              🔒 Secure payment powered by Stripe
            </p>
          </div>
        )}

        {/* Back Link */}
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
