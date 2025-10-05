import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';

const giftTypeDetails = {
  tree: { icon: '🌳', name: 'Tree Planting', color: '#2D5016' },
  cookstove: { icon: '🏡', name: 'Clean Cookstove', color: '#D97706' },
  solar: { icon: '☀️', name: 'Solar Panel', color: '#F59E0B' },
  ocean: { icon: '🌊', name: 'Ocean Cleanup', color: '#0EA5E9' },
  coral: { icon: '🪸', name: 'Coral Reef Restoration', color: '#EC4899' },
  wildlife: { icon: '🦁', name: 'Wildlife Conservation', color: '#F59E0B' },
  water: { icon: '💧', name: 'Clean Water Access', color: '#0EA5E9' },
  rainforest: { icon: '🌴', name: 'Rainforest Protection', color: '#059669' }
};

export default function Certificate() {
  const { giftId } = useParams();
  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);
  const certificateRef = useRef(null);

  useEffect(() => {
    const fetchGift = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gifts/${giftId}`);
        const data = await response.json();
        
        if (response.ok && data.gift) {
          setGift(data.gift);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gift:', error);
        setLoading(false);
      }
    };

    fetchGift();
  }, [giftId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading || !gift) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600">Loading certificate...</p>
      </div>
    );
  }

  const details = giftTypeDetails[gift.type] || giftTypeDetails.tree;
  const date = new Date(gift.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .certificate-container { 
            margin: 0; 
            padding: 40px; 
            box-shadow: none;
          }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 py-8 px-4">
        {/* Navigation Buttons */}
        <div className="max-w-4xl mx-auto mb-4 no-print flex gap-3">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition shadow-lg"
          >
            ← Back to Gift
          </button>
          <button
            onClick={handlePrint}
            className="bg-forest text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition shadow-lg"
          >
            🖨️ Print Certificate
          </button>
        </div>

        {/* Certificate */}
        <div 
          ref={certificateRef}
          className="certificate-container max-w-4xl mx-auto bg-white shadow-2xl"
          style={{
            aspectRatio: '8.5 / 11',
            padding: '60px',
            border: '20px solid',
            borderImage: `linear-gradient(135deg, ${details.color} 0%, ${details.color}99 100%) 1`
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{details.icon}</div>
            <h1 
              className="text-5xl font-bold mb-2"
              style={{ 
                fontFamily: "'Playfair Display', Georgia, serif",
                color: details.color
              }}
            >
              Certificate of Impact
            </h1>
            <div 
              className="h-1 w-48 mx-auto"
              style={{ backgroundColor: details.color }}
            ></div>
          </div>

          {/* Body */}
          <div className="text-center space-y-6">
            <p className="text-xl text-gray-700">This certificate acknowledges that</p>
            
            <p 
              className="text-4xl font-bold"
              style={{ 
                fontFamily: "'Playfair Display', Georgia, serif",
                color: details.color
              }}
            >
              {gift.recipientName}
            </p>

            <p className="text-xl text-gray-700">has received a gift of</p>

            <div className="my-6 p-6 border-2 rounded-lg inline-block" style={{ borderColor: details.color }}>
              <p className="text-3xl font-bold" style={{ color: details.color }}>
                {gift.quantity} × {details.name}
              </p>
            </div>

            <p className="text-xl text-gray-700">from</p>

            <p className="text-3xl font-bold text-gray-800">
              {gift.senderName}
            </p>

            {gift.location && (
              <p className="text-lg text-gray-600">
                📍 {gift.location}
              </p>
            )}

            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <p className="text-lg text-gray-600 italic mb-4">
                "{gift.message.substring(0, 150)}{gift.message.length > 150 ? '...' : ''}"
              </p>
            </div>

            {/* Impact Stats */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">ENVIRONMENTAL IMPACT</p>
              {gift.type === 'tree' && (
                <p className="text-lg text-gray-800">
                  Absorbs ~{gift.quantity * 48} lbs of CO₂ annually
                </p>
              )}
              {gift.type === 'cookstove' && (
                <p className="text-lg text-gray-800">
                  Provides clean air for {gift.quantity} families
                </p>
              )}
              {gift.type === 'solar' && (
                <p className="text-lg text-gray-800">
                  Generates {gift.quantity * 300} watts of clean energy
                </p>
              )}
              {gift.type === 'ocean' && (
                <p className="text-lg text-gray-800">
                  Removes {gift.quantity} kg of plastic from our oceans
                </p>
              )}
              {gift.type === 'coral' && (
                <p className="text-lg text-gray-800">
                  Plants {gift.quantity} coral fragments to rebuild reefs
                </p>
              )}
              {gift.type === 'wildlife' && (
                <p className="text-lg text-gray-800">
                  Protects {gift.quantity} animals and their habitats
                </p>
              )}
              {gift.type === 'water' && (
                <p className="text-lg text-gray-800">
                  Provides clean water access for {gift.quantity} people
                </p>
              )}
              {gift.type === 'rainforest' && (
                <p className="text-lg text-gray-800">
                  Protects {gift.quantity} acres of vital rainforest
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-12 pt-6 border-t-2 border-gray-200">
              <p className="text-sm text-gray-600">Certificate Date: {date}</p>
              <p className="text-sm text-gray-600 mt-2">Certificate ID: {gift._id}</p>
              <div className="mt-6">
                <p className="text-2xl font-bold" style={{ color: details.color }}>
                  Gifted Air
                </p>
                <p className="text-sm text-gray-600">Climate Love • gifted-air.vercel.app</p>
              </div>
            </div>
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 opacity-30" style={{ borderColor: details.color }}></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-t-4 border-r-4 opacity-30" style={{ borderColor: details.color }}></div>
          <div className="absolute bottom-8 left-8 w-16 h-16 border-b-4 border-l-4 opacity-30" style={{ borderColor: details.color }}></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 opacity-30" style={{ borderColor: details.color }}></div>
        </div>

        {/* Instructions */}
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-blue-50 rounded-lg no-print">
          <h3 className="text-lg font-bold text-blue-900 mb-2">💡 How to Save:</h3>
          <ul className="text-blue-800 space-y-1">
            <li>• Click the print button above</li>
            <li>• In print dialog, select "Save as PDF" as your destination</li>
            <li>• Or print on quality paper and frame it!</li>
          </ul>
        </div>
      </div>
    </>
  );
}
