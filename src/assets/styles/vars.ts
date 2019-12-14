import { keyframes } from 'styled-components';

export const HEADER_HEIGHT = 100;
export const CUBIC_BEZIER = 'cubic-bezier(0.4, 0.0, 0.2, 1)';
export const BORDER_RADIUS = '4px';
export const FONTS = {
  branding: `'Pacifico', 'Times New Roman', serif`,
  heading: `'Montserrat', 'Roboto', Helvetica, Arial, sans-serif`,
  body: `'Roboto', Helvetica, Arial, sans-serif`,
};
export const COLORS = {
  blueLight: '#48a2fa', //
  yellowMid: '#ffbe00',
  yellowDark: '#edae00',

  purpleLight: '#e0c3fc',
  purpleMid: '#b39cc9',
  purpleDark: '#867597',

  success: 'rgba(0, 128, 0, 1)',
  error: 'rgba(255, 0, 0, 1)',
  warning: 'rgba(255, 165, 0, 1)',

  grayLighter: '#f5f5f5',
  grayLight: '#f1f5f8', // '#ececec',
  grayMid: '#dcdcdc',
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
