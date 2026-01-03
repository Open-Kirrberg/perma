import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import WikiHighlight from '@site/src/components/WikiHighlight';
import UpcomingEvents from '@site/src/components/UpcomingEvents';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      {/* Decorative organic shapes */}
      <div className={styles.heroDecoration}>
        <div className={styles.leafShape1}></div>
        <div className={styles.leafShape2}></div>
        <div className={styles.circleOrganic}></div>
      </div>

      <div className={clsx('container', styles.heroContent)}>
        {/* CSS Text Logo */}
        <div className={styles.logoContainer}>
          <span className={styles.logoLeaf}>🌱</span>
          <Heading as="h1" className={styles.heroTitle}>
            Permakultur
            <span className={styles.heroTitleAccent}>Kirrberg</span>
          </Heading>
        </div>

        <p className={styles.heroTagline}>{siteConfig.tagline}</p>

        <div className={styles.heroButtons}>
          <Link
            className={clsx('button button--primary button--lg', styles.primaryButton)}
            to="/areas/intro">
            Unsere Flächen erkunden
          </Link>
          <Link
            className={clsx('button button--outline button--lg', styles.secondaryButton)}
            to="/wiki/intro">
            Zum Pflanzen-Wiki
          </Link>
        </div>
      </div>

      {/* Hero image with overlay */}
      <div className={styles.heroImageContainer}>
        <img
          src="/img/wiese_001/wiese.jpg"
          alt="Permakultur Garten"
          className={styles.heroImage}
        />
        <div className={styles.heroImageOverlay}></div>
      </div>
    </header>
  );
}

function QuickStats() {
  return (
    <section className={styles.quickStats}>
      <div className="container">
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>3+</span>
            <span className={styles.statLabel}>Flächen</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>50+</span>
            <span className={styles.statLabel}>Pflanzenarten</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>70+</span>
            <span className={styles.statLabel}>Events/Jahr</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Startseite"
      description="Permakultur Kirrberg - Natur im Gleichgewicht. Entdecke unsere nachhaltigen Gärten, Pflanzen-Wiki und kommende Events.">
      <HomepageHero />
      <main>
        <QuickStats />
        <HomepageFeatures />
        <WikiHighlight />
        <UpcomingEvents />
      </main>
    </Layout>
  );
}
