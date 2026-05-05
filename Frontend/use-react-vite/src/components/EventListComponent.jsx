import EventService from "../EventService.jsx";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import LoginComponent from "./auth/LoginComponent.jsx";

const EventListComponent = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(undefined);
  const [loadingEvents, setLoadingEvents] = useState(true);

  // EVENTS
  useEffect(() => {
    setLoadingEvents(true);

    EventService.getAllEvents()
      .then((res) => {
        setEvents(res.data);
        document.title = "Whats The Word";
      })
      .finally(() => setLoadingEvents(false));
  }, []);

  // AUTH CHECK + FORCE REFRESH AFTER GOOGLE LOGIN
  useEffect(() => {
    const checkUser = () => {
      fetch("http://localhost:3000/auth/me", {
        credentials: "include",
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    };

    // normal check
    checkUser();

    // 🔥 detect return from Google login
    const url = new URL(window.location.href);
    const fromGoogle = url.searchParams.get("fromGoogle");

    if (fromGoogle === "1") {
      // remove flag so it doesn't loop
      url.searchParams.delete("fromGoogle");
      window.history.replaceState({}, document.title, url.pathname);

      // force refresh once
      window.location.reload();
    }
  }, []);

  return (
    <div className="page">

      {/* HEADER */}
      <header className="header">

        <div className="header-top">
          <h1>🎉 Whats The Word</h1>
          <h3>Events Hub</h3>

          <div className="auth-box top-right">
            {user === undefined ? (
              <span className="muted">Checking session...</span>
            ) : user ? (
              <div className="user-box">
                <span className="welcome">
                  Wassup👋 {user.first_name || user.name}
                </span>

                <button
                  className="logout-btn"
                  onClick={async () => {
                    await fetch("http://localhost:3000/auth/logout", {
                      method: "POST",
                      credentials: "include",
                    });
                    setUser(null);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <LoginComponent />
            )}
          </div>
        </div>

        <p className="subtitle">Discover what’s happening around you</p>

        <div className="nav-buttons">
          <Link to="/events/" className="btn">Home</Link>
          <Link to="/events/newevent" className="btn primary">
            + Add Event
          </Link>
          <Link to="/events/bydate" className="btn primary">
            Search by Date
          </Link>
          <Link to="/events/location" className="btn primary">Search By Location </Link>
          
        </div>
      </header>

      {/* CONTENT */}
      <main className="grid">

        {loadingEvents ? (
          <div className="loading">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="empty">No events found 🎈</div>
        ) : (
          events.map((event) => (
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
          ))
        )}

      </main>
    </div>
  );
};

export default EventListComponent;