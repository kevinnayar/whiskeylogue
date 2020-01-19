import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { getFavoriteWhiskey, getAllWhiskies } from '../../../store/whiskey/whiskeyActions';
import { slugify, getMatchingResults } from '../../../utils/stringUtils';

import Page from '../../components-core/Page/Page';
import WhiskeyCard from '../../components-shared/WhiskeyCard/WhiskeyCard';
import BackgroundImage from '../../components-shared/BackgroundImage/BackgroundImage';
import { FormInput, FormSubmit } from '../../components-shared/FormElements/FormElements';
import IconText from '../../components-shared/IconText/IconText';
import { SmallButton } from '../../components-shared/Buttons/Buttons';
import {
  colors,
  HEADER_HEIGHT,
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
  color: ${colors.grayLighter};
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
  border: 2px solid ${colors.grayLight};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  ${transition(false)}
  &:hover {
    border-color: ${colors.grayLight};
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

const SeeAllLink = styled(SmallButton)`
  margin: 80px auto -40px;
`;

const SearchWrapper = styled.div``;
const SearchResults = styled.div`
  position: absolute;
  left: 0;
  top: 61px;
  background: ${colors.grayLighter};
  width: calc(80% + 6px);
`;

const SearchResult = styled.p`
  padding: 2%;

  ${transition()}
  &:hover {
    background: ${colors.grayMid};
  }
`;

const Icon = styled.i`
  color: ${colors.error};
  margin: 0 8px;
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
          <HeroHeaderText>Fancy a wee dram?</HeroHeaderText>
          <FormWrapper>
            <CustomFormInput tabIndex={1} onChange={this.handleSearchOnChange} />
            <CustomFormSubmit tabIndex={2} type="submit" value="Let's Go!" />
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
          <SeeAllLink to="/whiskeys">
            <IconText text="See All" icon="local_bar" />
          </SeeAllLink>
        </Hero>

        <WhiskyFavoritesList>
          <HeaderText>
            <Icon className="material-icons">favorite</Icon>
            Tippy Top Shelf
            <Icon className="material-icons">favorite</Icon>
          </HeaderText>
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
