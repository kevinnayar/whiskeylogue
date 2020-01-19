import * as React from 'react';
import styled from 'styled-components';

import IconText from '../../components-shared/IconText/IconText';
import { colors, HEADER_HEIGHT, transition } from '../../../assets/styles/vars';

import {
  TypeFilter,
  TypeSorter,
  TypeSorterDirection,
} from '../../../types/baseTypes';

const Wrapper = styled.div`
  display: flex;
  position: relative;
  height: ${HEADER_HEIGHT}px;
  background: ${colors.grayDarker};
`;
const FilterContent = styled.div`
  color: ${colors.grayLight};
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

  ${transition()}
  &:hover {
    opacity: 0.6;
  }
`;

function Filters(props: {
  filters: TypeFilter[],
  sortBy: TypeSorter,
  sortDir: TypeSorterDirection,
  onFilterChange: (filter: TypeFilter) => void;
  onSorterChange: (sortBy: TypeSorter, sortDir: TypeSorterDirection) => void;
}) {
  const allFilters: TypeFilter[] = ['Bourbon', 'Irish', 'Japanese', 'Rye', 'Scotch', 'Whiskey'];
  const allSorts: Array<{sortBy: TypeSorter, sortDir: TypeSorterDirection, name: string}> = [
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