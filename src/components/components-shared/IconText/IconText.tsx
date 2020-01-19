import * as React from 'react';
import styled, { CSSObject } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Icon = styled.i`
  align-self: center;
  margin-right: 5px;
  font-size: 100%;
`;

export const Text = styled.p`
  align-self: center;
`;

type TypeIconTextProps = {
  icon: string;
  iconColor?: string;
  text: string;
};

function IconText(props: TypeIconTextProps) {
  const iconStyle: CSSObject = props.iconColor ? { color: props.iconColor } : {};
  return (
    <Wrapper>
      <Icon style={iconStyle} className="material-icons">{props.icon}</Icon>
      <Text>{props.text}</Text>
    </Wrapper>
  );
}

export default React.memo(IconText);
