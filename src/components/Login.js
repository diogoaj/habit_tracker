import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag'
import { useQuery, useLazyQuery, useMutation} from 'react-apollo'
import Cookie from "js-cookie"

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $username: String!
    $password: String!
  ) {
    registerUser(
      username: $username
      password: $password
    ) {
      token
    }
  }
`;


const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $username: String!
    $password: String!
  ) {
    login(username: $username, password: $password) {
      token
    }
  }
`;


const Login = (props) => {
    const history = useHistory();
    const [formState, setFormState] = useState({
      login: true,
      username: '',
      password: '',
    });

    const [login] = useMutation(LOGIN_MUTATION, {
      variables: {
        username: formState.username,
        password: formState.password
      },
      onCompleted: ({ login }) => {
        Cookie.set("token", login.token, { sameSite: 'strict', secure: true })
        history.push('/');
        props.userHandler({
          token: Cookie.get("token")
        });
      }
    });
    
    const [registerUser] = useMutation(SIGNUP_MUTATION, {
      variables: {
        username: formState.username,
        password: formState.password
      },
      onCompleted: ({ registerUser }) => {
        Cookie.set("token", registerUser.token, { sameSite: 'strict', secure: true })
        history.push('/');
        props.userHandler({
          token: Cookie.get("token")
        });
      }
    });
  
    return (
      <div>
        <h4 className="mv3">
          {formState.login ? 'Login' : 'Sign Up'}
        </h4>
        <div className="flex flex-column">
          <input
            value={formState.username}
            onChange={(e) =>
              setFormState({
                ...formState,
                username: e.target.value
              })
            }
            type="text"
            placeholder="Your username"
          />
          <input
            value={formState.password}
            onChange={(e) =>
              setFormState({
                ...formState,
                password: e.target.value
              })
            }
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <button
            className="pointer mr2 button"
            onClick={formState.login ? login : registerUser}
          >
            {formState.login ? 'login' : 'create account'}
          </button>
          <button
            className="pointer button"
            onClick={(e) =>
              setFormState({
                ...formState,
                login: !formState.login
              })
            }
          >
            {formState.login
              ? 'need to create an account?'
              : 'already have an account?'}
          </button>
        </div>
      </div>
    );
  };


  
export default Login;