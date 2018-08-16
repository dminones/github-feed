import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {};

const eventDescriptionText = item => {
  switch (item.type) {
    case 'PushEvent':
      return 'pushed to ';
    case 'PublicEvent':
      return 'open sourced repository ';
    case 'WatchEvent':
      return 'starred ';
    case 'PullRequestEvent':
      return `${item.payload.action} pull request #${item.payload.number} on
          repository `;
    case 'CreateEvent':
      return `created ${item.payload.ref_type} ${
        item.payload.ref_type !== 'repository'
          ? item.payload.ref + ' on repository '
          : ''
      }`;
    default:
      return `${item.type} `;
  }
};

const EventDescription = ({ item }) => (
  <span>{eventDescriptionText(item)}</span>
);

EventDescription.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDescription);
