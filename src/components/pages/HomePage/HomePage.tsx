import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getFavoriteWhiskey } from '../../../store/whiskey/whiskeyActions';

import Page from '../../components-core/Page/Page';
import WhiskeyCard from '../../components-shared/WhiskeyCard/WhiskeyCard';
import BackgroundImage from '../../components-shared/BackgroundImage/BackgroundImage';
import { FormInput, FormSubmit } from '../../components-shared/FormElements/FormElements';
import { COLORS, HEADER_HEIGHT, transitionOneOnFocus } from '../../../assets/styles/vars';

import { TypeAppState, TypeApiXferStatus, TypeWhiskeyHydrated } from '../../../types/baseTypes';
import { TypeWhiskeyFavorites } from '../../../types/reducerWhiskeyTypes';

const heroHeight = 460;

const Hero = styled(BackgroundImage)`
  height: ${heroHeight}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.h1`
  color: ${COLORS.grayLighter};
  margin: 0 auto 38px;
  font-size: 32px;
`;

const FormWrapper = styled.div`
  position: relative;
  width: 50%;
  display: flex;
`;

const CustomFormInput = styled(FormInput)`
  height: ${HEADER_HEIGHT * 0.75}px;
  line-height: ${HEADER_HEIGHT * 0.75}px;
  width: 80%;
  padding: 0 2%;
  font-size: 16px;
  border: 2px solid ${COLORS.grayLight};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  ${transitionOneOnFocus('border-color', COLORS.grayMidDark)}
`;

const CustomFormSubmit = styled(FormSubmit)`
  height: ${HEADER_HEIGHT * 0.75 + 4}px;
  line-height: ${HEADER_HEIGHT * 0.75 + 4}px;
  width: 20%;
  padding: 0 2%;
  margin: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const WhiskyFavoritesList = styled.div`
  margin: ${heroHeight + (HEADER_HEIGHT * .75)}px 8% 8% 8%;
  display: flex;
`;

type TypeHomePageProps = {
  whiskeyFavorites: TypeWhiskeyFavorites;
  getFavoriteWhiskeyXferStatus: TypeApiXferStatus;
  getFavoriteWhiskey: (type: string) => void;
};

class HomePage extends React.Component<TypeHomePageProps, {}> {
  componentDidMount() {
    this.props.getFavoriteWhiskey('Bourbon');
    this.props.getFavoriteWhiskey('Rye');
    this.props.getFavoriteWhiskey('Irish');
    this.props.getFavoriteWhiskey('Scotch');
    this.props.getFavoriteWhiskey('Japanese');
  }

  render() {
    return (
      <Page>
        <Hero id="whiskey2" height={`${heroHeight}px`}>
          <Text>What would you like to drink today?</Text>
          <FormWrapper>
            <CustomFormInput tabIndex={1} />
            <CustomFormSubmit tabIndex={2} type="submit" />
          </FormWrapper>
        </Hero>

        <WhiskyFavoritesList>
          {this.props.whiskeyFavorites.bourbon !== null && (
            <WhiskeyCard {...this.props.whiskeyFavorites.bourbon} />
          )}
          {this.props.whiskeyFavorites.rye !== null && (
            <WhiskeyCard {...this.props.whiskeyFavorites.rye} />
          )}
          {this.props.whiskeyFavorites.irish !== null && (
            <WhiskeyCard {...this.props.whiskeyFavorites.irish} />
          )}
          {this.props.whiskeyFavorites.scotch !== null && (
            <WhiskeyCard {...this.props.whiskeyFavorites.scotch} />
          )}
          {this.props.whiskeyFavorites.japanese !== null && (
            <WhiskeyCard {...this.props.whiskeyFavorites.japanese} />
          )}
        </WhiskyFavoritesList>
      </Page>
    );
  }
}


function mapStateToProps(state: TypeAppState) {
  return {
    getFavoriteWhiskeyXferStatus: state.whiskey.getFavoriteWhiskeyXferStatus,
    whiskeyFavorites: state.whiskey.whiskeyFavorites,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getFavoriteWhiskey: (type: string) => dispatch(getFavoriteWhiskey(type)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
