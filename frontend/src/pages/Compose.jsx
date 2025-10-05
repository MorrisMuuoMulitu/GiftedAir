import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const giftTypes = [
  {
    id: 'tree',
    icon: '🌳',
    name: 'Plant a Tree',
    description: 'One tree absorbs ~48 lbs of CO₂ per year',
    color: 'forest',
    unitPrice: 1,
    unit: 'tree'
  },
  {
    id: 'cookstove',
    icon: '🏡',
    name: 'Clean Cookstove',
    description: 'Reduces indoor pollution and saves forests',
    color: 'earth',
    unitPrice: 5,
    unit: 'stove'
  },
  {
    id: 'solar',
    icon: '☀️',
    name: 'Solar Panel',
    description: 'Powers homes with clean energy',
    color: 'orange-500',
    unitPrice: 10,
    unit: 'panel'
  },
  {
    id: 'ocean',
    icon: '🌊',
    name: 'Ocean Cleanup',
    description: 'Removes plastic from our waters',
    color: 'ocean',
    unitPrice: 2,
    unit: 'kg'
  },
  {
    id: 'coral',
    icon: '🪸',
    name: 'Coral Reef Restoration',
    description: 'Rebuilds vital ocean ecosystems',
    color: 'pink-500',
    unitPrice: 5,
    unit: 'coral'
  },
  {
    id: 'wildlife',
    icon: '🦁',
    name: 'Wildlife Conservation',
    description: 'Protects endangered species and habitats',
    color: 'amber-600',
    unitPrice: 8,
    unit: 'animal'
  },
  {
    id: 'water',
    icon: '💧',
    name: 'Clean Water Access',
    description: 'Provides safe drinking water to communities',
    color: 'blue-400',
    unitPrice: 3,
    unit: 'person'
  },
  {
    id: 'rainforest',
    icon: '🌴',
    name: 'Rainforest Protection',
    description: 'Preserves critical biodiversity hotspots',
    color: 'green-600',
    unitPrice: 7,
    unit: 'acre'
  }
];

const messageTemplates = [
  {
    id: 'birthday',
    icon: '🎂',
    name: 'Birthday',
    message: 'Happy Birthday! 🎉\n\nInstead of something that adds to the world\'s clutter, I wanted to give you a gift that makes a real difference. This is for you and for our planet.\n\nMay this year bring you joy, and may our Earth flourish with the positive impact we create together.\n\nWith love and hope for a greener future,'
  },
  {
    id: 'thank-you',
    icon: '🙏',
    name: 'Thank You',
    message: 'Thank You! 💚\n\nYour kindness and support mean the world to me. I wanted to express my gratitude in a way that also gives back to our planet.\n\nThis gift represents the positive ripple effect you\'ve had on my life, now extending to the Earth we share.\n\nWith sincere appreciation,'
  },
  {
    id: 'anniversary',
    icon: '💑',
    name: 'Anniversary',
    message: 'Happy Anniversary! 💕\n\nJust as our love has grown stronger with each passing year, I hope this gift helps our planet grow stronger too.\n\nTogether, we\'re not just building a life—we\'re nurturing a world worth living in. Here\'s to many more years of love and impact.\n\nForever yours,'
  },
  {
    id: 'apology',
    icon: '🌹',
    name: 'Apology',
    message: 'I\'m Sorry 🌿\n\nI know actions speak louder than words, so I wanted to make a meaningful gesture. This gift is a step toward healing—both between us and for our planet.\n\nI hope you can forgive me, and I promise to do better. Let this be a symbol of new growth and fresh beginnings.\n\nWith sincere regret and hope,'
  },
  {
    id: 'graduation',
    icon: '🎓',
    name: 'Graduation',
    message: 'Congratulations Graduate! 🎓\n\nAs you step into this new chapter, I wanted to celebrate your achievement with a gift that plants seeds for the future—both yours and our planet\'s.\n\nYou\'ve worked so hard to get here. May your impact on the world be as meaningful as this moment.\n\nProud of you always,'
  },
  {
    id: 'just-because',
    icon: '✨',
    name: 'Just Because',
    message: 'Thinking of You 💭\n\nNo special occasion—just wanted to remind you how much you mean to me. In a world that often feels heavy, you\'re a bright spot.\n\nThis gift is a small way to spread some of that light to our planet too. Because people like you make the world worth caring for.\n\nWith love,'
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
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [showInGallery, setShowInGallery] = useState(true);

  const selectedGift = giftTypes.find(g => g.id === selectedType);
  
  // Auto-scroll to form when gift type is selected
  useEffect(() => {
    if (selectedType) {
      const formSection = document.getElementById('gift-form-section');
      if (formSection) {
        setTimeout(() => {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [selectedType]);
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
      location: location || '',
      scheduledDate: scheduleEnabled && scheduledDate ? new Date(scheduledDate).toISOString() : null,
      status: scheduleEnabled && scheduledDate ? 'scheduled' : 'sent',
      showInGallery
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
                <p className="text-forest font-semibold">${gift.unitPrice} supports {gift.unit} {gift.id === 'tree' ? 'planting' : gift.id === 'ocean' ? 'cleanup' : gift.id === 'water' ? 'access' : gift.id === 'rainforest' ? 'protection' : gift.id === 'wildlife' ? 'conservation' : gift.id === 'coral' ? 'restoration' : 'funding'}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Quantity & Details */}
        {selectedType && (
          <div id="gift-form-section" className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-grow">
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

        {/* Step 3: Schedule Delivery (Optional) */}
        {selectedType && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-bold text-forest mb-6">3. Schedule Delivery (Optional) ⏰</h2>
            
            <div className="mb-6">
              <label className="flex items-center gap-3 cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <input
                  type="checkbox"
                  checked={scheduleEnabled}
                  onChange={(e) => setScheduleEnabled(e.target.checked)}
                  className="w-5 h-5 text-forest focus:ring-forest rounded"
                />
                <div>
                  <span className="text-gray-700 font-semibold block">
                    Schedule this gift for a future date
                  </span>
                  <span className="text-sm text-gray-500">
                    Perfect for birthdays, anniversaries, or reminders!
                  </span>
                </div>
              </label>
              
              {scheduleEnabled && (
                <div className="mt-6 animate-fade-in-up p-6 bg-amber-50 rounded-xl border-2 border-amber-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    📅 When should we send this gift?
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 border-2 border-amber-300 rounded-lg focus:border-forest focus:outline-none text-lg"
                    required={scheduleEnabled}
                  />
                  <p className="text-sm text-gray-600 mt-3 flex items-start gap-2">
                    <span>💡</span>
                    <span>We'll automatically send this gift on the date you choose!</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Personal Details */}
        {selectedType && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-2xl font-bold text-forest mb-6">4. Add Your Details</h2>
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

            <h2 className="text-2xl font-bold text-forest mb-6">5. Write Your Message</h2>
            
            {/* Message Templates */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 font-semibold mb-3">💡 Need inspiration? Choose a template:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {messageTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setMessage(template.message)}
                    className="flex flex-col items-center gap-2 p-3 bg-white border-2 border-gray-200 rounded-xl 
                             hover:border-forest hover:bg-green-50 transition-all duration-200 group"
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{template.icon}</span>
                    <span className="text-xs font-bold text-gray-700 group-hover:text-forest text-center">
                      {template.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Dear earth guardian, this gift is a symbol of my love for you and our planet..."
              rows={8}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-forest 
                       focus:outline-none resize-none font-poetic text-lg"
            />
            
            {/* Privacy Toggle */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showInGallery}
                  onChange={(e) => setShowInGallery(e.target.checked)}
                  className="w-5 h-5 text-forest focus:ring-forest rounded mt-0.5"
                />
                <div>
                  <span className="text-gray-800 font-semibold block">
                    📸 Share this gift in the public gallery
                  </span>
                  <span className="text-sm text-gray-600 block mt-1">
                    Your gift and message will be visible to inspire others. 
                    Uncheck to keep it private (only you and recipient can see it).
                  </span>
                </div>
              </label>
            </div>
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
