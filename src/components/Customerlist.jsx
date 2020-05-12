import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";
import Snackbar from "@material-ui/core/Snackbar";
import AddCustomer from "./ui/AddCustomer";

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
        if (window.confirm("Are you sure?")) {

            fetch(link, {method: "DELETE"})
                .then(_ => getCustomers())
                .then(_ => {
                    setSnack("Customer deleted successfully");
                    setSnackStatus(true);
                })
                .catch(err => console.log(err));
        }
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
                setSnack("Customer added succesfully");
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
            render: row => (<button size="small" color="primary"
                                    onClick={() => deleteCustomer(row.links[0].href)}>Delete</button>)
        }
    ];

    return (
        <div>
            <AddCustomer addCustomer={AddCustomer}/>
            <MaterialTable columns={columns} data={customers} title="Customers"/>
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