import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import AddCustomer from "./ui/AddCustomer";
import AddTraining from "./ui/AddTraining";
import moment from "moment";

export default function Customerlist() {

    const [customers, setCustomers] = useState([]);
    const [snack, setSnack] = useState("");
    const [snackStatus, setSnackStatus] = useState(false);

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    };

    const deleteCustomer = (link) => {
         fetch(link, {method: "DELETE"})
                .then(_ => getCustomers())
                .then(_ => {
                    setSnack("Customer deleted successfully");
                    setSnackStatus(true);
                })
                .catch(err => console.log(err));
    };

    const addCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(customer)
            }
        )
            .then(_ => getCustomers())
            .then(_ => {
                setSnack("Customer info added succesfully");
                setSnackStatus(true);
            })
            .catch(err => console.log(err));
    };

    const updateCustomer = (link, customer) => {
        fetch(link, {
                method: "PUT",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(customer)
            }
        )
            .then(_ => getCustomers())
            .then(_ => {
                setSnack("Customer info updated succesfully");
                setSnackStatus(true);
            })
            .catch(err => console.log(err));
    };

    const addTraining = (training) => {

        // eslint-disable-next-line no-useless-concat
        const dateTime = training.date + " " + "22:00";
        console.log(dateTime);
        const toISO = moment(dateTime, "DD-MM-YYYY HH:mm").toISOString();
        console.log(toISO);

        training.date = toISO;

        fetch('https://customerrest.herokuapp.com/api//trainings',
            {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(training)
            }
        )
            .then(_ => getCustomers())
            .then(_ => {
                setSnack("Training added succesfully");
                setSnackStatus(true);
            })
            .catch(err => console.log(err));
    };


    const handleClose = () => {
        setSnackStatus(false);
    };

    const columns = [
        {
            title: "First name",
            field: "firstname"
        },
        {
            title: "Last name",
            field: "lastname"
        },
        {
            title: "Street address",
            field: "streetaddress"
        },
        {
            title: "Post code",
            field: "postcode"
        },
        {
            title: "City",
            field: "city"
        },
        {
            title: "Email address",
            field: "email"
        },
        {
            title: "Phone number",
            field: "phone"
        },
        {
            sorting: false,
            editable: "never",
            field: 'links[0].href',
            render: row => (
                <div>
                    <AddTraining addTraining={addTraining} customer={row.links[0].href}/>
                </div>
            )
        },
    ];

    return (
        <div>
            <AddCustomer addCustomer={addCustomer}/>
            <MaterialTable columns={columns} data={customers} title="Customers" addRowPosition="first"
                           editable={{
                               onRowAdd: newData =>
                                   new Promise((resolve, reject) => {
                                       setTimeout(() => {
                                           addCustomer(newData);
                                           resolve();
                                       }, 1000);
                                   }),
                               onRowUpdate: (newData, oldData) =>
                                   new Promise((resolve, reject) => {
                                       setTimeout(() => {
                                           updateCustomer(oldData.links[0].href, newData);
                                           resolve();
                                       }, 1000);
                                   }),
                               onRowDelete: oldData =>
                                   new Promise((resolve, reject) => {
                                       setTimeout(() => {
                                           deleteCustomer(oldData.links[0].href);
                                           resolve();
                                       }, 1000);
                                   })
                           }}
            />
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