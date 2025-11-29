import React from 'react';
import VideoCard from './VideoCard';
import './VideoGrid.css';

const VideoGrid = ({ videos, regionFilter = 'all' }) => {
  const filteredVideos = regionFilter === 'all' 
    ? videos 
    : videos.filter(video => video.region === regionFilter);

  if (filteredVideos.length === 0) {
    return (
      <div className="video-grid__empty">
        <p>ไม่มีวิดีโอที่กำลังไวรัลในขณะนี้</p>
        <p>ลองเลือกภูมิภาคอื่นหรือรอสักครู่</p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {filteredVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
