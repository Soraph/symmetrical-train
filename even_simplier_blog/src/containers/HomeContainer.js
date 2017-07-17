import { connect } from 'react-redux';
import {
  getError,
  getArticles,
  getLoadingStatus,
  getArticlesAsync
} from '../modules/articles';

import Home from '../components/Home';


const mapDispatchToProps = {
  getError: () => getError(),
  getArticlesAsync: () => getArticlesAsync()
};

const mapStateToProps = (state) => {
  return {
    isLoading: getLoadingStatus(state),
    articles: getArticles(state)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
