import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.css';
import ArticlesTable from '../ArticlesTable'

class Home extends Component {
  componentDidMount() {
    if (this.props.isLoading) {
      this.props.getArticlesAsync();
    }
  }

  render() {
    if (this.props.isLoading) {
      return null;
    }

    return (
      <div className="Home">
        <h2>Articles in the blog</h2>
        <ArticlesTable rows={this.props.articles} />
      </div>
    );
  };
}

Home.propTypes = {
  articles: PropTypes.array,
};

export default Home;
