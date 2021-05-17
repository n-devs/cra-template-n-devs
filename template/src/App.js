import React from 'react';
import {
      Switch,
      Route
} from "react-router-dom";
import HeaderAppBar from './components/HeaderAppBar';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import NoMatch from './views/NoMatch';

function App() {

      return (

            <HeaderAppBar>
                  <Switch>
                        <Route exact={true} path="/">
                              <HomeView />
                        </Route>
                        <Route path="/login">
                              <LoginView />
                        </Route>
                        <Route path="/register">
                              <RegisterView />
                        </Route>
                        <Route path="*">
            <NoMatch />
          </Route>
                  </Switch>
            </HeaderAppBar>
      );
}

export default App;