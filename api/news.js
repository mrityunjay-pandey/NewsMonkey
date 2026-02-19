// Vercel serverless function to fetch news from NewsAPI.org.
// This keeps the API key on the server and avoids CORS issues in production.

export default async function handler(req, res) {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ status: 'error', message: 'Missing NEWS_API_KEY on server' });
    }

    const { category, q } = req.query;

    const params = new URLSearchParams({
      country: 'us',
      pageSize: '30'
    });

    if (category && category !== 'top') {
      params.append('category', category);
    }

    if (q && q.trim()) {
      params.append('q', q.trim());
    }

    const url = `https://newsapi.org/v2/top-headlines?${params.toString()}`;

    const response = await fetch(url, {
      headers: {
        'X-Api-Key': apiKey
      }
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    console.error('Server news handler error:', err);
    return res
      .status(500)
      .json({ status: 'error', message: 'Failed to fetch news on server' });
  }
}

