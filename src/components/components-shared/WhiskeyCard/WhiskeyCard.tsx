import * as React from 'react';
import styled from 'styled-components';
import { slugify } from '../../../utils/stringUtils';
import { preciseRoundPercentage } from '../../../utils/numberUtils';

import { Link } from 'react-router-dom';
// @ts-ignore no types for 'cloudinary-react'
import { Image } from 'cloudinary-react';
import {
  COLORS,
  HEADER_HEIGHT,
  CUBIC_BEZIER,
  FONTS,
  keyframesFadeRightFull,
  transition,
} from '../../../assets/styles/vars';

import { TypeWhiskeyHydrated } from '../../../types/baseTypes';

const Flex = styled.div`
  display: flex;
`;

const LinkWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 16%;
  box-sizing: border-box;
  margin: 0 2% 4%;
  position: relative;
  color: ${COLORS.grayDarker};

  ${transition()}
  &:hover {
    opacity: 0.9;
  }
`;
const ImageWrapper = styled.div`
  width: 13.32vw;
  height: 13.32vw;
  background: ${COLORS.grayMidDark};
  overflow: hidden;
`;

const CloudinaryImage = styled(Image)`
  width: 100%;
  vertical-align: middle;
`;

const Content = styled(Flex)`
  flex-direction: column;
  overflow: hidden;
  background: ${COLORS.grayDarker};
  color: ${COLORS.grayLighter};
`;

const Rating = styled(Flex)`
  width: 100%;
  height: ${HEADER_HEIGHT * 0.75}px;
  border-bottom: 1px solid ${COLORS.grayDark};
`;

const RatingNumber = styled(Flex)`
  height: ${HEADER_HEIGHT * 0.75}px;
  padding: 10px 20px;
  box-sizing: border-box;
  align-content: center;
  font-family: ${FONTS.heading};
  font-weight: bold;
  width: ${HEADER_HEIGHT * 1.25}px;
`;

const RatingPrefix = styled.p`
  margin: 8px 0 0;
  font-size: 24px;
`;

const RatingSuffix = styled.span`
  margin: 10px 0 0;
  font-size: 16px;
`;

const RatingBars = styled.div`
  width: calc(100% - ${HEADER_HEIGHT * .75}px - 60px);
`;

const RatingBarBg = styled.div`
  width: 100%;
  height: ${HEADER_HEIGHT * .25}px;
  margin-top: ${HEADER_HEIGHT * .25}px;
  background: ${COLORS.grayMid};
  position: relative;
  overflow: hidden;
`;

const RatingBarFg = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: ${HEADER_HEIGHT * .25}px;
  background: ${COLORS.primaryDark};
  animation: ${keyframesFadeRightFull} 0.6s ${CUBIC_BEZIER};
`;

const Text = styled(Flex)`
  flex-direction: column;
  width: 100%;
  height: ${HEADER_HEIGHT}px;
  padding: 10px 20px;
  box-sizing: border-box;
`;

const TextBrand = styled.h1`
  font-family: ${FONTS.heading};
  font-size: 18px;
  margin: 8px 0;
`;

const TextName = styled.h2`
  font-family: ${FONTS.body};
  font-size: 12px;
  font-weight: normal;
`;

const TextType = styled.p`
  font-family: ${FONTS.body};
  font-size: 12px;
  text-transform: uppercase;
  position: absolute;
  top: ${HEADER_HEIGHT / 5}px;
  right: ${HEADER_HEIGHT / 5}px;
  z-index: 1;
  padding: 4px 8px;
  margin: 0;
  color: ${COLORS.primaryDark};
  background: ${COLORS.grayLighter};
  font-weight: normal;
`;

function WhiskeyCardRatingNumber(props: { averageRating: number }) {
  const split: string[] = preciseRoundPercentage(props.averageRating).split('.');
  return (
    <RatingNumber>
      <RatingPrefix>{split[0]}</RatingPrefix>
      <RatingSuffix>.{split[1]}%</RatingSuffix>
    </RatingNumber>
  );
}

function WhiskeyCardRatingBars(props: { averageRating: number }) {
  return (
    <RatingBars>
      <RatingBarBg>
        <RatingBarFg style={{ width: `${props.averageRating}%` }} />
      </RatingBarBg>
    </RatingBars>
  );
}

function WhiskeyCard(props: TypeWhiskeyHydrated) {
  const slug = slugify(`${props.brand}-${props.name}`);
  return (
    <LinkWrapper
      key={props.whiskyId}
      to={`/whiskey/${slug}/${props.whiskyId}`}
    >
      <ImageWrapper>
        <CloudinaryImage
          cloudName="kevinnayar"
          publicId={`whiskies/whisky_${slug}`}
          width="460"
          crop="scale"
          alt={`${props.brand} - ${props.name}`}
        />
      </ImageWrapper>
      <Content>
        <Rating>
          <WhiskeyCardRatingNumber averageRating={props.averageRating}></WhiskeyCardRatingNumber>
          <WhiskeyCardRatingBars averageRating={props.averageRating}></WhiskeyCardRatingBars>
        </Rating>
        <Text>
          <TextBrand>{props.brand}</TextBrand>
          <TextName>{props.name}</TextName>
          <TextType>{props.type}</TextType>
        </Text>
      </Content>
    </LinkWrapper>
  );
}

export default WhiskeyCard;

