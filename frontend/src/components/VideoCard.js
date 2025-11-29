import React from 'react';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  const {
    title,
    link,
    screenshot,
    region,
    platform,
    hashtags = [],
    views,
    timestamp
  } = video;

  const getRegionInfo = (region) => {
    const regionMap = {
      'global': { icon: '🌍', color: '#3B82F6', label: 'Global' },
      'usa': { icon: '🇺🇸', color: '#DC2626', label: 'USA' },
      'china': { icon: '🇨🇳', color: '#EF4444', label: 'China' },
      'thailand': { icon: '🇹🇭', color: '#0369A1', label: 'Thailand' }
    };
    return regionMap[region] || { icon: '🌐', color: '#6B7280', label: region };
  };

  const getPlatformIcon = (platform) => {
    const platformIcons = {
      'youtube': '📺',
      'tiktok': '🎵',
      'twitter': '🐦',
      'douyin': '⚡',
      'bilibili': '🇨🇳',
      'facebook': '👥',
      'instagram': '📷'
    };
    return platformIcons[platform] || '📱';
  };

  const regionInfo = getRegionInfo(region);
  const platformIcon = getPlatformIcon(platform);

  const handleCardClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="video-card" onClick={handleCardClick}>
      <div className="video-card__image-container">
        <img 
          src={screenshot} 
          alt={title}
          className="video-card__image"
          onError={(e) => {
            e.target.src = 'https://placehold.co/400x225/6B7280/FFFFFF?text=No+Thumbnail';
          }}
        />
        <div className="video-card__overlay">
          <div className="video-card__platform">
            {platformIcon} {platform}
          </div>
          {views && (
            <div className="video-card__views">
              👁️ {formatViews(views)}
            </div>
          )}
        </div>
      </div>

      <div className="video-card__content">
        <div 
          className="video-card__region"
          style={{ backgroundColor: regionInfo.color }}
        >
          {regionInfo.icon} {regionInfo.label}
        </div>

        <h3 className="video-card__title" title={title}>
          {title}
        </h3>

        {hashtags.length > 0 && (
          <div className="video-card__hashtags">
            {hashtags.slice(0, 3).map((tag, index) => (
              <span key={index} className="video-card__hashtag">
                {tag}
              </span>
            ))}
            {hashtags.length > 3 && (
              <span className="video-card__hashtag-more">
                +{hashtags.length - 3} more
              </span>
            )}
          </div>
        )}

        {timestamp && (
          <div className="video-card__timestamp">
            {formatDate(timestamp)}
          </div>
        )}

        <button className="video-card__button">
          👁️ Watch Video
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
