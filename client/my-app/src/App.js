import React from "react";
import { ApolloProvider } from "@apollo/client";
import client from "./config";
import Home from "./pages/home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App container">
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;