import { YouTubeScraper } from './youtubeScraper.js';
import { TikTokScraper } from './tiktokScraper.js';

export class ScrapingService {
  constructor() {
    this.youtubeScraper = new YouTubeScraper();
    this.tiktokScraper = new TikTokScraper();
    this.isScraping = false;
  }

  async scrapeAllRegions() {
    if (this.isScraping) {
      throw new Error('Scraping is already in progress');
    }

    this.isScraping = true;
    const regions = ['global', 'usa', 'thailand'];
    const allVideos = [];

    try {
      console.log('Starting to scrape all regions...');

      for (const region of regions) {
        console.log(`Scraping region: ${region}`);
        
        try {
          const youtubeVideos = await this.youtubeScraper.scrapeTrending(region);
          allVideos.push(...youtubeVideos);
          console.log(`Found ${youtubeVideos.length} YouTube videos for ${region}`);

          const tiktokVideos = await this.tiktokScraper.scrapeTrending(region);
          allVideos.push(...tiktokVideos);
          console.log(`Found ${tiktokVideos.length} TikTok videos for ${region}`);

        } catch (error) {
          console.error(`Error scraping ${region}:`, error);
        }
      }

      const sortedVideos = allVideos
        .filter(video => video.views > 0)
        .sort((a, b) => b.views - a.views);

      console.log(`Total videos scraped: ${sortedVideos.length}`);
      return sortedVideos;

    } finally {
      this.isScraping = false;
    }
  }

  async scrapeByRegion(region) {
    if (!['global', 'usa', 'thailand'].includes(region)) {
      throw new Error('Invalid region');
    }

    const videos = [];

    try {
      const youtubeVideos = await this.youtubeScraper.scrapeTrending(region);
      videos.push(...youtubeVideos);

      const tiktokVideos = await this.tiktokScraper.scrapeTrending(region);
      videos.push(...tiktokVideos);

      return videos
        .filter(video => video.views > 0)
        .sort((a, b) => b.views - a.rows);

    } catch (error) {
      console.error(`Error scraping region ${region}:`, error);
      throw error;
    }
  }

  async cleanup() {
    await this.youtubeScraper.close();
    await this.tiktokScraper.close();
  }
}
