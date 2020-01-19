import * as React from 'react';
import styled from 'styled-components';
import IconText from '../IconText/IconText';
import { colors, CUBIC_BEZIER, keyframesFadeIn } from '../../../assets/styles/vars';

export const Wrapper = styled.div`
  margin: 5px;
  opacity: 0;
  transition: all 0.25s ${CUBIC_BEZIER};
  animation: ${keyframesFadeIn} 0.25s ${CUBIC_BEZIER} 0.25s forwards;
`;

export const AlertMessageError = styled(Wrapper)`
  border-color: ${colors.error};
  color: ${colors.error};
`;

export const AlertMessageSuccess = styled(Wrapper)`
  border-color: ${colors.success};
  color: ${colors.success};
`;

export const AlertMessageWarning = styled(Wrapper)`
  border-color: ${colors.warning};
  color: ${colors.warning};
`;


function AlertMessage(props: {
  alertType: 'success' | 'error' | 'warning',
  text: string,
}) {
  let StyledAlertMessage = AlertMessageError;
  let icon: string = props.alertType;
  let iconColor: string = colors.error;

  if (props.alertType === 'success') {
    StyledAlertMessage = AlertMessageSuccess;
    icon = 'check_circle';
    iconColor = colors.success;
  }

  if (props.alertType === 'warning') {
    StyledAlertMessage = AlertMessageWarning;
    iconColor = colors.warning;
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


