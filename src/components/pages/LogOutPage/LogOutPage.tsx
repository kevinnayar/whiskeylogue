import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOut } from '../../../store/auth/authActions';

import Page from '../../components-core/Page/Page';
import AlertMessage from '../../components-shared/AlertMessage/AlertMessage';

import { TypeAppState, TypeApiXferStatus } from '../../../types/baseTypes';
import { routes } from '../../../routes';

type TypeLogOutProps = {
  logOutXferStatus: TypeApiXferStatus,
  logOut: () => void,
};

class LogOutPage extends React.Component<TypeLogOutProps, {}> {
  componentDidMount() {
    this.props.logOut();
  }

  render() {
    return (
      <Page>
        {this.props.logOutXferStatus.failed && this.props.logOutXferStatus.error ? (
          <AlertMessage alertType="error" text={this.props.logOutXferStatus.error} />
        ) : (
          <Redirect to={routes.home} />
        )}
      </Page>
    );
  }
}

function mapStateToProps(state: TypeAppState) {
  return {
    logOutXferStatus: state.auth.logOutXferStatus,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    logOut: () => dispatch(logOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogOutPage);