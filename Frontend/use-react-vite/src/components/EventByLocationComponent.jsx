import EventService from '../EventService.jsx'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const EventListByLocationComponent = () => {
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState([]);

  // useEffect(() => {

  //   EventService.getEventsByDate(year).then((res) => {
  //     setEvents(res.data);
  //     document.title = `Whats The Word`

  //   })

  // }, [year, month, day]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED", location);


    EventService.getEventsLocation(location).then((res) => {
      const eventData = res.data._embedded?.events;
      

      setEvents(eventData);
      document.title = `Whats The Word`
      console.log("heres data: ", events)
      

    })
      .catch((error) => {

        console.log("error saving event error: ", error);

      });

  }

  return (
    <div className="page">

      {/* Header */}
      <header className="header">
        <h1>🎉 Events Hub</h1>
        <p>must at least type in the year</p>

        <div className="nav-buttons">
          <Link to="/events/" className="btn">Home</Link>
          <Link to="/events/newevent" className="btn primary">+ Add Event</Link>
        </div>


      </header>

      <form onSubmit={handleSubmit}>
        <div id="date-search">

          <div>
            <label>Location(city)</label>
            <input type="text" id="location" name="year" placeholder="location" onChange={(e) => setLocation(e.target.value)} required />
          </div>

          <button type="submit">Search</button>

        </div>
      </form>

      Event Grid
      <main className="grid">
        {events.map(event => (
          <article className="card" key={event.id}>
            
            <div className="card-top">
              <h2>{event.name}</h2>
              <span className="badge">{event.type}</span>
            </div>

            <p className="date">📅 {event.dates.start.localDate}</p>
            <p className="location">📍 {event._embedded.venues[0].name}</p>

            <Link to={`/events/${event._embedded.type}`} className="link">
              View similar events →
            </Link>

          </article>
        ))}
      </main>

    </div>
  );
};

export default EventListByLocationComponent;