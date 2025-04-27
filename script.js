// Always use HTTPS
const backendUrl = 'https://a7med-alshatebi.tech'; 
const apiEndpoint = `${backendUrl}/instagram-proxy`;

fetch(apiEndpoint)
  .then(response => response.json())
  .then(data => /* handle data */);


// config.js
export const API_ENDPOINTS = {
  instagramFeed: 'https://a7med-alshatebi.tech/instagram-proxy'
};

// During build process, replaces process.env.BACKEND_URL
const apiUrl = process.env.BACKEND_URL || 'https://fallback-domain.com';




// In frontend code
const PROXY_URL = 'https://a7med-alshatebi.tech/instagram-proxy';

// In backend CORS config
const allowedOrigins = [
  'https://a7med-alshatebi.github.io', // GitHub Pages
  'https://a7med-alshatebi.tech' // Your domain
];
