import React, { Component } from 'react'
import {daysInMonth, getMonth} from '../utils/date';
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'

const HABITS_QUERY = gql`
  {
    habits(username:"diogoaj") {
        id
        name
    }
  }
`

const HabitCalendar = () => {
  const { data } = useQuery(HABITS_QUERY);

  return (
    <table className="nowrap overflow-x-hidden center mv5 w-80">
          <thead>
            <tr>
              <th className="f5 w2 outline">Habit</th>
              <DaysOfMonth/>
            </tr>
          </thead>
      <tbody>
      {data && (
        <>
          {data.habits.map((habit) => (
            <HabitRow key={habit.id} name={habit.name} />
          ))}
        </>
      )} 
      </tbody>
    </table>
  );
};

class Day extends Component {
  
  render() {
      return (
          <th className="f5 w2 outline" key={this.props.day}>{this.props.day}</th>
      )
    }
}

class DaysOfMonth extends Component {
  render() {
    let curr_month = getMonth();
    let days = createDaysArray(curr_month);
    return (
      <>
        {days.map((day) => (
          <Day key={day} day={day} />
        ))}
      </>
    );
  }
}


class HabitRow extends Component {
  render() {
      return (
        <tr>
          <th className="f5 w2 outline">{this.props.name}</th>
          <ClickableDays/> 
        </tr>
      )
    }
}

class ClickableDays extends Component {
  render() {
    let curr_month = getMonth();
    let days = createDaysArray(curr_month);

    return (
      <>
        {days.map((day) => (
          <th key={day} className="outline">
            <button className="inline w2 h2">
              
            </button>
          </th>
        ))}
      </>
    );
  }
}
  

function createDaysArray(month) {
  const num_of_days = daysInMonth(month);
  let days = [];
  for(var i=1; i <= num_of_days; i++) {
      days.push(i);
  }
  return days;
}

export default HabitCalendar