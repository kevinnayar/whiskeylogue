import * as React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '../routes';

import Navbar from './components-core/Navbar/Navbar';

import HomePage from './pages/HomePage/HomePage';
import LogInPage from './pages/LogInPage/LogInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogOutPage from './pages/LogOutPage/LogOutPage';
import WhiskiesPage from './pages/WhiskiesPage/WhiskiesPage';

const Wrapper = styled.div`
  height: 100%;
`;

export default function App() {
  return (
    <BrowserRouter>
      <Wrapper>
        <Navbar />
        <Switch>
          <Route path={routes.home} exact component={HomePage} />
          <Route path={routes.login} component={LogInPage} />
          <Route path={routes.signup} component={SignUpPage} />
          <Route path={routes.logout} component={LogOutPage} />
          <Route path={routes.whiskies} exact component={WhiskiesPage} />
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}
