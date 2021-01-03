import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Login from './Login';
import NewHabit from './NewHabit';
import HabitCalendar from './HabitCalendar';

import Cookie from "js-cookie"

const App = () => {
  const [userState, setUserState] = useState({
    token: Cookie.get("token"),
  });

  return (
    <div className="fixed overflow-x-hidden w-100">
        <Header token={userState.token} userHandler={setUserState}/>
        <Switch>
          <Route exact path="/"
                 render={() => (<HabitCalendar token={userState.token}/> )}/>
          <Route exact path="/login" 
                 render={() => (<Login userHandler={setUserState}/> )}/>
          <Route exact path="/newHabit" 
                 render={() => (<NewHabit /> )}/>
        </Switch>
    </div>
  )
};

export default App;