import * as React from 'react';
import { CSSObject } from 'styled-components';
import {
  StyledIconText,
  StyledIcon,
  StyledText,
} from '../../components-styled/StyledIconText/StyledIconText';

type TypeIconTextProps = {
  icon: string;
  iconColor?: string;
  text: string;
};

function IconText(props: TypeIconTextProps) {
  const iconStyle: CSSObject = props.iconColor ? { color: props.iconColor } : {};
  return (
    <StyledIconText>
      <StyledIcon style={iconStyle} className="material-icons">{props.icon}</StyledIcon>
      <StyledText>{props.text}</StyledText>
    </StyledIconText>
  );
}

export default React.memo(IconText);
