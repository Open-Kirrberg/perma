import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


function EventCalendar() {
  // State to keep track of the selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Automatically load all JSON files from the events folder
  const eventsContext = require.context('../events', false, /\.json$/);
  const events = eventsContext.keys().map(key => {
    const event = eventsContext(key);
    // Ensure date is converted to a Date object for comparison
    return { ...event, date: new Date(event.date) };
  });

  // Group events by date (using toDateString for a simple date key)
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = event.date.toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(event);
    return acc;
  }, {});

  // Customize calendar tiles to indicate event days
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateKey = date.toDateString();
      if (eventsByDate[dateKey]) {
        // You can customize this indicator as needed
        return <div className="event-indicator" title="Event day">•</div>;
      }
    }
    return null;
  };

  return (
    <div className="event-calendar-container">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
      />
      <div className="event-details">
        <h3>Events on {selectedDate.toDateString()}</h3>
        {eventsByDate[selectedDate.toDateString()] ? (
          <ul>
            {eventsByDate[selectedDate.toDateString()].map((event, idx) => (
              <li key={idx}>
                <h4>{event.title}</h4>
                <p>{event.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No events.</p>
        )}
      </div>
    </div>
  );
}

export default EventCalendar;
