function ErrorMessage({ 
  title = 'Oops! Something went wrong', 
  message = 'Please try again later',
  onRetry 
}) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto my-8">
      <div className="text-6xl mb-4">😕</div>
      <h3 className="text-2xl font-bold text-red-800 mb-2">{title}</h3>
      <p className="text-red-600 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transition-all"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
