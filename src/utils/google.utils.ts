import { google } from 'googleapis';

// Google OAuth2 client setup
export const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// Set the access token (you might need to get this from your authentication flow)
oAuth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});