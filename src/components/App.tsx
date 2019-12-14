import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '../routes';

import StyledApp from './components-styled/StyledApp/StyledApp';
import Navbar from './components-core/Navbar/Navbar';

import HomePage from './pages/HomePage/HomePage';
import LogInPage from './pages/LogInPage/LogInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogOutPage from './pages/LogOutPage/LogOutPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <StyledApp>
        <Navbar />
        <Switch>
          <Route path={routes.home} exact component={HomePage} />
          <Route path={routes.login} component={LogInPage} />
          <Route path={routes.signup} component={SignUpPage} />
          <Route path={routes.logout} component={LogOutPage} />
          <Route path={routes.user} component={ProfilePage} />
        </Switch>
      </StyledApp>
    </BrowserRouter>
  );
}
