import fetch from 'cross-fetch';

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
  console.log(json);
  return {
    type: RECEIVE_FEED,
    user,
    feed: json,
  };
}

export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export function receiveError(user) {
  return {
    type: RECEIVE_ERROR,
    user,
  };
}

export function fetchFeedAction(user, page = 1) {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    dispatch(requestFeed(user, page));

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(
      `https://api.github.com/users/${user}/events/public?page=${page}`
    )
      .then(
        response => response.json(),
        // Do not use catch, because that will also catch
        // any errors in the dispatch and resulting render,
        // causing a loop of 'Unexpected batch number' errors.
        // https://github.com/facebook/react/issues/6895
        error => console.log('An error occurred.', error)
      )
      .then(
        json =>
          // We can dispatch many times!
          // Here, we update the app state with the results of the API call.
          console.log(json) | dispatch(receiveFeed(user, json))
      );
  };
}
