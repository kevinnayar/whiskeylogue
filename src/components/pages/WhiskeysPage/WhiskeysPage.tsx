import * as React from 'react';
import { connect } from 'react-redux';
// @ts-ignore ¯\_(ツ)_/¯ idk
import queryString from 'query-string';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';
import { getAllWhiskies } from '../../../store/whiskey/whiskeyActions';

import Page from '../../components-core/Page/Page';
import Filters from '../../components-core/Filters/Filters';
import WhiskeyCard from '../../components-shared/WhiskeyCard/WhiskeyCard';
import { HEADER_HEIGHT } from '../../../assets/styles/vars';

import {
  TypeAppState,
  TypeApiXferStatus,
  TypeWhiskeyHydrated,
  TypeFilters,
  TypeSorters,
  TypeSortersDirection,
} from '../../../types/baseTypes';

const WhiskyList = styled.div`
  margin: ${HEADER_HEIGHT * .75}px 8% 8% 8%;
  display: flex;
  flex-wrap: wrap;
`;

type TypeWhiskeysPageProps = RouteComponentProps & {
  whiskiesAll: TypeWhiskeyHydrated[],
  getAllWhiskiesXferStatus: TypeApiXferStatus,
  getAllWhiskies: (
    sortBy: TypeSorters,
    sortDir: TypeSortersDirection,
    types?: TypeFilters[]
  ) => void;
};

type TypeWhiskeysPageState = {
  filters: TypeFilters[];
  sortBy: TypeSorters;
  sortDir: TypeSortersDirection;
};

class WhiskeysPage extends React.Component<TypeWhiskeysPageProps, TypeWhiskeysPageState> {
  allFilters: TypeFilters[] = ['Bourbon', 'Irish', 'Japanese', 'Rye', 'Scotch', 'Whiskey'];
  allSorters: TypeSorters[] = ['age', 'averageRating', 'price'];
  allSorterDirections: TypeSortersDirection[] = ['asc', 'desc'];

  constructor(props: TypeWhiskeysPageProps) {
    super(props);

    const parsed = queryString.parse(props.location.search, { arrayFormat: 'comma' });

    const filters: TypeFilters[] = [];
    if (parsed.filters) {
      const filterValues: TypeFilters[] = Array.isArray(parsed.filters)
        ? parsed.filters.map((f: string) => f.charAt(0).toUpperCase() + f.slice(1))
        : [parsed.filters.charAt(0).toUpperCase() + parsed.filters.slice(1)];

      if (filterValues.every(v => this.allFilters.includes(v))) {
        filters.push(...filterValues);
      }
    }
    
    const sortBy: TypeSorters = parsed.sortBy && this.allSorters.includes(parsed.sortBy)
      ? parsed.sortBy
      : 'averageRating';

    const sortDir: TypeSortersDirection = parsed.sortDir && this.allSorterDirections.includes(parsed.sortDir)
      ? parsed.sortDir
      : 'desc';

    const state: TypeWhiskeysPageState = {
      filters,
      sortBy,
      sortDir,
    };

    this.state = state;
  }

  handleGetAllWhiskies = (sortBy: TypeSorters, sortDir: TypeSortersDirection, filters: TypeFilters[]) => {
    if (filters.length !== 0 || filters.length !== this.allFilters.length) {
      this.props.getAllWhiskies(sortBy, sortDir, filters);
    } else {
      this.props.getAllWhiskies(sortBy, sortDir);
    }
  }
  
  componentDidMount() {
    this.handleGetAllWhiskies(this.state.sortBy, this.state.sortDir, this.state.filters);
  }

  handleFilterChange = (filter: TypeFilters) => {
    const filters: TypeFilters[] = this.state.filters.includes(filter)
      ? this.state.filters.filter(f => f !== filter)
      : [...this.state.filters, filter];

    this.setState({
      filters,
    });

    this.handleGetAllWhiskies(this.state.sortBy, this.state.sortDir, filters);
  };

  handleSorterChange = (sortBy: TypeSorters, sortDir: TypeSortersDirection) => {
    this.setState({
      sortBy,
      sortDir,
    });

    this.handleGetAllWhiskies(sortBy, sortDir, this.state.filters);
  };

  render() {
    return (
      <Page>
        <Filters
          filters={this.state.filters}
          onFilterChange={(filter: TypeFilters) => this.handleFilterChange(filter)}
          sortBy={this.state.sortBy}
          sortDir={this.state.sortDir}
          onSorterChange={(sortBy: TypeSorters, sortDir: TypeSortersDirection) =>
            this.handleSorterChange(sortBy, sortDir)
          }
        />
        <WhiskyList>
          {this.props.whiskiesAll.map(whiskey => (
            <WhiskeyCard {...whiskey} key={whiskey.whiskyId} />
          ))}
        </WhiskyList>
      </Page>
    );
  }
}

function mapStateToProps(state: TypeAppState) {
  return {
    getAllWhiskiesXferStatus: state.whiskey.getAllWhiskiesXferStatus,
    whiskiesAll: state.whiskey.whiskiesAll,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getAllWhiskies: (
      sortBy: TypeSorters,
      sortDir: TypeSortersDirection,
      types?: TypeFilters[]
    ) => dispatch(getAllWhiskies(sortBy, sortDir, types)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WhiskeysPage);
