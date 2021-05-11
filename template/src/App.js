import React from 'react';
import {
      Switch,
      Route
} from "react-router-dom";
import HeaderAppBar from './components/HeaderAppBar';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
// import './App.css';

function App() {
      return (
            <HeaderAppBar>
                  <Switch>
                        <Route exact path="/">
                              <HomeView />
                        </Route>
                        <Route path="/login">
                              <LoginView />
                        </Route>
                        <Route path="/register">
                              <RegisterView />
                        </Route>
                  </Switch>
            </HeaderAppBar>
      );
}

export default App;