import { keyframes } from 'styled-components';
import { transitionStyles } from '../../utils/stringUtils';

export const CUBIC_BEZIER = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
export const HEADER_HEIGHT = 80;
export const RADIUS_LARGE = 20;
export const RADIUS_SMALL = 4;

export const fonts = {
  heading: `'Montserrat', 'Roboto', Helvetica, Arial, sans-serif`,
  body: `'Roboto', Helvetica, Arial, sans-serif`,
};

export const colors = {
  blueLighter: '#48a2fa',
  blueLight: '#3466ff',
  blue: '#1a53ff',

  tealLight: '#16f6ff',
  teal: '#00d2da',
  
  success: 'rgba(0, 128, 0, 1)',
  error: 'rgba(255, 0, 0, 1)',
  warning: 'rgba(255, 165, 0, 1)',

  grayLighter: '#f5f5f5',
  grayLight: '#f1f5f8', // '#ececec',
  grayMidLight: '',
  grayMid: '#dcdcdc',
  grayMidDark: '#9c9c9c',
  grayDark: '#545454',
  grayDarker: '#2a2a2a',
};

export const keyframesSpin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
export const keyframesFadeIn = keyframes`
  0% { opacity: 0; }
  100% {  opacity: 1; }
`;
export const keyframesFadeUp = keyframes`
  0% { transform: translateY(${HEADER_HEIGHT}px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;
export const keyframesFadeUpFull = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
`;
export const keyframesFadeRight = keyframes`
  0% { transform: translateX(-${HEADER_HEIGHT}px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;
export const keyframesFadeRightFull = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

export function transition(clickable: boolean = true, style: string = 'all', easing: string = CUBIC_BEZIER) {
  return transitionStyles(clickable, style, easing);
}