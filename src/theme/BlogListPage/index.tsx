import React from 'react';
import Layout from '@theme/Layout';
import BlogPostCard from '@site/src/components/BlogPostCard';
import type BlogListPageType from '@theme/BlogListPage';
import type {WrapperProps} from '@docusaurus/types';
import Link from '@docusaurus/Link';

type Props = WrapperProps<typeof BlogListPageType>;

export default function BlogListPageWrapper(props: Props): JSX.Element {
  const {metadata, items} = props;
  const {blogTitle, blogDescription, nextPage, previousPage} = metadata;

  return (
    <Layout title={blogTitle} description={blogDescription}>
      <header className="blog-header">
        <div className="container">
          <h1 className="blog-header__title">{blogTitle}</h1>
          <p className="blog-header__subtitle">
            Neuigkeiten und Geschichten aus unserem Permakultur-Projekt
          </p>
        </div>
      </header>
      <main className="container margin-vert--lg">
        <div className="blog-grid">
          {items.map(({content: BlogPostContent}) => {
            const {metadata: postMetadata} = BlogPostContent;
            return (
              <BlogPostCard
                key={postMetadata.permalink}
                post={{
                  content: {
                    metadata: {
                      permalink: postMetadata.permalink,
                      title: postMetadata.title,
                      date: postMetadata.date,
                      readingTime: postMetadata.readingTime,
                      description: postMetadata.description,
                      tags: postMetadata.tags,
                      frontMatter: postMetadata.frontMatter,
                    },
                  },
                }}
              />
            );
          })}
        </div>
        <nav className="blog-pagination" aria-label="Blog-Seitennavigation">
          <div className="blog-pagination__links">
            {previousPage && (
              <Link
                className="blog-pagination__link blog-pagination__link--prev"
                to={previousPage}>
                ← Neuere Beiträge
              </Link>
            )}
            {nextPage && (
              <Link
                className="blog-pagination__link blog-pagination__link--next"
                to={nextPage}>
                Ältere Beiträge →
              </Link>
            )}
          </div>
        </nav>
      </main>
    </Layout>
  );
}
