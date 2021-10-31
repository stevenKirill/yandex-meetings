import React from 'react';
import './App.css';
import { Meetings } from './pages/Meetings/Meetings'
import { Main } from './pages/Main/Main'
import { MainHeader } from './components/MainHeader/MainHeader';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <Provider store={store}>
      <div className="app__wrapper">
        <MainHeader/>
        <Switch>
          <Route path="/main">
            <Main/>
        </Route>
        <Route path="/meetings">
            <Meetings/>
        </Route>
        </Switch>
      </div>
    </Provider>
    </Router>
  );
}

export default App;

