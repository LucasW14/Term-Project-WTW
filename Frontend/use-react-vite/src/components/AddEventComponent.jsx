import { useState, useEffect } from 'react';
import EventsService from '../EventService';
import '../index.css';
import {Link, useNavigate } from 'react-router-dom';


const AddEventComponent = () => {

const[type, setType] = useState('');
const[event_date, setEventDate] = useState('');
const[time_start, setTimeStart] = useState('');
const[duration, setDuration] = useState(0); 
const[location, setLocation] = useState(''); 
const[planner, setPlanner] = useState(''); 
const[event_name, setEventName] = useState('');
const[description, setDescription] = useState(''); 
const[ticket_price, setTicketPrice] = useState('');
const navigate = useNavigate();

const handleSubmit = (e) => {
    e.preventDefault();
    const event = { type, event_date, time_start, duration, location, planner, event_name, description, ticket_price};
    EventsService.addEvent(event).then(() => {
        navigate(`/events/type/${event.type}`)

    })
    .catch((error) => {

        console.log("error saving event error: ", error);

    });

}

useEffect(() => {
    document.title = 'Add Product';
}, []);

  return(
 <div>

  <div className="row">
        <Link to="/events/" className="btn btn-outline-primary">Home</Link>
      </div>
      


      <h2 className="text-center">Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Name:</label>
          <input
            type="text" className="form-control" value={event_name}
            onChange={(e) => setEventName(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label>Type:</label>
          <input type="text" className="form-control"
            value={type} onChange={(e) => setType(e.target.value)} required
          />
        </div>
        <div className="form-group">
          <label>Event_Date:</label>
          <input
            type="text" className="form-control" value={event_date}
            onChange={(e) => setEventDate(e.target.value)} required
          />
        </div>
          <div className="form-group">
          <label>Start Time:</label>
          <input
            type="text" className="form-control" value={time_start}
            onChange={(e) => setTimeStart(e.target.value)} required
          />
        </div>
          <div className="form-group">
          <label>Duration:</label>
          <input
            type="number" className="form-control" value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))} required
          />
        </div>
          <div className="form-group">
          <label>Location:</label>
          <input
            type="text" className="form-control" value={location}
            onChange={(e) => setLocation(e.target.value)} required
          />
        </div>
          <div className="form-group">
          <label>Planner:</label>
          <input
            type="text" className="form-control" value={planner}
            onChange={(e) => setPlanner(e.target.value)} required
          />
        </div>
          <div className="form-group">
          <label>Description:</label>
          <textarea
            type="text" className="form-control" value={description}
            onChange={(e) => setDescription(e.target.value)} required
          />
        </div>
          <div className="form-group">
          <label>Ticket Price:</label>
          <input
            type="number"   step="any" className="form-control" value={ticket_price}
            onChange={(e) => setTicketPrice(parseFloat(e.target.value))} required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Product</button>
      </form>
    </div>

  );




}; 

export default AddEventComponent;
