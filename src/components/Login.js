import React, { useState } from 'react';
import { useHistory } from 'react-router';

const Login = () => {
    const history = useHistory();
    const [formState, setFormState] = useState({
      login: true,
      email: '',
      password: '',
      name: ''
    });
  
    return (
      <div>
        <h4 className="mv3">
          {formState.login ? 'Login' : 'Sign Up'}
        </h4>
        <div className="flex flex-column">
          <input
            value={formState.email}
            onChange={(e) =>
              setFormState({
                ...formState,
                email: e.target.value
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
            onClick={() => console.log('onClick')}
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