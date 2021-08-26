import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { either, isEmpty, isNil } from "ramda";

import { initializeLogger } from "./common/logger";
import DashBoard from "components/Dashboard";
import CreatePoll from "components/Polls/CreatePoll";
import ShowPoll from "components/Polls/ShowPoll";
import Signup from "components/Authentication/Signup";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";
import { registerIntercepts, setAuthHeaders } from "./apis/axios";
import { getFromLocalStorage } from "helpers/storage";
import PageLoader from "components/PageLoader";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router foreceRefresh={true}>
      <ToastContainer />
      <Switch>
        <Route exact path="/" render={() => <DashBoard />} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        <PrivateRoute
          path="/polls/create"
          redirectRoute="/login"
          component={CreatePoll}
          condition={isLoggedIn}
          isAuthenticated={isLoggedIn}
        />
        <PrivateRoute
          exact
          path="/polls/:id"
          redirectRoute="/login"
          component={ShowPoll}
          condition={isLoggedIn}
          isAuthenticated={isLoggedIn}
        />
      </Switch>
    </Router>
  );
};

export default App;
