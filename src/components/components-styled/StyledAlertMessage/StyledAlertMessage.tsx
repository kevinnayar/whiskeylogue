import styled from 'styled-components';
import { COLORS, CUBIC_BEZIER, keyframesFadeIn } from '../../../assets/styles/vars';

export const StyledAlertMessage = styled.div`
  margin: 5px 0;
  opacity: 0;
  transition: all 0.25s ${CUBIC_BEZIER};
  animation: ${keyframesFadeIn} 0.25s ${CUBIC_BEZIER} 0.25s forwards;
`;

export const StyledAlertMessageError = styled(StyledAlertMessage)`
  border-color: ${COLORS.error};
  color: ${COLORS.error};
`;

export const StyledAlertMessageSuccess = styled(StyledAlertMessage)`
  border-color: ${COLORS.success};
  color: ${COLORS.success};
`;

export const StyledAlertMessageWarning = styled(StyledAlertMessage)`
  border-color: ${COLORS.warning};
  color: ${COLORS.warning};
`;
