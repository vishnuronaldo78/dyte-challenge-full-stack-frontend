import React from "react";
import "./app.css";
import { Route, Switch, Redirect } from "react-router-dom";


import Login from './components/login'
import SignUp from './components/signup'
import URLShortner from './components/urlShortner' 
import NoMatch from './components/noMatch'

function App() {
  const user = localStorage.getItem("token");
  return (
    <Switch>
      {user ? (
          <Redirect exact from="/" to="/url" />
        ) : (
          <Redirect exact from="/" to="/login" />
        )}
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/url" component={URLShortner} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default App;