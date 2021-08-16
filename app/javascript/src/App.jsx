import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { initializeLogger } from "./common/logger";
import DashBoard from "./components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import ShowPoll from "./components/Polls/ShowPoll";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router foreceRefresh={true}>
      <ToastContainer />
      <Switch>
        <Route exact path="/" render={() => <DashBoard />} />
        <Route exact path="/polls/create" component={CreatePoll} />
        <Route exact path="/polls/:id" component={ShowPoll} />
        <Route exact path="/about" render={() => <div>About</div>} />
      </Switch>
    </Router>
  );
};

export default App;
