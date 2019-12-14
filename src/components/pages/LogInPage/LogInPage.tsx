import * as React from 'react';
import { connect } from 'react-redux';
import useForm from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';

import { routes, routesValues } from '../../../routes';
import { logIn } from '../../../store/auth/authActions';
import { getRegExEmail } from '../../../utils/baseUtils';

import Page from '../../components-core/Page/Page';
import BackgroundImages from '../../components-shared/BackgroundImages/BackgroundImages';
import {
  Form,
  FormDiv,
  FormLabel,
  FormInput,
  FormErrorDiv,
  FormSubmit,
} from '../../components-shared/FormElements/FormElements';
import AlertMessage from '../../components-shared/AlertMessage/AlertMessage';

import { TypeAppState, TypeApiXferStatus, TypeUserCredentials } from '../../../types/baseTypes';

type TypeLogInProps = {
  logInXferStatus: TypeApiXferStatus;
  logIn: (userCredentials: TypeUserCredentials) => void;
  isAuthenticated: boolean;
};

function LogInPage(props: TypeLogInProps) {
  const history = useHistory();

  if (history.location.search) {
    const redirectUrl: string = decodeURIComponent(history.location.search.replace('?redirect_url=', ''))
      .replace(window.location.origin, '');

    if (
      props.isAuthenticated &&
      redirectUrl !== '/logout' &&
      routesValues.includes(redirectUrl)
    ) {
      return <Redirect to={redirectUrl} />;
    }
  }

  if (props.isAuthenticated) {
    return <Redirect to={routes.home} />;
  }

  const { register, errors, handleSubmit } = useForm<TypeUserCredentials>();
  const onSubmit = (userCredentials: TypeUserCredentials) => {
    props.logIn(userCredentials);
  };

  return (
    <Page>
      {/* <BackgroundImages interval={3000} /> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormDiv>
          <FormLabel>Email</FormLabel>
          <FormInput
            tabIndex={1}
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
          <FormInput tabIndex={2} type="password" name="password" ref={register({ required: true })} />
          <FormErrorDiv className="form-error">
            {errors.password && errors.password.type && errors.password.type === 'required' && (
              <AlertMessage alertType="error" text="Password is required." />
            )}
          </FormErrorDiv>
        </FormDiv>

        <FormErrorDiv className="form-error">
          {props.logInXferStatus.failed && props.logInXferStatus.error && (
            <AlertMessage alertType="error" text={props.logInXferStatus.error} />
          )}
        </FormErrorDiv>

        <FormSubmit tabIndex={3} type="submit" />
      </Form>
    </Page>
  );
}

function mapStateToProps(state: TypeAppState) {
  return {
    logInXferStatus: state.auth.logInXferStatus,
    isAuthenticated: state.auth.userAuth.authenticated,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    logIn: (userCredentials: TypeUserCredentials) => dispatch(logIn(userCredentials)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);