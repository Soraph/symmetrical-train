// ------------------------------------
// Constants

const SERIVCE_API = 'http://127.0.0.1:5000';

const IS_LOADING_ARTICLES = 'LOADING_ARTICLES';
const STORE_ARTICLES = 'STORE_ARTICLES';
const HAS_ERROR = 'HAS_ERROR';

// ------------------------------------
// Action creators

function isLoadingArticles(status = false) {
  return {
    type: IS_LOADING_ARTICLES,
    payload: status
  };
}

function storeArticles(articles) {
  return {
    type: STORE_ARTICLES,
    payload: articles
  };
}

function hasError(status = false, message = "") {
  return {
    type: HAS_ERROR,
    payload: {
      status, message
    }
  };
}

export function getArticlesAsync() {
  return dispatch => {
    fetch(`${SERIVCE_API}/articles/`)
    .then(response => {
      if (response.ok)
      return response.json();

      throw new Error('Could not fetch the articles');
    })
    .then(articles => {
      dispatch(storeArticles(articles));
      dispatch(isLoadingArticles(false));
    })
    .catch(error => {
      dispatch(hasError(true, error.message));
      dispatch(isLoadingArticles(false));
    })
  };
}

// ------------------------------------
// Selectors

export const getLoadingStatus = state => state.articles.isLoading;
export const getArticles = state => state.articles.articles;
export const getError = state => state.articles.error;

// ------------------------------------
// Store & reducer

const initialState = {
  isLoading: true,
  hasError: false,
  articles: [],
  error: ""
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case IS_LOADING_ARTICLES:
    return {
      ...state,
      isLoading: action.payload
    };
    case STORE_ARTICLES:
    return {
      ...state,
      articles: action.payload
    };
    case HAS_ERROR:
    return {
      ...state,
      hasError: action.payload.status,
      error: action.payload.message
    };

    default:
    return state;
  }
}
