import React, { Component, useState } from 'react'
import {daysInMonth, getMonth, integerToMonth, getYear} from '../utils/date'
import { useQuery, useLazyQuery } from 'react-apollo'
import gql from 'graphql-tag'
import {mod} from '../utils/math'

const HABITS_QUERY = gql`
  query getHabits($username: String!) {
    habits(username: $username) {
        id
        name
    }
  }
`

const DAYS_QUERY = gql`
  query getDays($username: String!, $name: String!, $month: Int, $year: Int) {
    habitDays(username: $username, name: $name, month: $month, year: $year) {
        id
        day
        month
        year
    }
  }
`

const HabitCalendar = () => {
  const { data } = useQuery(HABITS_QUERY, {variables: {username: "diogoaj"}});

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
              <HabitRow month={month_d} days={habit.days} key={habit.id} name={habit.name} />
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

const HabitRow = (e) => {
  const { data } = useQuery(DAYS_QUERY, 
    {variables: {
      username: "diogoaj", name: e.name}});
  
  return (
    <tr>
      <th className="f5 w2 outline">{e.name}</th>
      {data && <ClickableDays days={data} month={e.month}/> }
    </tr>
  )
}

class ClickableDays extends Component {
  render() {
    let days_array = createDaysArray(this.props.month);

    return (
      <>
        {days_array.map((day) => (
          <ClickCell days={this.props.days} day={day} key={day} month={this.props.month}/>
        ))}
      </>
    );
  }
}

class ClickCell extends Component {
  constructor(props){
    super(props);
  }
  
  clickMe = () => {
    //this.setState({active: !this.state.active})
  }

  render() {
      const checked_days = this.props.days.habitDays;
      var active = false;

      for(var i=0; i < checked_days.length; i++) {
        if (this.props.day === checked_days[i].day && (this.props.month+1) === checked_days[i].month){
          active = true
          break;
        } else {
          active = false
        }
      }

      if (active){
        return (
          <th onClick={this.clickMe} className="w2 outline bg-green" key={this.props.day}></th>
        )
      } else {
        return (
          <th onClick={this.clickMe} className="w2 outline" key={this.props.day}></th>
        )
      }
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