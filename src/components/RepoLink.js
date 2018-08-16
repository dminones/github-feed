import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  link: {
    color: '#24292e',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      color: '#0366d6',
    },
  },
};

const RepoLink = ({ classes, repo }) => (
  <a href={repo.url} className={classes.link} target="_blank">
    {repo.name}
  </a>
);

RepoLink.propTypes = {
  classes: PropTypes.object.isRequired,
  repo: PropTypes.object.isRequired,
};

export default withStyles(styles)(RepoLink);
