import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchBar from 'material-ui-search-bar';

import {
  fetchFeedAction,
  fetchFeedNewPageAction,
} from './actions/fetchFeedAction';
import FeedItem from './components/FeedItem';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    background: 'white',
    textAlign: 'center',
    padding: '20px 0px',
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  button: {
    margin: '0 5px',
  },
  items: {
    padding: '20px',
  },
});

class App extends Component {
  render() {
    console.log(this.props);
    const { classes, fetchFeedReducer } = this.props;
    const { items = [], page } = fetchFeedReducer;
    console.log('fetchFeedReducer', fetchFeedReducer);
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <Typography
                variant="title"
                color="inherit"
                noWrap
                className={classes.flex}
              >
                Github Feed
              </Typography>
              <SearchBar
                onRequestSearch={text => this.props.fetchFeed(text)}
                style={{
                  margin: '0 auto',
                  maxWidth: 1000,
                }}
              />
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.layout}>
            <div className={classes.items}>
              {items.map(item => (
                <FeedItem item={item} />
              ))}
            </div>
            {items.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.props.fetchFeedNewPage()}
              >
                Load More
              </Button>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => ({
  fetchFeed: (user, page) => dispatch(fetchFeedAction(user, page)),
  fetchFeedNewPage: () => dispatch(fetchFeedNewPageAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
