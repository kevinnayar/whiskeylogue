import * as React from 'react';
import { connect } from 'react-redux';
import useForm from 'react-hook-form';
import { signUp } from '../../../store/auth/authActions';
import { getRegExEmail } from '../../../utils/baseUtils';

import StyledPage from '../../components-styled/StyledPage/StyledPage';
import {
  StyledForm,
  StyledFormDiv,
  StyledFormLabel,
  StyledFormInput,
  StyledFormErrorDiv,
  StyledFormSubmit,
} from '../../components-styled/StyledFormElements/StyledFormElements';
import AlertMessage from '../../components-shared/AlertMessage/AlertMessage';

import { TypeAppState, TypeApiXferStatus, TypeNewUser } from '../../../types/baseTypes';

type TypeSignUpProps = {
  signUpXferStatus: TypeApiXferStatus,
  signUp: (newUser: TypeNewUser) => void,
};

function SignUpPage(props: TypeSignUpProps) {
  const { register, errors, handleSubmit } = useForm<TypeNewUser>();
  const onSubmit = (newUser: TypeNewUser) => {
    props.signUp(newUser);
  };

  return (
    <StyledPage>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <StyledFormDiv>
          <StyledFormLabel>First Name</StyledFormLabel>
          <StyledFormInput tabIndex={1} type="text" name="firstName" ref={register({ required: true })} />
          <StyledFormErrorDiv>
            {errors.firstName && errors.firstName.type && errors.firstName.type === 'required' && (
              <AlertMessage alertType="error" text="First name is required." />
            )}
          </StyledFormErrorDiv>
        </StyledFormDiv>

        <StyledFormDiv>
          <StyledFormLabel>Last Name</StyledFormLabel>
          <StyledFormInput tabIndex={2} type="text" name="lastName" ref={register({ required: true })} />
          <StyledFormErrorDiv>
            {errors.lastName && errors.lastName.type && errors.lastName.type === 'required' && (
              <AlertMessage alertType="error" text="Last name is required." />
            )}
          </StyledFormErrorDiv>
        </StyledFormDiv>

        <StyledFormDiv>
          <StyledFormLabel>Email</StyledFormLabel>
          <StyledFormInput
            tabIndex={3}
            type="text"
            name="email"
            ref={register({
              required: true,
              pattern: getRegExEmail(),
            })}
          />
          <StyledFormErrorDiv>
            {errors.email && errors.email.type && errors.email.type === 'required' && (
              <AlertMessage alertType="error" text="Email is required." />
            )}
            {errors.email && errors.email.type && errors.email.type === 'pattern' && (
              <AlertMessage alertType="error" text="Email must be in a proper email format." />
            )}
          </StyledFormErrorDiv>
        </StyledFormDiv>

        <StyledFormDiv>
          <StyledFormLabel>Password</StyledFormLabel>
          <StyledFormInput
            tabIndex={4}
            type="password"
            name="password"
            ref={register({
              required: true,
              minLength: 8,
              // pattern: getRegExPassword(),
            })}
          />
          <StyledFormErrorDiv>
            {errors.password && errors.password.type && errors.password.type === 'required' && (
              <AlertMessage alertType="error" text="Password is required." />
            )}
            {errors.password && errors.password.type && errors.password.type === 'minLength' && (
              <AlertMessage alertType="error" text="Password must be at least 8 characters long." />
            )}
            {/*
            {errors.password && errors.password.type && errors.password.type === 'pattern' && (
              <AlertMessage alertType="error" text="Password must contain a capital letter, a number, and special character." />
            )} 
            */}
          </StyledFormErrorDiv>
        </StyledFormDiv>

        <StyledFormErrorDiv>
          {props.signUpXferStatus.failed && props.signUpXferStatus.error && (
            <AlertMessage alertType="error" text={props.signUpXferStatus.error} />
          )}
        </StyledFormErrorDiv>

        <StyledFormSubmit tabIndex={5} type="submit" />
      </StyledForm>
    </StyledPage>
  );
}

function mapStateToProps(state: TypeAppState) {
  return {
    signUpXferStatus: state.auth.signUpXferStatus,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    signUp: (newUser: TypeNewUser) => dispatch(signUp(newUser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);