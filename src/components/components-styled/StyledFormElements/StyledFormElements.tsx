import styled from 'styled-components';
import {
  FONTS,
  COLORS,
  HEADER_HEIGHT,
  RADIUS_SM,
  CUBIC_BEZIER,
  keyframesFadeUp,
  transitionOneOnHover,
  transitionOneOnFocus,
} from '../../../assets/styles/vars';

export const StyledForm = styled.form`
  align-self: center;
  margin: 0;
  padding: 2% 2.6%;
  background: ${COLORS.grayLighter};
  border-radius: ${RADIUS_SM}px;
  min-width: 260px;
  animation: ${keyframesFadeUp} 0.25s ${CUBIC_BEZIER};
`;

export const StyledFormDiv = styled.div`
  margin: 0 0 24px;
`;

export const StyledFormLabel = styled.label`
  width: 100%;
  margin: 0;
  height: ${HEADER_HEIGHT / 4}px;
  line-height: ${HEADER_HEIGHT / 4}px;
  font-size: 12px;
  color: ${COLORS.grayDark};
`;

export const StyledFormInput = styled.input`
  width: calc(90% - 2px);
  padding: 0 5%;
  margin: 0;
  height: ${HEADER_HEIGHT / 2}px;
  line-height: ${HEADER_HEIGHT / 2}px;
  font-size: 12px;
  border: 1px solid ${COLORS.grayLight};
  color: ${COLORS.grayDark};
  border-radius: ${RADIUS_SM}px;
  ${transitionOneOnFocus('border-color', COLORS.grayMidDark)}
`;

export const StyledFormErrorDiv = styled.div`
  position: absolute;
  font-size: 75%;
`;

export const StyledFormSubmit = styled.input`
  margin-top: 10px;
  width: 100%;
  font-family: ${FONTS.heading};
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  background: ${COLORS.blueDark};
  color: white;
  height: ${HEADER_HEIGHT / 2}px;
  line-height: ${HEADER_HEIGHT / 2}px;
  border: none;
  outline: none;
  border-radius: ${RADIUS_SM}px;
  ${transitionOneOnHover('background', COLORS.blueMid)}
`;

