import { useState, useEffect } from 'react';
import EventsService from '../EventService';
import '../index.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ModifyEventComponent = () => {

    const { id } = useParams();
    const navigate = useNavigate();


    const [type, setType] = useState('');
    const [event_date, setEventDate] = useState('');
    const [time_start, setTimeStart] = useState('');
    const [duration, setDuration] = useState(0);
    const [location, setLocation] = useState('');
    const [planner, setPlanner] = useState('');
    const [event_name, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [ticket_price, setTicketPrice] = useState(0);

    // 🔥 LOAD EXISTING EVENT
    useEffect(() => {
        EventsService.getEventById(id)
            .then((res) => {
                const event = res.data;

                setType((event.type || '').trim());
                setEventDate(event.event_date ? event.event_date.split('T')[0] : '');
                setTimeStart(event.time_start || '');
                setDuration(event.duration ?? 0);
                setLocation(event.location || '');
                setPlanner(event.planner || '');
                setEventName(event.event_name || '');
                setDescription(event.description || '');
                setTicketPrice(event.ticket_price ?? 0);
            })
            .catch((err) => {
                console.log("Error loading event:", err);
            });
    }, [id]);


    console.log("the event is", id);
    // 🔥 UPDATE EVENT
    const handleSubmit = (e) => {
    e.preventDefault();

    const updatedEvent = {
        type: type?.trim(),
        event_date,
        time_start,
        duration: Number(duration),
        location: location?.trim(),
        planner: planner?.trim(),
        event_name: event_name?.trim(),
        description: description?.trim(),
        ticket_price: Number(ticket_price)
    };

    console.log("FINAL PAYLOAD:", updatedEvent);

    EventsService.updateEvent(id, updatedEvent)
        .then(() => {
            navigate(`/events/${type}`);
        })
        .catch((error) => {
            console.log("FULL ERROR:", error.response?.data || error);
        });
};

    return (
        <div>

            <div className="header">
                <h1>🎉 Whats The Word</h1>
            </div>

            <div className="row">
                <Link to="/events/" className="btn btn-outline-primary">Home</Link>
            </div>

            <h2 className="text-center">Edit Event</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Event Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={event_name}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Type:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Event Date:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={event_date}
                        onChange={(e) => setEventDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Start Time:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={time_start}
                        onChange={(e) => setTimeStart(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Duration:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value) || 0)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Planner:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={planner}
                        onChange={(e) => setPlanner(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Description:</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Ticket Price:</label>
                    <input
                        type="number"
                        step="any"
                        className="form-control"
                        value={ticket_price}
                        onChange={(e) => setTicketPrice(Number(e.target.value) || 0)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Update Event
                </button>

            </form>
        </div>
    );
};

export default ModifyEventComponent;