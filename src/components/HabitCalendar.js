import React, { Component, useState } from 'react'
import {daysInMonth, getMonth, integerToMonth, getYear} from '../utils/date'
import { useQuery, useLazyQuery, useMutation} from 'react-apollo'
import gql from 'graphql-tag'
import {mod} from '../utils/math'
import Cookie from "js-cookie"

const HABITS_QUERY = gql`
  {
    habits {
        id
        name
    }
  }
`

const DAYS_QUERY = gql`
  query getDays($name: String!, $month: Int, $year: Int) {
    habitDays(name: $name, month: $month, year: $year) {
        day
        month
        year
    }
  }
`

const CHECK_DAY_MUTATION = gql`
  mutation checkDayMutation(
    $habit_name: String!,
    $day: Int!,
    $month: Int!,
    $year: Int!
  ) {
    checkDay(habit_name: $habit_name, day: $day, month: $month, year: $year) {
      id
    }
  }
`;

const UNCHECK_DAY_MUTATION = gql`
  mutation uncheckDayMutation(
    $habit_name: String!,
    $day: Int!,
    $month: Int!,
    $year: Int!
  ) {
    uncheckDay(habit_name: $habit_name, day: $day, month: $month, year: $year) {
      id
    }
  }
`;

const HabitCalendar = () => {
  const token = Cookie.get("token");

  const { data } = useQuery(HABITS_QUERY);

  const [month_d, setMonthnum] = useState(getMonth());
  const [month, setMonth] = useState(integerToMonth(getMonth()));
  const [year, setYear] = useState(getYear());

  let days = createDaysArray(month_d);

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
      {token && (
      <>
      <div className="center w-80 tc">
        <button onClick={prevMonth}>&laquo;</button>
        <span className="f3 ma3">{month} {year}</span>
        <button onClick={nextMonth}>&raquo;</button>
      </div>
      
      <table className="nowrap overflow-x-hidden center mv2 w-80">
            <thead>
              <tr>
                <th className="f5 w2 outline">Habit</th>
                <DaysOfMonth days_to_print={days}/>
              </tr>
            </thead>
        <tbody>
        {data && (
          <>
            {data.habits.map((habit) => (
              <HabitRow days_to_print={days} year={year} month={month_d} key={habit.id} name={habit.name} />
            ))}
          </>
        )} 
        </tbody>
      </table>
      </>
      )}
    </div> 
  );
};


class DaysOfMonth extends Component {
  render() {
    return (
      <>
        {this.props.days_to_print.map((day) => (
          <th className="f5 w2 outline" key={day}>{day}</th>
        ))}
      </>
    );
  }
}

const HabitRow = (e) => {
  const { data } = useQuery(DAYS_QUERY, 
    {variables: {
      name: e.name,
      month: e.month + 1,
      year: e.year
    }});
  
  return (
    <tr>
      <th className="f5 w2 outline">{e.name}</th>
      {data && <ClickableDays days_to_print={e.days_to_print} days={data.habitDays} month={e.month} year={e.year} habit={e.name}/> }
    </tr>
  )
}

class ClickableDays extends Component {
  render() {
    var map = {}
    const checked_days = this.props.days;

    for(var i=0; i < checked_days.length; i++) {
      if ((this.props.month+1) === checked_days[i].month &&
         this.props.year === checked_days[i].year){
        map[checked_days[i].day] = true;
      } 
    }

    return (
      <>
        {this.props.days_to_print.map((day) => (
          <ClickCell days={map} day={day} key={day} month={this.props.month} year={this.props.year} habit={this.props.habit}/>
        ))}
      </>
    );
  }
}

const ClickCell = (e) => {
  const [checkDay] = useMutation(CHECK_DAY_MUTATION, {
    variables: {
      habit_name: e.habit,
      day: e.day,
      month: e.month+1,
      year: e.year
    }, refetchQueries: [{ query: DAYS_QUERY, variables: {name: e.habit, month: e.month+1, year: e.year}}]
  });

  const [uncheckDay] = useMutation(UNCHECK_DAY_MUTATION, {
    variables: {
      habit_name: e.habit,
      day: e.day,
      month: e.month+1,
      year: e.year
    }, refetchQueries: [{ query: DAYS_QUERY, variables: {name: e.habit, month: e.month+1, year: e.year}}]
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