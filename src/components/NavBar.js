import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBar from 'material-ui-search-bar';
import { fetchFeedAction } from '../actions/fetchFeedAction';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
});

const NavBar = ({ classes, fetchFeed }) => (
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
          onRequestSearch={text => fetchFeed(text)}
          style={{
            margin: '0 auto',
            maxWidth: 1000,
          }}
        />
      </Toolbar>
    </AppBar>
  </div>
);

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => ({
  fetchFeed: (user, page) => dispatch(fetchFeedAction(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NavBar));
