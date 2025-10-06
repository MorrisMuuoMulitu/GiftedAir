function LoadingSkeleton({ type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-20 w-20 bg-gray-200 rounded-full mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="bg-white rounded-xl shadow p-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'stat') {
    return (
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-3"></div>
        <div className="h-12 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return null;
}

export default LoadingSkeleton;
