import React from 'react';
import {
      useSelector,
      // useDispatch
} from 'react-redux';
import { Helmet } from 'react-helmet';
import {useTranslation} from 'react-i18next'
import logo from '../../logo.svg';
import '../../App.css';

function HomeView() {
      const fakeAuth = useSelector(state => state.auth);
      const user = useSelector(state => state.user);
      
      const {t} = useTranslation()
      return (
            <div className="App">
                  <Helmet>
                        <title>{t('React JS | Home')}</title>
                        <meta name="description" content="Helmet application" />
                  </Helmet>
                  <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p >
                              Edit <code>src/App.js</code> and save to reload.
        </p>
                        <a
                              className="App-link"
                              href="https://reactjs.org"
                              target="_blank"
                              rel="noopener noreferrer"
                        >
                              Learn React
                        </a>
                        {fakeAuth.isAuthenticated && (<p>Login by {user.username}</p>)}

                  </header>
            </div>
      );
}

export default HomeView;