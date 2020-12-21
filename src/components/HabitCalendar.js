import React, { Component, useState } from 'react'
import {daysInMonth, getMonth, integerToMonth, getYear} from '../utils/date'
import { useQuery } from 'react-apollo'
import gql from 'graphql-tag'
import {mod} from '../utils/math'

const HABITS_QUERY = gql`
  {
    habits(username:"diogoaj") {
        id
        name
    }
  }
`

const HabitCalendar = () => {
  const [month_d, setMonthnum] = useState(getMonth());
  const [month, setMonth] = useState(integerToMonth(getMonth()));

  function prevMonth() {
    setMonthnum(mod(month_d - 1, 12));
    setMonth(integerToMonth(mod(month_d - 1, 12)));
  }

  function nextMonth() {
    setMonthnum(mod(month_d + 1, 12));
    setMonth(integerToMonth(mod(month_d + 1, 12)));
  }

  const { data } = useQuery(HABITS_QUERY);
  return (
    <div className="mv4">
     
      <div className="center w-80 tc">
        <button onClick={prevMonth}>&laquo;</button>
        <span className="f3 ma3">{month}</span>
        <button onClick={nextMonth}>&raquo;</button>
      </div>
      
      <table className="nowrap overflow-x-hidden center mv2 w-80">
            <thead>
              <tr>
                <th className="f5 w2 outline">Habit</th>
                <DaysOfMonth month={month_d}/>
              </tr>
            </thead>
        <tbody>
        {data && (
          <>
            {data.habits.map((habit) => (
              <HabitRow month={month_d} key={habit.id} name={habit.name} />
            ))}
          </>
        )} 
        </tbody>
      </table>
    </div>
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
    let days = createDaysArray(this.props.month);
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
          <ClickableDays month={this.props.month}/> 
        </tr>
      )
    }
}

class ClickableDays extends Component {
  render() {
    let days = createDaysArray(this.props.month);

    return (
      <>
        {days.map((day) => (
          <th key={day} className="outline">
            <div className="inline w2 h2">
            </div>
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