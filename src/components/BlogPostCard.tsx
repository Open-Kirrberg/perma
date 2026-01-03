import React from 'react';
import Link from '@docusaurus/Link';

interface BlogPostCardProps {
  post: {
    content: {
      metadata: {
        permalink: string;
        title: string;
        date: string;
        readingTime?: number;
        description?: string;
        tags?: Array<{label: string; permalink: string}>;
        frontMatter: Record<string, unknown>;
      };
    };
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPostCard({post}: BlogPostCardProps): JSX.Element {
  const {metadata} = post.content;
  const {permalink, title, date, readingTime, description, tags, frontMatter} = metadata;
  const image = frontMatter?.image as string | undefined;
  const formattedDate = formatDate(date);

  return (
    <article className="blog-card">
      <Link to={permalink} className="blog-card__link">
        {image && (
          <div className="blog-card__image-container">
            <img
              src={image}
              alt={title}
              className="blog-card__image"
              loading="lazy"
            />
          </div>
        )}
        <div className="blog-card__content">
          <h2 className="blog-card__title">{title}</h2>
          <div className="blog-card__meta">
            <time dateTime={date}>{formattedDate}</time>
            {readingTime && (
              <span className="blog-card__reading-time">
                {' · '}{Math.ceil(readingTime)} min Lesezeit
              </span>
            )}
          </div>
          {description && (
            <p className="blog-card__description">{description}</p>
          )}
          {tags && tags.length > 0 && (
            <div className="blog-card__tags">
              {tags.slice(0, 3).map((tag) => (
                <span key={tag.permalink} className="blog-card__tag">
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
