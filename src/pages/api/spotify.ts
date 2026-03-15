import type { NextApiRequest, NextApiResponse } from 'next';

const ARTIST_ID = '6VxXJZxxq0cmpBvbVM8p0E';

async function getAccessToken(): Promise<string> {
  const creds = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await res.json();
  return data.access_token;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = await getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    const [artistRes, topTracksRes, albumsRes] = await Promise.all([
      fetch(`https://api.spotify.com/v1/artists/${ARTIST_ID}`, { headers }),
      fetch(`https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=BJ`, { headers }),
      fetch(
        `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=single,album&market=BJ&limit=20`,
        { headers }
      ),
    ]);

    const [artist, topTracksData, albumsData] = await Promise.all([
      artistRes.json(),
      topTracksRes.json(),
      albumsRes.json(),
    ]);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.json({
      artist,
      topTracks: topTracksData.tracks ?? [],
      albums: albumsData.items ?? [],
    });
  } catch {
    res.status(500).json({ error: 'Failed to fetch Spotify data' });
  }
}
