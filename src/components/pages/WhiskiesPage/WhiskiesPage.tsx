import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
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

type TypeWhiskiesPageProps = {
  whiskiesAll: TypeWhiskeyHydrated[],
  getAllWhiskiesXferStatus: TypeApiXferStatus,
  getAllWhiskies: (
    sortBy: TypeSorters,
    sortDir: TypeSortersDirection,
    types?: TypeFilters[]
  ) => void;
};

type TypeWhiskiesPageState = {
  filters: TypeFilters[];
  sortBy: TypeSorters;
  sortDir: TypeSortersDirection;
};

class WhiskiesPage extends React.Component<TypeWhiskiesPageProps, TypeWhiskiesPageState> {
  allFilters: TypeFilters[] = ['Bourbon', 'Irish', 'Japanese', 'Rye', 'Scotch', 'Whiskey'];
  
  constructor(props: TypeWhiskiesPageProps) {
    super(props);

    const urlParams = new URLSearchParams(window.location.search);
    
    const filters: TypeFilters[] = [];
    const filterParams: null | string = urlParams.get('filters');
    if (filterParams) {
      const split: string[] = filterParams.split(',');
      const values: string[] = split.map(v => v.charAt(0).toUpperCase() + v.slice(1));
      // @ts-ignore: this is type-checked
      if (values.every(v => this.allFilters.includes(v))) filters.push(values);
    }

    const state: TypeWhiskiesPageState = {
      filters,
      sortBy: 'averageRating',
      sortDir: 'desc',
    };
    this.state = state;
  }

  componentDidMount() {
    this.props.getAllWhiskies(this.state.sortBy, this.state.sortDir);
  }

  handleFilterChange = (filter: TypeFilters) => {
    const filters: TypeFilters[] = this.state.filters.includes(filter)
      ? this.state.filters.filter(f => f !== filter)
      : [...this.state.filters, filter];

    this.setState({ filters });

    if (filters.length !== 0 || filters.length !== this.allFilters.length) {
      this.props.getAllWhiskies(this.state.sortBy, this.state.sortDir, filters);
    }
  }

  handleSorterChange = (sortBy: TypeSorters, sortDir: TypeSortersDirection) => {
    this.setState({
      sortBy,
      sortDir,
    });

    if (this.state.filters.length !== 0 || this.state.filters.length !== this.allFilters.length) {
      this.props.getAllWhiskies(sortBy, sortDir, this.state.filters);
    } else {
      this.props.getAllWhiskies(sortBy, sortDir);
    }
  }

  render() {
    return (
      <Page>
        <Filters
          filters={this.state.filters}
          onFilterChange={(filter: TypeFilters) => this.handleFilterChange(filter)}
          sortBy={this.state.sortBy}
          sortDir={this.state.sortDir}
          onSorterChange={(sortBy: TypeSorters, sortDir: TypeSortersDirection) => this.handleSorterChange(sortBy, sortDir)}
        />
        <WhiskyList>
          {this.props.whiskiesAll.map(whiskey => <WhiskeyCard {...whiskey} key={whiskey.whiskyId} />)}
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

export default connect(mapStateToProps, mapDispatchToProps)(WhiskiesPage);
