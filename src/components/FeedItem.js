import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FeedItemTitle from './FeedItemTitle';

const styles = {
  card: {
    minWidth: 275,
    margin: '0px 0px 10px 0px',
    textAlign: 'left',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function FeedItem(props) {
  const { classes, item } = props;
  console.log(item);
  return (
    <div className={classes.card}>
      <FeedItemTitle item={item} />
    </div>
  );
}

FeedItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedItem);
