import React from 'react';
import { Switch, HashRouter, Route, Redirect } from 'react-router-dom';

import 'styles/App.scss';
import Header from 'components/Header';
import Home from 'components/Home';
import Page from 'components/Page';

const App = () => {
  return <div className="app">
      <HashRouter>
        <React.Fragment>
          <Route component={Header} />
          <Switch>
            <Route exact path="/:book" component={Home} />
            <Route path="/:book/:chapter/:page" component={Page} />
            <Redirect to="my_hexschool" />
          </Switch>
        </React.Fragment>
      </HashRouter>
    </div>;
}

export default App;