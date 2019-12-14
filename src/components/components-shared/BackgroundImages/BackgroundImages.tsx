import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { COLORS, HEADER_HEIGHT } from '../../../assets/styles/vars';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: ${HEADER_HEIGHT}px;
  height: calc(100% - ${HEADER_HEIGHT}px);
  width: 100%;
  z-index: -1;
`;

const ImageWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
`;

const Text = styled.p`
  position: absolute;
  right: ${HEADER_HEIGHT / 2}px;
  bottom: ${HEADER_HEIGHT / 2}px;
  color: ${COLORS.grayLight};
`;

type TypeBackgroundImages = {
  id: string;
  photographer: string;
  attributionUrl: string;
};

const images: TypeBackgroundImages[] = [
  {
    id: 'whiskey-0', // glencairn
    photographer: 'Dylan de Jonge',
    attributionUrl: 'https://unsplash.com/photos/pe9T4ROjpzQ',
  },
  {
    id: 'whiskey-1', // bar
    photographer: 'Adam Wilson',
    attributionUrl: 'https://unsplash.com/photos/6UIonphZA5o',
  },
  {
    id: 'whiskey-2', // big ice cube
    photographer: 'Adam Jaime',
    attributionUrl: 'https://unsplash.com/photos/dmkmrNptMpw',
  },
];

const imageComponents: JSX.Element[] = images.map((image: TypeBackgroundImages) => {
  // const src = require(`../../../assets/images/background-images/whiskey-0.jpg`);
  // <div class="img-banner" style="{'background-image': 'url(' + require('./assets/media/baner1.jpg') + ')'}"></div>

  return (
    <ImageWrapper
      key={image.id}
      style={{
        backgroundImage: `url('${require('../../../assets/images/background-images/'+image.id+'.jpg')}')`,
      }}
    >
      <Text>Photo by {image.photographer} at Unsplash</Text>
    </ImageWrapper>
  );
});



type TypeBackgroundImagesProps = {
  interval: number;
};

function BackgroundImages(props: TypeBackgroundImagesProps) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, props.interval);
    return () => clearInterval(interval);
  }, []);
  return (
    <Wrapper>
      {imageComponents}
      {seconds}
    </Wrapper>
  );
}

export default React.memo(BackgroundImages);
