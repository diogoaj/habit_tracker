import React, { Component } from 'react'
import UserList from './UserList'
import Header from './Header';
import Calendar from './Calendar';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="absolute w-100">
        <Header/>
        <Switch>
          <Route exact path="/"/>
          <Route exact path="/users" component={Calendar} />
        </Switch>
    </div>
  )
};

export default App