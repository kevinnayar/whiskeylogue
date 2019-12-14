import * as React from 'react';
import styled from 'styled-components';
import IconText from '../IconText/IconText';
import { COLORS, CUBIC_BEZIER, keyframesFadeIn } from '../../../assets/styles/vars';

export const Wrapper = styled.div`
  margin: 5px 0;
  opacity: 0;
  transition: all 0.25s ${CUBIC_BEZIER};
  animation: ${keyframesFadeIn} 0.25s ${CUBIC_BEZIER} 0.25s forwards;
`;

export const AlertMessageError = styled(Wrapper)`
  border-color: ${COLORS.error};
  color: ${COLORS.error};
`;

export const AlertMessageSuccess = styled(Wrapper)`
  border-color: ${COLORS.success};
  color: ${COLORS.success};
`;

export const AlertMessageWarning = styled(Wrapper)`
  border-color: ${COLORS.warning};
  color: ${COLORS.warning};
`;


function AlertMessage(props: {
  alertType: 'success' | 'error' | 'warning',
  text: string,
}) {
  let StyledAlertMessage = AlertMessageError;
  let icon: string = props.alertType;
  let iconColor: string = COLORS.error;

  if (props.alertType === 'success') {
    StyledAlertMessage = AlertMessageSuccess;
    icon = 'check_circle';
    iconColor = COLORS.success;
  }

  if (props.alertType === 'warning') {
    StyledAlertMessage = AlertMessageWarning;
    iconColor = COLORS.warning;
  }

  return (
    <StyledAlertMessage>
      <IconText
        text={props.text}
        icon={icon}
        iconColor={iconColor}
      />
    </StyledAlertMessage>
  );
}

export default React.memo(AlertMessage);


