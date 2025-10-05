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
  const [senderName, setSenderName] = useState('');

  const selectedGift = giftTypes.find(g => g.id === selectedType);
  const totalCost = selectedGift ? selectedGift.unitPrice * quantity : 0;

  const handleCreateGift = async () => {
    if (!selectedType || !recipientName || !senderName || !message) {
      alert('Please fill in all fields');
      return;
    }

    const giftData = {
      type: selectedType,
      quantity,
      message,
      recipientName,
      senderName,
      totalCost
    };

    try {
      const response = await fetch(`${API_URL}/api/gifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(giftData)
      });

      const data = await response.json();

      if (data.success) {
        navigate(`/gift/${data.gift._id}`);
      } else {
        alert('Failed to create gift');
      }
    } catch (error) {
      console.error('Error creating gift:', error);
      alert('Failed to create gift. Please try again.');
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
            <h2 className="text-2xl font-bold text-forest mb-6">3. Add Your Names</h2>
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

        {/* Create Button */}
        {selectedType && recipientName && senderName && message && (
          <div className="text-center">
            <button
              onClick={handleCreateGift}
              className="bg-forest text-white px-16 py-4 rounded-full text-xl font-semibold 
                       hover:bg-green-800 transition-all duration-300 transform hover:scale-105 
                       shadow-lg hover:shadow-xl"
            >
              Create Gift ✨
            </button>
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
