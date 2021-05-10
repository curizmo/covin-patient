import React, { useState } from "react";
import PatientIntakeForm from "./PatientIntakeForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const PageRouter = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/:hashKey" component={PatientIntakeForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default PageRouter;
