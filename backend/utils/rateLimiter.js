import { SCRAPING_CONFIG } from '../config/constants.js';

export class RateLimiter {
  constructor() {
    this.lastRequestTime = 0;
  }

  async waitIfNeeded() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < SCRAPING_CONFIG.DELAY_BETWEEN_REQUESTS) {
      const waitTime = SCRAPING_CONFIG.DELAY_BETWEEN_REQUESTS - timeSinceLastRequest;
      console.log(`Waiting ${waitTime}ms to respect rate limiting...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
    
    this.lastRequestTime = Date.now();
  }

  getRandomUserAgent() {
    const randomIndex = Math.floor(Math.random() * SCRAPING_CONFIG.USER_AGENTS.length);
    return SCRAPING_CONFIG.USER_AGENTS[randomIndex];
  }
}
