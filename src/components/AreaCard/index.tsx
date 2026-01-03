import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface AreaCardProps {
  title: string;
  description: string;
  image?: string;
  link: string;
  size: string;
  status: 'active' | 'planned' | 'new';
}

const statusLabels = {
  active: 'Aktiv',
  planned: 'Geplant',
  new: 'Neu',
};

const statusColors = {
  active: styles.statusActive,
  planned: styles.statusPlanned,
  new: styles.statusNew,
};

const AreaCard: React.FC<AreaCardProps> = ({
  title,
  description,
  image,
  link,
  size,
  status,
}) => {
  return (
    <Link to={link} className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          {image ? (
            <img src={image} alt={title} className={styles.image} />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>🌿</span>
            </div>
          )}
          <span className={`${styles.statusBadge} ${statusColors[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.meta}>
            <span className={styles.size}>
              <span className={styles.icon}>📐</span>
              {size}
            </span>
            <span className={styles.arrow}>→</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default AreaCard;
