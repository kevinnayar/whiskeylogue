import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { routes } from '../../../routes';
import { TypeAppState, TypeApiXferStatus } from '../../../types/baseTypes';

type TypeAuthGuardProps = {
  verifyAuthXferStatus: TypeApiXferStatus;
  isAuthenticated: boolean;
  children: any;
};

function AuthGuardPage(props: TypeAuthGuardProps) {
  if (props.verifyAuthXferStatus.requested) {
    return <p>Loading...</p>
  }

  if (props.verifyAuthXferStatus.failed && !props.isAuthenticated) {
    const redirectUrl: string = encodeURIComponent(window.location.toString());
    return <Redirect to={`${routes.login}?redirect_url=${redirectUrl}`} />;
  }

  return <>{props.children}</>;
}

function mapStateToProps(state: TypeAppState) {
  return {
    verifyAuthXferStatus: state.auth.verifyAuthXferStatus,
    isAuthenticated: state.auth.userAuth.authenticated,
  };
}

export default connect(mapStateToProps)(AuthGuardPage);
