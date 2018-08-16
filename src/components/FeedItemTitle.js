import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TimeAgo from 'react-timeago';
import RepoLink from './RepoLink';
import EventDescription from './EventDescription';

const styles = {
  date: {
    color: '#6a737d',
    fontSize: '0.9em',
    marginLeft: '5px',
  },
  title: { color: '#24292e' },
};

function FeedItemTitle(props) {
  const { classes, item } = props;
  return (
    <div className={classes.title}>
      <EventDescription item={item} />
      <RepoLink repo={item.repo} />
      <TimeAgo date={item.created_at} className={classes.date} />
    </div>
  );
}

FeedItemTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedItemTitle);
