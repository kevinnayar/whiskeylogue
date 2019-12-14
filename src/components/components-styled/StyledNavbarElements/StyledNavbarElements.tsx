import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS, HEADER_HEIGHT } from '../../../assets/styles/vars';

export const StyledNavbarLogo = styled.h1`
  align-self: center;
  margin: 0 0 0 2%;
  padding: 8px 0;
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 8px;
`;

export const StyledNavbarLogoLink = styled(Link)`
  color: ${COLORS.grayLighter};
`;

export const StyledNavbarLinks = styled.nav`
  display: flex;
  margin: 0 2% 0 auto;
`;

export const StyledNavbarLinksSubLink = styled(StyledNavbarLogoLink)`
  display: flex;
  box-sizing: border-box;
  margin-left: 30px;
`;

export const StyledNavbar = styled.div`
  display: flex;
  position: relative;
  height: ${HEADER_HEIGHT}px;
`;

