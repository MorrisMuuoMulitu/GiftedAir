import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';

export default function ImpactWidget() {
  const { partnerName } = useParams();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImpact = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gifts/impact/${encodeURIComponent(partnerName)}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
        }
      } catch (err) {
        console.error('Error fetching partner impact:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImpact();
  }, [partnerName]);

  if (loading) return null; // Keep it clean for embedding

  if (!stats) return (
    <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-sm text-gray-500">
      Impact data for {partnerName} not found.
    </div>
  );

  return (
    <div className="bg-white border-2 border-forest rounded-2xl p-6 shadow-sm flex flex-col items-center text-center font-sans overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🌿</span>
        <span className="text-lg font-black text-gray-900 tracking-tight">Gifted Air x {stats.name}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        <div className="bg-green-50 rounded-xl p-3">
          <div className="text-2xl font-black text-forest">{stats.totalGifts}</div>
          <div className="text-[10px] uppercase font-bold text-gray-500">Gifts Sent</div>
        </div>
        <div className="bg-blue-50 rounded-xl p-3">
          <div className="text-2xl font-black text-blue-600">{stats.impact.totalImpactScore.toLocaleString()}</div>
          <div className="text-[10px] uppercase font-bold text-gray-500">Impact Score</div>
        </div>
      </div>

      <div className="space-y-2 w-full text-left">
        {stats.impact.treesPlanted > 0 && (
          <ImpactItem icon="🌳" text={`${stats.impact.treesPlanted} Trees Planted`} />
        )}
        {stats.impact.familiesHelped > 0 && (
          <ImpactItem icon="🏡" text={`${stats.impact.familiesHelped} Families Helped`} />
        )}
        {stats.impact.solarPanels > 0 && (
          <ImpactItem icon="☀️" text={`${stats.impact.solarPanels} Solar Panels`} />
        )}
        {stats.impact.plasticRemoved > 0 && (
          <ImpactItem icon="🌊" text={`${stats.impact.plasticRemoved}kg Plastic Removed`} />
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 w-full flex justify-between items-center">
        <span className="text-[10px] font-bold text-gray-400 uppercase">Live Team Impact</span>
        <a 
          href="https://gifted-air.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] font-black text-forest hover:underline"
        >
          gifted-air.app
        </a>
      </div>
    </div>
  );
}

function ImpactItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span className="text-base">{icon}</span>
      <span className="font-medium">{text}</span>
    </div>
  );
}
