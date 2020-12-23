import React, { Component, useState } from 'react'
import {daysInMonth, getMonth, integerToMonth, getYear} from '../utils/date'
import { useQuery, useLazyQuery, useMutation} from 'react-apollo'
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

const CHECK_DAY_MUTATION = gql`
  mutation checkDayMutation(
    $username: String!
    $habit_name: String!,
    $day: Int!,
    $month: Int!,
    $year: Int!
  ) {
    checkDay(username: $username, habit_name: $habit_name, day: $day, month: $month, year: $year) {
      id
    }
  }
`;

const UNCHECK_DAY_MUTATION = gql`
  mutation uncheckDayMutation(
    $username: String!
    $habit_name: String!,
    $day: Int!,
    $month: Int!,
    $year: Int!
  ) {
    uncheckDay(username: $username, habit_name: $habit_name, day: $day, month: $month, year: $year) {
      id
    }
  }
`;

const HabitCalendar = () => {
  const { data } = useQuery(HABITS_QUERY, {variables: {username: "diogoaj"}});

  const [month_d, setMonthnum] = useState(getMonth());
  const [month, setMonth] = useState(integerToMonth(getMonth()));
  const [year, setYear] = useState(2020);

  function prevMonth() {
    var n = month_d - 1
    if (n === -1) {
      setYear(year - 1)
    }
    setMonthnum(mod(month_d - 1, 12));
    setMonth(integerToMonth(mod(month_d - 1, 12)));
  }

  function nextMonth() {
    var n = month_d + 1
    if (n === 12) {
      setYear(year + 1)
    }
    setMonthnum(mod(month_d + 1, 12));
    setMonth(integerToMonth(mod(month_d + 1, 12)));
  }

  return (
    <div className="mv4">
     
      <div className="center w-80 tc">
        <button onClick={prevMonth}>&laquo;</button>
        <span className="f3 ma3">{month} {year}</span>
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
              <HabitRow year={year} month={month_d} days={habit.days} key={habit.id} name={habit.name} />
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
      {data && <ClickableDays days={data} month={e.month} year={e.year} habit={e.name}/> }
    </tr>
  )
}

class ClickableDays extends Component {
  render() {
    var map = {}
    let days_array = createDaysArray(this.props.month);

    for(var i=0; i < days_array.length; i++) {
      map[i+1] = false;
    }

    const checked_days = this.props.days.habitDays;
 
    for(var i=0; i < checked_days.length; i++) {
      if ((this.props.month+1) === checked_days[i].month &&
         this.props.year === checked_days[i].year){
        map[checked_days[i].day] = true;
      } 
    }

    return (
      <>
        {days_array.map((day) => (
          <ClickCell days={map} day={day} key={day} month={this.props.month} year={this.props.year} habit={this.props.habit}/>
        ))}
      </>
    );
  }
}

const ClickCell = (e) => {
  const [checkDay] = useMutation(CHECK_DAY_MUTATION, {
    variables: {
      username: "diogoaj",
      habit_name: e.habit,
      day: e.day,
      month: e.month+1,
      year: e.year
    }, refetchQueries: [{ query: DAYS_QUERY, variables: {username: "diogoaj", name: e.habit}}]
  });

  const [uncheckDay] = useMutation(UNCHECK_DAY_MUTATION, {
    variables: {
      username: "diogoaj",
      habit_name: e.habit,
      day: e.day,
      month: e.month+1,
      year: e.year
    }, refetchQueries: [{ query: DAYS_QUERY, variables: {username: "diogoaj", name: e.habit}}]
    });

  function clickMe() {
    if (e.days[e.day]){
      uncheckDay();
    } else {
      checkDay();
    }
  }

  if (e.days[e.day]){
    return (
      <th onClick={clickMe} className="w2 outline bg-green" key={e.day}></th>
    )
  } else {
    return (
      <th onClick={clickMe} className="w2 outline" key={e.day}></th>
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