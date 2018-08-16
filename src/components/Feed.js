import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import FeedItem from './FeedItem';
import { fetchFeedNewPageAction } from '../actions/fetchFeedAction';

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
  message: {
    margin: '100px 50px',
    fontSize: '18px',
  },
});

const FeedList = ({ classes, items, isFetching, fetchFeedNewPage }) => {
  if (!items) {
    return (
      <div className={classes.message}>
        Theres is no events, please search for a user on the topbar
      </div>
    );
  }

  if (isFetching && (!items || items.length <= 0)) {
    return <div className={classes.message}>Loading...</div>;
  }

  return (
    <div className={classes.items}>
      {items.map(item => (
        <FeedItem item={item} />
      ))}

      {items.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={isFetching}
          onClick={() => fetchFeedNewPage()}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

const Feed = props => {
  const { classes, fetchFeedNewPage, fetchFeedReducer } = props;

  return (
    <div className={classes.wrapper}>
      <div className={classes.layout}>
        <FeedList
          classes={classes}
          fetchFeedNewPage={fetchFeedNewPage}
          {...fetchFeedReducer}
        />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  ...state,
});
const mapDispatchToProps = dispatch => ({
  fetchFeedNewPage: () => dispatch(fetchFeedNewPageAction()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Feed));
