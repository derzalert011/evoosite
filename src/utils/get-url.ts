export function getURL(path = '') {
  // Get the base URL, checking multiple sources
  let baseURL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
  
  // Fallback to Vercel URL if available
  if (!baseURL && process.env.VERCEL_URL) {
    baseURL = `https://${process.env.VERCEL_URL}`;
  }
  
  // Final fallback to localhost
  if (!baseURL) {
    baseURL = 'http://localhost:3000';
  }

  // Ensure HTTPS for non-localhost URLs and format the path.
  const formattedURL = baseURL.startsWith('http') ? baseURL : `https://${baseURL}`;
  const cleanPath = path.replace(/^\/+/, '');

  // Return the full URL.
  return cleanPath ? `${formattedURL}/${cleanPath}` : formattedURL;
}
