import React, {useState, useEffect} from "react";
import MaterialTable from "material-table";

export default function Customerlist() {

const [customers, setCustomers] = useState([]);

useEffect(() => {
    getCustomers();
}, []);

const getCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
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
];

    return (
        <div>
            <MaterialTable columns={columns} data={customers} title="Customers"/>
        </div>
    )

}