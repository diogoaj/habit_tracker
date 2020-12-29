import React, { Component } from 'react'
import UserList from './UserList'
import Header from './Header';
import HabitCalendar from './HabitCalendar';
import Login from './Login';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="fixed overflow-x-hidden w-100">
        <Header/>
        <Switch>
          <Route exact path="/" component={HabitCalendar}/>
          <Route exact path="/login" component={Login} />
        </Switch>
    </div>
  )
};

export default App