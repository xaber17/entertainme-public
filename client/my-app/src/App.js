import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config";
import Home from "./pages/home";
import addMovie from "./pages/addMovie"
import addTv from "./pages/addTv"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App container">
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
          <Switch>
            <Route path="/addMovie" exact component={addMovie} />
          </Switch>
          <Switch>
            <Route path="/addTv" exact component={addTv} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;