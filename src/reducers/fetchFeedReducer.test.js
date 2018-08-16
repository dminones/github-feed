import fetchFeedReducer from './fetchFeedReducer';
import * as types from '../actions/fetchFeedAction';
import Constants from '../Constants';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  page: 1,
  isLastPage: false,
};

describe('fetchFeedReducer', () => {
  it('should return the initial state', () => {
    expect(fetchFeedReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REQUEST_FEED ', () => {
    const user = 'dminones',
      page = 2;
    expect(
      fetchFeedReducer(
        {
          isFetching: false,
          didInvalidate: false,
          items: [1],
          page,
          user,
        },
        {
          type: types.REQUEST_FEED,
          user,
          page: 2,
        }
      )
    ).toEqual({
      isFetching: true,
      didInvalidate: false,
      items: [1],
      page,
      user,
    });
  });

  it('should handle REQUEST_FEED cleaning items when page >1', () => {
    const user = 'dminones',
      page = 2;
    expect(
      fetchFeedReducer(undefined, {
        type: types.REQUEST_FEED,
        user,
        page,
      })
    ).toEqual(
      Object.assign({}, initialState, {
        isFetching: true,
        didInvalidate: false,
        items: [],
        page,
        user,
      })
    );
  });

  it('should handle RECEIVE_FEED', () => {
    const user = 'dminones',
      items = new Array(Constants.PER_PAGE);
    expect(
      fetchFeedReducer(initialState, {
        type: types.RECEIVE_FEED,
        user,
        feed: items,
      })
    ).toEqual(
      Object.assign({}, initialState, {
        isFetching: false,
        items,
        user,
      })
    );
  });

  it('should handle RECEIVE_FEED adding items', () => {
    const user = 'dminones',
      items = new Array(Constants.PER_PAGE);
    expect(
      fetchFeedReducer(Object.assign({}, initialState, { items: [1] }), {
        type: types.RECEIVE_FEED,
        user,
        feed: items,
      })
    ).toEqual(
      Object.assign({}, initialState, {
        isFetching: false,
        items: [1, ...items],
        user,
      })
    );
  });

  it('should handle RECEIVE_FEED when is last page', () => {
    const user = 'dminones',
      items = new Array(Constants.PER_PAGE - 10);
    expect(
      fetchFeedReducer(initialState, {
        type: types.RECEIVE_FEED,
        user,
        feed: items,
      })
    ).toEqual(
      Object.assign({}, initialState, {
        isFetching: false,
        items: items,
        user,
        isLastPage: true,
      })
    );
  });

  it('should handle RECEIVE_ERROR', () => {
    const user = 'dminones';
    expect(
      fetchFeedReducer(initialState, {
        type: types.RECEIVE_ERROR,
        user,
      })
    ).toEqual(
      Object.assign({}, initialState, {
        isFetching: false,
        didInvalidate: true,
        user,
      })
    );
  });
});
