import {
  RECEIVE_ERROR,
  REQUEST_FEED,
  RECEIVE_FEED,
} from '../actions/fetchFeedAction';
import Constants from '../Constants';

function posts(state, action) {
  switch (action.type) {
    case RECEIVE_ERROR:
      return Object.assign({}, state, {
        didInvalidate: true,
        user: action.user,
        isFetching: false,
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
        user: action.user,
        isLastPage: action.feed.length < Constants.PER_PAGE,
      });
    default:
      return state;
  }
}

function fetchFeedReducer(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    page: 1,
    isLastPage: false,
  },
  action
) {
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
