import React from 'react';
import './App.css';
import Customerlist from "./components/Customerlist";
import 'typeface-roboto';
import {NavBar} from "./components/ui/Navbar";

function App() {
  return (
        <React.Fragment>
            <NavBar/>
            <Customerlist/>
        </React.Fragment>
  );
}

export default App;
