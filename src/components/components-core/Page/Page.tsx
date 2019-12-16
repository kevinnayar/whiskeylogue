import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../../assets/styles/vars';

const Page = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(100% - ${HEADER_HEIGHT}px);
  justify-content: center;
  position: relative;
`;

export default Page;
