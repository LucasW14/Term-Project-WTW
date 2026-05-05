"use strict";
const pool = require('./dbConnection');

async function getEventById(id) {
    const queryText = "SELECT * FROM events where id= $1";
    const values = [id]; 
    const result = await pool.query(queryText, values);
    return result.rows[0];


} 


async function getEventsByType(params) {
    const queryText = "SELECT * FROM events where type= $1";
    const values = [params]; 
    const result = await pool.query(queryText, values);
    return result.rows;


} 

async function getAllEvents() {

    const queryText = "SELECT * FROM events WHERE event_date >= NOW() - INTERVAL '50 years' ORDER BY event_date DESC;"
    const result = await pool.query(queryText);
    return result.rows;
    
}

async function getEventsByDate(date){

    let queryText = "";
    // const queryText = "SELECT * FROM events WHERE TO_CHAR(event_date, 'YYYY-MM') = $1";

    console.log("here is date:", date.length);


    if(date.length === 4){
            
        // const queryText = "SELECT * FROM events WHERE TO_CHAR(event_date, 'YYYY') = $1";
        queryText = "SELECT * FROM events WHERE TO_CHAR(event_date, 'YYYY') = $1";


    }
    else if(date.length === 7){
        queryText = "SELECT * FROM events WHERE TO_CHAR(event_date, 'YYYY-MM') = $1";

    }
    else{
        queryText = "SELECT * FROM events WHERE TO_CHAR(event_date, 'YYYY-MM-DD') = $1";


    }


    const values = [date]
    const result = await pool.query(queryText, values);
    return result.rows;

}

async function postEvent(type, event_date, time_start, duration, location, planner, event_name, description, ticket_price){

    let queryText = "INSERT INTO events (type, event_date, time_start, duration, location, planner, event_name, description, ticket_price) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING * ";
    let values = [type, event_date, time_start, duration, location, planner, event_name, description, ticket_price];
    const result = await pool.query(queryText, values);
    return result.rows;
}

  async function updateEvent(id, type, event_date, time_start, duration, location, planner, event_name, description, ticket_price) {

  const queryText = `
    UPDATE events
    SET type = $2,
        event_date = $3,
        time_start = $4,
        duration = $5,
        location = $6,
        planner = $7,
        event_name = $8,
        description = $9,
        ticket_price = $10
    WHERE id = $1
    RETURNING *
  `;

  const values = [
    id,
    type,
    event_date,
    time_start,
    duration,
    location,
    planner,
    event_name,
    description,
    ticket_price
  ];

  const result = await pool.query(queryText, values);

  return result.rows[0] || null;
}

async function deleteEvent(id){

    let queryText = "DELETE FROM events WHERE id = $1 "
    const values = [id];
    const result = await pool.query(queryText, values);
    return result.rows[0];


}



module.exports = { 

    getEventsByType,
    getAllEvents,
    postEvent,
    getEventsByDate,
    updateEvent,
    deleteEvent,
    getEventById



}