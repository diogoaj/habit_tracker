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
  const { data } = useQuery(HABITS_QUERY);

  const [month_d, setMonthnum] = useState(getMonth());
  const [month, setMonth] = useState(integerToMonth(getMonth()));
  const [days_checked, setDaysChecked] = useState([]);

  function prevMonth() {
    setMonthnum(mod(month_d - 1, 12));
    setMonth(integerToMonth(mod(month_d - 1, 12)));
  }

  function nextMonth() {
    setMonthnum(mod(month_d + 1, 12));
    setMonth(integerToMonth(mod(month_d + 1, 12)));
  }

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
              <HabitRow clicked={days_checked} month={month_d} key={habit.id} name={habit.name} />
            ))}
          </>
        )} 
        </tbody>
      </table>
    </div>
  );
};


class DaysOfMonth extends Component {
  render() {
    let days = createDaysArray(this.props.month);
    return (
      <>
        {days.map((day) => (
          <th className="f5 w2 outline" key={day}>{day}</th>
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
          <ClickCell key={day}/>
        ))}
      </>
    );
  }
}

class ClickCell extends Component {
  constructor(props){
    super(props);
    this.state = {
      active: false
    }
  }

  clickMe = () => {
    //this.setState({active: !this.state.active})
  }

  render() {
      return (
        <th onClick={this.clickMe} className="w2 outline" key={this.props.day}></th>
      )
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