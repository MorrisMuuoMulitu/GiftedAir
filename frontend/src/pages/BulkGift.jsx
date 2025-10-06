import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const giftTypes = [
  { id: 'tree', name: 'Tree Planting', icon: '🌳', price: 1, unit: 'tree' },
  { id: 'ocean', name: 'Ocean Cleanup', icon: '🌊', price: 2, unit: 'cleanup' },
  { id: 'water', name: 'Clean Water Access', icon: '💧', price: 3, unit: 'person' },
  { id: 'cookstove', name: 'Clean Cookstove', icon: '🏡', price: 5, unit: 'stove' },
  { id: 'coral', name: 'Coral Reef Restoration', icon: '🪸', price: 5, unit: 'coral' },
  { id: 'rainforest', name: 'Rainforest Protection', icon: '🌴', price: 7, unit: 'acre' },
  { id: 'wildlife', name: 'Wildlife Conservation', icon: '🦁', price: 8, unit: 'animal' },
  { id: 'solar', name: 'Solar Panel', icon: '☀️', price: 10, unit: 'panel' }
];

function BulkGift() {
  const navigate = useNavigate();
  
  // Step 1: Gift Selection
  const [selectedType, setSelectedType] = useState('');
  const [quantity, setQuantity] = useState(10);
  
  // Step 2: Recipient Mode
  const [recipientMode, setRecipientMode] = useState('csv'); // 'csv', 'manual', 'same'
  const [recipients, setRecipients] = useState([]);
  const [csvError, setCsvError] = useState('');
  
  // Step 3: Message
  const [messageMode, setMessageMode] = useState('same'); // 'same' or 'custom'
  const [globalMessage, setGlobalMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  
  // Progress
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const selectedGift = giftTypes.find(g => g.id === selectedType);
  
  // Volume discount calculator
  const getDiscount = (qty) => {
    if (qty >= 100) return 0.25;
    if (qty >= 50) return 0.20;
    if (qty >= 25) return 0.15;
    if (qty >= 10) return 0.10;
    return 0;
  };
  
  const discount = getDiscount(quantity);
  const basePrice = selectedGift ? selectedGift.price * quantity : 0;
  const discountAmount = basePrice * discount;
  const totalPrice = basePrice - discountAmount;
  
  // CSV Upload Handler
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const lines = text.split('\n').filter(line => line.trim());
        
        // Skip header if present
        const startIndex = lines[0].toLowerCase().includes('name') ? 1 : 0;
        
        const parsed = lines.slice(startIndex).map(line => {
          const [name, email] = line.split(',').map(s => s.trim());
          return { name, email: email || '' };
        }).filter(r => r.name);
        
        if (parsed.length < quantity) {
          setCsvError(`CSV has ${parsed.length} recipients but you need ${quantity}. Please add more or reduce quantity.`);
        } else if (parsed.length > quantity) {
          setRecipients(parsed.slice(0, quantity));
          setCsvError('');
        } else {
          setRecipients(parsed);
          setCsvError('');
        }
      } catch (err) {
        setCsvError('Error parsing CSV. Please use format: Name, Email');
      }
    };
    reader.readAsText(file);
  };
  
  // Manual recipient addition
  const addRecipient = () => {
    setRecipients([...recipients, { name: '', email: '' }]);
  };
  
  const updateRecipient = (index, field, value) => {
    const updated = [...recipients];
    updated[index][field] = value;
    setRecipients(updated);
  };
  
  const removeRecipient = (index) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };
  
  // Checkout
  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      const orderData = {
        giftType: selectedType,
        quantity,
        senderName,
        recipientMode,
        recipients: recipientMode === 'same' ? [] : recipients,
        message: globalMessage,
        messageMode,
        basePrice,
        discount: discount * 100,
        totalPrice
      };
      
      const response = await fetch(`${API_URL}/api/payments/bulk-checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
        setIsProcessing(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to process order. Please try again.');
      setIsProcessing(false);
    }
  };
  
  // Validation
  const canProceedStep1 = selectedType && quantity >= 10;
  const canProceedStep2 = recipientMode === 'same' || recipients.length >= quantity;
  const canProceedStep3 = senderName && globalMessage;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-forest mb-4">
            🎁 Bulk Climate Gifting
          </h1>
          <p className="text-xl text-gray-600">
            Perfect for weddings, corporate events, and team appreciation
          </p>
          <div className="mt-6 inline-block bg-amber-100 px-6 py-3 rounded-full border-2 border-amber-400">
            <p className="text-amber-900 font-bold">
              💰 Volume Discounts: Save up to 25% on bulk orders!
            </p>
          </div>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  currentStep >= step ? 'bg-forest text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 4 && <div className={`w-12 h-1 ${currentStep > step ? 'bg-forest' : 'bg-gray-300'}`} />}
              </div>
            ))}
          </div>
        </div>
        
        {/* Step 1: Choose Gift & Quantity */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-forest mb-6">Step 1: Choose Your Gift</h2>
            
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {giftTypes.map(gift => (
                <button
                  key={gift.id}
                  onClick={() => setSelectedType(gift.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedType === gift.id
                      ? 'border-forest bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-forest'
                  }`}
                >
                  <div className="text-4xl mb-2">{gift.icon}</div>
                  <div className="font-bold text-lg">{gift.name}</div>
                  <div className="text-forest font-bold">${gift.price} each</div>
                </button>
              ))}
            </div>
            
            <div className="mb-8">
              <label className="block text-lg font-bold text-gray-700 mb-3">
                How many gifts? (Minimum 10)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(10, parseInt(e.target.value) || 10))}
                min="10"
                className="w-full p-4 border-2 border-gray-200 rounded-lg text-2xl font-bold text-center focus:border-forest focus:outline-none"
              />
            </div>
            
            {selectedGift && (
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl border-2 border-amber-300">
                <h3 className="text-xl font-bold text-amber-900 mb-4">💰 Your Pricing:</h3>
                <div className="space-y-2 text-lg">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span className="font-bold">${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-700">
                    <span>Volume Discount ({(discount * 100).toFixed(0)}% off):</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-amber-400 pt-2 flex justify-between text-2xl">
                    <span className="font-black">Total:</span>
                    <span className="font-black text-forest">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-600 text-center mt-2">
                    That's ${(totalPrice / quantity).toFixed(2)} per gift!
                  </div>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setCurrentStep(2)}
              disabled={!canProceedStep1}
              className={`w-full mt-8 py-4 rounded-full font-bold text-xl ${
                canProceedStep1
                  ? 'bg-forest text-white hover:bg-green-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Continue to Recipients →
            </button>
          </div>
        )}
        
        {/* Step 2: Recipients */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-forest mb-6">Step 2: Add Recipients</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setRecipientMode('csv')}
                className={`p-6 rounded-xl border-2 ${
                  recipientMode === 'csv' ? 'border-forest bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">📄</div>
                <div className="font-bold">Upload CSV</div>
                <div className="text-sm text-gray-600">Bulk import</div>
              </button>
              
              <button
                onClick={() => setRecipientMode('manual')}
                className={`p-6 rounded-xl border-2 ${
                  recipientMode === 'manual' ? 'border-forest bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">✏️</div>
                <div className="font-bold">Manual Entry</div>
                <div className="text-sm text-gray-600">Add one by one</div>
              </button>
              
              <button
                onClick={() => setRecipientMode('same')}
                className={`p-6 rounded-xl border-2 ${
                  recipientMode === 'same' ? 'border-forest bg-green-50' : 'border-gray-200'
                }`}
              >
                <div className="text-3xl mb-2">🔗</div>
                <div className="font-bold">Same Link</div>
                <div className="text-sm text-gray-600">You distribute</div>
              </button>
            </div>
            
            {recipientMode === 'csv' && (
              <div className="mb-6">
                <label className="block font-bold mb-3">Upload CSV File</label>
                <p className="text-sm text-gray-600 mb-3">
                  Format: Name, Email (one per line)
                </p>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="w-full p-3 border-2 border-gray-200 rounded-lg"
                />
                {csvError && <p className="text-red-600 mt-2">{csvError}</p>}
                {recipients.length > 0 && (
                  <p className="text-green-700 mt-2">
                    ✅ {recipients.length} recipients loaded
                  </p>
                )}
              </div>
            )}
            
            {recipientMode === 'manual' && (
              <div className="mb-6">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recipients.map((r, i) => (
                    <div key={i} className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Name"
                        value={r.name}
                        onChange={(e) => updateRecipient(i, 'name', e.target.value)}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-lg"
                      />
                      <input
                        type="email"
                        placeholder="Email (optional)"
                        value={r.email}
                        onChange={(e) => updateRecipient(i, 'email', e.target.value)}
                        className="flex-1 p-3 border-2 border-gray-200 rounded-lg"
                      />
                      <button
                        onClick={() => removeRecipient(i)}
                        className="px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addRecipient}
                  className="mt-4 w-full py-3 border-2 border-dashed border-forest text-forest rounded-lg hover:bg-green-50"
                >
                  + Add Recipient ({recipients.length}/{quantity})
                </button>
              </div>
            )}
            
            {recipientMode === 'same' && (
              <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <p className="text-blue-900">
                  <strong>Same Link Mode:</strong> You'll get {quantity} identical gift links that you can distribute yourself (print on cards, emails, etc.)
                </p>
              </div>
            )}
            
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 py-4 border-2 border-gray-300 rounded-full font-bold text-xl hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!canProceedStep2}
                className={`flex-1 py-4 rounded-full font-bold text-xl ${
                  canProceedStep2
                    ? 'bg-forest text-white hover:bg-green-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Message →
              </button>
            </div>
          </div>
        )}
        
        {/* Step 3: Message */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-forest mb-6">Step 3: Your Message</h2>
            
            <div className="mb-6">
              <label className="block font-bold mb-3">Your Name:</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g., Sarah & Tom's Wedding"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-forest focus:outline-none"
              />
            </div>
            
            <div className="mb-6">
              <label className="block font-bold mb-3">Message for All Recipients:</label>
              <textarea
                value={globalMessage}
                onChange={(e) => setGlobalMessage(e.target.value)}
                placeholder="Thank you for celebrating with us! This tree is planted in your honor."
                rows="4"
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-forest focus:outline-none"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="flex-1 py-4 border-2 border-gray-300 rounded-full font-bold text-xl hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                disabled={!canProceedStep3}
                className={`flex-1 py-4 rounded-full font-bold text-xl ${
                  canProceedStep3
                    ? 'bg-forest text-white hover:bg-green-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Review Order →
              </button>
            </div>
          </div>
        )}
        
        {/* Step 4: Review & Checkout */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-forest mb-6">Step 4: Review & Pay</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span className="font-bold">Gift Type:</span>
                <span>{selectedGift?.icon} {selectedGift?.name}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-bold">Quantity:</span>
                <span>{quantity} gifts</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-bold">Recipients:</span>
                <span>{recipientMode === 'same' ? 'Same link for all' : `${recipients.length} unique`}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="font-bold">From:</span>
                <span>{senderName}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl mb-8">
              <div className="space-y-2 text-lg">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-700">
                  <span>Discount ({(discount * 100).toFixed(0)}% off):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
                <div className="border-t-2 border-forest pt-2 flex justify-between text-3xl">
                  <span className="font-black">Total:</span>
                  <span className="font-black text-forest">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 py-4 border-2 border-gray-300 rounded-full font-bold text-xl hover:bg-gray-50"
              >
                ← Back
              </button>
              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="flex-1 py-4 bg-forest text-white rounded-full font-bold text-xl hover:bg-green-800 disabled:bg-gray-300"
              >
                {isProcessing ? 'Processing...' : `Pay $${totalPrice.toFixed(2)} 💳`}
              </button>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default BulkGift;
