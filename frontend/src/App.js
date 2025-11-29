import React, { useState, useEffect } from 'react';
import VideoGrid from './components/VideoGrid';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [videos, setVideos] = useState([]);
  const [regionFilter, setRegionFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = async (region = 'all') => {
    try {
      setLoading(true);
      setError(null);
      
      const url = region === 'all' 
        ? `${API_BASE_URL}/api/videos?limit=12`
        : `${API_BASE_URL}/api/videos/${region}?limit=12`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setVideos(data.videos);
      } else {
        throw new Error(data.error || 'Failed to fetch videos');
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError(err.message);
      // Fallback to mock data
      setVideos(mockVideos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(regionFilter);
  }, [regionFilter]);

  const handleRegionChange = (region) => {
    setRegionFilter(region);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔥 Viral Videos Tracker</h1>
        <p>ติดตามวิดีโอที่กำลังเป็นไวรัลจากทั่วโลก</p>
      </header>

      <div className="region-filter">
        <button 
          className={regionFilter === 'all' ? 'active' : ''}
          onClick={() => handleRegionChange('all')}
        >
          🌍 All Regions
        </button>
        <button 
          className={regionFilter === 'global' ? 'active' : ''}
          onClick={() => handleRegionChange('global')}
        >
          🌎 Global
        </button>
        <button 
          className={regionFilter === 'usa' ? 'active' : ''}
          onClick={() => handleRegionChange('usa')}
        >
          🇺🇸 USA
        </button>
        <button 
          className={regionFilter === 'thailand' ? 'active' : ''}
          onClick={() => handleRegionChange('thailand')}
        >
          🇹🇭 Thailand
        </button>
      </div>

      <main className="app-main">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>กำลังโหลดวิดีโอที่กำลังไวรัล...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>⚠️ {error}</p>
            <p>แสดงข้อมูลตัวอย่างแทน</p>
          </div>
        )}

        {!loading && (
          <VideoGrid videos={videos} regionFilter={regionFilter} />
        )}
      </main>

      <footer className="app-footer">
        <p>สร้างด้วย ❤️ สำหรับติดตามเทรนด์วิดีโอยอดนิยม</p>
      </footer>
    </div>
  );
}

// Mock data for fallback
const mockVideos = [
  {
    id: '1',
    title: 'Viral Dance Challenge Taking Over Internet #Shorts #Dance',
    link: 'https://youtube.com/watch?v=abc123',
    screenshot: 'https://placehold.co/400x225/3B82F6/FFFFFF?text=YouTube+Thumbnail',
    region: 'global',
    platform: 'youtube',
    hashtags: ['#Shorts', '#Dance', '#Viral', '#Challenge'],
    views: 2500000,
    timestamp: '2023-10-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'ไทยแลนด์เทรนด์ TikTok ล่าสุด #ไทยแลนด์ #ตลก',
    link: 'https://tiktok.com/@user/video/123',
    screenshot: 'https://placehold.co/400x225/EF4444/FFFFFF?text=TikTok+Video',
    region: 'thailand',
    platform: 'tiktok',
    hashtags: ['#ไทยแลนด์', '#ตลก', '#เทรนด์'],
    views: 150000,
    timestamp: '2023-10-01T09:30:00Z'
  }
];

export default App;
