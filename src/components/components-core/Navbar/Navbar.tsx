import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { routes } from '../../../routes';

import { Link } from 'react-router-dom';
import IconText from '../../components-shared/IconText/IconText';
import { SmallButton } from '../../components-shared/Buttons/Buttons';
import {
  colors,
  fonts,
  HEADER_HEIGHT,
  transition,
} from '../../../assets/styles/vars';

import { TypeAppState, TypeApiXferStatus, TypeUserHydrated } from '../../../types/baseTypes';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  height: ${HEADER_HEIGHT}px;
  border-bottom: 1px solid ${colors.grayMid};
`;

const LogoLink = styled(Link)`
  display: block;
  position: relative;
  margin-left: 3%;
  height: ${HEADER_HEIGHT}px;
  line-height: ${HEADER_HEIGHT}px;
  color: ${colors.blue};
  padding: 0 20px;

  ${transition()}
  &:hover {
    opacity: 0.7;
  }
`;

const Logo = styled.h1`
  align-self: center;
  padding: 0;
  margin: 0;
  height: ${HEADER_HEIGHT}px;
  font-size: 20px;
  font-family: ${fonts.heading};
`;

const Links = styled.nav`
  position: absolute;
  right: 3%;
  top: ${HEADER_HEIGHT / 4}px;
  height: ${HEADER_HEIGHT / 2}px;
  line-height: ${HEADER_HEIGHT / 2}px;
`;

const LinksLink = styled(SmallButton)`
  display: block;
  float: left;
  margin-left: 10px;
  padding: 0 20px;
`;

function NavbarLogo(props: { title: string }) {
  return (
    <LogoLink to="/">
      <Logo>{props.title}</Logo>
    </LogoLink>
  )
}

function NavBarAuthedLinks(props: { displayName: string }) {
  return (
    <Links>
      <LinksLink to={routes.logout}>
        <IconText text="Logout" icon="lock" />
      </LinksLink>
      <LinksLink to={routes.user}>
        <IconText text={props.displayName} icon="person" />
      </LinksLink>
    </Links>
  );
}

function NavBarUnAuthedLinks() {
  return (
    <Links>
      <LinksLink to={routes.login}>
        <IconText text="Login" icon="lock" />
      </LinksLink>
      <LinksLink to={routes.signup}>
        <IconText text="Signup" icon="person_add" />
      </LinksLink>
    </Links>
  );
}

type TypeNavbarProps = {
  verifyAuthXferStatus: TypeApiXferStatus;
  userAuth: {
    email: null| string,
    authenticated: boolean,
  };
  user: null | TypeUserHydrated;
};

function Navbar(props: TypeNavbarProps) {
  const title = 'whiskeylogue';
  const displayName = props.user ? props.user.displayName : 'Loading...';

  if (props.verifyAuthXferStatus.requested) {
    return (
      <Wrapper>
        <NavbarLogo title={title} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <NavbarLogo title={title} />
      {!props.verifyAuthXferStatus.requested && props.userAuth.authenticated && (
        <NavBarAuthedLinks displayName={displayName} />
      )}
      {!props.verifyAuthXferStatus.requested && !props.userAuth.authenticated && (
        <NavBarUnAuthedLinks />
      )}
    </Wrapper>
  );
}

function mapStateToProps(state: TypeAppState) {
  return {
    verifyAuthXferStatus: state.auth.verifyAuthXferStatus,
    userAuth: state.auth.userAuth,
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(Navbar);
