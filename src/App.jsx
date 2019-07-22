import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ModelTrainer from "./pages/model-trainer";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./modules/store";

const reduxStore = configureStore(window.STATE_FROM_SERVER);

class App extends Component {
  render() {
    return (
      <ReduxProvider store={reduxStore}>
        <Router>
          <Route path="/" exact component={ModelTrainer} />
        </Router>
      </ReduxProvider>
    );
  }
}

export default App;
