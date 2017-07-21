// ------------------------------------
// Constants

const SERVICE_API = 'http://127.0.0.1:5000';

const IS_LOADING_ARTICLES = 'LOADING_ARTICLES';
const STORE_ARTICLES = 'STORE_ARTICLES';
const HAS_ERROR = 'HAS_ERROR';

const IS_SAVING_ARTICLE = 'IS_SAVING_ARTICLE';
const CREATE_ARTICLE = 'CREATE_ARTICLE';
const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
const DELETE_ARTICLE = 'DELETE_ARTICLE';

// ------------------------------------
// Action creators

function isLoadingArticles(status = false) {
  return {
    type: IS_LOADING_ARTICLES,
    payload: status
  };
}

function isSavingArticle(status = false) {
  return {
    type: IS_SAVING_ARTICLE,
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

function createArticle({aid, title, content}) {
  return {
    type: CREATE_ARTICLE,
    payload: {
      aid, title, content
    }
  }
}

function updateArticle({aid, title, content}) {
  return {
    type: UPDATE_ARTICLE,
    payload: {
      aid, title, content
    }
  }
}

function deleteArticle(aid) {
  return {
    type: DELETE_ARTICLE,
    payload: aid
  }
}

export function getArticlesAsync() {
  return dispatch => {
    return fetch(`${SERVICE_API}/articles/`)
    .then(response => {
      dispatch(isLoadingArticles(true));

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

export function handleArticle(data) {
  let dispatchFunction = createArticle;
  let extraUrlInfo = '/';
  let method = 'POST';

  if (data.aid.length) {
    method = 'PUT';
    extraUrlInfo = `/${data.aid}`
    dispatchFunction = updateArticle;
  }

  delete data.aid;

  return dispatch => {
    return fetch(`${SERVICE_API}/articles${extraUrlInfo}`, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
      })
      .then(response => {
        dispatch(isSavingArticle(true));
        if (response.ok)
          return response.json();

        throw new Error('Could not contact the server.');
      })
      .then(article => {
        dispatch(isSavingArticle(false));
        dispatch(dispatchFunction(article));
      })
      .catch(error => {
        dispatch(hasError(true, error.message));
        dispatch(isSavingArticle(false));
      })
    };
  }

  export function deleteArticleAsync(data) {
    if (window.confirm("Are you sure you want to delete the element?")) {
      return dispatch => {
        fetch(`${SERVICE_API}/articles/${data.aid}`, {
          method: 'DELETE',
          body: JSON.stringify(data.aid),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            }
          })
        .then(response => {
          dispatch(isSavingArticle(true));
          if (response.ok) {
            dispatch(isSavingArticle(false));
            dispatch(deleteArticle(data.aid));
          }

          throw new Error('Could not contact the server.');
        })
        .catch(error => {
          dispatch(hasError(true, error.message));
          dispatch(isSavingArticle(false));
        });
      };
    }
  }

  // ------------------------------------
  // Selectors

  export const getLoadingStatus = state => state.articles.isLoading;
  export const getSavingStatus = state => state.articles.isSaving;

  export const getArticles = state => state.articles.articles;
  export const getError = state => state.articles.error;

  // ------------------------------------
  // Store & reducer

  const initialState = {
    isLoading: true,
    isSaving: false,
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
      case IS_SAVING_ARTICLE:
        return {
          ...state,
          isSaving: action.payload
        };
      case STORE_ARTICLES:
        return {
          ...state,
          articles: action.payload
        };
      case CREATE_ARTICLE:
        let newArticles = state.articles.slice();
        newArticles.push({...action.payload});

        return {
          ...state,
          articles: newArticles,
        };
      case UPDATE_ARTICLE:
        newArticles = state.articles.slice();
        newArticles[newArticles.indexOf(
          newArticles.find(el => {
            return el.aid === action.payload.aid
          })
        )] = {...action.payload}

        return {
          ...state,
          articles: newArticles,
        };
      case DELETE_ARTICLE:
        newArticles = state.articles.filter((e) => e.aid !== action.payload)
        return {
          ...state,
          articles: newArticles
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

  // ------------------------------------
  // Testing variables

  export const testing = {
    service_api: SERVICE_API,
    storeArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    hasError,
    isLoadingArticles,
    isSavingArticle,
  };
