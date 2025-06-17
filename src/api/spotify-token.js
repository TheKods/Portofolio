// Spotify API token endpoint
// This file should be deployed as a serverless function

// Import required libraries if using a serverless function framework
// Example for Vercel serverless functions:
// export default async function handler(req, res) {

/**
 * This is a serverless function that securely handles Spotify authentication
 * using the client credentials flow.
 * 
 * IMPORTANT: Never expose your Spotify client secret in client-side code
 */

// Example implementation using client credentials flow
async function getSpotifyToken() {
  // Use environment variables for credentials
  // For local development, these would come from .env.local
  // For production, these would be set in your hosting platform (e.g., Vercel)
  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || '6e3dc61f8f7c42319e16ba7164aeca2b';
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || '606d2cb3448e443592a66ac83338f41b';

  // Base64 encode the client ID and secret
  const authString = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return {
      token: data.access_token,
      expires_in: data.expires_in
    };
  } catch (error) {
    console.error('Error fetching Spotify token:', error);
    throw error;
  }
}

// Example handler for Vercel serverless function
export default async function handler(req, res) {
  try {
    // Get a fresh token using the client credentials flow
    const tokenData = await getSpotifyToken();
    res.status(200).json(tokenData);
  } catch (error) {
    console.error('Error in Spotify token endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch Spotify token' });
  }
}

// For other serverless platforms, adapt the export/handler as needed 