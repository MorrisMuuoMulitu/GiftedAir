import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, keywords, ogImage }) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // Update keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Update OG tags
    if (ogImage) {
      let ogImageTag = document.querySelector('meta[property="og:image"]');
      if (ogImageTag) {
        ogImageTag.setAttribute('content', ogImage);
      }
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `https://giftedair.com${location.pathname}`);
  }, [title, description, keywords, ogImage, location]);

  return null;
};

export default SEO;

// Page-specific SEO configurations
export const SEOConfig = {
  home: {
    title: 'Gifted Air - Send Climate Action as Gifts | $1-$10',
    description: 'Transform pocket change into planet change. Send tree planting, ocean cleanup, clean water & more as meaningful gifts. 100% transparent, starting at $1.',
    keywords: 'climate gifts, sustainable gifts, tree planting, ocean cleanup, eco-friendly gifts, carbon offset, climate action, meaningful gifts',
  },
  compose: {
    title: 'Create Your Gift - Gifted Air',
    description: 'Send a meaningful environmental gift. Choose from tree planting, ocean cleanup, clean water, solar energy, and more. Starting at $1.',
    keywords: 'create climate gift, send environmental gift, plant trees gift, ocean cleanup gift',
  },
  gallery: {
    title: 'Gift Gallery - See Global Impact | Gifted Air',
    description: 'Explore environmental gifts from around the world. See how people are making a difference with trees, ocean cleanup, and more.',
    keywords: 'environmental impact gallery, climate action gifts, sustainability showcase',
  },
  leaderboard: {
    title: 'Leaderboard - Top Environmental Contributors | Gifted Air',
    description: 'See who\'s leading the way in environmental giving. Track impact leaders and join the movement for planet change.',
    keywords: 'environmental leaderboard, top climate contributors, sustainability leaders',
  },
  impact: {
    title: 'My Impact Dashboard - Track Your Gifts | Gifted Air',
    description: 'View all your environmental gifts in one place. Track trees planted, ocean cleanup, and total climate impact.',
    keywords: 'track environmental impact, my climate gifts, sustainability dashboard',
  },
  referral: {
    title: 'Refer & Earn - Share Environmental Gifting | Gifted Air',
    description: 'Earn rewards by inviting friends to give environmental gifts. Share your unique referral link and grow the movement.',
    keywords: 'referral program, earn rewards, share environmental gifts, climate action referral',
  },
  transparency: {
    title: 'Transparency - Where Your Money Goes | Gifted Air',
    description: 'Complete transparency on partner organizations, donation amounts, and environmental impact. See exactly how your gift helps the planet.',
    keywords: 'environmental transparency, donation tracking, climate action accountability',
  },
  bulk: {
    title: 'Bulk Orders - Corporate & Event Gifting | Gifted Air',
    description: 'Order environmental gifts in bulk for corporate events, weddings, or special occasions. Sustainable gifting made easy.',
    keywords: 'bulk environmental gifts, corporate sustainable gifts, event eco-friendly gifts',
  },
  aneri: {
    title: 'ANERI - The Future of Environmental Gifting',
    description: 'Explore the business plan, market validation, and vision behind Gifted Air. See our lean canvas and execution timeline.',
    keywords: 'environmental gifting business plan, climate action startup, sustainable business model',
  },
};
