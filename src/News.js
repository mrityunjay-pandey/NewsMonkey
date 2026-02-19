import React, { useEffect, useMemo, useState } from 'react';
import NewsItem from './NewsItem';
import sampleData from './sampleOutlet.json';

const API_BASE = 'https://newsapi.org/v2';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('top');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          country: 'us', // use a region with plenty of headlines on the free tier
          pageSize: '30'
        });

        if (category && category !== 'top') {
          params.append('category', category);
        }

        if (query.trim()) {
          params.append('q', query.trim());
        }

        const isProd = process.env.NODE_ENV === 'production';

        const endpoint = isProd
          ? `/api/news`
          : `${API_BASE}/top-headlines`;

        const fetchUrl = isProd
          ? `${endpoint}?${params.toString()}`
          : `${endpoint}?${params.toString()}`;

        const fetchOptions = isProd
          ? { signal: controller.signal }
          : {
              headers: { 'X-Api-Key': process.env.REACT_APP_NEWS_API_KEY },
              signal: controller.signal
            };

        const res = await fetch(fetchUrl, fetchOptions);

        if (!res.ok) {
          throw new Error(`News API error: ${res.status}`);
        }

        const data = await res.json();

        // NewsAPI often returns HTTP 200 with an error payload.
        if (data.status === 'error') {
          console.error('News API error payload:', data);
          throw new Error(data.message || 'News API returned an error');
        }

        // Use whatever the API returns for this category/query combination.
        // If it returns an empty list, we intentionally show "No stories found"
        // so categories don't all look identical.
        const liveArticles = data.articles || [];
        setArticles(liveArticles);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('News fetch failed, using fallback sample data:', err);
          // Show a friendly error but still render sample articles so the UI
          // never feels empty while you debug API issues or quotas.
          setError(
            err.message ||
              'Failed to fetch live news. Showing sample stories instead.'
          );
          setArticles(sampleData.articles || []);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => controller.abort();
  }, [category, query]);

  const filteredArticles = useMemo(
    () =>
      articles.map((a) => ({
        ...a,
        title: a.title || '',
        description: a.description || '',
        url: a.url,
        urlToImage: a.urlToImage,
        sourceName: a.source?.name,
        publishedAt: a.publishedAt
      })),
    [articles]
  );

  // Placeholder for ML classification hook.
  const classifyArticle = () => null;

  return (
    <div className="app-root">
      <div className="app-shell">
        <header className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
            <div>
              <h1 className="app-header-title">Top headlines for you</h1>
              <p className="app-header-subtitle">
                Real-time news tailored by topic, ready for your future ML
                classifier.
              </p>
            </div>
          </div>

          <div className="filters-row">
            <span className="filters-row-label">Filters</span>
            <div className="d-flex flex-wrap gap-2">
              {['top', 'business', 'technology', 'sports', 'entertainment', 'health', 'science'].map(
                (c) => (
                  <button
                    key={c}
                    type="button"
                    className={
                      'category-pill ' +
                      (category === c ? 'category-pill-active' : '')
                    }
                    onClick={() => setCategory(c)}
                  >
                    {c === 'top'
                      ? 'Top stories'
                      : c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                )
              )}
            </div>

            <div className="ms-auto">
              <input
                type="search"
                className="form-control form-control-sm search-input"
                placeholder="Search headlines…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {loading && (
          <div className="mt-4 text-center text-muted">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading news…</span>
            </div>
            <p className="mt-2">Fetching fresh headlines…</p>
          </div>
        )}

        {error && !loading && (
          <div className="alert alert-danger mt-4" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && filteredArticles.length === 0 && (
          <p className="mt-4 text-muted">
            No stories found. Try a different search or category.
          </p>
        )}

        {!loading && !error && filteredArticles.length > 0 && (
          <section className="news-grid">
            {filteredArticles.map((article) => (
              <NewsItem
                key={article.url}
                title={article.title}
                description={article.description}
                imageUrl={article.urlToImage}
                newsUrl={article.url}
                source={article.sourceName}
                publishedAt={article.publishedAt}
                mlTag={classifyArticle?.(article)}
              />
            ))}
          </section>
        )}

        <p className="footer-muted">
          Data by NewsAPI.org · ML-based topic &amp; quality scores can be
          wired into each card via the <code>mlTag</code> prop.
        </p>
      </div>
    </div>
  );
};

export default News;