import * as React from 'react';
import styled from 'styled-components';
import {
  FONTS,
  COLORS,
  HEADER_HEIGHT,
  RADIUS_SMALL,
  CUBIC_BEZIER,
  keyframesFadeUp,
  transition,
} from '../../../assets/styles/vars';

export const Form = styled.form`
  align-self: center;
  margin: 0;
  padding: 2% 2.6%;
  background: ${COLORS.grayLighter};
  border-radius: ${RADIUS_SMALL}px;
  min-width: 260px;
  animation: ${keyframesFadeUp} 0.25s ${CUBIC_BEZIER};
`;

export const FormDiv = styled.div`
  margin: 0 0 24px;
`;

export const FormLabel = styled.label`
  width: 100%;
  margin: 0;
  height: ${HEADER_HEIGHT / 4}px;
  line-height: ${HEADER_HEIGHT / 4}px;
  font-size: 12px;
  color: ${COLORS.grayDark};
`;

export const FormInput = styled.input`
  width: calc(90% - 2px);
  padding: 0 5%;
  margin: 0;
  height: ${HEADER_HEIGHT / 2}px;
  line-height: ${HEADER_HEIGHT / 2}px;
  font-size: 12px;
  border: 1px solid ${COLORS.grayLight};
  color: ${COLORS.grayDark};
  border-radius: ${RADIUS_SMALL}px;

  ${transition()}
  &:hover {
    border-color: ${COLORS.grayMidDark};
  }
`;

export const FormErrorDiv = styled.div`
  position: absolute;
  font-size: 75%;
`;

export const FormSubmit = styled.input`
  margin-top: 10px;
  width: 100%;
  font-family: ${FONTS.heading};
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  background: ${COLORS.primaryDark};
  color: white;
  height: ${HEADER_HEIGHT * .67}px;
  line-height: ${HEADER_HEIGHT * .67}px;
  border: none;
  outline: none;
  border-radius: ${RADIUS_SMALL}px;
  
  ${transition()}
  &:hover {
    background: ${COLORS.primaryMid};
  }
`;
