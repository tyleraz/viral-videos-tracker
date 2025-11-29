import puppeteer from 'puppeteer';
import { RateLimiter } from '../utils/rateLimiter.js';
import { extractHashtags, formatViews, generateId } from '../utils/helpers.js';
import { SCRAPING_CONFIG, PLATFORM_URLS } from '../config/constants.js';

export class YouTubeScraper {
  constructor() {
    this.rateLimiter = new RateLimiter();
    this.browser = null;
  }

  async init() {
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    });
  }

  async scrapeTrending(region = 'global') {
    await this.rateLimiter.waitIfNeeded();
    
    if (!this.browser) {
      await this.init();
    }

    const page = await this.browser.newPage();
    
    try {
      await page.setUserAgent(this.rateLimiter.getRandomUserAgent());
      
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
          req.abort();
        } else {
          req.continue();
        }
      });

      const url = PLATFORM_URLS.youtube[region] || PLATFORM_URLS.youtube.global;
      console.log(`Scraping YouTube trending for ${region}: ${url}`);
      
      await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: SCRAPING_CONFIG.REQUEST_TIMEOUT 
      });

      await page.waitForSelector('ytd-video-renderer, ytd-rich-item-renderer', { timeout: 10000 });

      const videos = await page.evaluate((maxVideos, currentRegion) => {
        const videoElements = document.querySelectorAll('ytd-video-renderer, ytd-rich-item-renderer');
        const results = [];

        for (let i = 0; i < Math.min(videoElements.length, maxVideos); i++) {
          const element = videoElements[i];
          
          try {
            const titleElement = element.querySelector('#video-title');
            const viewElement = element.querySelector('.inline-metadata-item:last-child');
            const thumbnailElement = element.querySelector('yt-image img, #img');
            const linkElement = element.querySelector('a#thumbnail');

            const title = titleElement?.textContent?.trim();
            const link = linkElement?.href ? `https://www.youtube.com${linkElement.href}` : null;
            const views = viewElement?.textContent?.trim();
            const thumbnail = thumbnailElement?.src;

            if (title && link) {
              results.push({
                title,
                link,
                views,
                thumbnail
              });
            }
          } catch (error) {
            console.log('Error parsing video element:', error);
          }
        }

        return results;
      }, SCRAPING_CONFIG.MAX_VIDEOS_PER_REQUEST, region);

      const processedVideos = videos.map(video => ({
        id: generateId('youtube', region),
        title: video.title,
        link: video.link,
        screenshot: video.thumbnail,
        region,
        platform: 'youtube',
        hashtags: extractHashtags(video.title),
        views: formatViews(video.views),
        timestamp: new Date().toISOString()
      }));

      return processedVideos;

    } catch (error) {
      console.error(`YouTube scraping error for ${region}:`, error);
      return [];
    } finally {
      await page.close();
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
