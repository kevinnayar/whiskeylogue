import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { getSelectedWhiskey } from '../../../store/whiskey/whiskeyActions';

import Page from '../../components-core/Page/Page';
import WhiskeyCard from '../../components-shared/WhiskeyCard/WhiskeyCard';
import { HEADER_HEIGHT } from '../../../assets/styles/vars';

import {
  TypeAppState,
  TypeApiXferStatus,
  TypeWhiskeyHydrated,
} from '../../../types/baseTypes';

const WhiskyItem = styled.div`
  margin: ${HEADER_HEIGHT * .75}px 8% 8% 8%;
  display: flex;
  flex-wrap: wrap;
`;

type TypeWhiskeyPageProps = RouteComponentProps & {
  getSelectedWhiskeyXferStatus: TypeApiXferStatus;
  whiskeySelected: null | TypeWhiskeyHydrated;
  getSelectedWhiskey: (id: string) => void;
};

class WhiskeyPage extends React.Component<TypeWhiskeyPageProps> {
  componentDidMount() {
    // @ts-ignore: params.whiskeyId does exist
    const id: string = this.props.match.params.whiskeyId || '';
    this.props.getSelectedWhiskey(id);
  }

  render() {
    return (
      <Page>
        <WhiskyItem>
          {this.props.getSelectedWhiskeyXferStatus.succeeded && this.props.whiskeySelected !== null && (
            <WhiskeyCard { ...this.props.whiskeySelected} />
          )}
        </WhiskyItem>
      </Page>
    );
  }
}

function mapStateToProps(state: TypeAppState) {
  return {
    getSelectedWhiskeyXferStatus: state.whiskey.getSelectedWhiskeyXferStatus,
    whiskeySelected: state.whiskey.whiskeySelected,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getSelectedWhiskey: (id: string) => dispatch(getSelectedWhiskey(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WhiskeyPage);
