import fetchFeedReducer from './fetchFeedReducer';
import * as types from '../actions/fetchFeedAction';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  page: 1,
};

describe('fetchFeedReducer', () => {
  it('should return the initial state', () => {
    expect(fetchFeedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REQUEST_FEED', () => {
    const user = 'dminones',
      page = 2;
    expect(
      fetchFeedReducer(undefined, {
        type: types.REQUEST_FEED,
        user,
        page,
      })
    ).toEqual({
      isFetching: true,
      didInvalidate: false,
      items: [],
      page,
      user,
    });
  });

  it('should handle RECEIVE_FEED', () => {
    const user = 'dminones',
      items = [2];
    expect(
      fetchFeedReducer(undefined, {
        type: types.RECEIVE_FEED,
        user,
        feed: items,
      })
    ).toEqual(
      Object.assign(initialState, {
        isFetching: false,
        items,
        user,
      })
    );
  });

  it('should handle RECEIVE_FEED adding items when is a new page', () => {
    const user = 'dminones',
      items = [2];
    expect(
      fetchFeedReducer(Object.assign(initialState, { items: [1] }), {
        type: types.RECEIVE_FEED,
        user,
        feed: items,
      })
    ).toEqual(
      Object.assign(initialState, {
        isFetching: false,
        items: [1, 2],
        user,
      })
    );
  });
});
