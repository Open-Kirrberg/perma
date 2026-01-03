import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const wikiCategories = [
  {
    title: 'Bäume',
    icon: '🌳',
    description: 'Obstbäume, Laubbäume und mehr',
    link: '/wiki/baume/brine-conference',
    count: '7+',
  },
  {
    title: 'Beeren',
    icon: '🫐',
    description: 'Blaubeeren, Himbeeren und andere Beerensträucher',
    link: '/wiki/beeren/blaubeeren',
    count: '1+',
  },
  {
    title: 'Kräuter',
    icon: '🌿',
    description: 'Küchenkräuter und Heilpflanzen',
    link: '/wiki/intro',
    count: 'Bald',
  },
  {
    title: 'Gemüse',
    icon: '🥕',
    description: 'Saisonales Gemüse aus dem Garten',
    link: '/wiki/intro',
    count: 'Bald',
  },
];

export default function WikiHighlight(): JSX.Element {
  return (
    <section className={styles.wikiSection}>
      <div className="container">
        <div className={styles.wikiLayout}>
          {/* Left: Image */}
          <div className={styles.wikiImageContainer}>
            <img
              src="/img/wiki.jpeg"
              alt="Pflanzen Wiki"
              className={styles.wikiImage}
            />
            <div className={styles.wikiImageOverlay}>
              <span className={styles.wikiImageText}>50+ Pflanzenarten</span>
            </div>
          </div>

          {/* Right: Content */}
          <div className={styles.wikiContent}>
            <Heading as="h2" className={styles.wikiTitle}>
              Pflanzen-Wiki
            </Heading>
            <p className={styles.wikiDescription}>
              Entdecke unsere umfangreiche Sammlung an Pflanzeninformationen.
              Von Obstbäumen bis zu Beerensträuchern - finde Anbauhinweise,
              Pflegetipps und alles, was du für deinen Permakultur-Garten
              brauchst.
            </p>

            <div className={styles.categoriesGrid}>
              {wikiCategories.map((category, idx) => (
                <Link
                  key={idx}
                  to={category.link}
                  className={styles.categoryCard}>
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <div className={styles.categoryInfo}>
                    <h4 className={styles.categoryTitle}>{category.title}</h4>
                    <span className={styles.categoryCount}>
                      {category.count} Einträge
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <Link
              to="/wiki/intro"
              className="button button--primary button--lg">
              Wiki erkunden
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
