import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";
import moment from "moment";

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [date, setDate] = useState();

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => setTrainings(data.content))
            .then(data => setDate(data.date))
            .catch(err => console.error(err))
    };

    const columns = [
        {
            title: "Date",
            field: "date",
            render: row => (
                <span>
                        {moment(row.date).format("LLLL")}
                    </span>)
        },
        {
            title: "Duration",
            field: "duration"
        },
        {
            title: "Activity",
            field: "activity"
        },
    ];

    return (
        <div>
            <MaterialTable columns={columns} data={trainings} title="Trainings"/>
        </div>
    )

}