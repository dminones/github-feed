import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from './components/NavBar';
import Feed from './components/Feed';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <NavBar />
    <Feed />
  </React.Fragment>
);
export default App;
