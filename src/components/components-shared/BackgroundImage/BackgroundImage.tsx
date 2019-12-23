import * as React from 'react';
import styled from 'styled-components';
import { COLORS, HEADER_HEIGHT, transitionOneOnHover } from '../../../assets/styles/vars';

const backgrounds = require('../../../assets/images/backgrounds/*.jpg');
const BackgroundImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  background-size: cover;
  background-color: ${COLORS.grayDarker};
  background-blend-mode: overlay;
  background-position: center center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BackgroundImageZero = styled(BackgroundImageWrapper)`
  background-image: url('${backgrounds.whiskey0}');
`;
const BackgroundImageOne = styled(BackgroundImageWrapper)`
  background-image: url('${backgrounds.whiskey1}');
`;
const BackgroundImageTwo = styled(BackgroundImageWrapper)`
  background-image: url('${backgrounds.whiskey2}');
`;
const Text = styled.p`
  position: absolute;
  right: ${HEADER_HEIGHT / 4}px;
  bottom: ${HEADER_HEIGHT / 4}px;
  color: ${COLORS.grayLight};
  z-index: 1;
`;
const Link = styled.a`
  color: ${COLORS.grayLight};
  font-weight: bold;
  text-decoration: underline;
  ${transitionOneOnHover('opacity', 0.7)}
`;

type TypeImageData = {
  photographer: string;
  attributionUrl: string;
};
type TypeImage = { [id: string]: TypeImageData };

function BackgroundImage(props: { id: string, height?: string, children?: any }) {
  const images: TypeImage = {
    whiskey0: { // glencairn
      photographer: 'Dylan de Jonge',
      attributionUrl: 'https://unsplash.com/photos/pe9T4ROjpzQ',
    },
    whiskey1: { // bar
      photographer: 'Adam Wilson',
      attributionUrl: 'https://unsplash.com/photos/6UIonphZA5o',
    },
    whiskey2: { // big ice cube
      photographer: 'Adam Jaime',
      attributionUrl: 'https://unsplash.com/photos/dmkmrNptMpw',
    },
  };
  
  let Wrapper = BackgroundImageZero;
  if (props.id === 'whiskey1') Wrapper = BackgroundImageOne;
  if (props.id === 'whiskey2') Wrapper = BackgroundImageTwo;

  return (
    <Wrapper style={{ height: props.height || '100%' }}>
      {props.children}
      <Text>
        Photo by{' '}
        <Link href={images[props.id].attributionUrl} target="_blank">
          {images[props.id].photographer}
        </Link>{' '}
        on{' '}
        <Link href="https://unsplash.com/" target="_blank">
          Unsplash
        </Link>
      </Text>
    </Wrapper>
  );
}

export default React.memo(BackgroundImage);
