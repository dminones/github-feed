import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    padding: '15px',
    margin: '10px 0px 0px 0px',
    textAlign: 'left',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    color: '#24292e',
    background: 'white',
  },
  title: {
    fontSize: '15px',
  },
  commits: {
    listStyleType: 'none',
    padding: '0px',
    fontSize: '13px',
  },
  commit: {},
};

const includedEvents = ['PushEvent'];

const getBranch = payload => payload.ref.split('/').pop();

const BranchLink = ({ branch, repo }) => (
  <a href={`https://github.com/${repo}/tree/${branch}`} target="blank">
    {branch}
  </a>
);

const CommitLink = ({ commit, repo }) => (
  <a href={`https://github.com/${repo}/commit/${commit}`} target="blank">
    {commit.substring(0, 7)}
  </a>
);

function CommitsCard({ classes, item }) {
  if (!includedEvents.includes(item.type)) {
    return null;
  }

  return (
    <div className={classes.card}>
      <div className={classes.title}>
        {`${item.payload.commits.length} commit${
          item.payload.commits.length > 1 ? 's' : ''
        }  to `}
        <BranchLink repo={item.repo.name} branch={getBranch(item.payload)} />
      </div>
      <ul className={classes.commits}>
        {item.payload.commits.map(commit => (
          <li key={commit.sha} className={classes.commit}>
            <CommitLink commit={commit.sha} repo={item.repo.name} />{' '}
            {commit.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

CommitsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommitsCard);
