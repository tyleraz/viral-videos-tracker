import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ScrapingService } from './services/scraper.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
  message: 'Too many requests, please try again later.'
});
app.use('/api/', limiter);

const scrapingService = new ScrapingService();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Viral Videos API'
  });
});

app.get('/api/videos', async (req, res) => {
  try {
    const { region, limit = 10 } = req.query;
    
    console.log(`Scraping videos for region: ${region || 'all'}`);
    
    let videos;
    if (region && region !== 'all') {
      videos = await scrapingService.scrapeByRegion(region);
    } else {
      videos = await scrapingService.scrapeAllRegions();
    }

    const limitedVideos = videos.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      count: limitedVideos.length,
      region: region || 'all',
      videos: limitedVideos
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to scrape videos',
      message: error.message
    });
  }
});

app.get('/api/videos/:region', async (req, res) => {
  try {
    const { region } = req.params;
    const { limit = 10 } = req.query;

    const videos = await scrapingService.scrapeByRegion(region);
    const limitedVideos = videos.slice(0, parseInt(limit));

    res.json({
      success: true,
      count: limitedVideos.length,
      region,
      videos: limitedVideos
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to scrape videos for region',
      message: error.message
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await scrapingService.cleanup();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`🚀 Viral Videos API running on port ${port}`);
  console.log(`📊 Endpoints:`);
  console.log(`   GET /api/health - Health check`);
  console.log(`   GET /api/videos - All videos (?region=usa&limit=5)`);
  console.log(`   GET /api/videos/:region - Videos by region`);
});
