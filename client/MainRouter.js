import React, { Component, Fragment } from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";
import { Route, Switch } from "react-router";
import Home from "./core/Home";
import Navigation from "./partials/Navigation";

class MainRouter extends Component {
  render() {
    return (
      <Fragment>
        <Navigation/>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Fragment>
    );
  }
}

export default MainRouter;
