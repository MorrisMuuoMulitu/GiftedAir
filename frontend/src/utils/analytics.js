// Enhanced Analytics Tracking

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
  console.log('📊 Event:', eventName, eventParams);
};

// Track page views
export const trackPageView = (path) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-XXXXXXXXXX', {
      page_path: path,
    });
  }
  console.log('📄 Page View:', path);
};

// E-commerce tracking
export const trackPurchase = (giftData) => {
  trackEvent('purchase', {
    transaction_id: giftData._id,
    value: giftData.totalCost,
    currency: 'USD',
    items: [{
      item_id: giftData.type,
      item_name: `${giftData.type} Gift`,
      price: giftData.totalCost,
      quantity: giftData.quantity || 1,
    }],
  });
};

// Conversion tracking
export const trackConversion = (conversionType, value = 0) => {
  trackEvent('conversion', {
    conversion_type: conversionType,
    value: value,
  });
};

// User engagement
export const trackEngagement = (action, label = '', value = 0) => {
  trackEvent('engagement', {
    action: action,
    label: label,
    value: value,
  });
};

// Social sharing
export const trackShare = (platform, contentType = 'gift') => {
  trackEvent('share', {
    method: platform,
    content_type: contentType,
  });
};

// Search tracking
export const trackSearch = (searchTerm, resultsCount) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

// Gift creation funnel
export const trackFunnelStep = (step, giftType = '') => {
  trackEvent('funnel_step', {
    step_name: step,
    gift_type: giftType,
  });
};

// Bulk order tracking
export const trackBulkOrder = (quantity, totalValue, discount) => {
  trackEvent('bulk_order', {
    quantity: quantity,
    value: totalValue,
    discount_amount: discount,
  });
};

// Thank you notes
export const trackThankYou = (giftId) => {
  trackEvent('thank_you_sent', {
    gift_id: giftId,
  });
};

// Certificate downloads
export const trackCertificateDownload = (giftId, giftType) => {
  trackEvent('certificate_download', {
    gift_id: giftId,
    gift_type: giftType,
  });
};

// QR code scans
export const trackQRScan = (giftId) => {
  trackEvent('qr_scan', {
    gift_id: giftId,
  });
};

// Leaderboard engagement
export const trackLeaderboardView = (position) => {
  trackEvent('leaderboard_view', {
    user_position: position,
  });
};

// Impact dashboard
export const trackImpactView = (totalGifts, totalValue) => {
  trackEvent('impact_view', {
    total_gifts: totalGifts,
    total_value: totalValue,
  });
};

// Email opens (if using tracking pixels)
export const trackEmailOpen = (emailType, giftId = '') => {
  trackEvent('email_open', {
    email_type: emailType,
    gift_id: giftId,
  });
};

// Link clicks
export const trackLinkClick = (linkType, destination) => {
  trackEvent('link_click', {
    link_type: linkType,
    destination: destination,
  });
};

// Form submissions
export const trackFormSubmit = (formName, success = true) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

// Error tracking
export const trackError = (errorType, errorMessage) => {
  trackEvent('error', {
    error_type: errorType,
    error_message: errorMessage,
  });
};

// Time on page
export const trackTimeOnPage = (pageName, seconds) => {
  trackEvent('time_on_page', {
    page_name: pageName,
    duration_seconds: seconds,
  });
};

// Scroll depth
export const trackScrollDepth = (percentage) => {
  trackEvent('scroll_depth', {
    percentage: percentage,
  });
};

// Gift type interest
export const trackGiftTypeClick = (giftType, price) => {
  trackEvent('gift_type_interest', {
    gift_type: giftType,
    price: price,
  });
};

// Payment method
export const trackPaymentMethod = (method) => {
  trackEvent('payment_method', {
    method: method,
  });
};

// Referral tracking
export const trackReferral = (source, medium = '', campaign = '') => {
  trackEvent('referral', {
    source: source,
    medium: medium,
    campaign: campaign,
  });
};
