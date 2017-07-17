import { connect } from 'react-redux';
import {
  getError,
  getArticles,
  getLoadingStatus,
  getSavingStatus,
  getArticlesAsync,
  handleArticle
} from '../modules/articles';

import Home from '../components/Home';


const mapDispatchToProps = {
  getError: () => getError(),
  getArticlesAsync: () => getArticlesAsync(),
  handleArticle: (data) => handleArticle(data),
};

const mapStateToProps = (state) => {
  return {
    isLoading: getLoadingStatus(state),
    isSaving: getSavingStatus(state),
    articles: getArticles(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
