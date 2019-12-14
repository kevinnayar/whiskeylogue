import * as React from 'react';
import { connect } from 'react-redux';
import { routes } from '../../../routes';

import IconText from '../../components-shared/IconText/IconText';
import {
  StyledNavbarLogo,
  StyledNavbarLogoLink,
  StyledNavbarLinks,
  StyledNavbarLinksSubLink,
  StyledNavbar,
} from '../../components-styled/StyledNavbarElements/StyledNavbarElements';

import { TypeAppState, TypeApiXferStatus } from '../../../types/baseTypes';

function NavbarLogo(props: { title: string }) {
  return (
    <StyledNavbarLogo>
      <StyledNavbarLogoLink to="/">{props.title}</StyledNavbarLogoLink>
    </StyledNavbarLogo>
  )
}

function NavBarAuthedLinks(props: { email: string }) {
  return (
    <StyledNavbarLinks>
      <StyledNavbarLinksSubLink to={routes.logout}>
        <IconText text="Logout" icon="lock" />
      </StyledNavbarLinksSubLink>
      <StyledNavbarLinksSubLink to={routes.user}>
        <IconText text={props.email} icon="person" />
      </StyledNavbarLinksSubLink>
    </StyledNavbarLinks>
  );
}

function NavBarUnAuthedLinks() {
  return (
    <StyledNavbarLinks>
      <StyledNavbarLinksSubLink to={routes.login}>
        <IconText text="Login" icon="lock" />
      </StyledNavbarLinksSubLink>
      <StyledNavbarLinksSubLink to={routes.signup}>
        <IconText text="Signup" icon="person_add" />
      </StyledNavbarLinksSubLink>
    </StyledNavbarLinks>
  );
}

type TypeNavbarProps = {
  verifyAuthXferStatus: TypeApiXferStatus;
  userAuth: {
    email: null| string,
    authenticated: boolean,
  };
};

function Navbar(props: TypeNavbarProps) {
  if (props.verifyAuthXferStatus.requested) {
    return (
      <StyledNavbar>
        <NavbarLogo title="logos" />
      </StyledNavbar>
    );
  }

  return (
    <StyledNavbar>
      <NavbarLogo title="logos" />
      {!props.verifyAuthXferStatus.requested && props.userAuth.authenticated && (
        <NavBarAuthedLinks email={props.userAuth.email || ''} />
      )}
      {!props.verifyAuthXferStatus.requested && !props.userAuth.authenticated && (
        <NavBarUnAuthedLinks />
      )}
    </StyledNavbar>
  );
}

function mapStateToProps(state: TypeAppState) {
  return {
    verifyAuthXferStatus: state.auth.verifyAuthXferStatus,
    userAuth: state.auth.userAuth,
  };
}

export default connect(mapStateToProps)(Navbar);
