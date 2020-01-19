import * as React from 'react';
import { connect } from 'react-redux';
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
  TypeFilter,
  TypeSorter,
  TypeSorterDirection,
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
    sortBy: TypeSorter,
    sortDir: TypeSorterDirection,
    filters?: TypeFilter[]
  ) => void;
};

type TypeWhiskeysPageState = {
  filters: TypeFilter[];
  sortBy: TypeSorter;
  sortDir: TypeSorterDirection;
};

class WhiskeysPage extends React.Component<TypeWhiskeysPageProps, TypeWhiskeysPageState> {
  allFilters: TypeFilter[] = ['Bourbon', 'Irish', 'Japanese', 'Rye', 'Scotch', 'Whiskey'];
  allSorters: TypeSorter[] = ['age', 'averageRating', 'price'];
  allSorterDirections: TypeSorterDirection[] = ['asc', 'desc'];

  constructor(props: TypeWhiskeysPageProps) {
    super(props);

    const parsed = queryString.parse(props.location.search, { arrayFormat: 'comma' });

    const filters: TypeFilter[] = [];
    if (parsed.filters) {
      const filterValues: TypeFilter[] = Array.isArray(parsed.filters)
        ? (parsed.filters.map((f: string) => f.charAt(0).toUpperCase() + f.slice(1)) as TypeFilter[])
        : ([parsed.filters.charAt(0).toUpperCase() + parsed.filters.slice(1)] as TypeFilter[]);

      if (filterValues.every(v => this.allFilters.includes(v))) {
        filters.push(...filterValues);
      }
    }

    let sortBy: TypeSorter = 'averageRating';
    if (parsed.sortBy && typeof parsed.sortBy === 'string' && this.allSorters.includes(parsed.sortBy as TypeSorter)) {
      sortBy = parsed.sortBy as TypeSorter;
    }

    let sortDir: TypeSorterDirection = 'desc';
    if (parsed.sortDir && typeof parsed.sortDir === 'string' && this.allSorterDirections.includes(parsed.sortDir as TypeSorterDirection)) {
      sortDir = parsed.sortDir as TypeSorterDirection;
    }

    const state: TypeWhiskeysPageState = {
      filters,
      sortBy,
      sortDir,
    };

    this.state = state;
  }

  componentDidMount() {
    this.handleGetAllWhiskies(this.state.sortBy, this.state.sortDir, this.state.filters);
  }

  handleGetAllWhiskies = (sortBy: TypeSorter, sortDir: TypeSorterDirection, filters: TypeFilter[]) => {
    if (filters.length !== 0 || filters.length !== this.allFilters.length) {
      this.props.getAllWhiskies(sortBy, sortDir, filters);
      this.updateUrlParams(sortBy, sortDir, filters);
    } else {
      this.props.getAllWhiskies(sortBy, sortDir);
      this.updateUrlParams(sortBy, sortDir);
    }
  }
  
  updateUrlParams = (sortBy: TypeSorter, sortDir: TypeSorterDirection, filters?: TypeFilter[]) => {
    const search: string = `?sortBy=${sortBy}&sortDir=${sortDir}${
      filters && filters.length > 0 ? `&filters=${filters.join()}` : ''
    }`;
    this.props.history.push({ search });
  }

  handleFilterChange = (filter: TypeFilter) => {
    const filters: TypeFilter[] = this.state.filters.includes(filter)
      ? this.state.filters.filter(f => f !== filter)
      : [...this.state.filters, filter];

    this.setState({
      filters,
    });

    this.handleGetAllWhiskies(this.state.sortBy, this.state.sortDir, filters);
  };

  handleSorterChange = (sortBy: TypeSorter, sortDir: TypeSorterDirection) => {
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
          onFilterChange={(filter: TypeFilter) => this.handleFilterChange(filter)}
          sortBy={this.state.sortBy}
          sortDir={this.state.sortDir}
          onSorterChange={(sortBy: TypeSorter, sortDir: TypeSorterDirection) =>
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
      sortBy: TypeSorter,
      sortDir: TypeSorterDirection,
      filters?: TypeFilter[]
    ) => dispatch(getAllWhiskies(sortBy, sortDir, filters)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WhiskeysPage);
