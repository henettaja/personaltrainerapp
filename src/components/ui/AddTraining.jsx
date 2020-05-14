import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from "moment";

export default function AddTraining(props) {

    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({date: "", duration: "", activity: "", customer: ""});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.addTraining({...training, customer: props.customer.links[0].href});
        setOpen(false);
        setTraining({date: moment(training.date,"DD-MM-YYYY").format("YYYY-MM-DD"), duration: "", activity: ""})
    };

    const handleCancel = () => {
        setOpen(false);
        setTraining({date: "", duration: "", activity: "", customer: null})
    };

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    };

    return (
        <div>
            <Button style={{margin: 10}} size="small" color="primary" onClick={handleClickOpen}>
                Add a training
            </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a training</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill in the information below and click "save".
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        name="date"
                        value={training.date}
                        onChange={inputChanged}
                        label={`Date (eg. ${moment().format("DD.MM.YYYY")})`}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="duration"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        label="Duration in minutes"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="activity"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        label="Activity"
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