import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FeedItemTitle from './FeedItemTitle';
import CommitsCard from './CommitsCard';

const styles = {
  card: {
    padding: '15px 0px',
    textAlign: 'left',
    borderBottom: '1px solid #e0e0e0',
    '&:last-child': {
      borderBottom: 'none',
    },
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
      <CommitsCard item={item} />
    </div>
  );
}

FeedItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedItem);
