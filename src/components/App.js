import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Login from './Login';
import NewHabit from './NewHabit';
import HabitCalendar from './HabitCalendar';

import Cookie from "js-cookie"

const App = () => {
  const [loginState, setLoginState] = useState({
    token: Cookie.get("token"),
    
  });

  return (
    <div className="fixed overflow-x-hidden w-100">
        <Header token={loginState.token} loginHandler={setLoginState}/>
        <Switch>
          <Route exact path="/"
                 render={() => (<HabitCalendar token={loginState.token}/> )}/>
          <Route exact path="/login" 
                 render={() => (<Login token={loginState.token} loginHandler={setLoginState}/> )}/>
          <Route exact path="/newHabit" 
                 render={() => (<NewHabit token={loginState.token} /> )}/>
        </Switch>
    </div>
  )
};

export default App;