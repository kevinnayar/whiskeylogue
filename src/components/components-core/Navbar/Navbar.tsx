import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { routes } from '../../../routes';

import { Link } from 'react-router-dom';
import IconText from '../../components-shared/IconText/IconText';
import { COLORS, FONTS, HEADER_HEIGHT, RADIUS_LG, transitionOneOnHover } from '../../../assets/styles/vars';

import { TypeAppState, TypeApiXferStatus } from '../../../types/baseTypes';

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: ${HEADER_HEIGHT}px;
  background: ${COLORS.blueDark};
`;

export const Logo = styled.h1`
  align-self: center;
  left: 4%;
  top: 0;
  position: absolute;
  padding: 0;
  margin: 0;
  height: ${HEADER_HEIGHT}px;
  font-size: 28px;
  font-weight: normal;
  font-family: ${FONTS.branding};
`;

export const LogoLink = styled(Link)`
  display: block;
  height: ${HEADER_HEIGHT}px;
  line-height: ${HEADER_HEIGHT}px;
  color: ${COLORS.grayLighter};
  ${transitionOneOnHover('text-shadow', '0 0 30px rgba(0, 0, 0, 0.5)')}
`;

export const Links = styled.nav`
  position: absolute;
  right: calc(4% - 20px);
  top: ${HEADER_HEIGHT / 4}px;
  height: ${HEADER_HEIGHT / 2}px;
  line-height: ${HEADER_HEIGHT / 2}px;
`;

export const LinksLink = styled(Link)`
  display: block;
  float: left;
  margin-left: 10px;
  padding: 0 20px;
  border-radius: ${RADIUS_LG};
  color: ${COLORS.grayLighter};
  ${transitionOneOnHover('background', COLORS.blueMid)}
`;

function NavbarLogo(props: { title: string }) {
  return (
    <Logo>
      <LogoLink to="/">{props.title}</LogoLink>
    </Logo>
  )
}

function NavBarAuthedLinks(props: { email: string }) {
  return (
    <Links>
      <LinksLink to={routes.logout}>
        <IconText text="Logout" icon="lock" />
      </LinksLink>
      <LinksLink to={routes.user}>
        <IconText text={props.email} icon="person" />
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
};

function Navbar(props: TypeNavbarProps) {
  const title = 'whiskeylogue';

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
        <NavBarAuthedLinks email={props.userAuth.email || ''} />
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
  };
}

export default connect(mapStateToProps)(Navbar);
