export const extractHashtags = (text) => {
  if (!text) return [];
  const hashtagRegex = /#[\w\u0E00-\u0E7F]+/g;
  const matches = text.match(hashtagRegex);
  return matches ? matches.slice(0, 5) : [];
};

export const formatViews = (viewsText) => {
  if (!viewsText) return 0;
  
  const views = viewsText.toLowerCase()
    .replace(/[^0-9kmb.]/g, '')
    .trim();

  if (views.includes('m')) {
    return Math.floor(parseFloat(views) * 1000000);
  } else if (views.includes('k')) {
    return Math.floor(parseFloat(views) * 1000);
  } else {
    return parseInt(views) || 0;
  }
};

export const generateId = (platform, region) => {
  return `${platform}_${region}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const takeScreenshot = async (page, selector) => {
  try {
    const element = await page.$(selector);
    if (element) {
      return await element.screenshot({ encoding: 'base64' });
    }
  } catch (error) {
    console.log('Screenshot failed:', error.message);
  }
  return null;
};
