import React, { useState } from 'react';
import { useHistory } from 'react-router';
import gql from 'graphql-tag'
import {useMutation} from 'react-apollo'

const HABITS_QUERY = gql`
  {
    habits {
        id
        name
    }
  }
`

const NEW_HABIT_MUTATION = gql`
  mutation newHabitMutation(
    $habit_name: String!
  ) {
    createHabit(name: $habit_name) {
      id
      name
    }
  }
`;

const NewHabit = (props) => {
    const history = useHistory();
    const [formState, setFormState] = useState({
            habit_name: '',
    });
    
    const [newHabit] = useMutation(NEW_HABIT_MUTATION, {
        variables: {
            habit_name: formState.habit_name
        }, refetchQueries: [{ query: HABITS_QUERY }],
    });

  return (
    <div className="w-80 center">
      <h4 className="mv3 tc">
        Add Habit
      </h4>
      <div className="flex flex-column w-30 center">
        <input
          value={formState.habit_name}
          onChange={(e) =>
            setFormState({habit_name: e.target.value})
          }
          type="text"
          placeholder="Name"
        />
        <button
          className="pointer button w-5 center mt2"
          onClick={() => { 
            newHabit();
            history.push('/');
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NewHabit;