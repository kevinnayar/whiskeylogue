import * as React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes } from '../routes';

import Navbar from './components-core/Navbar/Navbar';

import HomePage from './pages/HomePage/HomePage';
import LogInPage from './pages/LogInPage/LogInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogOutPage from './pages/LogOutPage/LogOutPage';
import WhiskeysPage from './pages/WhiskeysPage/WhiskeysPage';
import WhiskeyPage from './pages/WhiskeyPage/WhiskeyPage';
import ReviewWritePage from './pages/ReviewWritePage/ReviewWritePage';

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
          <Route path={routes.whiskeys} exact component={WhiskeysPage} />
          <Route path={`${routes.whiskey}/:whiskeySlug/:whiskeyId`} component={WhiskeyPage} />
          <Route path={`${routes.reviewWrite}/:whiskeySlug/:whiskeyId`} component={ReviewWritePage} />
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}
