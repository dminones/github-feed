import Constants from '../Constants';
export const REQUEST_FEED = 'REQUEST_FEED';
function requestFeed(user, page) {
  return {
    type: REQUEST_FEED,
    user,
    page,
  };
}

export const RECEIVE_FEED = 'RECEIVE_FEED';
function receiveFeed(user, json) {
  return {
    type: RECEIVE_FEED,
    user,
    feed: json,
  };
}

export const RECEIVE_ERROR = 'RECEIVE_ERROR';
function receiveError(user) {
  return {
    type: RECEIVE_ERROR,
    user,
  };
}

export function fetchFeedAction(user) {
  return function(dispatch) {
    return fetchFeedActionHelper(dispatch, { user, page: 1 });
  };
}

export function fetchFeedNewPageAction() {
  return function(dispatch, getState) {
    const { fetchFeedReducer } = getState();
    const { user, page } = fetchFeedReducer;
    return fetchFeedActionHelper(dispatch, { user, page: page + 1 });
  };
}

function fetchFeedActionHelper(dispatch, { user, page }) {
  dispatch(requestFeed(user, page));
  return fetch(
    `https://api.github.com/users/${user}/events/public?page=${page}&per_page=${
      Constants.PER_PAGE
    }`
  )
    .then(response => response.json(), error => dispatch(receiveError(user)))
    .then(json => {
      if (json.message) {
        dispatch(receiveError(user));
      } else {
        dispatch(receiveFeed(user, json));
      }
    });
}
