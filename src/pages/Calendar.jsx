import React, {useState} from 'react';
import 'typeface-roboto';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

export default function Customers() {

    const localizer = momentLocalizer(moment);
    const [trainings, setTrainings] = useState([]);

    React.useEffect(() => {
        fetch(`https://customerrest.herokuapp.com/gettrainings`)
            .then(response => response.json())
            .then(data => {
                let eventData = data;

                for (let i = 0; i < eventData.length; i++) {
                    eventData[i].date = new Date(eventData[i].date);
                    eventData[i].duration = new Date(moment(eventData[i].date).add(eventData[i].duration, "minutes").format());
                    eventData[i].customer =  `${eventData[i].customer.firstname}  ${eventData[i].customer.lastname}`;
                    eventData[i].activity = `${eventData[i].customer} | ${eventData[i].activity}`;

                    console.log(eventData[i]);
                }
                setTrainings(eventData);
            });
    }, []);

    return (
        <React.Fragment>
            <Calendar
                localizer={localizer}
                events={trainings}
                defaultDate={new Date()}
                defaultView="week"
                startAccessor="date"
                titleAccessor="activity"
                endAccessor="duration"
                style={{height: 700}}
            />
        </React.Fragment>
    );
}