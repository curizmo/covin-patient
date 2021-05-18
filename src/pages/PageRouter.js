import React from "react";
import PatientIntakeForm from "./PatientIntakeForm";
import FileDownload from "./FileDownload";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const PageRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/file/:container/:file" component={FileDownload} />
          <Route path="/:hashKey" component={PatientIntakeForm} />
        </Switch>
      </div>
    </Router>
  );
};

export default PageRouter;
