import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import reducer, {
  deleteArticleAsync,
  getArticlesAsync,
  handleArticle,
  getLoadingStatus,
  getSavingStatus,
  getArticles,
  getError,
  testing
} from './articles';

const mockStore = configureMockStore([thunk]);

beforeEach(() => {
  fetchMock.restore();
});

test('fetch articles with success', done => {
  const data = [
    {
      "aid": "07f4e6d1-a57f-4c24-afb8-520384b6dfc5",
      "title": "Sloth",
      "content": "Speedy"
    },
    {
      "aid": "73cf6e5f-3bd1-4462-ab41-3a5f405f926b",
      "title": "Hermit Crab",
      "content": "Deadly",
    },
    {
      "aid": "df9e4bb0-c516-4fcb-abfb-7c2e123c3c52",
      "title": "Platipus",
      "content": "Vulgaris",
    },
    {
      "aid": "9de8feef-d98a-4428-8c7f-a0639fe1b8d5",
      "title": "Hamster",
      "content": "Holster",
    }
  ];

  fetchMock.get(`${testing.service_api}/articles/`, {status: 200, body: data});

  const store = mockStore();
  const expectedActions = [
    testing.isLoadingArticles(true),
    testing.storeArticles(data),
    testing.isLoadingArticles(false),
  ];

  return store.dispatch(getArticlesAsync())
    .then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
});

test('fetch articles with error', done => {
  fetchMock.get(`${testing.service_api}/articles/`, {status: 500});

  const store = mockStore();
  const expectedActions = [
    testing.isLoadingArticles(true),
    testing.hasError(true, "Could not fetch the articles"),
    testing.isLoadingArticles(false),
  ];

  return store.dispatch(getArticlesAsync())
    .then(() => {
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
});
