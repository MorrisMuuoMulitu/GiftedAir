import { useNavigate } from 'react-router-dom';

function EmptyState({ 
  icon = '🎁', 
  title = 'Nothing here yet', 
  description = 'Get started by creating your first gift',
  actionLabel = 'Create Gift',
  actionPath = '/compose'
}) {
  const navigate = useNavigate();

  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-9xl mb-6 animate-float">{icon}</div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">{title}</h3>
        <p className="text-lg text-gray-600 mb-8">{description}</p>
        <button
          onClick={() => navigate(actionPath)}
          className="bg-forest text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-800 transition-all shadow-lg transform hover:scale-105"
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
}

export default EmptyState;
