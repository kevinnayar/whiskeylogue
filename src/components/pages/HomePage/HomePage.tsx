import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { getFavoriteWhiskey, getAllWhiskies } from '../../../store/whiskey/whiskeyActions';
import { slugify, getMatchingResults } from '../../../utils/stringUtils';

import Page from '../../components-core/Page/Page';
import WhiskeyCard from '../../components-shared/WhiskeyCard/WhiskeyCard';
import BackgroundImage from '../../components-shared/BackgroundImage/BackgroundImage';
import { FormInput, FormSubmit } from '../../components-shared/FormElements/FormElements';
import {
  COLORS,
  FONTS,
  HEADER_HEIGHT,
  RADIUS_SMALL,
  transition,
} from '../../../assets/styles/vars';

import {
  TypeAppState,
  TypeApiXferStatus,
  TypeWhiskeyHydrated,
  TypeFilter,
} from '../../../types/baseTypes';
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
  margin: 0 auto 38px;
  font-size: 32px;
`;
const HeroHeaderText = styled(Text)`
  color: ${COLORS.grayLighter};
`;
const HeaderText = styled(Text)`
  flex: 1 0 100%;
  text-align: center;
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

  ${transition()}
  &:hover {
    border-color: ${COLORS.grayLight};
  }
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

const SeeAllLink = styled(Link)`
  margin: 40px auto 0;
  text-align: center;
  height: ${HEADER_HEIGHT * 0.5}px;
  line-height: ${HEADER_HEIGHT * 0.5}px;
  width: 120px;
  font-family: ${FONTS.heading};
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  background: ${COLORS.primaryLight};
  color: white;
  border-radius: ${RADIUS_SMALL}px;

  ${transition()}
  &:hover {
    opacity: 0.8;
  }
`;

const SearchWrapper = styled.div``;
const SearchResults = styled.div`
  position: absolute;
  left: 0;
  top: 61px;
  background: ${COLORS.grayLighter};
  width: calc(80% + 6px);
`;
const SearchResult = styled.p`
  padding: 2%;

  ${transition()}
  &:hover {
    background: ${COLORS.grayMid};
  }
`;

const WhiskyFavoritesList = styled.div`
  margin: ${heroHeight + (HEADER_HEIGHT * .75)}px 8% 8% 8%;
  display: flex;
  flex-wrap: wrap;
`;

type TypeHomePageProps = RouteComponentProps & {
  whiskeyFavorites: TypeWhiskeyFavorites;
  getFavoriteWhiskeyXferStatus: TypeApiXferStatus;
  getFavoriteWhiskey: (type: TypeFilter) => void;
  whiskiesAll: TypeWhiskeyHydrated[],
  getAllWhiskiesXferStatus: TypeApiXferStatus,
  getAllWhiskies: () => void;
};

type TypeWhiskeyLinks = {
  [brandName: string] : string;
};
type TypeHomePageState = {
  whiskeyNames: string[];
  whiskeyLinks: TypeWhiskeyLinks;
  searchResults: string[];
};

class HomePage extends React.Component<TypeHomePageProps, TypeHomePageState> {
  constructor(props: TypeHomePageProps) {
    super(props);
    const state: TypeHomePageState = {
      whiskeyNames: [],
      whiskeyLinks: {},
      searchResults: [],
    };
    this.state = state;
  }

  componentDidMount() {
    this.props.getFavoriteWhiskey('Bourbon');
    this.props.getFavoriteWhiskey('Rye');
    this.props.getFavoriteWhiskey('Irish');
    this.props.getFavoriteWhiskey('Scotch');
    this.props.getFavoriteWhiskey('Japanese');
    this.props.getAllWhiskies();
  }

  static getDerivedStateFromProps(
    nextProps: TypeHomePageProps,
    prevState: TypeHomePageState,
  ): null | TypeHomePageState {
    if (
      nextProps.getAllWhiskiesXferStatus.succeeded &&
      nextProps.whiskiesAll.length > 0 &&
      prevState.whiskeyNames.length === 0
    ) {
      const whiskeyNames: string[] = [];
      const whiskeyLinks: TypeWhiskeyLinks = {};

      nextProps.whiskiesAll.forEach(w => {
        const brandName: string = `${w.brand} ${w.name}`;
        const link: string = `/whiskey/${slugify(brandName)}/${w.whiskyId}`;
        whiskeyNames.push(brandName);
        whiskeyLinks[brandName] = link;
      });

      return {
        ...prevState,
        whiskeyNames,
        whiskeyLinks,
      };
    }
    return null;
  }

  handleSearchOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchResults: string[] = getMatchingResults(event.target.value, this.state.whiskeyNames, 10);
    this.setState({ searchResults });
  };

  handleSearchResultSelection = (result: string) => {
    const link: void | string = this.state.whiskeyLinks[result];
    if (!link) {
      throw new Error('Whiskey not found!');
    }
    this.props.history.push(link);
  };

  render() {
    return (
      <Page>
        <Hero id="whiskey2" height={`${heroHeight}px`}>
          <HeroHeaderText>What would you like to drink today?</HeroHeaderText>
          <FormWrapper>
            <CustomFormInput tabIndex={1} onChange={this.handleSearchOnChange} />
            <CustomFormSubmit tabIndex={2} type="submit" />
            <SearchWrapper>
              {this.state.searchResults.length > 0 && (
                <SearchResults>
                  {this.state.searchResults.map(result => (
                    <SearchResult key={result} onClick={() => this.handleSearchResultSelection(result)}>
                      {result}
                    </SearchResult>
                  ))}
                </SearchResults>
              )}
            </SearchWrapper>
          </FormWrapper>
          <SeeAllLink to="/whiskeys">See all</SeeAllLink>
        </Hero>

        <WhiskyFavoritesList>
          <HeaderText>Community Favorites</HeaderText>
          {this.props.whiskeyFavorites.bourbon !== null && (
            <WhiskeyCard {...this.props.whiskeyFavorites.bourbon} />
          )}
          {this.props.whiskeyFavorites.rye !== null && <WhiskeyCard {...this.props.whiskeyFavorites.rye} />}
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
    getAllWhiskiesXferStatus: state.whiskey.getAllWhiskiesXferStatus,
    whiskiesAll: state.whiskey.whiskiesAll,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getFavoriteWhiskey: (type: TypeFilter) => dispatch(getFavoriteWhiskey(type)),
    getAllWhiskies: () => dispatch(getAllWhiskies()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
