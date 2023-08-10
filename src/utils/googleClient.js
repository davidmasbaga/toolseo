import { google } from 'googleapis';

export function createClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: process.env.PRIVATE_KEY.replaceAll('\\n', '\n'),
      client_email: process.env.CLIENT_EMAIL,
    },
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const client = google.webmasters({
    version: 'v3',
    auth,
  });

  return client;
}
