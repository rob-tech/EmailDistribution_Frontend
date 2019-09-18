import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Form from "./Form"



class Main extends Component {
  render() {
    return (
      <>
    
       <Router>
       
         

        <Route path="/participants" component={Form} />
 
    
      </Router>
    
      </>
    );
  }
}

export default Main;
