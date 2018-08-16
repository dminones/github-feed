import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import configureStore from './store';
import NavBar from './components/NavBar';
import Feed from './components/Feed';

const App = () => (
  <Provider store={configureStore()}>
    <React.Fragment>
      <CssBaseline />
      <NavBar />
      <Feed />
    </React.Fragment>
  </Provider>
);
export default App;
