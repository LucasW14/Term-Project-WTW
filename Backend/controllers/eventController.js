"use strict";
const model = require('../models/eventModel');


async function getEventWithId(req, res) {
    const id = req.params.id;

    if (id) {

        try {
            const events = await model.getEventById(id);
            res.json(events);

        } catch (err) {
            console.error(err);
            res.status(500).send("Server error");
        }


    }

    else {

        res.status(400).send("Missing required id param")


    }
}


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

async function addEvent(req, res) {

    const { type, event_date, time_start, duration, location, planner, event_name, description, ticket_price } = req.body;

    if (id && type && event_date && time_start && duration && location && planner && event_name && description && ticket_price) {

        try {

            const updatedEvent = await model.postEvent(type, event_date, time_start, duration, location, planner, event_name, description, ticket_price);
            res.status(201).json(newEvent);

        } catch (err) {

            console.error(err);
            res.status(500).send("Server error");
        }

    }
    else {
        res.status(400).send("Missing event fields")

    }



}

async function updateEvent(req, res) {

    const id = req.params.id;

    const { type, event_date, time_start, duration, location, planner, event_name, description, ticket_price } = req.body;

    if (
        id &&
        type &&
        event_date &&
        time_start &&
        duration != null &&
        location &&
        planner &&
        event_name &&
        description &&
        ticket_price != null
    ) {

        try {

            const updatedEvent = await model.updateEvent(id, type, event_date, time_start, duration, location, planner, event_name, description, ticket_price);
            if (!updatedEvent) {
                return res.status(404).json({ message: "Event not found" });
            }
            res.status(200).json(updatedEvent);

        } catch (err) {

            console.error(err);
            res.status(500).send("Server error");
        }

    }
    else {
        res.status(400).send("Missing event fields")

    }






}

async function eventDeletion(req, res) {

    const id = req.params.id;

    if (id) {

        try {
            const events = await model.deleteEvent(id);
            res.json(events);



        }
        catch (err) {
            console.error(err);
            res.status(500).send("Server error");

        }




    }
    else {
        res.status(400).send("problem with id")

    }




}




module.exports = {

    getEventsType,
    getEvents,
    addEvent,
    getEventsDate,
    updateEvent,
    eventDeletion,
    getEventWithId





};