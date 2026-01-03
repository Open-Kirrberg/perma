import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  img: string;
  description: JSX.Element;
  link: string;
  linkText: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Permakultur Grundlagen',
    img: '/img/permaculture_basics.jpeg',
    description: (
      <>
        Entdecke die Grundlagen der Permakultur und erfahre, wie du nachhaltige
        Lebensräume gestalten kannst, die im Einklang mit der Natur stehen.
      </>
    ),
    link: '/vision',
    linkText: 'Mehr erfahren',
  },
  {
    title: 'Interaktive Karte',
    img: '/img/areas.jpeg',
    description: (
      <>
        Erkunde unsere Permakultur-Flächen auf einer interaktiven Karte mit
        Satellitenansicht und Baumstandorten.
      </>
    ),
    link: '/map',
    linkText: 'Karte öffnen',
  },
  {
    title: 'Baumschule',
    img: '/img/klimakarte.png',
    description: (
      <>
        Unsere Baumschule bietet eine Auswahl an Obstbäumen und Edelreisern
        für dein eigenes Permakultur-Projekt.
      </>
    ),
    link: '/baumschule',
    linkText: 'Zur Baumschule',
  },
];

function Feature({title, img, description, link, linkText}: FeatureItem) {
  const imgSrc = useBaseUrl(img);
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <article className={styles.featureCard}>
        <div className={styles.featureImageContainer}>
          <img src={imgSrc} alt={title} className={styles.featureImage} />
          <div className={styles.featureImageOverlay}></div>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3" className={styles.featureTitle}>
            {title}
          </Heading>
          <p className={styles.featureDescription}>{description}</p>
          <Link to={link} className={styles.featureLink}>
            {linkText}
            <span className={styles.arrow}>→</span>
          </Link>
        </div>
      </article>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Was wir bieten
          </Heading>
          <p className={styles.sectionSubtitle}>
            Ressourcen und Wissen für nachhaltige Gartenarbeit
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
