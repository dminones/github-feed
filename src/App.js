import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import NavBar from './components/NavBar';

import { fetchFeedNewPageAction } from './actions/fetchFeedAction';
import FeedItem from './components/FeedItem';

const styles = theme => ({
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
    const { items = [] } = fetchFeedReducer;
    console.log('fetchFeedReducer', fetchFeedReducer);
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
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
  fetchFeedNewPage: () => dispatch(fetchFeedNewPageAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
