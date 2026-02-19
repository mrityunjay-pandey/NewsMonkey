import React from 'react';

const NewsItem = ({
  title,
  description,
  imageUrl,
  newsUrl,
  source,
  publishedAt,
  mlTag
}) => {
  const fallbackImage =
    'https://images.pexels.com/photos/2619490/pexels-photo-2619490.jpeg?auto=compress&cs=tinysrgb&w=1200';

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleString(undefined, {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      })
    : null;

  return (
    <article className="news-card">
      <div className="news-card-image-wrapper">
        <img
          className="news-card-image"
          src={imageUrl || fallbackImage}
          alt={title}
        />
        {source && <span className="news-card-badge">{source}</span>}
      </div>
      <div className="news-card-body">
        <h2 className="news-card-title">{title}</h2>
        {formattedDate && (
          <p className="news-card-meta">
            {formattedDate}
            {mlTag && (
              <>
                {' '}
                · <span className="badge-ml">{mlTag}</span>
              </>
            )}
          </p>
        )}
        {description && (
          <p className="news-card-description">{description}</p>
        )}
        <div className="news-card-footer">
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-sm btn-primary pill-button pill-button-primary"
          >
            Read full story
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsItem;