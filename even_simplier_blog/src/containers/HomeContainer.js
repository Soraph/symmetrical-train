import { connect } from 'react-redux';
import {
  getError,
  getArticles,
  getLoadingStatus,
  getSavingStatus,
  getArticlesAsync,
  handleArticle,
  deleteArticleAsync,
} from '../modules/articles';

import Home from '../components/Home';


const mapDispatchToProps = {
  getError: () => getError(),
  getArticlesAsync: () => getArticlesAsync(),
  handleArticle: (data) => handleArticle(data),
  deleteArticleAsync: (data) => deleteArticleAsync(data)
};

const mapStateToProps = (state) => {
  return {
    isLoading: getLoadingStatus(state),
    isSaving: getSavingStatus(state),
    articles: getArticles(state),
    error: getError(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
