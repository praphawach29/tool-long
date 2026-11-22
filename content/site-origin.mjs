const deploymentHost = process.env.VERCEL_ENV === 'production'
  ? process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  : process.env.VERCEL_URL;

export const siteOrigin = process.env.SITE_URL || (deploymentHost && `https://${deploymentHost}`);
