import * as React from 'react';
import styled from 'styled-components';
import Page from '../../components-core/Page/Page';

import BackgroundImage from '../../components-shared/BackgroundImage/BackgroundImage';
import { FormInput, FormSubmit } from '../../components-shared/FormElements/FormElements';
import { COLORS, HEADER_HEIGHT, transitionOneOnFocus } from '../../../assets/styles/vars';

const Hero = styled(BackgroundImage)`
  height: 460px;
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

export default function HomePage() {
  return (
    <Page>
      <Hero id="whiskey2" height="460px">
        <Text>What would you like to drink today?</Text>
        <FormWrapper>
          <CustomFormInput tabIndex={1} />
          <CustomFormSubmit tabIndex={2} type="submit" />
        </FormWrapper>
      </Hero>
    </Page>
  );
}



