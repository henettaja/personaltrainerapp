import React from "react";
import Drawer from "@material-ui/core/Drawer";
import {Link, BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Customers from "../../pages/Customers";
import Trainings from "../../pages/Trainings";

export class Navdrawer extends React.Component {
    render() {
        return (
            <Router>

                <Switch>
                    <Route exact path="/">
                        <h1>Home page</h1>
                    </Route>
                    <Route path="/customers">
                        <Customers/>
                    </Route>
                    <Route path="/trainings">
                        <Trainings/>
                    </Route>
                </Switch>

                <Drawer
                    anchor="left"
                    open={this.props.drawerOpened}
                    onClose={this.props.toggleDrawer(false)}
                >
                    <div
                        onClick={this.props.toggleDrawer(false)}
                        onKeyDown={this.props.toggleDrawer(false)}
                    >
                        <ul>
                            <Link to="/customers">
                                <li>Customers</li>
                            </Link>
                            <Link to="/trainings">
                                <li>Trainings</li>
                            </Link>
                        </ul>
                    </div>
                </Drawer>
            </Router>
        );
    }
}
