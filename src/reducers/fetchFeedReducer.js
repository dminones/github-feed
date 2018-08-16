import {
  RECEIVE_ERROR,
  REQUEST_FEED,
  RECEIVE_FEED,
} from '../actions/fetchFeedAction';

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    page: 1,
  },
  action
) {
  console.log('STATE', state);
  console.log('action', action);
  switch (action.type) {
    case RECEIVE_ERROR:
      return Object.assign({}, state, {
        didInvalidate: true,
        user: action.user,
      });
    case REQUEST_FEED:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        user: action.user,
        items: action.page > 1 ? state.items : [],
        page: action.page,
      });
    case RECEIVE_FEED:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [...state.items, ...action.feed],
        lastUpdated: action.receivedAt,
        user: action.user,
      });
    default:
      return state;
  }
}

function fetchFeedReducer(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ERROR:
    case RECEIVE_FEED:
    case REQUEST_FEED:
      return Object.assign({}, state, posts(state, action));
    default:
      return state;
  }
}

export default fetchFeedReducer;
