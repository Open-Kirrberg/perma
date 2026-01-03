import React, {useMemo} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

interface EventData {
  title: string;
  date: Date;
  description: string;
}

export default function UpcomingEvents(): JSX.Element {
  const events = useMemo(() => {
    // Load all event JSON files
    const eventsContext = require.context('../../events', false, /\.json$/);
    const allEvents: EventData[] = eventsContext.keys().map((key) => {
      const event = eventsContext(key);
      return {...event, date: new Date(event.date)};
    });

    // Sort by date and take first 4 events
    // Note: Events are in 2026, so we show them regardless of "future" status
    return allEvents
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 4);
  }, []);

  const formatShortDate = (date: Date) => {
    return {
      day: date.getDate(),
      month: date
        .toLocaleDateString('de-DE', {month: 'short'})
        .toUpperCase()
        .replace('.', ''),
    };
  };

  return (
    <section className={styles.eventsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Kommende Events
          </Heading>
          <p className={styles.sectionSubtitle}>
            Mach mit bei unseren nächsten Veranstaltungen
          </p>
        </div>

        <div className={styles.eventsGrid}>
          {events.map((event, idx) => {
            const shortDate = formatShortDate(event.date);
            return (
              <article key={idx} className={styles.eventCard}>
                <div className={styles.eventDate}>
                  <span className={styles.eventDay}>{shortDate.day}</span>
                  <span className={styles.eventMonth}>{shortDate.month}</span>
                </div>
                <div className={styles.eventContent}>
                  <h3 className={styles.eventTitle}>{event.title}</h3>
                  <p className={styles.eventDescription}>{event.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.viewAllContainer}>
          <Link
            to="/events"
            className="button button--outline button--primary button--lg">
            Alle Events anzeigen
          </Link>
        </div>
      </div>
    </section>
  );
}
