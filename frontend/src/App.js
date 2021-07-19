import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import {Provider} from 'react-redux';
import store from './Store';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Alerts from "./components/layout/Alerts";
import BookTicket from "./components/UsersDashboard/BookTicket";
import SearchBuses  from './components/UsersDashboard/SeachBuses';
import Buses from './components/UsersDashboard/Buses'
import PrivateRoute from "./components/routing/PrivateRoutes";


import UserLogin from "./components/auth/UserLogin";
import UserSignUp from "./components/auth/UserSignUp";
import AdminLogin from "./components/auth/AdminLogin";
import AdminSignup from "./components/auth/AdminSignup";

import "./App.css";
import { loadUser } from './actions/auth'
import setAuthToken from './utils/setAuthToken'

if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);

  return (

  <Provider store={store }>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className='container'>
        <Alerts />
        <Switch>
          <Route exact path='/user/register' component={UserSignUp} />
          <Route exact path='/user/login' component={UserLogin} />
          <Route exact path='/admin/login' component={AdminLogin} />
          <Route exact path='/admin/register' component={AdminSignup} />
          <PrivateRoute exact path='/searchBuses' component={SearchBuses} />
          <PrivateRoute exact path='/bookTickets' component={BookTicket} />
          <PrivateRoute exact path='/getbuses' component={Buses} />
        </Switch>
      </section>
      <Footer />
    </Fragment>
  </Router>
  </Provider>
)};

export default App;
