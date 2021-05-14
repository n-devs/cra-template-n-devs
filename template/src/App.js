import React from 'react';
import {
      BrowserRouter as Router,
      Switch,
      Route
} from "react-router-dom";
import { Provider } from 'react-redux';
import HeaderAppBar from './components/HeaderAppBar';
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

function App() {
      const store = createStore(rootReducer);

      return (
            <React.Suspense fallback={<div>...Loading</div>}>
                  <Provider store={store}>
                        <I18nextProvider i18n={i18n}>
                              <Router>
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
                                          </Switch>
                                    </HeaderAppBar>
                              </Router>
                        </I18nextProvider>
                  </Provider>
            </React.Suspense>
      );
}

export default App;