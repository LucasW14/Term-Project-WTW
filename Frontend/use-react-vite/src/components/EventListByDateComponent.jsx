import EventService from '../EventService.jsx'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const EventListByDateComponent = () => {
  const [events, setEvents] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  // useEffect(() => {

  //   EventService.getEventsByDate(year).then((res) => {
  //     setEvents(res.data);
  //     document.title = `Whats The Word`

  //   })

  // }, [year, month, day]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED", year, month, day);


    EventService.getEventsByDate(year, month, day).then((res) => {
      console.log("heres data: ", res.data)

      setEvents(res.data);
      document.title = `Whats The Word`


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
            <label>Year(YYYY)</label>
            <input type="text" id="year" name="year" placeholder="year" onChange={(e) => setYear(e.target.value)} required />
          </div>

          <div>
            <label>Month(MM)</label>
            <input type="text" id="month" name="month" placeholder="month" onChange={(e) => setMonth(e.target.value)} />
          </div>

          <div>
            <label>Day(DD)</label>
            <input type="text" id="day" name="day" placeholder="day" onChange={(e) => setDay(e.target.value)} />
          </div>

          <button type="submit">Search</button>

        </div>
      </form>

      Event Grid
      <main className="grid">
        {events.map(event => (
          <article className="card" key={event.id}>
            
            <div className="card-top">
              <h2>{event.event_name}</h2>
              <span className="badge">{event.type}</span>
            </div>

            <p className="date">📅 {event.event_date}</p>
            <p className="location">📍 {event.location}</p>

            <Link to={`/events/${event.type}`} className="link">
              View similar events →
            </Link>

          </article>
        ))}
      </main>

    </div>
  );
};

export default EventListByDateComponent;