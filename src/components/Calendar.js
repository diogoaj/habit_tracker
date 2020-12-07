import React, { Component } from 'react'
import {daysInMonth, getMonth} from '../utils/date';

class Calendar extends Component {
    render() {
      return (
        <div className="calendar">
          <DaysOfMonth />
        </div>
      );
    }
  }

  class Day extends Component {
    render() {
        return (
            <div className="mr2" key={this.props.day}>{this.props.day}</div>
        )
      }
  }



  class DaysOfMonth extends Component {
    createDaysArray(month) {
        const num_of_days = daysInMonth(month);
        let days = [];
        for(var i=1; i <= num_of_days; i++) {
            days.push(i);
        }
        return days;
    }

    render() {
      let curr_month = getMonth();
      let days = this.createDaysArray(curr_month);

      return (
        <div className="flex flex-wrap w-30 mw5 mw8-ns center pa3 mv3 ph5-ns">
          {(
          <>
              {days.map((day) => (
                <Day key={day} day={day} />
              ))}
            </>
          )}
        </div>
      );
    }
}
  
  
  

export default Calendar