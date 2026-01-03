import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const GERMAN_WEEKDAYS = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
const GERMAN_MONTHS = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Automatically load all JSON files from the events folder
  const eventsContext = require.context('../events', false, /\.json$/);
  const events = eventsContext.keys().map(key => {
    const event = eventsContext(key);
    return { ...event, date: new Date(event.date) };
  });

  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = event.date.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  // Event indicator dot
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateKey = date.toDateString();
      if (eventsByDate[dateKey]) {
        return <div className="event-indicator" aria-label="Has events" />;
      }
    }
    return null;
  };

  // Format date in German
  const formatDateGerman = (date: Date) => {
    const day = date.getDate();
    const month = GERMAN_MONTHS[date.getMonth()];
    const year = date.getFullYear();
    const weekday = GERMAN_WEEKDAYS[date.getDay()];
    return `${weekday}, ${day}. ${month} ${year}`;
  };

  const selectedEvents = eventsByDate[selectedDate.toDateString()] || [];

  return (
    <div className="event-calendar-container">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
        locale="de-DE"
        maxDetail="month"
        prev2Label={null}
        next2Label={null}
      />
      <div className="event-details">
        <h3>{formatDateGerman(selectedDate)}</h3>
        {selectedEvents.length > 0 ? (
          <ul>
            {selectedEvents.map((event, idx) => (
              <li key={idx}>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Keine Termine an diesem Tag.</p>
        )}
      </div>
    </div>
  );
}

export default EventCalendar;
