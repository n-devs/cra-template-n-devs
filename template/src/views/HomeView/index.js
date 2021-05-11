import React from 'react';
import {
      useSelector,
      // useDispatch
} from 'react-redux';
import logo from '../../logo.svg';
import '../../App.css';

function HomeView() {
      const fakeAuth = useSelector(state => state.auth);
      const data = useSelector(state => state.user);
      return (
            <div className="App">
                  <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <p>
                              Edit <code>src/App.js</code> and save to reload.
        </p>
                        <a
                              className="App-link"
                              href="https://reactjs.org"
                              target="_blank"
                              rel="noopener noreferrer"
                        >
                              Learn React {fakeAuth.isAuthenticated && data.user.username }
                        </a>
                  </header>
            </div>
      );
}

export default HomeView;