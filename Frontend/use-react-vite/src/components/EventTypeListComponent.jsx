import EventService from '../EventService.jsx'
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../index.css';


const EventTypeListComponent = () => {
const { type } = useParams();
const [events, setEvents] = useState([])

useEffect(() => {
    if(type){
        EventService.getEventsByType(type).then((res) => {

            setEvents(res.data);
            document.title = `${type} events`



        })


    }
    else{
        

    }





},[type])



return(

<div>
      {/* <h2 className="text-center">{type ? type + ' List': 'Events List'}</h2>
      {type && <Link to="/products" className="card-link">Product List</Link>}
      <div className="row">
        <Link to="/add-product" className="btn btn-outline-primary">Add Product</Link>
      </div> */}
      <div className="row">
        <Link to="/events/" className="btn btn-outline-primary">Home</Link>
      </div>
            
            
      <div className="row">
        <Link to="/events/newevent" className="btn btn-outline-primary">Add Event</Link>
      </div>


      <main className="items-container">
        {events.map(event => (
          <article className="item" key={event.id}>
            <div className="text">
              <h3>
                {event.event_name}
              </h3>
              <p>Date: {event.event_date}</p>
              <p>Type: {event.type}</p>
              <p>Location: {event.location}</p>
              {/* <p><Link to={`/products/type/${product.type}`}>{product.type}</Link></p> */}
              {/* <p><Link className="detail-button" to={`/products/${product.id}`}>View</Link></p> */}
              {/* <button className="delete-button" onClick={() => ProductsService.deleteProduct(product.id)
                .then(() => setProducts(products.filter(p => p.id !== product.id)))}>Delete</button> */}

            </div>
          </article>
        ))}
      </main>
    </div>



);




};

export default EventTypeListComponent;
























