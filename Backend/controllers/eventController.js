"use strict";
const model = require('../models/eventModel');

async function getEventsType(req, res) {
    const type = req.params.type;

    if (type) {

        try {
            const events = await model.getEventsByType(type);
            res.json(events);

        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }


    }

    else {

        res.status(400).send("Missing required type param")


    }
}

async function getEvents(req, res) {

        try {
            const events = await model.getAllEvents();
            res.json(events);

        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }

}

async function getEventsDate(req, res) {
    const date = req.params.date;
    console.log(date);
    console.log(date.length);



    if (date) {

        try {
            const events = await model.getEventsByDate(date);
            res.json(events);

        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }


    }

    else {

        res.status(400).send("Missing required type param")


    }
}

async function addEvent(req, res){

    const { type, event_date, time_start, duration, location, planner, event_name, description, ticket_price } = req.body;

    if(type && event_date && time_start && duration && location && planner && event_name && description && ticket_price){
        
    try{

        const newEvent = await model.postEvent(type, event_date, time_start, duration, location, planner, event_name, description, ticket_price);
        res.status(201).json(newEvent);

    } catch(err){

        console.error(err);
        res.status(500).send("Server error");
    }

    }
    else{
        res.status(400).send("Missing event fields")

    }        



}


module.exports = {

    getEventsType,
    getEvents,
    addEvent,
    getEventsDate





};