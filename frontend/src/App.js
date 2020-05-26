import React from "react";

import "./assets/css/main.scss";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DefaultLayout from "./components/DefaultLayout";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={LoginPage} />
        <Route path="/" component={DefaultLayout}/>
         
      </Switch>
    </BrowserRouter>
  );
}

export default App;
