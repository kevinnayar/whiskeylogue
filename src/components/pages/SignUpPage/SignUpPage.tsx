import * as React from 'react';
import { connect } from 'react-redux';
import useForm from 'react-hook-form';
import { signUp } from '../../../store/auth/authActions';
import { getRegExEmail } from '../../../utils/baseUtils';

import Page from '../../components-core/Page/Page';
import {
  Form,
  FormDiv,
  FormLabel,
  FormInput,
  FormErrorDiv,
  FormSubmit,
} from '../../components-shared/FormElements/FormElements';
import AlertMessage from '../../components-shared/AlertMessage/AlertMessage';

import { TypeAppState, TypeApiXferStatus, TypeNewUser } from '../../../types/baseTypes';

type TypeSignUpProps = {
  signUpXferStatus: TypeApiXferStatus;
  signUp: (newUser: TypeNewUser) => void;
};

function SignUpPage(props: TypeSignUpProps) {
  const { register, errors, handleSubmit } = useForm<TypeNewUser>();
  const onSubmit = (newUser: TypeNewUser) => {
    props.signUp(newUser);
  };

  return (
    <Page>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormDiv>
          <FormLabel>First Name</FormLabel>
          <FormInput tabIndex={1} type="text" name="firstName" ref={register({ required: true })} />
          <FormErrorDiv>
            {errors.firstName && errors.firstName.type && errors.firstName.type === 'required' && (
              <AlertMessage alertType="error" text="First name is required." />
            )}
          </FormErrorDiv>
        </FormDiv>

        <FormDiv>
          <FormLabel>Last Name</FormLabel>
          <FormInput tabIndex={2} type="text" name="lastName" ref={register({ required: true })} />
          <FormErrorDiv>
            {errors.lastName && errors.lastName.type && errors.lastName.type === 'required' && (
              <AlertMessage alertType="error" text="Last name is required." />
            )}
          </FormErrorDiv>
        </FormDiv>

        <FormDiv>
          <FormLabel>Display Name</FormLabel>
          <FormInput tabIndex={3} type="text" name="displayName" ref={register({ required: true })} />
          <FormErrorDiv>
            {errors.displayName && errors.displayName.type && errors.displayName.type === 'required' && (
              <AlertMessage alertType="error" text="Display name is required." />
            )}
          </FormErrorDiv>
        </FormDiv>

        <FormDiv>
          <FormLabel>Email</FormLabel>
          <FormInput
            tabIndex={4}
            type="text"
            name="email"
            ref={register({
              required: true,
              pattern: getRegExEmail(),
            })}
          />
          <FormErrorDiv>
            {errors.email && errors.email.type && errors.email.type === 'required' && (
              <AlertMessage alertType="error" text="Email is required." />
            )}
            {errors.email && errors.email.type && errors.email.type === 'pattern' && (
              <AlertMessage alertType="error" text="Email must be in a proper email format." />
            )}
          </FormErrorDiv>
        </FormDiv>

        <FormDiv>
          <FormLabel>Password</FormLabel>
          <FormInput
            tabIndex={5}
            type="password"
            name="password"
            ref={register({
              required: true,
              minLength: 8,
              // pattern: getRegExPassword(),
            })}
          />
          <FormErrorDiv>
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
          </FormErrorDiv>
        </FormDiv>

        <FormErrorDiv>
          {props.signUpXferStatus.failed && props.signUpXferStatus.error && (
            <AlertMessage alertType="error" text={props.signUpXferStatus.error} />
          )}
        </FormErrorDiv>

        <FormSubmit tabIndex={6} type="submit" />
      </Form>
    </Page>
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
