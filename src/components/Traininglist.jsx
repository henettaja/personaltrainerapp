import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";
import moment from "moment";
import Snackbar from "@material-ui/core/Snackbar";
import AddTraining from "./ui/AddTraining";

export default function Traininglist() {

    const [trainings, setTrainings] = useState([]);
    const [snack, setSnack] = useState("");
    const [snackStatus, setSnackStatus] = useState(false);

    useEffect(() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    };

    const deleteTraining = (link) => {
        if (window.confirm("Are you sure?")) {

            fetch(link, {method: "DELETE"})
                .then(_ => getTrainings())
                .then(_ => {
                    setSnack("Training deleted successfully");
                    setSnackStatus(true);
                })
                .catch(err => console.log(err));
        }
    };

    const handleClose = () => {
        setSnackStatus(false);
    };

    const columns = [
        {
            title: "Date",
            field: "date",
            render: row => (
                <span>
                        {moment(row.date).format("LL")}
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
        {
            title: "First name",
            field: "customer.firstname",
        },
        {
            title: "Last name",
            field: "customer.lastname",
        },
        {
            render: row => (<button size="small" color="primary"
                                    onClick={() => deleteTraining("https://customerrest.herokuapp.com/api/trainings/" + row.id)}>Delete</button>)
        }
    ];

    return (
        <div>
            <MaterialTable columns={columns} data={trainings} title="Trainings"/>
            <Snackbar
                open={snackStatus}
                autoHideDuration={3000}
                onClose={handleClose}
                message={snack}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                }}
            />
        </div>
    )

}