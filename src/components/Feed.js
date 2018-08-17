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
  actor: {
    textAlign: 'left',
    padding: '20px',
    background: '#4059b5',
    color: 'white',
    fontWeight: 'bold',
  },
  actorAvatar: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    verticalAlign: 'middle',
    marginRight: '5px',
  },
});

const Actor = ({ actor, classes }) => (
  <div className={classes.actor}>
    <img
      src={actor.avatar_url}
      alt={actor.display_login}
      className={classes.actorAvatar}
    />
    {actor.display_login}
  </div>
);

const FeedList = ({
  classes,
  items,
  isFetching,
  isLastPage,
  didInvalidate,
  fetchFeedNewPage,
}) => {
  const emptyList = !items || items.length <= 0;
  if (isFetching && emptyList) {
    return <div className={classes.message}>Loading...</div>;
  }

  if (didInvalidate) {
    return <div className={classes.message}>There isn't such username</div>;
  }

  if (emptyList) {
    return (
      <div className={classes.message}>
        There are no events, please search for a user on the top bar
      </div>
    );
  }

  const [{ actor }] = items;
  console.log('FIRST', actor);

  return (
    <div>
      <Actor actor={actor} classes={classes} />
      <div className={classes.items}>
        {items.map(item => (
          <FeedItem key={item.id} item={item} />
        ))}

        {!isLastPage && (
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
