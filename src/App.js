import React from "react";
import Layouts from "./layout/Layout";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import 'react-phone-number-input/style.css'

import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Home from "./pages/Home/Home";
import Clients from "./pages/Clients/Clients";
import Candidates from "./pages/Candidates/Candidates";
import Skills from './pages/Candidates/Skills'
import Jobs from "./pages/Jobs/Jobs";
import JobCreate from "./pages/Jobs/JobCreate";
import Appointment from "./pages/Appointment/Appointment";
import Agencies from "./pages/Agencies/Agencies";
import Login from "./pages/Auth/Login";

//import AgenciesFun from "./pages/Agencies/AgenciesFun";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <BrowserRouter>
      <Layouts>
        <ToastContainer />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Home} />
          <PrivateRoute path="/candidates" component={Candidates} />
          <PrivateRoute path="/skills" component={Skills} />
          <PrivateRoute path="/appointments" component={Appointment} />
          <PrivateRoute path="/clients" component={Clients} />
          <PrivateRoute path="/agencies" component={Agencies} />
          <PrivateRoute path="/jobs" component={Jobs} />
          <PrivateRoute path="/job-create" component={JobCreate} />

          <Redirect to="dashboard" />

        </Switch>
      </Layouts>
    </BrowserRouter>
  );
}

export default App;
