import styled from 'styled-components';
import {
  FONTS,
  COLORS,
  HEADER_HEIGHT,
  BORDER_RADIUS,
  CUBIC_BEZIER,
  keyframesFadeUp,
} from '../../../assets/styles/vars';

export const StyledForm = styled.form`
  align-self: center;
  margin: 0;
  padding: 2% 2.6%;
  background: ${COLORS.grayLighter};
  border-radius: ${BORDER_RADIUS}px;
  min-width: 260px;
  animation: ${keyframesFadeUp} 0.25s ${CUBIC_BEZIER};
`;

export const StyledFormDiv = styled.div`
  margin: 0 0 24px;
`;

export const StyledFormLabel = styled.label`
  width: 100%;
  margin: 0;
  height: ${HEADER_HEIGHT / 2}px;
  line-height: ${HEADER_HEIGHT / 2}px;
  font-size: 12px;
  color: ${COLORS.grayMid};
`;

export const StyledFormInput = styled.input`
  width: calc(90% - 2px);
  padding: 0 5%;
  margin: 0;
  height: ${HEADER_HEIGHT}px;
  line-height: ${HEADER_HEIGHT}px;
  font-size: 12px;
  border: 1px solid ${COLORS.grayLight};
  color: ${COLORS.grayDark};
  border-radius: ${BORDER_RADIUS}px;
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
  text-transform: uppercase;
  color: white;
  height: ${HEADER_HEIGHT}px;
  line-height: ${HEADER_HEIGHT}px;
  border: none;
  outline: none;
  border-radius: ${BORDER_RADIUS}px;
`;

