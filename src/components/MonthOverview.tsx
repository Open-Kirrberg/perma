import React from 'react';

const GERMAN_MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

interface Event {
  title: string;
  date: Date;
  description: string;
}

function MonthOverview() {
  // Load all event JSON files
  const eventsContext = require.context('../events', false, /\.json$/);
  const events: Event[] = eventsContext.keys().map(key => {
    const event = eventsContext(key);
    return { ...event, date: new Date(event.date) };
  });

  // Sort events by date
  events.sort((a, b) => a.date.getTime() - b.date.getTime());

  // Group events by month
  const eventsByMonth: { [key: number]: Event[] } = {};
  events.forEach(event => {
    const month = event.date.getMonth();
    if (!eventsByMonth[month]) {
      eventsByMonth[month] = [];
    }
    eventsByMonth[month].push(event);
  });

  // Format date as DD.MM
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  return (
    <div className="month-overview">
      {GERMAN_MONTHS.map((monthName, monthIndex) => {
        const monthEvents = eventsByMonth[monthIndex] || [];
        if (monthEvents.length === 0) return null;

        return (
          <div key={monthIndex} className="month-section">
            <h3>{monthName}</h3>
            <ul>
              {monthEvents.map((event, idx) => (
                <li key={idx}>
                  <span className="event-date">{formatDate(event.date)}</span>
                  <span className="event-content">
                    <span className="event-title">{event.title}</span>
                    <span className="event-separator">—</span>
                    <span className="event-description">{event.description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default MonthOverview;
