import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchBar from 'material-ui-search-bar';
import { fetchFeedAction } from '../actions/fetchFeedAction';
import { GithubCircle } from 'mdi-material-ui';

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
  iconLink: {
    color: 'white',
  },
  icon: {
    fontSize: '40px',
    marginLeft: '5px',
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
          }}
        />
        <a
          className={classes.iconLink}
          href="https://github.com/dminones/github-feed"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubCircle className={classes.icon} />
        </a>
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
