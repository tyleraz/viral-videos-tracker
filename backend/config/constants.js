export const SCRAPING_CONFIG = {
  MAX_VIDEOS_PER_REQUEST: 10,
  DELAY_BETWEEN_REQUESTS: 2000,
  REQUEST_TIMEOUT: 30000,
  USER_AGENTS: [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  ]
};

export const PLATFORM_URLS = {
  youtube: {
    global: 'https://www.youtube.com/feed/trending',
    usa: 'https://www.youtube.com/feed/trending?gl=US',
    thailand: 'https://www.youtube.com/feed/trending?gl=TH'
  },
  tiktok: {
    global: 'https://www.tiktok.com/trending',
    usa: 'https://www.tiktok.com/trending?region=US',
    thailand: 'https://www.tiktok.com/trending?region=TH'
  }
};
