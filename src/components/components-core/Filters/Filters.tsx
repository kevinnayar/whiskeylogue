import * as React from 'react';
import styled from 'styled-components';

import IconText from '../../components-shared/IconText/IconText';
import { COLORS, HEADER_HEIGHT, transitionOneOnHover } from '../../../assets/styles/vars';

import {
  TypeFilters,
  TypeSorters,
  TypeSortersDirection,
} from '../../../types/baseTypes';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: ${HEADER_HEIGHT}px;
  background: ${COLORS.grayMid};
`;
const FilterContent = styled.div`
  color: ${COLORS.grayDark};
  width: 50%;
  margin: 0 4%;
  display: flex;
  flex-wrap: wrap;
`;
const FilterItemHeader = styled.h2`
  font-size: 18px;
  height: 18px;
  margin: 16px 0 0px;
  flex-basis: 100%;
`;
const FilterItems = styled.div`
  display: flex;
`;
const FilterItem = styled.div`
  margin-right: 12px;
  ${transitionOneOnHover('opacity', 0.6)}
`;

function Filters(props: {
  filters: TypeFilters[],
  sortBy: TypeSorters,
  sortDir: TypeSortersDirection,
  onFilterChange: (filter: TypeFilters) => void;
  onSorterChange: (sortBy: TypeSorters, sortDir: TypeSortersDirection) => void;
}) {
  const allFilters: TypeFilters[] = ['Bourbon', 'Irish', 'Japanese', 'Rye', 'Scotch', 'Whiskey'];
  const allSorts: Array<{sortBy: TypeSorters, sortDir: TypeSortersDirection, name: string}> = [
    { sortBy: 'averageRating', sortDir: 'desc', name: 'Highest Rated' },
    { sortBy: 'averageRating', sortDir: 'asc',  name: 'Lowest Rated' },
    { sortBy: 'age',           sortDir: 'desc', name: 'Oldest to newest' },
    { sortBy: 'age',           sortDir: 'asc',  name: 'Newest to oldest' },
    { sortBy: 'price',         sortDir: 'desc', name: 'Most expensive' },
    { sortBy: 'price',         sortDir: 'asc',  name: 'Cheapest' },
  ];

  return (
    <Wrapper>
      <FilterContent>
        <FilterItemHeader>Filter by:</FilterItemHeader>
        <FilterItems>
          {allFilters.map(filter => {
            const isActive = props.filters.length === 0 || props.filters.includes(filter);
            return (
              <FilterItem
                key={filter} 
                onClick={() => {
                  props.onFilterChange(filter);
                }}>
                <IconText
                  text={filter}
                  icon={isActive ? 'check_circle' : 'radio_button_unchecked'}
              />
              </FilterItem>
              );
          })}
        </FilterItems>
      </FilterContent>
      <FilterContent>
        <FilterItemHeader>Sort by:</FilterItemHeader>
        <FilterItems>
          {allSorts.map(sorter => {
            const isCurrent = sorter.sortBy === props.sortBy && sorter.sortDir === props.sortDir;
            return (
              <FilterItem
                key={`${sorter.sortBy}.${sorter.sortDir}}`} 
                onClick={() => {
                  props.onSorterChange(sorter.sortBy, sorter.sortDir);
                }}>
                <IconText
                  text={sorter.name} 
                  icon={isCurrent ? 'radio_button_checked' : 'radio_button_unchecked'}
                />
              </FilterItem>
            );
          })}
        </FilterItems>
      </FilterContent>
    </Wrapper>
  );
}

export default Filters;