import axios from 'axios';

const EVENT_API_URL = import.meta.env.VITE_API_URL;
const TICKET_MASTER_KEY = import.meta.env.VITE_TICKET_MASTER_KEY;

class EventService {



    getEventsByType(type) {


        return axios.get(`${EVENT_API_URL}/${type}`);

    }

    getAllEvents() {


        return axios.get(`${EVENT_API_URL}/`);

    }

    getEventsByDate(year, month, day) {

        let date = "";

        if(month == ""){

            date = `${year}`;


        }
        else if (day == ""){

            date = `${year}-${month}`;


        }
        else{
            date = `${year}-${month}-${day}`;


        }



        return axios.get(`${EVENT_API_URL}/dates/${date}`);
        


    }

    addEvent(event) {


        return axios.post(`${EVENT_API_URL}/addEvent`, event);



    }

    getEventsLocation(location){



        return axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?city=${location}&apikey=${TICKET_MASTER_KEY}`)
    }



}

export default new EventService();