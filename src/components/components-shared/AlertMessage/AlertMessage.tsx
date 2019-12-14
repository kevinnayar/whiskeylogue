import * as React from 'react';
import { COLORS } from '../../../assets/styles/vars';

import {
  StyledAlertMessageError,
  StyledAlertMessageSuccess,
  StyledAlertMessageWarning,
} from '../../components-styled/StyledAlertMessage/StyledAlertMessage';
import IconText from '../IconText/IconText';

function AlertMessage(props: {
  alertType: 'success' | 'error' | 'warning',
  text: string,
}) {
  let StyledAlertMessage = StyledAlertMessageError;
  let icon: string = props.alertType;
  let iconColor: string = COLORS.error;

  if (props.alertType === 'success') {
    StyledAlertMessage = StyledAlertMessageSuccess;
    icon = 'check_circle';
    iconColor = COLORS.success;
  }

  if (props.alertType === 'warning') {
    StyledAlertMessage = StyledAlertMessageWarning;
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


