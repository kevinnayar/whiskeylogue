import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  colors,
  fonts,
  HEADER_HEIGHT,
  RADIUS_SMALL,
  RADIUS_LARGE,
  transition,
} from '../../../assets/styles/vars';

const Button = styled(Link)`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  padding: 0 20px;
`;

export const LargeButton = styled(Button)`
  height: ${HEADER_HEIGHT * 0.75}px;
  line-height: ${HEADER_HEIGHT * 0.75}px;
  font-family: ${fonts.heading};
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.grayLight};
  background: ${colors.blue};
  border: 1px solid ${colors.blue};
  border-radius: ${RADIUS_SMALL}px;

  ${transition()}
  &:hover {
    opacity: 0.7;
  }
`;

export const LargeButtonSecondary = styled(LargeButton)`
  border: 1px solid ${colors.teal};
  background: ${colors.teal};
`;

export const SmallButton = styled(Button)`
  height: ${HEADER_HEIGHT / 2}px;
  line-height: ${HEADER_HEIGHT / 2}px;
  font-family: ${fonts.body};
  font-size: 12px;
  color: ${colors.blue};
  background: white;
  border: 1px solid ${colors.blue};
  border-radius: ${RADIUS_LARGE}px;

  ${transition()}
  &:hover {
    background: ${colors.blue};
    color: white;
  }
`;

export const SmallButtonSecondary = styled(SmallButton)`
  color: ${colors.teal};
  border: 1px solid ${colors.teal};

  ${transition()}
  &:hover {
    background: ${colors.teal};
  }
`;


