import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddCustomer(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({date: "", duration: "", activity: "", postcode: "", city: "", email: "", phone: ""});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.addCustomer(training);
        setOpen(false);
        setTraining({firstname: "", lastname: "", streetaddress: "", postcode: "", city: "", email: "", phone: ""})
    };

    const handleCancel = () => {
        setOpen(false);
        setTraining({firstname: "", lastname: "", streetaddress: "", postcode: "", city: "", email: "", phone: ""})
    };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    };

    return (
        <div>
            <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
                Add a customer
            </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a customer</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in the information below and click "save".
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        value={training.firstname}
                        onChange={inputChanged}
                        label="First name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        value={training.lastname}
                        onChange={inputChanged}
                        label="Last name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="streetaddress"
                        name="streetaddress"
                        value={training.streetaddress}
                        onChange={inputChanged}
                        label="Street address"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        value={training.postcode}
                        onChange={inputChanged}
                        label="Post code"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="city"
                        name="city"
                        value={training.city}
                        onChange={inputChanged}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        name="email"
                        value={training.email}
                        onChange={inputChanged}
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="phone"
                        name="phone"
                        value={training.phone}
                        onChange={inputChanged}
                        label="Phone number"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}