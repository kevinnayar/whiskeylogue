import * as React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../../store/auth/authActions';
import { getOrg } from '../../../store/org/orgActions';

import StyledPage from '../../components-styled/StyledPage/StyledPage';
import AuthGuardPage from '../AuthGuardPage/AuthGuardPage';

import {
  TypeAppState,
  TypeNullOrString,
  TypeApiXferStatus,
  TypeUserDef,
  TypeOrgDef,
} from '../../../types/baseTypes';

type TypeProfileProps = {
  verifyAuthXferStatus: TypeApiXferStatus;
  userGuid: TypeNullOrString;

  getUser: (userGuid: string) => void;
  getUserXferStatus: TypeApiXferStatus;
  userDef: null | TypeUserDef;
  
  getOrg: (userDef: TypeUserDef) => void;
  getOrgXferStatus: TypeApiXferStatus;
  orgDef: null | TypeOrgDef;
};

type TypeProfileState = {
  userGuid: TypeNullOrString;
  userDef: null | TypeUserDef;
  orgDef: null | TypeOrgDef;
};

class ProfilePage extends React.Component<TypeProfileProps, TypeProfileState> {
  constructor(props: TypeProfileProps) {
    super(props);
    const state: TypeProfileState = {
      userGuid: null,
      userDef: null,
      orgDef: null,
    };
    this.state = state;
  }

  static getDerivedStateFromProps(nextProps: TypeProfileProps, prevState: TypeProfileState): null | TypeProfileState {
    if (
      nextProps.userGuid !== null &&
      nextProps.userGuid !== prevState.userGuid
    ) {
      nextProps.getUser(nextProps.userGuid);
      return {
        ...prevState,
        userGuid: nextProps.userGuid,
      };
    }
    if (
      nextProps.getUserXferStatus.succeeded &&
      nextProps.userDef !== null &&
      prevState.userDef === null
    ) {
      nextProps.getOrg(nextProps.userDef);
      return {
        ...prevState,
        userDef: nextProps.userDef,
      };
    }
    if (nextProps.getOrgXferStatus.succeeded &&
      nextProps.orgDef !== null &&
      prevState.orgDef === null
    ) {
      return {
        ...prevState,
        orgDef: nextProps.orgDef,
      };
    }
    return null;
  }

  render() {
    return (
      <AuthGuardPage>
        <StyledPage>
          {this.state.userDef && (
            <div>
              <p>
                {this.state.userDef.firstName} {this.state.userDef.lastName}
              </p>
              <p>{this.state.userDef.role}</p>
            </div>
          )}
          {this.state.orgDef && (
            <div>
              <p>{this.state.orgDef.orgName}</p>
              {this.state.orgDef.userGuids && this.state.orgDef.userGuids.map((guid: string) => <p key={guid}>{guid}</p>)}
            </div>
          )}
        </StyledPage>
      </AuthGuardPage>
    );
  }
}

function mapStateToProps(state: TypeAppState) {
  return {
    verifyAuthXferStatus: state.auth.verifyAuthXferStatus,
    userGuid: state.auth.userAuth.userGuid,
    getUserXferStatus: state.auth.getUserXferStatus,
    userDef: state.auth.userDef,
    getOrgXferStatus: state.org.getOrgXferStatus,
    orgDef: state.org.orgDef,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getUser: (userGuid: string) => dispatch(getUser(userGuid)),
    getOrg: (userDef: TypeUserDef) => dispatch(getOrg(userDef)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
