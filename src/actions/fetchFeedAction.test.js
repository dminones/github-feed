import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from './fetchFeedAction';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates RECEIVE_FEED when fetching fetchFeedAction succeeds', () => {
    const user = 'dminones';
    const page = 1;
    fetchMock.getOnce(
      `https://api.github.com/users/${user}/events/public?page=${page}`,
      {
        body: [],
        headers: { 'content-type': 'application/json' },
      }
    );

    const expectedActions = [
      { type: actions.REQUEST_FEED, page: 1, user },
      { type: actions.RECEIVE_FEED, feed: [], user },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetchFeedAction(user)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_FEED when fetching fetchFeedNewPageAction succeeds', () => {
    const user = 'dminones';
    const page = 2;
    const feed = [3, 4];
    fetchMock.getOnce(
      `https://api.github.com/users/${user}/events/public?page=${page}`,
      {
        body: feed,
        headers: { 'content-type': 'application/json' },
      }
    );

    const expectedActions = [
      { type: actions.REQUEST_FEED, page, user },
      { type: actions.RECEIVE_FEED, feed, user },
    ];
    const store = mockStore({
      fetchFeedReducer: {
        user,
        page: 1,
        feed: [1, 2],
      },
    });

    return store.dispatch(actions.fetchFeedNewPageAction()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates RECEIVE_ERROR when fetching unexistent user', () => {
    const user = 'unexistent';
    const page = 1;
    fetchMock.getOnce(
      `https://api.github.com/users/${user}/events/public?page=${page}`,
      {
        body: {
          message: 'Not Found',
        },
        headers: { 'content-type': 'application/json' },
      }
    );

    const expectedActions = [
      { type: actions.REQUEST_FEED, page, user },
      { type: actions.RECEIVE_ERROR, user },
    ];
    const store = mockStore({});

    return store.dispatch(actions.fetchFeedAction(user)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
